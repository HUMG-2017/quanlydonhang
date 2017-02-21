'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('qlVanChuyenApp')
	.directive('header',function(){
		return {
		    templateUrl: 'App/scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


