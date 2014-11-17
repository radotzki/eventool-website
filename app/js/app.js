'use strict';

angular.module('myApp', ['photoLibrary'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $location) {
	$location.html5Mode(true).hashPrefix('!');

	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	})
	.otherwise({redirectTo: '/home'});
}])