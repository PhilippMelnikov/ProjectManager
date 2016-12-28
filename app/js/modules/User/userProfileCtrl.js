import app from './modules/main'

app.controller('userProfileCtrl', function($scope, $rootScope, authService) {
	// Begin getting Session
	$scope.session = "";
	$scope.account = {};

	$scope.setAccount = function (account)
	{
		$scope.account = account;
	};

	authService.getSession().then(function (result) {
		$scope.session = result;
		console.log("session check");
		return authService.checkSession(result);
	}).then(function(result){
		console.log("fetch account");
		return authService.fetchAccount(result);
	}).then(function(result) {
		$scope.setAccount(result);
		// $scope.$apply();
		// console.log('apply');
		$rootScope.$broadcast('getProjects', $scope.session);
		$rootScope.$broadcast('setSession', $scope.session);
		
	});
	
});