(function(){

'use strict';

var module = angular.module('tracks.render', [
  'tracks.vec'
]);

module.directive('tracksRender', [
  '$window',
  'project',
  'vec',
  function($window, project, vec) {
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
        var routePaths = {
          type: 'FeatureCollection',
          features: []
        };
        var routePolygons = {
          type: 'FeatureCollection',
          features: []
        };

        function genColor(id) {
          var h = Math.floor(Math.abs(Math.sin(id * 237642.23)) * 255);
          return d3.rgb('hsl(' + h + ',90%,60%)');
        }

        // function distSq(x1, y1, x2, y2) {
        //   var xo = x2 - x1, yo = y2 - y1;
        //   return xo * xo + yo * yo;
        // }

        // function getPathDensity(id, coord, radius) {
        //   var rr = radius * radius, i, j, c, n = 1;
        //   var f = routePaths.features;
        //   for (i = f.length; --i >= 0;) {
        //     if (f[i].properties.edgeId === id) continue;
        //     c = f[i].geometry.coordinates;
        //     for (j = c.length; --j >= 0;) {
        //       if (distSq(coord[0], coord[1], c[j][0], c[j][1]) < rr) {
        //         n++;
        //         break;
        //       }
        //     }
        //   }
        //   return n;
        // }

        // function genPathPolygonCoords(path) {
        //   var coordsL = [];
        //   var coordsR = [];
        //   var pathId = path.properties.edgeId;
        //   var normal = new vec.Vec2();
        //   var pc = path.geometry.coordinates;
        //   for (var nx, ny, i = 1; i < pc.length - 1; ++i) {
        //     normal.set(0, 0);
        //     normal.x -= pc[i][1] - pc[i - 1][1];
        //     normal.y += pc[i][0] - pc[i - 1][0];
        //     normal.x -= pc[i + 1][1] - pc[i][1];
        //     normal.y += pc[i + 1][0] - pc[i][0];
        //     normal.normalize().scale(Math.log(getPathDensity(pathId, pc[i], 0.1)) * 0.1);
        //     coordsL.push([ pc[i][0] + normal.x, pc[i][1] + normal.y ]);
        //     coordsR.push([ pc[i][0] - normal.x, pc[i][1] - normal.y ]);
        //   }
        //   return coordsL.concat(coordsR.reverse()).concat([coordsL[0]]);
        // }

        function addRoute(route, edgeId) {
          var path = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: route.overview_path.map(function(latLng) {
                return [ latLng.lng(), latLng.lat() ];
              })
            },
            properties: { edgeId: edgeId }
          };
          routePaths.features.push(path);
        }
        function removeRoute(edgeId) {
          function checkId(feature) {
            return feature.properties.edgeId === edgeId;
          }
          routePaths.features = _.reject(routePaths.features, checkId);
          routePolygons.features = _.reject(routePolygons.features, checkId);
        }

        function updateRoutes() {
          var bounds = routePath.bounds(routePaths);
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

          // // Remove Everything
          // g.selectAll('.route').remove();

          // routePolygons.features = routePaths.features.map(function(feature) {
          //   return {
          //     type: 'Feature',
          //     geometry: {
          //       type: 'Polygon', // Should be Polygon
          //       coordinates: [ genPathPolygonCoords(feature) ]
          //     },
          //     properties: feature.properties
          //   };
          // });

          function featureId(feature) {
            return feature.properties.edgeId;
          }

          var routes = g.selectAll('.route')
            .data(routePaths.features, featureId);

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

          routes.style('stroke-width', 0.3 * boundsScale);

          var nodes = g.selectAll('.route')
            .data(routePaths.features, featureId)
            .selectAll('.node').data(function(d) {
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

          svg
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', [
              bounds[0][0] - padding, bounds[0][1] - padding,
              boundsWidth + padding * 2, boundsHeight + padding * 2
            ].join(' '));
        }

        function hiliteRoute(id) {
          g.selectAll('.route').transition()
            .style('opacity', function() {
              return this.id == id ? 1 : 0;
            });
        }
        function resetRouteHilite() {
          g.selectAll('.route').transition().style('opacity', 1);
        }

        $scope.$watch('transition', function() {
          $scope.transition.entering.forEach(function(edge) {
            edge.routePromise.then(function(route) {
              addRoute(route, edge.id);
              updateRoutes();
            });
          });
          $scope.transition.exiting.forEach(function(edge) {
            removeRoute(edge.id);
            updateRoutes();
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
