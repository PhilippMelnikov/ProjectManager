import app from './modules/main'

app.controller('TaskListCtrl', function($scope, $rootScope, $mdDialog, projectService, taskService, finalTaskListService, authService, loadingScreenService, loadingTaskService, $location) {
  $scope.newTask = {
    title: "",
    description: ""
  };
  $scope.currentTask = {
    title: "",
    description: ""
  };  
  $scope.searchQuery = "";
  $scope.finalTaskList = [];


  $scope.$on('setTaskList', function (event, project) {
     setTaskList(authService.getCurrentSession(), project);
  })

   function setTaskList (currentSession, project) {
    loadingScreenService.show();
    taskService.fetchTasks(authService.getCurrentSession(), project)
    .then(function(result){
    console.log(result);
    finalTaskListService.formTaskList(result);
    $scope.finalTaskList = finalTaskListService.getFinalTaskList();
    console.log($scope.finalTaskList);
    setTimeout(function(){
      loadingScreenService.hide();
    }, 300)
    $scope.$apply();
    });

   };
   

  $scope.$on('switchProject', function (event, project) {
    projectService.setCurrentProject(project);
    currentProject = projectService.getCurrentProject();
    formListForShow();
  });

  $scope.searchTask = function (searchQuery)
  {
    $('.match-not-found-screen').addClass('hidden');
    console.log('search');
    $scope.finalTaskList = finalTaskListService.search(searchQuery);
    if(!$scope.finalTaskList[0])
    {
      $('.match-not-found-screen').removeClass('hidden');
    }
  }

    function formListForShow ()
    {
      console.log("formListForShow");
       $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
    }

    // push task into current project
    $scope.createTask = function (task)
    {
      $scope.$parent.untoggle();
      loadingScreenService.show();
      taskService.createTask(authService.getCurrentSession(),projectService.getCurrentProjectId(), task)
      .then(function(result){
        taskService.fetchTask(authService.getCurrentSession(), result)
        .then(function(res){
            finalTaskListService.postCreateAppendTask(res);
            $scope.finalTaskList = finalTaskListService.getFinalTaskList();
            console.log('final List', $scope.finalTaskList);
            $rootScope.$broadcast('taskIncrement');
            $scope.newTask = {
             title: "",
            description: ""
            };
            $scope.$apply();
            loadingScreenService.hide();
        });
        
      });
       
    }

     $scope.openTask = function (title, description)
    { 
      
      $scope.currentTask = {
        title: title,
        description: description
      };
      
      $scope.$parent.toggleOpenTask();
    }

    $scope.completeTask = function (event, taskId)
    {
      taskService.completeTask(authService.getCurrentSession(), taskId).then(function (result){
        let listLength = $scope.finalTaskList.length;
        for(let i = 0; i < listLength; i++)
        {
            for(let j = 0; j < $scope.finalTaskList[i].tasks.length; j++)
            {
              if($scope.finalTaskList[i].tasks[j].id == taskId)
              {
               $scope.finalTaskList[i].tasks.splice(j, 1);
               if($scope.finalTaskList[i].tasks.length<1)
               {
                  $scope.finalTaskList.splice(i, 1);
                  listLength-=1;
                  $rootScope.$broadcast('taskDecrement');
                  break;
               }
               $rootScope.$broadcast('taskDecrement');
              }
            }
        }
      
        $scope.$apply();
      });

    }

} );
