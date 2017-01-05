angular.module('scoreitApp',['ngRoute'])
  .config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/',{
        templateUrl: '/page/dashboard',
        controller: 'dashboardController'
      })
      .when('/leagues',{
        templateUrl: 'page/league',
        controller: 'leagueController'
      })
      .when('/logout',{
        templateUrl: '',
        controller: 'logout'
      });
    $locationProvider.html5Mode(true);
  }])
  .controller('logout',function($scope,$window){
    $window.location.href = '/auth/logout';
  });
