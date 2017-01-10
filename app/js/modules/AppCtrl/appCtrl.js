import app from './modules/main'

app.controller('AppCtrl', function($scope, $rootScope, $timeout, projectService) {

  $scope.newProjectTitle = '';
  $scope.currentProject = {};

  $scope.$on('setCurrentProject', function (event) {
    $scope.currentProject=projectService.getCurrentProject();
  });

  $scope.closeRightSidenav = function () {
    return function () {
      console.log('closeRightSidenav');
      var darkenTheScreen = angular.element( document.querySelector( '.darken-the-screen') );
      var myNav = angular.element( document.querySelector( '.sidenav-open') );
      myNav.removeClass('sidenav-open');
      darkenTheScreen.addClass('fade-out');
      $timeout(function(){
        darkenTheScreen.removeClass('fade-out');
        darkenTheScreen.addClass('hidden');
      },180);

    }
  };

  $scope.openRightSidenav = function (navID) {
    return function () {
      var darkenTheScreen = $('.darken-the-screen');
      var myNav = $('#' + navID);
      darkenTheScreen.removeClass('hidden');
      myNav.addClass('sidenav-open');
      }
    }

    $scope.createProject = function(title) {
      $scope.newProjectTitle = '';
      $rootScope.$broadcast('createProject', title);
    }

    $scope.deleteProject = function(title) {
      $rootScope.$broadcast('deleteProject');
    }

    $scope.editProject = function(newTitle) {
      $scope.newProjectTitle = '';
      $rootScope.$broadcast('editProject', newTitle);
    }
 
  $scope.toggleCreateProject = $scope.openRightSidenav('create-project');
  $scope.toggleDeleteProject = $scope.openRightSidenav('delete-project');
  $scope.toggleEditProject = $scope.openRightSidenav('edit-project');
  $scope.toggleCreateTask = $scope.openRightSidenav('create-task');
  $scope.toggleOpenTask = $scope.openRightSidenav('open-task');
	$scope.untoggle = $scope.closeRightSidenav();



});