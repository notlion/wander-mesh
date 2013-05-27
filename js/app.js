(function(){

'use strict';

var app = window.app = angular.module('tracks', [
  'ui.map'
]);

app.config(['$locationProvider', '$routeProvider',
function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: '/partials/maps.html'
  });
  $routeProvider.otherwise({ redirectTo: '/' });
}]);

}());
