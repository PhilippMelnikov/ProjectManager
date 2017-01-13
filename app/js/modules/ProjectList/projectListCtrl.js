import app from './modules/main'

// Project List
app.controller('ProjectListCtrl', function($scope, $rootScope, $mdDialog, projectService, authService, loadingImageService) {

	$scope.projects = {
    projects: [],
    setProjects: function (projects) {
      this.projects = projects;
    },
    setTitle: function(id, newTitle){
      for(let i = 0; i < this.projects.length; i++)
      {
        if(this.projects[i].id == id)
        {
          this.projects[i].title = newTitle;
        }
      }
    },
    deleteProject: function (id) {
      for(let i = 0; i < this.projects.length; i++)
      {
        if(this.projects[i].id == id)
        {
          this.projects.splice(i,1);
        }
      }
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
      loadingImageService.showProjectLoad();
      projectService.createProject(authService.getCurrentSession(), title)
      .then(function(result){

        let obj = new Object();
        obj.id = result;
        obj.task_count = 0;
        obj.title = title;
        appendProject(obj);
        $scope.setCurrentProject(undefined, obj, false);
        loadingImageService.hideProjectLoad();

      });
  });

  function appendProject (project) {
    projectService.appendProject(project);
    $scope.$apply();
    console.log("$scope.projects.projects", $scope.projects.projects);
  }

  $scope.$on('taskIncrement', function (event) {
    $scope.taskIncrement();
  });

  $scope.$on('taskDecrement', function (event) {
    $scope.taskDecrement();
  });

   $scope.$on('editProject', function (event, newTitle) {
    $scope.$parent.untoggle();
    projectService.editProject(authService.getCurrentSession(), newTitle)
    .then(function (result) {
    });
    $scope.projects.setTitle(projectService.getCurrentProjectId(), newTitle);
   });

   $scope.$on('deleteProject', function (event) {
    $scope.$parent.untoggle();
    projectService.deleteProject(authService.getCurrentSession())
    .then(function (result) {
      $scope.projects.deleteProject(projectService.getCurrentProjectId());
      $scope.$apply();
      $scope.setCurrentProject(undefined, $scope.projects.projects[0], false, true);

    });
   });

  function getProjects () {

    projectService.getUserProjects(authService.getCurrentSession())
    .then(function(result){

      var projects = projectService.getProjects();

      $scope.$apply(function () {

      $scope.projects.setProjects(projects);
      loadingImageService.hideLoadingScreen();
      if($scope.firstTime)
      {
        $scope.firstTime = false;
        $scope.setCurrentProject(undefined, $scope.projects.projects[0], true, false);
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

  $scope.setCurrentProject = function (event, project, onLoad, onDelete) {
    console.log("setCurrentProject", project);
    var projectListElements = document.getElementsByClassName("current-project");
    angular.element(projectListElements).removeClass("current-project");
    if(event)
   {   
       if(event.target)
       {
         angular.element(event.target).parent().addClass("current-project");
       }
    }
    projectService.setCurrentProject(project);
    $rootScope.$broadcast('setCurrentProject');
    // $rootScope.$broadcast('setTaskList', project);
    if(onLoad)
    {
      $rootScope.$broadcast('getAllTheTasks', $scope.projects);
    }
    else
    {
      if(onDelete)
      {$rootScope.$broadcast('setTasksOnDeleteProject');}
      else
      {$rootScope.$broadcast('setTasksForCurrentProject');}

    }
  };

   

} );