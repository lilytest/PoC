'use strict';

angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'myApp.controllers',
    'myApp.services'
]).
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/login', {templateUrl: 'view/login.html', controller: 'AuthCtrl'});
	$routeProvider.when('/login/:uname/:pass', {templateUrl: 'view/welcome.html', controller: 'AuthCtrl'});
	$routeProvider.when('/login/:drId', {templateUrl: 'view/welcome.html', controller: 'SuccessCtrl'});
	$routeProvider.when('/patient/:pId', {templateUrl: 'view/details.html', controller: 'patientCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
}]);