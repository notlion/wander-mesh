(function(){

'use strict';

var module = angular.module('tracks.render', []);

module.directive('tracksRender', [function() {
  function linkMap(scope, element, attrs, controller) {
    var elem = element[0];
    var svg = d3.select(elem).append('svg')
      .attr('width', elem.clientWidth)
      .attr('height', elem.clientHeight);
  }
  return {
    controller: 'TracksRenderController',
    template: '<div class="render-map"></div>',
    link: linkMap
  };
}]);

module.controller('TracksRenderController', [function() {

}]);

}());
