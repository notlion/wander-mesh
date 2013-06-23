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
        var g = svg.append('g');

        var width, height;
        var padding = 20;
        var materialWidth = 24;
        var materialHeight = 24;
        var materialAspect = materialWidth / materialHeight;
        var nodeInnerRadius = 1 / 8;
        var nodeOuterRadius = 3 / 8;

        function resize() {
          width = elem.clientWidth;
          height = elem.clientHeight;
          svg.attr('width', width).attr('height', height);
        }
        resize();
        $window.addEventListener('resize', resize);

        var routePath = d3.geo.path().projection(project.getProjection());
        var routeFeatures = {
          type: 'FeatureCollection',
          features: []
        };

        function genColor(id) {
          var h = Math.floor(Math.abs(Math.sin(id * 237642.23)) * 255);
          return d3.rgb('hsl(' + h + ',90%,60%)');
        }

        function addRouteFeature(route, edgeId) {
          routeFeatures.features.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: route.overview_path.map(function(latLng) {
                return [ latLng.lng(), latLng.lat() ];
              })
            },
            properties: { edgeId: edgeId }
          });
        }
        function removeRouteFeature(edgeId) {
          var features = routeFeatures.features;
          routeFeatures.features = _.reject(features, function(feature) {
            return feature.properties.edgeId === edgeId;
          });
        }

        function updateRoutes() {
          var bounds = routePath.bounds(routeFeatures);
          var boundsWidth = bounds[1][0] - bounds[0][0];
          var boundsHeight = bounds[1][1] - bounds[0][1];
          var boundsScale;
          var aspectAspect = (boundsWidth / boundsHeight) / materialAspect;
          if (aspectAspect >= 1) {
            boundsScale = 1 / (materialWidth / boundsWidth);
          }
          else {
            boundsScale = 1 / (materialHeight / boundsHeight);
          }

          var routes = g.selectAll('.route').data(routeFeatures.features, function(d) {
            return d.properties.edgeId;
          });

          var entering = routes.enter().append('g')
            .attr('id', function(d){ return 'r' + d.properties.edgeId; })
            .attr('class', 'route')
            .on('mouseover', function(){ hiliteRoute(this.id); })
            .on('mouseout', function(){ resetRouteHilite(); });

          entering.append('path')
            .attr('class', 'path')
            .attr('d', routePath)
            .style('stroke', function(d) {
              return genColor(d.properties.edgeId);
            });

          routes.exit().remove();

          routes.style('stroke-width', 0.2 * boundsScale);

          var nodes = routes.selectAll('.node').data(function(d) {
            var c = d.geometry.coordinates;
            return [
              { p: d.properties, c: project.getProjection()(_.first(c)) },
              { p: d.properties, c: project.getProjection()(_.last(c)) }
            ];
          });

          nodes.enter().append('path')
            .attr('class', 'node')
            .attr('transform', function(d) {
              return 'translate(' + d.c[0] + ',' + d.c[1] + ')';
            })
            .style('stroke', function(d) {
              return genColor(d.p.edgeId);
            });

          nodes.exit().remove();

          nodes.attr('d', d3.svg.arc()
            .startAngle(0)
            .endAngle(2 * Math.PI)
            .innerRadius(nodeInnerRadius * boundsScale)
            .outerRadius(nodeOuterRadius * boundsScale));

          nodes.style('stroke-width', 0.05 * boundsScale);

          svg.datum(routeFeatures)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', [
              bounds[0][0] - padding, bounds[0][1] - padding,
              boundsWidth + padding * 2, boundsHeight + padding * 2
            ].join(' '));
        }

        function hiliteRoute(id) {
          g.selectAll('.route').transition()
            .style('opacity', function() {
              return this.id == id ? 1 : 0.25;
            });
        }
        function resetRouteHilite() {
          g.selectAll('.route').transition().style('opacity', 1);
        }

        $scope.$watch('transition', function() {
          $scope.transition.entering.forEach(function(edge) {
            edge.routePromise.then(function(route) {
              addRouteFeature(route, edge.id);
              updateRoutes();
            });
          });
          $scope.transition.exiting.forEach(function(edge) {
            removeRouteFeature(edge.id);
          });
        });
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
