'use strict';

angular.module('myApp')
	.service('playlistService', ['$rootScope', function($rootScope) {
		var self = this;
		self.playlist = [];

		self.addTracks = function (tracks) {
			tracks.forEach(function(track) {
				self.addTrack(track);
			});

			$rootScope.$broadcast('playlist-update');
		};

		self.addTrack = function (track) {
			var alreadyExist = self.playlist.find(function(_track) {
				return _track.id === track.id;
			});

			if (!alreadyExist) {
				self.playlist.push(track);
			}
		};

		self.removeTrack = function (trackId) {
			self.playlist = self.playlist.filter(function(_track) {
				return _track.id !== trackId;
			});

			$rootScope.$broadcast('playlist-update');
		};

		self.getPlaylist = function () {
			return self.playlist;
		};

	}]);