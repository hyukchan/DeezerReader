angular.module('myApp')
    .directive('artist', function() {
        return {
            restrict: 'E',
            scope: {
                artist: '='
            },
            templateUrl: '/components/artist/artist-vignette.html'
        };
    });