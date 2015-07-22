
'use strict';

angular.module('LeelaApp.MainView', ['ngRoute', 'leela'])

.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
            templateUrl: 'static/templates/main_view.html',
            controller: 'MainCtrl'
      });
}])

.controller('MainCtrl', [function(leela) {

    // Write your javascript code here

}]);
