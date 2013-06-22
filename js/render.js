(function(){

'use strict';

var module = angular.module('tracks.render', []);

module.directive('tracksRender', ['$window', function($window) {
  return {
    controller: 'TracksRenderController',
    template: '<div class="render-map"></div>',
    link: function(scope, element, attrs, controller) {
      var elem = element[0];
      var svg = d3.select(elem).append('svg');
      var grp = svg.append('g');

      function resize() {
        svg.attr('width', elem.clientWidth)
           .attr('height', elem.clientHeight);
      }
      resize();
      $window.addEventListener('resize', resize);
    }
  };
}]);

module.controller('TracksRenderController', [
  '$rootScope',
  '$scope',
  'project',
  function($rootScope, project) {
  }
]);

}());
