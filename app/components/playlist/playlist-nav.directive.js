'use strict';

angular.module('myApp')
	.directive('playlistNav', ['$rootScope', 'playlistService', 'ngAudio', function($rootScope, playlistService, ngAudio) {
		return {
			restrict: 'E',
			templateUrl: 'components/playlist/playlist-nav.html',
			link: link,
			replace: true
		};

		function link(scope, element, attrs) {
			var audioList = [];
			scope.lastAudioPlaying = false;

			$rootScope.$on('playlist-update', function(event, args) {
				scope.playlist = playlistService.getPlaylist();
				loadAudio();
			});

			scope.removeTrack = function (trackId) {
				var index = scope.playlist.findIndex(function(_track) {
					return _track.id === trackId;
				});
				if( index > -1) {
					audioList[index].stop();
					scope.lastIndex = -1;
					audioList.splice(index, 1);
				}
				playlistService.removeTrack(trackId);
			};

			function loadAudio() {
				audioList.forEach(function(audio) {
					audio.stop();
				});
				audioList = [];

				scope.playlist.forEach(function(track) {
					audioList.push(ngAudio.load(track.preview));
				});
			}

			scope.playTrack = function (index) {
				scope.lastIndex = index;
				if (scope.lastAudio && scope.lastAudio.id === audioList[index].id) {
					if (scope.lastAudioPlaying) {
						scope.lastAudio.pause();
						scope.lastAudioPlaying = false;
					} else {
						scope.lastAudio.play();
						scope.lastAudioPlaying = true;
					}

					return;
				}

				if (scope.lastAudio) {
					scope.lastAudio.pause();
				}
				audioList[index].play();
				scope.lastAudio = audioList[index];
				scope.lastAudioPlaying = true;
			}
		}
	}]);