'use strict';
/**
 * @ngdoc overview
 * @name qlVanChuyenApp
 * @description
 * # qlVanChuyenApp
 *
 * Main module of the application.
 */
var MyApp = angular
  .module('qlVanChuyenApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'angular-jwt',
  ]);

/*custom respone*/
MyApp.factory("baseInterceptor", ["$q", "$injector", function ($q, $injector) {
    return {
        'request': function (config) {
            //console.info(config);
            var token = localStorage.getItem("token");
            config.headers = {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Credentials' : 'true',
                'Authorization' :"Bearer " +  token,
            };
            //set timeout for all request
            config.timeout = 5000;
            return config;
        },
        'requestError': function (rejection) {
            //console.info(rejection);
            //return $q.reject(rejection);
        },
        'response': function (response) {
            //console.log("~~interceptor response success~~");
           // console.log(response);
           // console.log(response.status);
           // console.log(response.config.url);
            return response;
        },
        'responseError': function (rejection) {
           // console.log("~~interceptor response error~~");
            //console.log(rejection);
            //console.log(rejection.status);
            //get new token
            //using service #
            //var getToken = $injector.get('getToken');
            //if(rejection.status === 401){
            //    getToken().then(function(){
            //        window.location.reload(true);
            //    })
            //}
            return $q.reject(rejection);
        }
    };
}]);

MyApp.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("baseInterceptor");
}]);

MyApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'App/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'qlVanChuyenApp',
                    files:[
                    'App/scripts/directives/header/header.js',
                    'App/scripts/directives/header/header-notification/header-notification.js',
                    'App/scripts/directives/sidebar/sidebar.js',
                    'App/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files: ["App/bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "App/bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files: ['App/bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files: ['App/bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files: ['App/bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files: ['App/bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files: ['App/bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl: 'App/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'qlVanChuyenApp',
              files:[
              'App/scripts/controllers/main.js',
              //'App/scripts/directives/timeline/timeline.js',
              'App/scripts/directives/notifications/notifications.js',
              'App/scripts/directives/chat/chat.js',
              //'App/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
          templateUrl: 'App/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
          templateUrl: 'App/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
          templateUrl: 'App/views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
          templateUrl: 'App/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'App/bower_components/angular-chart.js/dist/angular-chart.min.js',
                'App/bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'qlVanChuyenApp',
                files: ['App/scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
          templateUrl: 'App/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl: 'App/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
          templateUrl: 'App/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
          templateUrl: 'App/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
          templateUrl: 'App/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
          templateUrl: 'App/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
          templateUrl: 'App/views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    
//Run programe
MyApp.run(function (jwtHelper, $rootScope, $http, $state, $timeout) {
    $rootScope.$on('$stateChangeStart',
            function (e, toState, toParams, fromState, fromParams) {
                //alert(JSON.stringify(toState))
        if ((toState.name === "register") ) {
            event.preventDefault();
            //dc
        }else{
            if (toState.name === "login") {
                alert('dang o login');
                return;
            };
            //Kiem tra token 
            var token = window.localStorage.getItem('token'); alert(token)
            if (!token) {
                //alert('login')
                //$state.go('login', {}, { reload: true });
                window.location.href = "http://localhost:1108/Default.aspx#/login";
                return;
            }
            var isTokenExpired = jwtHelper.isTokenExpired(token);
            if (isTokenExpired) {
                login();
                return;
            }
        }
        
    });
    
});