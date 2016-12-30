import app from './modules/main'

// Project List
app.controller('toolbarCtrl', function($scope, $rootScope, $mdDialog) {

	$scope.newProjectTitle = "";

	var editProject = function (newTitle) {
		$rootScope.$broadcast('editProject', newTitle);
	};

	var deleteProject = function () {
		console.log("deleteProject");
		$rootScope.$broadcast('deleteProject');
	};

	$scope.showEditProjectDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'js/modules/ProjectList/edit.project.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen 
    })
    .then(function(date, text) {
      $scope.status = 'You said the information was "' + '".';

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };  

    function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(newTitle) {

      editProject(newTitle);
      $mdDialog.hide("answer");

    };

    $scope.confirmDelete = function() {
      deleteProject();
      $mdDialog.hide("answer");
    };

  }

  $scope.showDeleteProjectDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'js/modules/ProjectList/delete.project.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen 
    })
    .then(function(date, text) {
      $scope.status = 'You said the information was "' + '".';

    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  // $scope.showDeleteConfirm = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.confirm()
  //         .title('You are trying to delete your project?')
  //         .textContent('Your project will be comletely deleted.')
  //         .ariaLabel('Delete project')
  //         .targetEvent(ev)
  //         .ok('Please do it!')
  //         .cancel('No. Why would i do that?');

  //   $mdDialog.show(confirm).then(function() {
  //   	deleteProject();
  //     $scope.status = 'You decided to get rid of your project.';
  //   }, function() {
  //     $scope.status = 'You decided to keep your project.';
  //   });
  // };

});