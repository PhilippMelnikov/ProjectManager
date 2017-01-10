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
  $scope.firstTime = true;
  $scope.status = '  ';
  $scope.customFullscreen = false;
  $scope.newTitle = "";

  $scope.$on('getProjects', function (event) {
    getProjects();
  });

  $scope.$on('createProject', function (event, title) {
      $scope.$parent.untoggle();
      loadingScreenService.show();
      projectService.createProject(authService.getCurrentSession(), title)
      .then(function(result){
        projectService.fetchProject(authService.getCurrentSession(), result).then(function(res){
          projectService.appendProject(res);
          $scope.setCurrentProject(undefined, res);
          $scope.$apply();
        });

      });
  });

  $scope.$on('taskIncrement', function (event) {
    $scope.taskIncrement();
  });

  $scope.$on('taskDecrement', function (event) {
    $scope.taskDecrement();
  });

   $scope.$on('editProject', function (event, newTitle) {
    $scope.$parent.untoggle();
    loadingScreenService.show();
    projectService.editProject(authService.getCurrentSession(), newTitle)
    .then(function (result) {
      getProjects ();
    });
   });

   $scope.$on('deleteProject', function (event) {
    $scope.$parent.untoggle();
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
      if($scope.firstTime)
      {
        $scope.firstTime = false;
        $scope.setCurrentProject(undefined, $scope.projects.projects[0]);
      }
    });
      console.log("new Projects",$scope.projects.projects);
    });

  }

  $scope.taskIncrement = function () {
    $scope.projects.projects.forEach(function(elem, index, arr){
      if(elem.id === projectService.getCurrentProjectId())
        {
          elem.task_count=parseInt(elem.task_count,10) + 1;
        }
    });
  }

  $scope.taskDecrement = function () {
    $scope.projects.projects.forEach(function(elem, index, arr){
      if(elem.id === projectService.getCurrentProjectId())
        {
          elem.task_count=parseInt(elem.task_count,10) - 1;
        }
    });
  }

  // Get projects
  $scope.setCurrentProject = function (event, project) {
    console.log("setCurrentProject", project);
    if(event)
   {   
       if(event.target)
       {
         var projectListElements = document.getElementsByClassName("current-project");
         angular.element(projectListElements).removeClass("current-project");
         angular.element(event.target).parent().addClass("current-project");
       }
    }
    projectService.setCurrentProject(project);
    $rootScope.$broadcast('setCurrentProject');
    $rootScope.$broadcast('setTaskList', project);
    // $rootScope.$broadcast('switchProject', project);
  };

   

} );