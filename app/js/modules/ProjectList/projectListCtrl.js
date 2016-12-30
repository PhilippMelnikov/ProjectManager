import app from './modules/main'

// Project List
app.controller('ProjectListCtrl', function($scope, $rootScope, $mdDialog, projectService, authService, loadingScreenService) {
  // data
  // $scope.projects = projectService.getProjects();
	$scope.projects = {
    projects: [],
    setProjects: function (projects) {
      this.projects = projects;
    }
  };
  $scope.status = '  ';
  $scope.customFullscreen = false;
  $scope.newTitle = "";

  $scope.$on('getProjects', function (event) {
    var mySession = authService.getCurrentSession();
    projectService.getUserProjects(mySession)
    .then(function(result){
      $scope.projects.setProjects(projectService.getProjects());
      $scope.setCurrentProjectId($scope.projects.projects[0].id);
      console.log($scope.projects.projects[0]);
      loadingScreenService.hide();
      // $('.loading-screen').addClass('hidden');
    });
  });

   $scope.$on('editProject', function (event, newTitle) {
    loadingScreenService.show();
    projectService.editProject(authService.getCurrentSession(), newTitle)
    .then(function (result) {
      getProjects ();
    });
   });

   $scope.$on('deleteProject', function (event) {
    loadingScreenService.show();
    projectService.deleteProject(authService.getCurrentSession())
    .then(function (result) {
      getProjects ();
    });
   });

  function getProjects (){

    projectService.getUserProjects(authService.getCurrentSession())
    .then(function(result){

      var projects = projectService.getProjects();

      $scope.$apply(function () {

      $scope.projects.setProjects(projects);
      loadingScreenService.hide();
    });
       $scope.$apply();
      console.log("new Projects",$scope.projects.projects);
      // $scope.$apply();
    });

  }
  // Get projects
  $scope.setCurrentProjectId = function (event,projectId) {
    console.log("setCurrentProject");
    if(event.target)
    {
      var projectListElements = document.getElementsByClassName("project-list-item");
      angular.element(projectListElements).removeClass("current-project");
      angular.element(event.target).addClass("current-project");
    }
    projectService.setCurrentProjectId(projectId);
    $rootScope.$broadcast('setTaskList', projectId);
    // $rootScope.$broadcast('switchProject', project);
  };
// end fake data

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
      loadingScreenService.show();
      projectService.createProject(authService.getCurrentSession(), result).then(function(result){

        $rootScope.$broadcast('getProjects');
      });
    }, function() {
      console.log("cancel");
      $scope.status = 'Adding new project canceled.';
    });
  };

 


} );