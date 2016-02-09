var menuControllers = angular.module('menuControllers', []);

menuControllers.controller('MenuCtrl', ['$scope', '$location',
function($scope, $location) {
	$scope.location = $location.path();

	$scope.isActive = function(viewLocation) {
		return $location.path().indexOf(viewLocation) == 0;
	};
}]);
