'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('qlVanChuyenApp')
	.directive('chat',function(){
		return {
		    templateUrl: 'App/scripts/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});


