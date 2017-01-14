import app from './modules/main'

app.controller('TaskListCtrl', function($scope, $rootScope, $mdDialog, projectService, taskService, finalTaskListService, authService, loadingImageService, $location) {
  $scope.newTask = {
    id: "",
    title: "",
    description: "",
    created_at: ""
  };
  $scope.currentTask = {
    title: "",
    description: ""
  };  
  $scope.searchQuery = "";
  $scope.finalTaskList = [];
  $scope.AllTheTasksList = [];

  $scope.dadeOut= false;
  $scope.hidden= true;

  var onCreate = false;


  $scope.$on('getAllTheTasks', function (event, projects) {
    loadingImageService.showLoadingScreen();
    getAllTheTasks(projects);
  })

  $scope.$on('setTasksForCurrentProject', function (event) {
    setTaskList(true);
  })

  $scope.$on('setTasksOnDeleteProject', function (event) {
    setTaskList(false);
  })

  $scope.$on('resetNewTask', function (event) {
    if(!onCreate)
   { 
    setTimeout(function(){
          $scope.newTask = {
           id: "",
           title: "",
           description: "",
           created_at: ""
         };
       },500);
  }
  })

  function getAllTheTasks (projects)
  {  
    let fetchTasksPromises = []
      for(let i = 0; i < projects.projects.length; i++)
      {
        fetchTasksPromises.push(taskService.fetchTasks(authService.getCurrentSession(), projects.projects[i]));
      }
      Promise.all(fetchTasksPromises).then(function(results){
        for(let j = 0; j < results.length; j++)
        {
            let obj = {
            projectId: results[j].projectId,
            tasks: results[j].tasks
          };
          $scope.AllTheTasksList.push(obj);
        }
        console.log("Finished fetching AllTheTasks");
        console.log($scope.AllTheTasksList);
        setTaskList();
        loadingImageService.hideLoadingScreen();
        
      });
      
  }

  function setTaskList (onSwitch) {
    console.log("entered setTaskList");
    let curProjId = projectService.getCurrentProjectId();

    let currentProj = $scope.AllTheTasksList.filter(function(elem){
      return elem.projectId == curProjId;
    });
    if(currentProj[0])
    {
      let tasks = currentProj[0].tasks;
        console.log("current project finaly ", tasks);
       
        finalTaskListService.formTaskList(tasks);
        $scope.finalTaskList = finalTaskListService.getFinalTaskList();
        if(!onSwitch)
        $scope.$apply();
        console.log("finalTaskList ", $scope.finalTaskList);
    }
    else
    {
      let obj = new Object();
      obj.projectId = curProjId;
      obj.tasks = [];
      console.log("new Project with no tasks", obj);
      $scope.AllTheTasksList.push(obj);
      finalTaskListService.formTaskList(obj.tasks);
      $scope.finalTaskList = finalTaskListService.getFinalTaskList();
      $scope.$apply();
    }
   
  }

  function isEquivalent(a, b) {
    if(a.length !== b.length)
      {return false;}
    for(let i = 0; i < a.length; i++)
    {
      if(a[i].tasks.length !== b[i].tasks.length)
        {return false}
      for(let j = 0; j < a[i].tasks.length; j++)
      {
        if(a[i].tasks[j].title !== b[i].tasks[j].title)
        {
          return false;
        }
        
      }

    }
    return true;
  }

  $scope.searchTask = function (searchQuery)
  {
    $('.match-not-found-screen').addClass('hidden');
    console.log('search');
    let list = finalTaskListService.search(searchQuery);
    if(!isEquivalent(list, $scope.finalTaskList))
    {
      console.log("signal");
      $scope.finalTaskList = list;
    }

    if(!$scope.finalTaskList[0] && searchQuery!=="")
    {
      $('.match-not-found-screen').removeClass('hidden');
    }
  }
  $scope.clearSerchInputEvent = false;
  $scope.clearSearchInput = function () {
    $scope.clearSerchInputEvent = true;
    this.searchQuery = "";
    console.log("clear active", $scope.active);
    $('.match-not-found-screen').addClass('hidden');
  }

  function formListForShow ()
  {
    console.log("formListForShow");
     $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
  }

  // push task into current project
  function createTask (task) {
    onCreate = true;
    $scope.$parent.untoggle();
    loadingImageService.showTaskLoad();
    taskService.createTask(authService.getCurrentSession(),projectService.getCurrentProjectId(), task)
    .then(function(result){
      $scope.newTask.id = result;
      $scope.newTask.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      finalTaskListService.postCreateAppendTask($scope.newTask);
      $scope.finalTaskList = finalTaskListService.getFinalTaskList();
      console.log('final List after create task', $scope.finalTaskList);
      $rootScope.$broadcast('taskIncrement');
      for (let i = 0; i < $scope.AllTheTasksList.length; i++)
      {
        if($scope.AllTheTasksList[i].projectId == projectService.getCurrentProjectId())
        {   
          let Task = {
            Task: $scope.newTask
          };
          $scope.AllTheTasksList[i].tasks.unshift(Task);
        }
      }

      $scope.newTask = {
      id: "",
      title: "",
      description: "",
      created_at: ""
      };
      onCreate = false;
      loadingImageService.hideTaskLoad();
      $scope.$apply();
    });
  }


  $scope.createTask = function (task)
  {
     console.log("alt code", task.title);
     if((task.title !== '') && (task.title !== ' ') && (task.title !== '\t') && (task.title !== '\n') && (task.title))
      {
        console.log("create task no mater what");
        createTask(task);
      }
      else
      {
        $scope.hidden = false;
        $scope.fadeOut = false;
      }
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
    taskService.completeTask(authService.getCurrentSession(), taskId)
    .then(function (result){
      
    });

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

      let AllTheTasksListLength = $scope.AllTheTasksList.length;
      for(let i = 0; i < AllTheTasksListLength; i++)
      {
          for(let j = 0; j < $scope.AllTheTasksList[i].tasks.length; j++)
          {
            if($scope.AllTheTasksList[i].tasks[j].Task.id == taskId)
            {
              console.log("AllTheTasksList[i].tasks[j] deleted", $scope.AllTheTasksList[i].tasks[j].Task.id);
              $scope.AllTheTasksList[i].tasks.splice(j, 1);
            }
          }
      }
    
  }

} );
