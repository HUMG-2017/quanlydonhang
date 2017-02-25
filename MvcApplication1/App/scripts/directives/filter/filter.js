'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('qlVanChuyenApp')
  .directive('filterSearch', function () {
      return {
          templateUrl: 'App/scripts/directives/filter/filter.html',
          restrict: 'E',
          replace: true,
          scope: {
              fields: '=fields', //fields truyen vao trong attr html
              filterSelect: '=filterSelect' ////filterSelect gia tri can lay ra trong attr html
          },
          controller: function ($scope) {
              $scope.FilterHtml = {};
              $scope.FilterHtml.label = "Chọn lọc";
              $scope.FilterHtml.fields = $scope.fields;
              $scope.FilterHtml.fields.unshift(null);
              $scope.FilterHtml.changeFilter = function (item) {
                  if(!item){
                      $scope.filterSelect = null;
                      $scope.FilterHtml.label = "Tất cả";
                      return $scope.filterSelect;
                  }
                  $scope.filterSelect = item;
                  $scope.FilterHtml.label = item;
                  return $scope.filterSelect;
              }
             
          }

      }
  });