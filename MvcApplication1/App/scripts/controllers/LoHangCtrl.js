'use strict';

MyApp
.controller('LoHangCtrl', function ($scope, $timeout, $rootScope, jwtHelper, UserService, $state, $http, datetime, DonHangService, KhoHangService, LoHangService, toaster) {
    $scope.$on('$viewContentLoaded', function () {
        $scope.LoHang = [];

        getDataLohang();

        function getDataLohang() {
            LoHangService.GetAll().then(function (data) {
                $scope.LoHang = data;
                //Loc lo hang thuoc kho dang quan ly
                $scope.LoHang = $scope.LoHang.filter(function (el) {
                    return parseInt(el.idKhoNhan) == $rootScope.currentUser.IdStore && el.cuocVeKho == null;
                });
            }, function () {
                toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
            });
        }
        
        //
        $scope.lohang = {};
        $scope.NhapCuocVeKho = function (lohang) {
            $scope.lohang = lohang;
        }

        $scope.CapNhatCuocVeKho = function () {
            LoHangService.SuaLoHang($scope.lohang.id, $scope.lohang).then(function () {
                $('#cuocvekhorole2').modal('hide');
                getDataLohang();
                toaster.pop('success', "Thông báo", "Đã cập nhật cước về kho thành công");
            }, function () {
                toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
            });


        }

    });
});