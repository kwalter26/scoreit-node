var app = angular.module('scoreitApp',['ngRoute'])

// router
app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
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
  }]);


app.controller('logout',function($scope,$window){
    $window.location.href = '/auth/logout';
});


app.controller('dashboardController',['$scope',function($scope){
    $scope.title = 'Dashboard';
}]);

app.controller('leagueController',['$scope',function($scope){
    $scope.title = 'League';
}]);
