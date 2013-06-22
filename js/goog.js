(function(){

'use strict';

var module = angular.module('tracks.goog', [
  'tracks.project'
]);

module.directive('tracksMap', ['directions', function(directions) {
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

      var edges = [];

      function edgeIndexOf(edges, edge) {
        return indexOf(edges, function(otherEdge) {
          return equalsEdge(edge, otherEdge);
        });
      }

      function addEdge(edge) {
        edges.push(edge);
        edge.line = new gm.Polyline({
          map: map,
          geodesic: true,
          clickable: false,
          path: [ edge.source, edge.target ],
          strokeOpacity: 0.25
        });
        directions.requestEdgeRoute(edge, function(result) {
          edge.path = new gm.Polyline({
            map: map,
            clickable: false,
            path: result.routes[0].overview_path,
            strokeColor: '#c300ff',
            strokeWeight: 5,
            strokeOpacity: 1
          });
        });
      }

      function removeEdge(edge) {
        directions.cancelRequestEdgeRoute(edge);
        if (edge.line) edge.line.setMap(null);
        if (edge.path) edge.path.setMap(null);
        var i = edgeIndexOf(edges, edge);
        if (i >= 0) edges.splice(i, 1);
      }

      function replaceEdges(nextEdges) {
        var enterEdges = _.filter(nextEdges, function(edge) {
          return edgeIndexOf(edges, edge) === -1;
        });
        var exitEdges = _.filter(edges, function(edge) {
          return edgeIndexOf(nextEdges, edge) === -1;
        });
        enterEdges.forEach(addEdge);
        exitEdges.forEach(removeEdge);
      }

      gm.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
        safeApply();
      });

      $scope.$watch(function genId() {
        return $scope.edges.reduce(function(p, c) {
          return p + c.source.toUrlValue() +
                     c.target.toUrlValue();
        }, '');
      }, function() {
        replaceEdges($scope.edges);
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

    function getNodeEdges(nodes) {
      if (nodes.length < 1) return [];
      var projected = project.latLngArray(nodes);
      return d3.geom.voronoi()
        .x(function(d, i) { return projected[i].x; })
        .y(function(d, i) { return projected[i].y; })
        .links(nodes);
    }

    $scope.$watch(function genId() {
      return $scope.markers.reduce(function(p, c) {
        return p + c.getPosition().toUrlValue();
      }, '');
    }, function() {
      $rootScope.nodes = getMarkerNodes($scope.markers);
      $rootScope.edges = getNodeEdges($rootScope.nodes);
    });
  }
]);

module.factory('directions', ['$q', function($q) {
  var gm = google.maps;
  var ds = new gm.DirectionsService();
  var deferred = $q.defer();

  var directions = {};

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
        if (directions.cancelRequestEdgeRoute(request.edge)) {
          if (status === gm.DirectionsStatus.OK) {
            request.callback(result);
          }
          else if(status === gm.DirectionsStatus.OVER_QUERY_LIMIT) {
            console.log('Retrying...');
            queuedRequests.push(request); // Retry
          }
          else console.error(status);
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

  directions.requestEdgeRoute = function(edge, callback) {
    var i = requestIndexOf(queuedRequests, edge);
    if (i === -1) {
      queuedRequests.push({ edge: edge, callback: callback });
      start();
    }
  };

  directions.cancelRequestEdgeRoute = function(edge) {
    var i = requestIndexOf(queuedRequests, edge);
    if (i >= 0) {
      queuedRequests.splice(i, 1);
      return true;
    }
    i = requestIndexOf(pendingRequests, edge);
    if (i >= 0) {
      pendingRequests.splice(i, 1);
      return true;
    }
    return false;
  };

  return directions;
}]);

function equalsEdge(e1, e2) {
  return e1.source.equals(e2.source) && e1.target.equals(e2.target);
}

function indexOf(array, foundFn) {
  for (var i = 0, n = array.length; i < n; ++i) {
    if (foundFn(array[i])) return i;
  }
  return -1;
}

}());
