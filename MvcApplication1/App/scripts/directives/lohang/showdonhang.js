'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('qlVanChuyenApp')
  .directive('showDonhang', function () {
      return {
          templateUrl: 'App/scripts/directives/lohang/showdonhang.html',
          restrict: 'E',
          replace: true,
          scope: {
              mangDonhang: '=mangDonhang', //fields truyen vao trong attr html
          },
          controller: function ($scope, DonHangService) {
             var  arrDonHang = $scope.mangDonhang.split(';');
              $scope.infoDonHang = [];
              if (arrDonHang.length > 0) {
                  for (var i in arrDonHang) {
                      DonHangService.GetById(arrDonHang[i]).then(function (data) {
                          $scope.infoDonHang = $scope.infoDonHang.concat(data);
                      }, function () {
                          alert('err')
                      });
                  }
              }
          }

      }
  });