(function(){

'use strict';

var module = angular.module('tracks.goog', [
  'tracks.project'
]);

module.directive('tracksMap', ['edgeMgr', function(edgeMgr) {
  return {
    template: '<div class="goog-map"></div>',
    controller: 'TracksMapController',
    link: function($scope, element, attrs, controller) {
      var gm = google.maps;

      gm.visualRefresh = true;

      var map = new gm.Map(element[0], {
        center: new gm.LatLng(39.828175, -98.5795),
        zoom: 5,
        mapTypeId: gm.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        keyboardShortcuts: true
      });

      $scope.markers = [];

      function safeApply() {
        if (!$scope.$$phase) $scope.$apply();
      }

      function onMarkerDragEnd() {
        removeMarker(this);
        safeApply();
        addMarker(this.getPosition());
        safeApply();
      }

      function addMarker(latLng) {
        var marker = new gm.Marker({
          map: map,
          position: latLng,
          draggable: true
        });
        gm.event.addListener(marker, 'dragend', onMarkerDragEnd.bind(marker));
        $scope.markers.push(marker);
      }

      function removeMarker(marker) {
        gm.event.clearInstanceListeners(marker);
        marker.setMap(null);
        var i = $scope.markers.indexOf(marker);
        if (i >= 0) {
          $scope.markers.splice(i, 1);
        }
      }

      gm.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
        safeApply();
      });

      var linesByEdgeId = {};
      var routesByEdgeId = {};

      $scope.$watch(function genId() {
        return $scope.edges.reduce(function(p, c) {
          return p + ',' + c.id;
        }, '');
      }, function() {
        var transition = edgeMgr.replaceAll($scope.edges);
        transition.exiting.forEach(function(edge) {
          if (linesByEdgeId[edge.id]) {
            linesByEdgeId[edge.id].setMap(null);
            delete linesByEdgeId[edge.id];
          }
          if (routesByEdgeId[edge.id]) {
            routesByEdgeId[edge.id].setMap(null);
            delete routesByEdgeId[edge.id];
          }
        });
        transition.entering.forEach(function(edge) {
          linesByEdgeId[edge.id] = new gm.Polyline({
            map: map,
            geodesic: true,
            clickable: false,
            path: [ edge.source, edge.target ],
            strokeOpacity: 0.25
          });
          edge.routePromise.then(
            function(result) {
              routesByEdgeId[edge.id] = new gm.Polyline({
                map: map,
                clickable: false,
                path: result.routes[0].overview_path,
                strokeColor: '#c300ff',
                strokeWeight: 5,
                strokeOpacity: 1
              });
            },
            function(error) {
              console.error(error);
            }
          );
        });
      });
    }
  };
}]);

module.controller('TracksMapController', [
  '$rootScope',
  '$scope',
  'project',
  function($rootScope, $scope, project) {
    function getMarkerNodes(markers) {
      if (markers.length < 1) return [];
      return markers.map(function(marker) {
        return marker.getPosition();
      });
    }

    var nextEdgeId = 0;

    function getDelaunayEdges(nodes) {
      if (nodes.length < 1) return [];
      var projected = project.latLngArray(nodes);
      var edges = d3.geom.voronoi()
        .x(function(d, i) { return projected[i][0]; })
        .y(function(d, i) { return projected[i][1]; })
        .links(nodes);
      // Give each edge an incrementing ID for lookup in maps.
      edges.forEach(function(edge) {
        edge.id = nextEdgeId++;
      });
      return edges;
    }

    $scope.$watch(function genId() {
      return $scope.markers.reduce(function(p, c) {
        return p + c.getPosition().toUrlValue();
      }, '');
    }, function() {
      $rootScope.nodes = getMarkerNodes($scope.markers);
      $rootScope.edges = getDelaunayEdges($rootScope.nodes);
    });
  }
]);

module.factory('edgeMgr', [
  '$q',
  'directionsMgr',
  function($q, directionsMgr) {
    var edgeMgr = {};
    var edges = [];

    function addEdge(edge) {
      edge.routePromise = directionsMgr.requestEdgeRoute(edge);
      edges.push(edge);
    }

    function removeEdge(edge) {
      directionsMgr.cancelRequestEdgeRoute(edge);
      var i = edgeIndexOf(edges, edge);
      if (i >= 0) edges.splice(i, 1);
    }

    edgeMgr.replaceAll = function(nextEdges) {
      var transition = {
        entering: _.filter(nextEdges, function(edge) {
          return edgeIndexOf(edges, edge) === -1;
        }),
        exiting:  _.filter(edges, function(edge) {
          return edgeIndexOf(nextEdges, edge) === -1;
        })
      };
      transition.entering.forEach(addEdge);
      transition.exiting.forEach(removeEdge);
      return transition;
    };

    edgeMgr.getEdges = function() {
      return edges;
    };

    edgeMgr.indexOf = function(edges, edge) {
      return indexOf(edges, function(otherEdge) {
        return equalsEdge(edge, otherEdge);
      });
    };

    return edgeMgr;
  }
]);

module.factory('directionsMgr', [
  '$q',
  '$rootScope',
  function($q, $rootScope) {
    var gm = google.maps;
    var ds = new gm.DirectionsService();

    var directionsMgr = {};

    var queuedRequests = [];
    var pendingRequests = [];

    var tickInterval = 100;
    var tickTimeout = null;

    function tick() {
      if (queuedRequests.length > 0) {
        var request = queuedRequests.shift();
        pendingRequests.push(request);
        ds.route({
          origin: request.edge.source,
          destination: request.edge.target,
          travelMode: gm.TravelMode.DRIVING
        }, function(result, status) {
          if (directionsMgr.cancelRequestEdgeRoute(request.edge, true)) {
            if (status === gm.DirectionsStatus.OK) {
              request.resolve(result);
              // We need to digest since we are outside angular's scope.
              $rootScope.$digest();
            }
            else if(status === gm.DirectionsStatus.OVER_QUERY_LIMIT) {
              console.log('Retrying...');
              queuedRequests.push(request); // Retry
            }
            else {
              request.reject(status);
            }
          }
        });
        tickTimeout = queuedRequests.length > 0 ? setTimeout(tick, tickInterval)
                                                : null;
      }
    }

    function start() {
      if (tickTimeout === null) tickTimeout = setTimeout(tick, 0);
    }

    function requestIndexOf(requests, edge) {
      return indexOf(requests, function(request) {
        return equalsEdge(edge, request.edge);
      });
    }

    directionsMgr.requestEdgeRoute = function(edge, callback) {
      var deferred = $q.defer();
      var i = requestIndexOf(queuedRequests, edge);
      if (i === -1) {
        deferred.edge = edge;
        queuedRequests.push(deferred);
        start();
      }
      else {
        deferred.reject('Edge route already queued');
      }
      return deferred.promise;
    };

    directionsMgr.cancelRequestEdgeRoute = function(edge, silent) {
      var i = requestIndexOf(queuedRequests, edge);
      if (i >= 0) {
        if (!silent) queuedRequests[i].reject('Cancelled');
        queuedRequests.splice(i, 1);
        return true;
      }
      i = requestIndexOf(pendingRequests, edge);
      if (i >= 0) {
        if (!silent) pendingRequests[i].reject('Cancelled');
        pendingRequests.splice(i, 1);
        return true;
      }
      return false;
    };

    return directionsMgr;
  }
]);

function equalsEdge(e1, e2) {
  return e1.source.equals(e2.source) && e1.target.equals(e2.target);
}

function indexOf(array, foundFn) {
  for (var i = 0, n = array.length; i < n; ++i) {
    if (foundFn(array[i])) return i;
  }
  return -1;
}

function edgeIndexOf(edges, edge) {
  return indexOf(edges, function(otherEdge) {
    return equalsEdge(edge, otherEdge);
  });
}

}());
