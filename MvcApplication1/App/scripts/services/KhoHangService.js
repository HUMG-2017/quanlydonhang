MyApp.
service("KhoHangService", function ($q, $timeout, $http) {
    var KhoHang = {};

    KhoHang.ThemKhoHang = function (KhoHang) {
        var def = $q.defer();
        $http({
            method: "post",
            url: '/api/KhoHang',
            data: JSON.stringify(KhoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KhoHang.SuaKhoHang = function (idKhoHang, KhoHang) {
        var def = $q.defer();
        $http({
            method: "put",
            url: '/api/KhoHang/' + idKhoHang,
            data: JSON.stringify(KhoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KhoHang.XoaKhoHang = function (IdKhoHang) {
        var def = $q.defer();
        $http({
            method: "delete",
            url: '/api/KhoHang/' + IdKhoHang,
            // data: JSON.stringify(KhoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KhoHang.GetAll = function () {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/KhoHang',
            // data: JSON.stringify(KhoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    KhoHang.GetById = function (IdKhoHang) {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/KhoHang/' + IdKhoHang,
            // data: JSON.stringify(KhoHang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    return KhoHang;
});
//console.log('services user');