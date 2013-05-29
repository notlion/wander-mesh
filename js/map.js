(function(){

'use strict';

var module = angular.module('tracks.map', [
  'tracks.goog'
]);

module.directive('tracksSvg', function() {
  function linkMap(scope, element, attrs, controller) {
    var elem = element[0];
    var svg = d3.select(elem).append('svg')
      .attr('width', elem.clientWidth)
      .attr('height', elem.clientHeight);
  }
  return {
    controller: 'TracksSvgController',
    template: '<div class="d3-map"></div>',
    link: linkMap
  };
});

module.controller('TracksSvgController', ['directions', function(directions) {

}]);

}());
