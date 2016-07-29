'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.search',
    'myApp.playlist',
    'myApp.version',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.selection',
    'ngAudio'
]).service('JsonpInterceptor', [function() {
   this.request = function (config) {
       if (config.url.startsWith('https://api.deezer.com')) {
           config.url = config.url + '&output=jsonp&callback=JSON_CALLBACK';
       }
       return config;
   }
}]).config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/'});

    /*
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-type";
    $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = "GET";
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    */

    $httpProvider.interceptors.push('JsonpInterceptor');
}]);
