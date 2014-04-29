(function(){

'use strict';

var module = angular.module('tracks.goog', [
  'tracks.project',
  'tracks.data'
]);

function arrayToLatLng(arr) {
  return new google.maps.LatLng(arr[1], arr[0]);
}
function latLngToArray(latLng) {
  return [ latLng.lng(), latLng.lat() ];
}

module.directive('tracksMap', function($rootScope, places, markers, geocode) {
  return {
    scope: {
      showRoutes: '&'
    },
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

      function onMarkerDragEnd() {
        this.location = latLngToArray(this.gmMarker.getPosition());
        markers.remove(this);
        markers.add(this);
        $scope.$digest();
      }

      function onMarkerRightClick() {
        markers.remove(this);
        $scope.$digest();
      }

      $scope.$on('markerAdded', function addMarker(event, marker) {
        marker.gmMarker = new gm.Marker({
          map: map,
          position: arrayToLatLng(marker.location),
          draggable: true
        });
        gm.event.addListener(marker.gmMarker, 'dragend',
            onMarkerDragEnd.bind(marker));
        gm.event.addListener(marker.gmMarker, 'rightclick',
            onMarkerRightClick.bind(marker));
      });

      $scope.$on('markerRemoved', function removeMarker(event, marker) {
        gm.event.clearInstanceListeners(marker.gmMarker);
        marker.gmMarker.setMap(null);
        delete marker.gmMarker;
      });

      gm.event.addListener(map, 'click', function(event) {
        markers.add({
          location: [ event.latLng.lng(), event.latLng.lat() ]
        });
        $scope.$digest();
      });

      var linesByEdgeId = {};
      var routesByEdgeId = {};

      $scope.$watch('showRoutes()', function(showRoutes) {
        for (var id in routesByEdgeId) {
          routesByEdgeId[id].setMap(showRoutes ? map : null);
        }
      });

      $rootScope.$on('transition', function(event, transition) {
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
          edge.routePromise.then(function(route) {
            var line = routesByEdgeId[edge.id] = new gm.Polyline({
              clickable: false,
              path: route.overview_path,
              strokeColor: '#c300ff',
              strokeWeight: 4,
              strokeOpacity: 1
            });
            if ($scope.showRoutes()) {
              line.setMap(map);
            }
          },
          function(error) {
            console.error(error);
          });
        });
      });
    }
  };
});

module.controller('TracksMapController',
    function($rootScope, $scope, project, markers, edgeMgr) {
  function getMarkerNodes(markers) {
    if (markers.length < 1) return [];
    return markers.map(function(marker) {
      var node = arrayToLatLng(marker.location);
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

  $scope.markers = markers;
  $scope.$watchCollection('markers', function() {
    var nodes = getMarkerNodes(markers);
    appendProjectedToNodes(nodes);
    var edges = getDelaunayEdges(nodes);
    $rootScope.$emit('transition', edgeMgr.replaceAll(edges));
  });
});

module.factory('edgeMgr', function($q, directionsMgr) {
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
});

module.factory('directionsMgr', function($q, GoogleRequester) {
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
});

module.factory('geocode', function(GoogleRequester) {
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
});

module.factory('GoogleRequester', function($q, $rootScope) {
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
});

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
