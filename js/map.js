(function(){

'use strict';

var module = angular.module('tracks.map', [
  'tracks.data',
  'tracks.goog'
]);

module.directive('onGlobalTab', function($window, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var callback = $parse(attrs.onGlobalTab);
      $window.addEventListener('keydown', function(event) {
        if (event.keyCode === 9) { // tab
          event.preventDefault();
          scope.$apply(callback(scope, { $event: event }));
        }
      });
    }
  };
});

module.controller('MapController', function($scope, places, markers) {
  var modes = [ 'map', 'render' ];

  $scope.mode = modes[0];

  $scope.nextMode = function() {
    $scope.mode = modes[(modes.indexOf($scope.mode) + 1) % modes.length];
  };

  $scope.isMode = function(name) {
    return $scope.mode === name;
  };

  $scope.places = places.list();
  $scope.placeName = $scope.places[0];
  $scope.mergeArcDistance = 0.01;
  $scope.showRoutes = true;

  $scope.loadPlaces = function() {
    places.get($scope.placeName).then(function(data) {
      markers.clear();
      places.mergeByDistance(data, $scope.mergeArcDistance)
        .forEach(function(place) {
          markers.add(place);
        });
    });
  };

  // Bit of a dirty hack to download the SVG, but it works alright.
  $scope.exportSvg = function() {
    var html = d3.select('svg')
      .attr('version', 1.1)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .node().parentNode.innerHTML.trim();

    var a = d3.select('body').append('a')
      .attr('href-lang', 'image/svg+xml')
      .attr('download', 'routes.svg')
      .attr('href', 'data:application/octet-stream;base64,\n' + btoa(html));

    a.node().click();
    a.remove();
  };
});

}());
