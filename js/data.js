(function(){

'use strict';

var data = angular.module('tracks.data', [])

data.factory('places', function($http, $q) {
  var places = {};

  places.list = function() {
    return [
      'us',
      'japan'
    ];
  };

  places.get = function(name) {
    return $http.get('places/' + name + '.json').then(function(res) {
      return res.data;
    });
  };

  places.mergeByDistance = function(places, minArcDistance) {
    places = angular.copy(places); // Make a copy first.
    var d, j, i = places.length;
    while (--i > 0) {
      for (j = i; --j >= 0;) {
        d = d3.geo.distance(places[i].location, places[j].location);
        if (d < minArcDistance) {
          places[j].population += places[i].population;
          places.splice(i, 1);
          break;
        }
      }
    }
    return places;
  };

  return places;
});

data.factory('markers', function($q, $rootScope) {
  var markers = [];

  markers.add = function(place) {
    place = angular.copy(place);
    markers.push(place);
    $rootScope.$broadcast('markerAdded', place);
    return place;
  };
  markers.removeByIndex = function(i) {
    if (i >= 0) {
      var marker = markers.splice(i, 1)[0];
      $rootScope.$broadcast('markerRemoved', marker);
      return marker;
    }
  };
  markers.remove = function(place) {
    markers.removeByIndex(markers.indexOf(place));
  };

  markers.clear = function() {
    for (var i = markers.length; --i >= 0;) {
      markers.removeByIndex(i);
    }
  };

  return markers;
});

}());
