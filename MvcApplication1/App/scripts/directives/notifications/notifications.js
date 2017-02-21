'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('qlVanChuyenApp')
	.directive('notifications',function(){
		return {
		    templateUrl: 'App/scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


