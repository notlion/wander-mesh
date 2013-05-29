(function(){

'use strict';

var module = angular.module('tracks.goog', []);

module.directive('tracksMap', ['directions', function(directions) {
  return {
    template: '<div class="goog-map"></div>',
    controller: 'TracksMapController',
    link: function($scope, element, attrs, controller) {
      var gm = google.maps;

      var map = new gm.Map(element[0], {
        center: new gm.LatLng(39.828175, -98.5795),
        zoom: 4,
        mapTypeId: gm.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        keyboardShortcuts: true
      });

      $scope.markers = [];

      function safeApply() {
        if (!$scope.$$phase) $scope.$apply();
      }

      function addMarker(latLng) {
        var marker = new gm.Marker({ map: map, position: latLng });
        $scope.markers.push(marker);
        safeApply();
      }
      function removeMarker(marker) {
        var i = $scope.markers.indexOf(marker);
        if (i >= 0) {
          $scope.markers.splice(i, 1);
          safeApply();
        }
      }

      var edgeOverlays = [];

      function equalsEdge(e1, e2) {
        return e1.source === e2.source && e1.target === e2.target;
      }

      function replaceEdges(edges) {
        edgeOverlays.forEach(function(overlay){ overlay.setMap(null); });
        edgeOverlays = [];
        edges.forEach(function(edge) {
          edgeOverlays.push(new gm.Polyline({
            map: map,
            geodesic: true,
            clickable: false,
            path: [ edge.source.getPosition(), edge.target.getPosition() ],
            strokeOpacity: 0.25
          }));
          directions.requestEdgeRoute(edge, function(result) {
            edgeOverlays.push(new gm.Polyline({
              map: map,
              clickable: false,
              path: result.routes[0].overview_path,
              strokeColor: '#0000ff',
              strokeOpacity: 0.5
            }));
          });
        });
      }

      gm.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
      });

      $scope.$watch('edges.length', function() {
        replaceEdges($scope.edges);
      });
    }
  };
}]);

module.controller('TracksMapController', ['$scope', function($scope) {
  function getMarkerEdges(markers) {
    if (markers.length < 1) return [];
    return d3.geom.voronoi()
      .x(function(d){ return d.getPosition().lng(); })
      .y(function(d){ return d.getPosition().lat(); })
      .links(markers);
  }

  $scope.$watch('markers.length', function() {
    $scope.edges = getMarkerEdges($scope.markers);
    console.log($scope.edges);
  });
}]);

module.factory('directions', ['$q', function($q) {
  var gm = google.maps;
  var ds = new gm.DirectionsService();
  var deferred = $q.defer();

  var directions = {};

  var queuedRequests = [];
  var pendingRequests = [];

  function requestIndexOf(array, edge) {
    for (var i = 0, n = array.length; i < n; ++i) {
      if (edge === array[i].edge) return i;
    }
    return -1;
  }

  var tickInterval = 500;
  var tickTimeout = null;

  function tick() {
    if (queuedRequests.length > 0) {
      var request = queuedRequests.shift();
      pendingRequests.push(request);
      ds.route({
        origin: request.edge.source.getPosition(),
        destination: request.edge.target.getPosition(),
        travelMode: gm.TravelMode.DRIVING
      }, function(result, status) {
        if (directions.cancelRequestEdgeRoute(request.edge)) {
          if (status === gm.DirectionsStatus.OK) request.callback(result);
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

}());
