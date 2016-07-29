'use strict';

angular.module('myApp')
    .directive('searchPagination', function() {
        return {
            restrict: 'E',
            scope: {
                nbTotalItem: '=',
	            currentPage: '=',
	            limit: '=',
	            onPageChange: '&'
            },
            templateUrl: '/components/search/search-pagination.html',
            link: link
        };

        function link(scope, element, attrs) {
	        scope.getPageArray = function getPageArray() {
		        scope.pageArray = new Array(Math.ceil(scope.nbTotalItem / scope.limit));
	        	return scope.pageArray;
	        };

	        scope.setCurrentPage = function setCurrentPage(page) {
	        	if (page < 1) {
	        		page = 1;
		        }

		        if (page > scope.pageArray.length) {
		        	page = scope.pageArray.length;
		        }

	        	scope.onPageChange({'page': page});
	        }
        }
    });