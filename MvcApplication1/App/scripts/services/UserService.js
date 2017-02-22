MyApp.
service("UserService", function ($q,$timeout,$http) {
    var User = {};
    User.login = function (user) {
        var def = $q.defer();
        $http({
            method: "post",
            url: '/api/dangnhap',
            data: JSON.stringify(user),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }
    return User;
});
//console.log('services user');