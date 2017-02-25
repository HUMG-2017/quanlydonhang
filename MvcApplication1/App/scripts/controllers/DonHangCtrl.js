'use strict';

MyApp
.controller('DonHangCtrl', function ($scope, $timeout, $rootScope, jwtHelper, UserService, $state, $http, datetime) {
    $scope.$on('$viewContentLoaded', function () {
        //init tooltip
        $("[data-toggle=tooltip]").tooltip();

        //box LoHang setup
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

        

        var Role = $rootScope.currentUser.Role;
        switch (Role) {
            case '0':
                // Khoi tao
                $scope.ListDonHangRole0 = [];
                //Role 0 init test
                for (var i = 0; i < 5; i++) {
                    var donhang = {};
                    donhang.TenKhach = "Nguyen tien lam";
                    donhang.TenHang = "Iphone 7 Plus";
                    donhang.GiaSP = "5000000";
                    donhang.DatCoc = "2000000";
                    donhang.GiaSPCanThu = "3000000";
                    donhang.Id = i;
                    $scope.ListDonHangRole0.push(donhang);
                };

                //Tinh gia san pham can thu
                $scope.TinhGiaSPCanThu = function () {
                    $scope.donhang.GiaSPCanThu = $scope.donhang.GiaSP - $scope.donhang.DatCoc;
                };
                break;
            case '1':
                $scope.ListDonHangRole1 = [];
                //Role 1 init test
                for (var i = 0; i < 5; i++) {
                    var donhang = {};
                    donhang.TenKhach = "Nguyen tien lam";
                    donhang.TenHang = "Iphone 7 Plus";
                    donhang.GiaSP = "5000000";
                    donhang.DatCoc = "2000000";
                    donhang.GiaSPCanThu = "3000000";
                    donhang.Id = i;
                    $scope.ListDonHangRole1.push(donhang);
                };

                //Role 1 tao lo hang
                $scope.LoHang = [];
                $scope.CacheIndexLoHang = [];
                //Role 1 add don hang vao lo hang
                $scope.addDonHangVaoLoHang = function (dh) {
                    var id = dh.Id;
                    if (!dh.select) {
                        if ($scope.CacheIndexLoHang.indexOf(id) == -1) {
                            $scope.LoHang.push(dh);
                            $scope.CacheIndexLoHang.push(id);
                        }
                    } else {
                        var getId = $scope.CacheIndexLoHang.indexOf(id);
                        $scope.LoHang.splice(getId, 1);
                        $scope.CacheIndexLoHang.splice(getId, 1);
                    }
                    console.log($scope.LoHang.length);
                }
                //

                break;
            case '2':
                //Role 2 init
                $scope.ListDonHangRole2 = [];
                //Role 1 init test
                for (var i = 0; i < 5; i++) {
                    var donhang = {};
                    donhang.TenKhach = "Nguyen tien lam";
                    donhang.TenHang = "Iphone 7 Plus";
                    donhang.GiaSP = "5000000";
                    donhang.DatCoc = "2000000";
                    donhang.GiaSPCanThu = "3000000";
                    donhang.Id = i;
                    $scope.ListDonHangRole2.push(donhang);
                };
                break;
        }


        
       
    });
});