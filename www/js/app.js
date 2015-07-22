
'use strict';

// Declare app level module which depends on views, and components
angular.module('LeelaApp', [
    'ngRoute',
    'LeelaApp.MainView',
]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
