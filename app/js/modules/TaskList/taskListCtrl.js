import app from './modules/main'

app.controller('TaskListCtrl', function($scope, $mdDialog, projectService, taskService, finalTaskListService, authService) {
  $scope.myTask = {
    title: "",
    description: ""
  }; 
  
  // $scope.taskList = {};
  // var currentProjectId = projectService.getCurrentProjectId();
  $scope.finalTaskList = [];


  $scope.$on('setTaskList', function (event, projectId) {
     setTaskList(authService.getCurrentSession(), projectId);
  })

   function setTaskList (currentSession, projectId) {
    taskService.fetchTasks(authService.getCurrentSession(), projectId).then(function(result){
       console.log(result);
    $scope.finalTaskList = finalTaskListService.formTaskList(result);
    console.log($scope.finalTaskList);
    $scope.$apply();
    });

   };
   

  $scope.$on('switchProject', function (event, project) {
    projectService.setCurrentProject(project);
    currentProject = projectService.getCurrentProject();
    formListForShow();
  });


  $scope.showAddTaskDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'js/modules/TaskList/add.task.dialog.html',
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

    function formListForShow ()
    {
      console.log("formListForShow");
       $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
    }

    // push task into current project
    function addTask (task)
    {
      taskService.createTask(authService.getCurrentSession(),projectService.getCurrentProjectId(), task)
      .then(function(result){
        taskService.fetchTasks(authService.getCurrentSession(), projectService.getCurrentProjectId()).then(function(result){
        $scope.finalTaskList = finalTaskListService.formTaskList(result);
          });
      });
       
    }

    function DialogController($scope, $mdDialog, taskService, projectService) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(title, description) {

       var task = {
        title: title,
        description: description
      };
      addTask(task);
      $mdDialog.hide("answer");

    };
  }

} );
