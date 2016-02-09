function initCall() {
	console.log('Google maps api initialized.');
	angular.bootstrap(document.getElementById('map_canvas'), ['contactControllers']);
}

var contactControllers = angular.module('contactControllers', ['mailServices']);

contactControllers.controller('MapCtrl', ['$scope',
function($scope) {
	var latLng = new google.maps.LatLng(50.838881, -0.178116);
	var mapOptions = {
		center : latLng,
		zoom : 9,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var populationOptions = {
		strokeColor : '#FF0000',
		strokeOpacity : 0.8,
		strokeWeight : 2,
		fillColor : '#FF0000',
		fillOpacity : 0.35,
		map : map,
		center : latLng,
		radius : 15000
	};
	// Add the circle for this city to the map.
	cityCircle = new google.maps.Circle(populationOptions);

}]);

contactControllers.controller('ContactCtrl', ['$scope', 'MailService',
function($scope, MailService) {
	$scope.result = 'hidden';
	$scope.resultMessage
	$scope.formData
	//formData is an object holding the name, email, subject, and message
	$scope.submitButtonDisabled = false;
	$scope.submitted = false;
	//used so that form errors are shown only after the form has been submitted
	$scope.submit = function(form) {
		$scope.submitted = true;
		$scope.submitButtonDisabled = true;

		if (form.$valid) {
			MailService.sendMail($scope.formData).success(function(data) {
				console.log(data);
				if (data.success) {//success comes from the return json object
					$scope.submitButtonDisabled = true;
					$scope.resultMessage = data.message;
					$scope.result = 'bg-success';
				} else {
					$scope.submitButtonDisabled = false;
					$scope.resultMessage = data.message;
					$scope.result = 'bg-danger';
				}
			});
		} else {
			$scope.submitButtonDisabled = false;
			$scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
			$scope.result = 'bg-danger';
		}
	};
}]);
