var mailServices = angular.module('mailServices', []);

mailServices.factory('MailService', ['$http',
function($http) {
	return {
		sendMail : function(data) {
			return $http({
				method : 'POST',
				url : './api/api/send-mail',
				data : $.param(data), //param method from jQuery
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				} //set the headers so angular passing info as form data (not request payload)
			});
		}
	};
}]); 