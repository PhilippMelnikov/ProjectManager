import app from './modules/main'

// Project List
app.controller('ProjectListCtrl', function($scope, $rootScope, $mdDialog, projectService, authService) {
  // data
  // $scope.projects = projectService.getProjects();
	$scope.projects = [];
  

  $scope.$on('getProjects', function (event) {
    var mySession = authService.getCurrentSession();
    projectService.getUserProjects(mySession)
    .then(function(result){
      $scope.projects = projectService.getProjects();
      $scope.setCurrentProjectId($scope.projects[0].id);
      console.log($scope.projects[0]);

    });
  });
  // Get projects
  $scope.setCurrentProjectId = function (projectId) {
    console.log("setCurrentProject");
    projectService.setCurrentProjectId(projectId);
    $rootScope.$broadcast('setTaskList', projectId);
    // $rootScope.$broadcast('switchProject', project);
  };
// end fake data
  $scope.status = '  ';
  $scope.customFullscreen = false;

   $scope.showAddProjectDialog = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .clickOutsideToClose(true)
      .title('What would you name your brand new project?')
      .textContent('Bowser is a common name.')
      .placeholder('Project name')
      .ariaLabel('Project name')
      .initialValue('Bowser')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      projectService.createProject(authService.getCurrentSession(), result).then(function(result){

        $rootScope.$broadcast('getProjects');
      });
    }, function() {
      console.log("cancel");
      $scope.status = 'Adding new project canceled.';
    });
  };


} );