'use strict';

angular.module('myApp.playlist', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/playlist', {
			templateUrl: 'pages/playlist/playlist.html',
			controller: 'PlaylistCtrl',
			controllerAs: 'vm'
		});
	}])

	.controller('PlaylistCtrl', ['playlistService', function(playlistService) {
		var vm = this;

		vm.playlist = playlistService.getPlaylist();

	}]);