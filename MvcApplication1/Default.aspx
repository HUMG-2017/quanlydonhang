<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MvcApplication1.Default" %>

<!DOCTYPE html>

<html class="no-js" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title ng-bind="$state.current.data.pageTitle">Quản Lý Đơn Hàng</title>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="App/bower_components/bootstrap/dist/css/bootstrap.min.css" />
    <!-- endbower -->
    <!-- endbuild -->
    
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="App/styles/main.css">
    <link rel="stylesheet" href="App/styles/sb-admin-2.css">
    <link rel="stylesheet" href="App/styles/timeline.css">
    <link rel="stylesheet" href="App/bower_components/metisMenu/dist/metisMenu.min.css">
    <link rel="stylesheet" href="App/bower_components/angular-loading-bar/build/loading-bar.min.css">
    <link rel="stylesheet" href="App/bower_components/font-awesome/css/font-awesome.min.css" type="text/css">
   <!-- endbuild -->
    
    <!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script src="App/bower_components/jquery/dist/jquery.min.js"></script>
    <script src="App/bower_components/angular/angular.js"></script>
    <script src="App/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="App/bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="App/bower_components/json3/lib/json3.min.js"></script>
    <script src="App/bower_components/oclazyload/dist/ocLazyLoad.min.js"></script>
    <script src="App/bower_components/angular-loading-bar/build/loading-bar.min.js"></script>
    <script src="App/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="App/bower_components/metisMenu/dist/metisMenu.min.js"></script>
    <script src="App/bower_components/Chart.js/Chart.min.js"></script>
    <script src="App/bower_components/angular-jwt/dist/angular-jwt.min.js"></script>
    <%--<script src="App/bower_components/angular-paging/paging.min.js"></script>--%>
    <%--<script src="App/bower_components/angular-scroll/taggedInfiniteScroll.js"></script>--%>
    <script src="App/js/vi_vn.js"></script>
  
    <script src="App/bower_components/angular-input-masks/angular-input-masks-standalone.min.js"></script>
    <script src="App/bower_components/custom-input/dist/custom-input.js"></script>
    <script src="App/bower_components/angular-datetime-input/dist/datetime.js"></script>
    <!-- endbower -->
    <!-- endbuild -->
    
    <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="App/scripts/app.js"></script>
        <script src="App/scripts/services/UserService.js"></script>
        <script src="App/js/sb-admin-2.js"></script>
    <!-- endbuild -->


    <!-- Custom CSS -->

    <!-- Custom Fonts -->

    <!-- Morris Charts CSS -->
    <!-- <link href="styles/morrisjs/morris.css" rel="stylesheet"> -->
</head>
<body>
    <!--<form id="form1" runat="server">-->
    <div ng-app="qlVanChuyenApp">

        <div ui-view></div>

    </div>
    <!-- </form>-->
</body>
</html>
