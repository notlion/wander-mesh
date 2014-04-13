(function(){

'use strict';

var app = window.app = angular.module('tracks', [
  'ngRoute',
  'tracks.map',
  'tracks.goog',
  'tracks.render'
]);

app.config([
  '$locationProvider',
  '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
      controller: 'MapController',
      templateUrl: '/partials/map.html'
    });
    $routeProvider.otherwise({ redirectTo: '/' });
  }
]);

}());
