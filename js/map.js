(function(){

'use strict';

var module = angular.module('tracks.map', [
  'tracks.data',
  'tracks.goog'
]);

module.directive('onGlobalTab', ['$window', '$parse', function($window, $parse) {
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
}]);

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

  $scope.loadPlaces = function() {
    places.get($scope.placeName).then(function(data) {
      markers.clear();
      places.mergeByDistance(data, $scope.mergeArcDistance)
        .forEach(function(place) {
          markers.add(place);
        });
    });
  };
});

}());
