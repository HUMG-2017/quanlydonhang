MyApp.
service("LoHangService", function ($q, $timeout, $http) {
    var LoHang = {};


    LoHang.ThemLoHang = function (LoHang) {
        var def = $q.defer();
        $http({
            method: "post",
            url: '/api/LoHang',
            data: JSON.stringify(LoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    LoHang.SuaLoHang = function (idLoHang, LoHang) {
        var def = $q.defer();
        $http({
            method: "put",
            url: '/api/LoHang/' + idLoHang,
            data: JSON.stringify(LoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    LoHang.XoaLoHang = function (IdLoHang) {
        var def = $q.defer();
        $http({
            method: "delete",
            url: '/api/LoHang/' + IdLoHang,
            // data: JSON.stringify(LoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    LoHang.GetAll = function () {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/LoHang',
            // data: JSON.stringify(LoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    LoHang.GetById = function (IdLoHang) {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/LoHang/' + IdLoHang,
            // data: JSON.stringify(LoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    return LoHang;
});
//console.log('services user');