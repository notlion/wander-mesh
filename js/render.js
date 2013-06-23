(function(){

'use strict';

var module = angular.module('tracks.render', []);

module.directive('tracksRender', [
  '$window',
  'project',
  function($window, project) {
    return {
      controller: 'TracksRenderController',
      link: function($scope, element, attrs, controller) {
        element.addClass('render-map');

        var elem = element[0];
        var svg = d3.select(elem).append('svg');
        var root = svg.append('g');
        var g = root.append('g');

        function resize() {
          var w = elem.clientWidth;
          var h = elem.clientHeight;
          svg.attr('width', elem.clientWidth)
             .attr('height', elem.clientHeight);
          root.attr('transform', 'translate(' + (w / 2) + ',' + (h / 2) + ')');
        }
        resize();
        $window.addEventListener('resize', resize);

        // var nodes = g.selectAll('.node');
        // $scope.$watch('nodes', function() {
        //   nodes = nodes.data($scope.nodes, function(d){ return d.id; });
        //   nodes.enter().append('circle')
        //     .attr('class', 'node')
        //     .attr('r', 10)
        //     .attr('cx', function(d) { return d.projected[0]; })
        //     .attr('cy', function(d) { return d.projected[1]; });
        //   nodes.exit().remove();
        // });

        // var lines = g.selectAll('.line');
        // $scope.$watch('edges', function() {
        //   lines = lines.data($scope.edges, function(d){ return d.id; });
        //   lines.enter().append('line')
        //     .attr('class', 'line')
        //     .attr('x1', function(d) { return d.source.projected[0]; })
        //     .attr('y1', function(d) { return d.source.projected[1]; })
        //     .attr('x2', function(d) { return d.target.projected[0]; })
        //     .attr('y2', function(d) { return d.target.projected[1]; });
        //   lines.exit().remove();
        // });

        var routePath = d3.geo.path().projection(project.getProjection());

        function routeToFeature(route) {
          return {
            type: 'LineString',
            coordinates: route.overview_path.map(function(latLng) {
              return [ latLng.lng(), latLng.lat() ];
            })
          };
        }

        $scope.$watch('transition', function() {
          $scope.transition.entering.forEach(function(edge) {
            edge.routePromise.then(function(route) {
              var id = 'r' + edge.id;
              var feature = routeToFeature(route);
              var routeSel = g.append('path').datum(feature)
                .attr('id', id)
                .attr('class', 'route')
                .attr('d', routePath);
            });
          });
          $scope.transition.exiting.forEach(function(edge) {
            g.selectAll('#r' + edge.id).remove();
          });
        });
      }
    };
  }
]);

module.controller('TracksRenderController', [
  '$rootScope',
  '$scope',
  'project',
  function($rootScope, project) {
  }
]);

}());
