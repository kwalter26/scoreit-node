var app = angular.module('scoreitApp',['ngRoute']);

// router
app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/',{
        templateUrl: '/page/dashboard',
        controller: 'dashboardController'
      })
      .when('/league',{
        templateUrl: 'page/league',
        controller: 'leagueController'
      })
      .when('/admin',{
        templateUrl: 'page/admin',
        controller: 'adminController'
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

app.controller('adminController',['$scope','$http',function($scope,$http){
  $scope.title = 'Admin Dashbaord';
  $scope.users = [];

  $scope.getUsers = function(){
    $http({
      method: 'GET',
      url: '/api/user'
    }).then(function successCallback(response){
      console.log(response);
      console.log(response.error);
      $scope.users = response.data.users;
    }, function errorCallback(response){
      console.log(response)
    });
  };

  $scope.init = function(){
    $scope.getUsers();
  };
}]);
