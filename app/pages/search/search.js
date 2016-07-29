'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'pages/search/search.html',
            controller: 'SearchController',
            controllerAs: 'vm'
        });
    }])

    .controller('SearchController', ['searchService', function (searchService) {
        var vm = this;

        var lastSearch;

        vm.nbItemsPerPage = '6';

        vm.submitForm = submitForm;
        vm.onPageChange = onPageChange;

        function submitForm(isValid) {
            if (isValid) {
                onSearch();
            }
        }

        /**
         * Search Input On Change Callback
         */
        function onSearch() {
            lastSearch = vm.searchText;
            search(lastSearch, 0, vm.nbItemsPerPage);
            vm.currentPage = 1;
        }

        function onPageChange(page) {
            vm.currentPage = page;
            search(lastSearch, (vm.currentPage - 1) * vm.nbItemsPerPage, vm.nbItemsPerPage);
        }

        function search(name, index, limit) {
            searchService.searchArtists(name, index, limit).then(function (response) {
                vm.artists = response.data.data;
                vm.nbTotalArtists = response.data.total;
            }, function (error) {
                console.log(error);
            });
        }
    }]);