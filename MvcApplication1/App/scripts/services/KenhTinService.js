MyApp.
service("KenhTinService", function ($q, $timeout, $http) {
    var KenhTin = {};


    KenhTin.ThemKenhTin = function (kenhtin) {
        var def = $q.defer();
        $http({
            method: "post",
            url: '/api/donhang',
            data: JSON.stringify(kenhtin),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KenhTin.SuaKenhTin = function (IdKenhTin, donhang) {
        var def = $q.defer();
        $http({
            method: "put",
            url: '/api/donhang/' + IdKenhTin,
            data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KenhTin.XoaKenhTin = function (IdKenhTin) {
        var def = $q.defer();
        $http({
            method: "delete",
            url: '/api/donhang/' + IdKenhTin,
            // data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KenhTin.GetAll = function () {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/donhang/getall',
            // data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KenhTin.GetById = function (IdKenhTin) {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/donhang/' + IdKenhTin,
            // data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    return KenhTin;
});
//console.log('services user');