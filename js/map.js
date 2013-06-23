(function(){

'use strict';

var module = angular.module('tracks.map', []);

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

module.controller('MapController', ['$scope', function($scope) {
  var modes = [ 'map', 'render' ];

  $scope.mode = modes[0];

  $scope.nextMode = function() {
    $scope.mode = modes[(modes.indexOf($scope.mode) + 1) % modes.length];
  };

  $scope.isMode = function(name) {
    return $scope.mode === name;
  };
}]);

}());
