
'use strict';

angular.module('LeelaApp.MainView', ['ngRoute', 'leela'])

.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
            templateUrl: 'static/templates/main_view.html',
            controller: 'MainCtrl'
      });
}])

.controller('MainCtrl', ['$scope', 'leela', function($scope,leela) {
    // this is example code block... feel free for remove it
    //
    $scope.uname = {}

    leela.get('uname')
     .success(function(data) {
	$scope.uname = data;
	console.log(data);
     })
     .error(function(data) {
	alert('Get uname failed: ' + data);
     })
    // end of example

    // TODO: Write your javascript code here

}]);
