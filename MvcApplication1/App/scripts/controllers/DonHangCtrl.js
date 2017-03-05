'use strict';

MyApp
.controller('DonHangCtrl', function ($scope, $timeout, $rootScope, jwtHelper, UserService, $state, $http, datetime, DonHangService, KhoHangService, LoHangService, toaster) {
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

        /////////
        $scope.filterDH = {};

       
        //Lay danh sach kho hang
        $scope.DSKhoHang = [];
        KhoHangService.GetAll().then(function (data) {
            $scope.DSKhoHang = data;
            //toaster.pop('success', "Thông báo", "thành công");
            //call data again
            //GetDanhSachDonHang();
        }, function () {
            toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
        });

        //init
        GetDanhSachDonHang();

        //Lay danh sach don hang
        function GetDanhSachDonHang() {
            DonHangService.GetAll().then(function (data) {
                var Role = $rootScope.currentUser.Role;
                switch (Role) {
                    case '0':
                        // Khoi tao
                        $scope.ListDonHangRole0 = [];
                        //Role 0 init test
                        $scope.ListDonHangRole0 = data;

                        //Tinh gia san pham can thu
                        $scope.TinhGiaSPCanThu = function () {
                            $scope.donhang.giaSPCanThu = $scope.donhang.giaSP - $scope.donhang.datCoc;
                        };

                        //Tinh gia san pham can thu khi sua
                        $scope.TinhGiaSPCanThu2 = function () {
                            $scope.donhangsua.giaSPCanThu = $scope.donhangsua.giaSP - $scope.donhangsua.datCoc;
                        };

                        //Them moi don hang
                        $scope.donhang = {};
                        $scope.donhang.ngayDatHang = new Date();
                        $scope.donhang.soLuong = 1;
                        $scope.donhang.trangThaiDonHang = 0;
                        $scope.ThemMoiDonHang = function () {
                            DonHangService.ThemDonHang($scope.donhang).then(function () {
                                $('#themmoirole0').modal('hide');
                                toaster.pop('success', "Thông báo", "Thêm đơn hàng thành công");
                                //call data again
                                GetDanhSachDonHang();
                            }, function () {
                                toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
                            });
                        };

                        //Chon don hang de sua
                        $scope.ChonDonHangSua = function (donhang) {
                            donhang.ngayDatHang = moment(donhang.ngayDatHang)._d;
                            $scope.donhangsua = {};
                            $scope.donhangsua = donhang;
                            //Cap nhat don hang
                            $scope.CapNhatDonHang = function () {

                                //Chinh lai thoi gian ve GTM-7 khi submit len server +7
                                //var parser = datetime("dd/MM/yyyy");
                                //parser.setDate($scope.donhangsua.ngayDatHang);
                                //parser.setTimezone("-0700");
                                //$scope.donhangsua.ngayDatHang = parser.getDate();

                                DonHangService.SuaDonHang($scope.donhangsua.id, $scope.donhangsua).then(function () {
                                    $('#suarole0').modal('hide');
                                    toaster.pop('success', "Thông báo", "Sửa đơn hàng thành công");
                                    //call data again
                                    GetDanhSachDonHang();
                                }, function () {
                                    toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
                                });
                            };
                        };

                        //Set ID Don hang can xoa
                        $scope.IdDonHangCanXoa = null;
                        $scope.SetIdDonHangCanXoa = function (idDonHang) {
                            $scope.IdDonHangCanXoa = idDonHang;
                        }
                        //Xoa don hang
                        $scope.DongYXoaDonHang = function () {
                            DonHangService.XoaDonHang($scope.IdDonHangCanXoa).then(function () {
                                $('#xoarole0').modal('hide');
                                toaster.pop('success', "Thông báo", "Xóa đơn hàng thành công");
                                //call data again
                                GetDanhSachDonHang();
                            }, function () {
                                toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
                            });
                        }

                        break;
                    case '1':
                        $scope.ListDonHangRole1 = [];
                        //Role 0 init test
                        $scope.ListDonHangRole1 = data;
                        //Loc cac don hang co trang thai =0
                        $scope.ListDonHangRole1=$scope.ListDonHangRole1.filter(function (el) {
                            return el.trangThaiDonHang==0;
                        });
                        //Role 1 tao lo hang
                        $scope.LoHang = [];
                        $scope.CacheIndexLoHang = [];
                        //Role 1 add don hang vao lo hang
                        $scope.addDonHangVaoLoHang = function (dh) {
                            var id = dh.id;
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
                        };

                        //Tao lo hang
                        $scope.TaoLoHang = function (cuocLoBien) {
                            if (!cuocLoBien) {
                                toaster.pop('error', "Lỗi!", "Chưa nhập cước lô biên");
                                return;
                            }
                            //Mang luu lo hang tong
                            var arrLoHangTong = [];
                            //Tao lo hang tong
                            var IdDonHangStrings = $scope.CacheIndexLoHang.join(';');
                            var lohang = {};
                            lohang.ListIdDonHang = IdDonHangStrings;
                            lohang.CuocQuaBien = cuocLoBien;
                            lohang.NguoiChuyenBien = $rootScope.currentUser.TaiKhoan;
                            //lohang.idKhoNhan = $rootScope.currentUser.IdStore;
                            lohang.LoaiLo = 1;
                            lohang.ThoiGian = new Date();
                            arrLoHangTong.push(lohang);

                            //Lay danh sach lo hang cap 2
                            var arrIdLoHangCap2 = $scope.DSKhoHang.filter(function (el) {
                                return el.capKho == 2;
                            });

                            var arrIdDonHang = new Array(arrIdLoHangCap2.length);
                            var arrIdKhoHangLoHangCon = [];
                            //them thong tin id kho hang vao lo hang con
                            for (var i = 0 ; i < arrIdLoHangCap2.length; i++) {
                                var idKH = arrIdLoHangCap2[i].id.toString();
                                arrIdKhoHangLoHangCon.push(idKH);
                                arrIdDonHang[i] = [];
                            }

                            //Luu cac id cung lo hang vao mang
                            for (var i in $scope.LoHang) {
                                var idKhoHang = $scope.LoHang[i].khoHangNhan.toString();
                                var idDonHang = $scope.LoHang[i].id.toString();
                                var index = arrIdKhoHangLoHangCon.indexOf(idKhoHang);
                                if (index != -1) {
                                    arrIdDonHang[index].push(idDonHang);
                                }
                            };

                            //Lay danh sach cac kho hang con
                            var arrLoHangCon = [];
                            for (var i in arrIdDonHang) {
                                if (arrIdDonHang[i].length > 0) {
                                    //tao lo hang con
                                    var lohang = {};
                                    lohang.ListIdDonHang = arrIdDonHang[i].join(";");
                                    lohang.NguoiChuyenBien = $rootScope.currentUser.TaiKhoan;
                                    lohang.LoaiLo = 2;
                                    lohang.idKhoNhan = parseInt(arrIdKhoHangLoHangCon[i]);
                                    //console.log('idkhohangnhan: ' + arrIdKhoHangLoHangCon[i]);
                                    lohang.ThoiGian = new Date();
                                    arrLoHangCon.push(lohang);
                                }
                            };

                            //Ghep lo hang con va lo hang tong
                            var LoHangConCat = arrLoHangCon.concat(arrLoHangTong);

                            //Luu lo hang
                            LoHangService.ThemLoHang(LoHangConCat).then(function () {
                                toaster.pop('success', "Thông báo", "Thêm lô hàng thành công");
                                //reset lo
                                $scope.LoHang = [];
                                $scope.CacheIndexLoHang = [];
                                //cal data
                                GetDanhSachDonHang();
                            }, function () {
                                toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
                            });

                            //Cap nhat cac thong tin don hang: trangthaidonhang,nguoinhancuoi,khohangcuoi,khohangnhan
                            for (var i in $scope.LoHang) {
                                var donhang = $scope.LoHang[i];
                                donhang.trangThaiDonHang = 1;
                                donhang.nguoiNhanCuoi = $rootScope.currentUser.TaiKhoan;
                                donhang.khoHangCuoi = $rootScope.currentUser.IdStore;// Tam thoi test
                                DonHangService.SuaDonHang(donhang.id, donhang).then(function () {
                                    //$('#suarole0').modal('hide');
                                    toaster.pop('success', "Thông báo", "Sửa đơn hàng thành công");
                                    //call data again
                                    //GetDanhSachDonHang();
                                }, function () {
                                    //toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
                                });
                            }
                        }

                        //Chon lai kho nhan
                        $scope.updateSelected = function (donhang) {
                            donhang.khoHangNhan = donhang.khoHangNhan2;
                        }

                        break;
                    case '2':
                        //Role 2 init
                        $scope.ListDonHangRole2 = [];
                        $scope.ListDonHangRole2 = data;
                        //Loc cac don hang co trang thai = 1 va kho hang nhan == kho hang user quan ly
                        $scope.ListDonHangRole2 = $scope.ListDonHangRole2.filter(function (el) {
                            return el.trangThaiDonHang == 1 && el.khoHangNhan == $rootScope.currentUser.IdStore;
                        });
                        $scope.donhang = {};
                        //Chon don hang can xu ly
                        $scope.ChonDonHang = function (donhang) {
                            donhang.ngayDatHang = new Date(donhang.ngayDatHang);
                            $scope.donhang = donhang;
                        };

                        //Xu ly don hang
                        $scope.XuLyDonHang = function () {
                            //cap nhat lai don hang
                            $scope.donhang.trangThaiDonHang = 2;
                            $scope.donhang.nguoiNhanCuoi = $rootScope.currentUser.TaiKhoan;
                            $scope.donhang.khoHangCuoi = $rootScope.currentUser.IdStore;// Tam thoi test
                            DonHangService.SuaDonHang($scope.donhang.id, $scope.donhang).then(function () {
                                $('#xulyrole2').modal('hide');
                                toaster.pop('success', "Thông báo", "Xử lý đơn hàng thành công");
                                //call data again
                                GetDanhSachDonHang();
                            }, function () {
                                toaster.pop('error', "Thông báo", "Đã xảy ra lỗi");
                            });
                        }
                        break;
                }

            }, function (err) {
                alert(err)
            });

        };


    });
});