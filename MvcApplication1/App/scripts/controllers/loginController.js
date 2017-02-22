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

    $scope.Login = function () {
        UserService.login($rootScope.currentUser).then(function (data) {
            //alert('Token= ' + data);
            window.localStorage.setItem('token', data);
            var dataUser = jwtHelper.decodeToken(data);
            
            window.localStorage.setItem('currentUser', JSON.stringify(dataUser));
            $state.go("dashboard.home");

        }, function (err) {
            alert('loi ' + JSON.stringify(err))
        })
    }

    $rootScope.Logout = function () {
        window.localStorage.clear();
        $state.go('login');
    }

   });
});