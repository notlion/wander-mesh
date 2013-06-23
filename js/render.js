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

        function routeToFeature(route) {
          return {
            type: 'LineString',
            coordinates: route.overview_path.map(function(latLng) {
              return [ latLng.lng(), latLng.lat() ];
            })
          };
        }

        var routePath = d3.geo.path().projection(project.getProjection());

        // function updateRouteTransforms() {
        // }

        function hiliteRoute(id) {
          g.selectAll('.route').transition()
            .style('opacity', function() {
              return this.id.slice(1) == id ? 1 : 0.25;
            });
        }
        function resetRouteHilite() {
          g.selectAll('.route').transition().style('opacity', 1);
        }

        $scope.$watch('transition', function() {
          $scope.transition.entering.forEach(function(edge) {
            edge.routePromise.then(function(route) {
              var id = 'r' + edge.id;
              var feature = routeToFeature(route);

              var group = g.append('g')
                .attr('id', id)
                .attr('class', 'route')
                .on('mouseover', function(){ hiliteRoute(edge.id); })
                .on('mouseout', function(){ resetRouteHilite(); });

              group.append('path')
                .datum(feature)
                .attr('class', 'path')
                .attr('d', routePath);

              group.selectAll('.node').data(project.latLngArray([
                  route.overview_path[0],
                  route.overview_path[route.overview_path.length - 1]
                ]))
                .enter().append('path')
                  .attr('class', 'node')
                  .attr('transform', function(d) {
                    return 'translate(' + d[0] + ',' + d[1] + ')';
                  })
                  .attr('d', d3.svg.arc()
                    .startAngle(0)
                    .endAngle(2 * Math.PI)
                    .innerRadius(3)
                    .outerRadius(10));

              // updateRouteTransforms();
            });
          });
          $scope.transition.exiting.forEach(function(edge) {
            g.selectAll('#r' + edge.id).remove();
          });
        });

        // $scope.$watch('nested', updateRouteTransforms);
      }
    };
  }
]);

module.controller('TracksRenderController', [
  '$scope',
  function($scope) {
    $scope.nested = false;
  }
]);

}());
