'use strict';
/**
 * @ngdoc function
 * @name qlVanChuyenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the qlVanChuyenApp
 */
MyApp
.controller('LoginController', function ($scope, $timeout, $rootScope, jwtHelper,UserService,$state) {
    $scope.$on('$viewContentLoaded', function ()  {
     
    $rootScope.currentUser = {};
    //$rootScope.currentUser.TaiKhoan = "admin";
        //$rootScope.currentUser.MatKhau = "admin";

        //ghi nho mat khau
    var remember = localStorage.getItem('user')||null;
    if (remember!=null) {
        remember = JSON.parse(remember);
        $rootScope.currentUser=remember;
    }

    $scope.Login = function () {
        UserService.login($rootScope.currentUser).then(function (data) {

            //rememner
            if ($rootScope.currentUser.Remember) {
                remember = localStorage.setItem('user',JSON.stringify($rootScope.currentUser));
            } else {
                localStorage.removeItem('user');
            }
            //alert('Token= ' + data);
            window.localStorage.setItem('token', data);
            var dataUser = jwtHelper.decodeToken(data);

            window.localStorage.setItem('currentUser', JSON.stringify(dataUser));
            $state.go("dashboard.home");

        }, function (err) {
            alert('loi ' + JSON.stringify(err))
        })
    };

    $scope.checkkey = function ($event) {
        if ($event.which === 13 || $event.which === 32) $scope.Login();
    }

   });
});