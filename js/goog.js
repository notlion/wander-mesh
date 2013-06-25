(function(){

'use strict';

var module = angular.module('tracks.goog', [
  'tracks.project',
  'tracks.data'
]);

module.directive('tracksMap', ['places', 'geocode', '$q', function(places, geocode, $q) {
  return {
    controller: 'TracksMapController',
    link: function($scope, element, attrs, controller) {
      element.addClass('goog-map');

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
        return marker;
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

      $scope.$watch('transition', function() {
        var transition = $scope.transition;
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
            function(route) {
              routesByEdgeId[edge.id] = new gm.Polyline({
                map: map,
                clickable: false,
                path: route.overview_path,
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

      // HACK Just cram in some data..
      places.forEach(function(place) {
        addMarker(new gm.LatLng(place.location[1], place.location[0]))
          .setTitle(JSON.stringify(place));
      });
      // var processedPlaces = [];
      // $q.all(_.first(places, 300).map(function(place) {
      //   return geocode.request(place.name).then(function(result) {
      //     place.location = [
      //       result[0].geometry.location.lng(),
      //       result[0].geometry.location.lat()
      //     ];
      //     processedPlaces.push(place);
      //   });
      // })).then(function() {
      //   console.log(JSON.stringify(processedPlaces));
      // });
    }
  };
}]);

module.controller('TracksMapController', [
  '$rootScope',
  '$scope',
  'project',
  'edgeMgr',
  function($rootScope, $scope, project, edgeMgr) {
    function getMarkerNodes(markers) {
      if (markers.length < 1) return [];
      return markers.map(function(marker) {
        var node = marker.getPosition();
        node.id = nextNodeId++;
        return node;
      });
    }

    var nextNodeId = 0;
    var nextEdgeId = 0;

    function getDelaunayEdges(nodes) {
      if (nodes.length < 1) return [];
      var edges = d3.geom.voronoi()
        .x(function(d, i) { return d.projected[0]; })
        .y(function(d, i) { return d.projected[1]; })
        .links(nodes);
      // Give each edge an incrementing ID for lookup in maps.
      edges.forEach(function(edge) {
        edge.id = nextEdgeId++;
      });
      return edges;
    }

    function appendProjectedToNodes(nodes) {
      nodes.forEach(function(node) {
        node.projected = project.latLng(node);
      });
    }

    $scope.$watch(function genId() {
      return $scope.markers.reduce(function(p, c) {
        return p + c.getPosition().toUrlValue();
      }, '');
    }, function() {
      $rootScope.nodes = getMarkerNodes($scope.markers);
      appendProjectedToNodes($rootScope.nodes);
      $rootScope.edges = getDelaunayEdges($rootScope.nodes);
      $rootScope.transition = edgeMgr.replaceAll($rootScope.edges);
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
  'GoogleRequester',
  function($q, GoogleRequester) {
    var gm = google.maps;
    var ds = new gm.DirectionsService();
    var directionsMgr = {};

    var requester = new GoogleRequester(function(opts, callback) {
      ds.route({
        origin: opts.source,
        destination: opts.target,
        travelMode: gm.TravelMode.DRIVING
      }, callback);
    });

    directionsMgr.requestEdgeRoute = function(edge) {
      var deferred = $q.defer();
      requester.request(edge).then(function(result) {
        deferred.resolve(result.routes[0]);
      }, deferred.reject);
      return deferred.promise;
    };

    directionsMgr.cancelRequestEdgeRoute = function(edge, silent) {
      return requester.cancel(edge, silent, function(value) {
        return equalsEdge(value.opts, edge);
      });
    };

    return directionsMgr;
  }
]);

module.factory('geocode', [
  'GoogleRequester',
  function(GoogleRequester) {
    var gm = google.maps;
    var geocoder = new gm.Geocoder();
    var geocode = {};

    var requester = new GoogleRequester(function(opts, callback) {
      geocoder.geocode(opts, callback);
    });

    geocode.request = function(address) {
      return requester.request({
        address: address
      });
    };

    return geocode;
  }
]);

module.factory('GoogleRequester', [
  '$q',
  '$rootScope',
  function($q, $rootScope) {
    return function GoogleRequester(requestFn) {
      var queuedRequests = [];
      var pendingRequests = [];

      var tickInterval = 100;
      var tickTimeout = null;

      function tick() {
        if (queuedRequests.length > 0) {
          var request = queuedRequests.shift();
          pendingRequests.push(request);

          requestFn(request.opts, function(result, status) {
            if (cancel(request.opts, true)) {
              if (status === 'OK') {
                request.resolve(result);
                // Get confident and decrease the timeout by a little.
                tickInterval = Math.floor(tickInterval * 0.95);
                // We need to digest since we are outside angular's scope.
                $rootScope.$digest();
              }
              else if(status === 'OVER_QUERY_LIMIT') {
                // Eek! Google rate limited us. Better wait a little longer.
                tickInterval *= 2;
                queuedRequests.push(request); // Retry
              }
              else {
                request.reject(status);
              }
            }
          });

          tickTimeout = queuedRequests.length > 0 ?
            setTimeout(tick, tickInterval) : null;
        }
      }

      function pump() {
        if (tickTimeout === null) tickTimeout = setTimeout(tick, 0);
      }

      this.request = function(opts) {
        var deferred = $q.defer();
        deferred.opts = opts;
        queuedRequests.push(deferred);
        pump();
        return deferred.promise;
      };

      var cancel = this.cancel = function(opts, silent, equals) {
        if (equals === undefined) {
          equals = function(value){ return value.opts === opts; };
        }
        var i = indexOf(queuedRequests, equals);
        if (i >= 0) {
          if (!silent) queuedRequests[i].reject('Cancelled');
          queuedRequests.splice(i, 1);
          return true;
        }
        i = indexOf(pendingRequests, equals);
        if (i >= 0) {
          if (!silent) pendingRequests[i].reject('Cancelled');
          pendingRequests.splice(i, 1);
          return true;
        }
        return false;
      };
    };
  }
]);

function equalsEdge(e1, e2) {
  return e1.source && e2.source && e1.source.equals(e2.source) &&
         e1.target && e2.target && e1.target.equals(e2.target);
}

function indexOf(array, equals) {
  for (var i = 0, n = array.length; i < n; ++i) {
    if (equals(array[i])) return i;
  }
  return -1;
}

function edgeIndexOf(edges, edge) {
  return indexOf(edges, function(otherEdge) {
    return equalsEdge(edge, otherEdge);
  });
}

}());
