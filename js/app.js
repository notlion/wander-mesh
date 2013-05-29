(function(){

'use strict';

var app = window.app = angular.module('tracks', [
  'tracks.map',
  'tracks.goog'
]);

app.config(['$locationProvider', '$routeProvider',
function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: '/partials/map.html'
  });
  $routeProvider.otherwise({ redirectTo: '/' });
}]);

}());
