'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('qlVanChuyenApp')
	.directive('timeline',function() {
    return {
        templateUrl:'App/scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
