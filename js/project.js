(function(){

'use strict';

var module = angular.module('tracks.project', []);

module.factory('project', [function() {
  var project = {};

  project.latLng = function(latLng) {
    return {
      x: latLng.lng(),
      y: latLng.lat()
    };
  };

  project.latLngArray = function(arr) {
    return arr.map(project.latLng);
  };

  return project;
}]);

}());
