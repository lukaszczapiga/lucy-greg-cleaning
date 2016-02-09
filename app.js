var app = angular.module('stronka', ['ngRoute', 'ui.map', 'ui.bootstrap', 'ngSocial', 'ezfb', 'menuControllers', 'contactControllers', 'mailServices']);

app.config(['$routeProvider', '$locationProvider', 'ezfbProvider',
function($routeProvider, $locationProvider, ezfbProvider) {
	ezfbProvider.setInitParams({
		appId : '630818947063902',
		xfbml : true,
		version : 'v2.2'
	});
	$locationProvider.html5Mode(true);

	$routeProvider.when('/main', {
		templateUrl : 'partials/main.html',
	}).when('/contact', {
		templateUrl : 'partials/contact.html',
	}).when('/services', {
		templateUrl : 'partials/services.html',
	}).when('/about', {
		templateUrl : 'partials/about.html',
	}).otherwise({
		redirectTo : '/main'
	});

}]);
