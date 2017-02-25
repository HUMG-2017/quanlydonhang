'use strict';

MyApp
.controller('DonHangCtrl', function ($scope, $timeout, $rootScope, jwtHelper, UserService, $state, $http, datetime) {
    $scope.$on('$viewContentLoaded', function () {
        //init modal
        $("[data-toggle=tooltip]").tooltip();

        //boxLoHang
        $scope.showBox = true;
        $scope.direct = "down";
        $scope.showHideBox = function ($event) {
            
            if ($scope.showBox) {
                $scope.direct = "up";
                $scope.showBox = false;
                return;
            }
            $scope.direct = "down";
            $scope.showBox = true;
        };

        $scope.birthDate = {}; $scope.birthDate.date = new Date();

        // Khoi tao
        $scope.ListDonHangRole0 = [];
        var donhang = {};
        $scope.donhang = {};

        $scope.TinhGiaSPCanThu = function () {
            $scope.donhang.GiaSPCanThu = $scope.donhang.GiaSP - $scope.donhang.DatCoc;
        };
        

        donhang.TenKhach = "Nguyen tien lam";
        donhang.TenHang = "Iphone 7 Plus";
        donhang.GiaSP = "5000000";
        donhang.DatCoc = "2000000";
        donhang.GiaSPCanThu = "3000000";
        $scope.ListDonHangRole0.push(donhang);
        $scope.ListDonHangRole0.push(donhang);
        $scope.ListDonHangRole0.push(donhang);

        //
        // Create a parser
        //$scope.myDate = new Date();

    });
});