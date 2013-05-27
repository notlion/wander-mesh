(function(){

'use strict';

var map = angular.module('tracks.map', []);

map.directive('tracksMap', [function() {
  return {
    templateUrl: '/partials/map.html',
    controller: 'MapController',
    link: function(scope, element, attrs, controller) {
      controller.init(new google.maps.Map(element[0]));
    }
  };
}]);

map.controller('MapController', ['$scope', function($scope) {
  var map;

  this.init = function(_map) {
    map = _map;
  };
}]);

}());
