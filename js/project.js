(function(){

'use strict';

var module = angular.module('tracks.project', []);

module.factory('project', [function() {
  var project = {};

  var projection = d3.geo.albers()
    .rotate([ 98, 0 ])
    .center([ 0, 38 ])
    .precision(0.1);

  project.latLng = function(latLng) {
    return projection([ latLng.lng(), latLng.lat() ]);
  };

  project.latLngArray = function(arr) {
    return arr.map(project.latLng);
  };

  return project;
}]);

}());
