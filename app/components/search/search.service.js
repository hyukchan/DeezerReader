'use strict';

angular.module('myApp')

    .service('searchService', ['$http', function ($http) {

        /**
         * Search Artists
         * @param name artist's name
         * @param index index of the page
         * @param limit number of elements to get
         * @returns {HttpPromise}
         */
        this.searchArtists = function searchArtists(name, index, limit) {
            var urlIndex = (typeof index === 'undefined') ? '' : '&index=' + index;
            var urlLimit = (typeof limit === 'undefined') ? '' : '&limit=' + limit;

            return $http.jsonp('https://api.deezer.com/search/artist?q=' + name + urlIndex + urlLimit);
        };

        this.searchArtistTracks = function searchArtistTracks(artistId, limit) {
            var urlLimit = (typeof limit === 'undefined') ? '' : '&limit=' + limit;

            return $http.jsonp('https://api.deezer.com/artist/' + artistId + '/top' + urlLimit);
        };
    }]);