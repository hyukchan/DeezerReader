'use strict';

angular.module('myApp')

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/artist/:id', {
			templateUrl: 'pages/artist/artist-details.html',
			controller: 'ArtistDetailsCtrl',
			controllerAs: 'vm'
		});
	}])
	.controller('ArtistDetailsCtrl',
		['$routeParams', 'searchService', '$scope', 'playlistService', 'uiGridConstants',
			function ($routeParams, searchService, $scope, playlistService, uiGridConstants) {

		var vm = this;

		vm.selectedTracks = [];

		var columns = [
			{ field: 'title' },
			{ field: 'duration', width: '120', cellFilter: 'duration'},
			{ field: 'rank', width: '120', sort: {
				direction: uiGridConstants.DESC,
				priority: 0
			}}];

		vm.gridOptions = {
			data: vm.tracks,
			columnDefs: columns,
			enableRowHeaderSelection: false,
			multiSelect: true,
			enableRowSelection: true
		};

		var artistId = $routeParams.id;

		searchService.searchArtistTracks(artistId, 10)
			.then(function (response) {
				vm.tracks = response.data.data;
				vm.gridOptions.data = vm.tracks;
				vm.artist = vm.tracks[0].contributors.find(function(_artist) {
					return _artist.id == artistId;
				});
			}, function (error) {
				console.log(error);
			});

		vm.gridOptions.onRegisterApi = function(gridApi){
			//set gridApi on scope
			vm.gridApi = gridApi;
			gridApi.selection.on.rowSelectionChanged($scope, function(row){
				if(row.isSelected) {
					vm.selectedTracks.push(row.entity);
				} else {
					vm.selectedTracks = vm.selectedTracks.filter(function(track) {
						return track.id != row.entity.id;
					});
				}
			});
		};

		vm.addToPlaylist = function () {
			if (vm.selectedTracks.length < 1) {
				return;
			}

			playlistService.addTracks(vm.selectedTracks);
			vm.gridApi.selection.clearSelectedRows();
			vm.selectedTracks = [];
		}
	}]);