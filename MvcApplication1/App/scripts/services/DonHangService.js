MyApp.
service("DonHangService", function ($q, $timeout, $http) {
    var DonHang = {};


    DonHang.ThemDonHang = function (donhang) {
        var def = $q.defer();
        $http({
            method: "post",
            url: '/api/donhang',
            data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    DonHang.SuaDonHang = function (IdDonHang,donhang) {
        var def = $q.defer();
        $http({
            method: "put",
            url: '/api/donhang/' + IdDonHang,
            data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    DonHang.XoaDonHang = function (IdDonHang) {
        var def = $q.defer();
        $http({
            method: "delete",
            url: '/api/donhang/' + IdDonHang,
           // data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    DonHang.GetAll = function () {
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

    DonHang.GetById = function (IdDonHang) {
        var def = $q.defer();
        $http({
            method: "get",
            url: '/api/donhang/' + IdDonHang,
            // data: JSON.stringify(donhang),
        }).success(function (data) {
            def.resolve(data);
        })
        .error(function (err) {
            def.reject(err);
        });
        return def.promise;
    }

    return DonHang;
});
//console.log('services user');