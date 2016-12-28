import app from './modules/main'

app.service('taskService', function($http) {

  // delete $http.defaults.headers.common['X-Requested-With'];

  var addTask = function(currentProject, newObj) {
    currentProject.tasks.push(newObj);
  };

  var fetchTasks = function(session, projectId){
    console.log("projectId", projectId);

      return new Promise(function(resolve, reject){
        var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks';
        $http({
          url: string,
          method: "GET",
          params: {session: session, project_id: projectId, paging_size: 20, paging_offset: 10}
        })        
        .then(function(response){
          console.log('tasks for project', response.data.tasks)
          if (response.status == 200) 
          {
            console.log('Tasks Fetched', response.data);
            resolve(response.data.tasks);
          }
          else 
          {
            console.log('Tasks fetching failed');
            reject('Tasks fetchingfailed');
          }
        });
      });
  };

  var fetchTask = function(taskId, session){

      return new Promise(function(resolve, reject){
        var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
        $http({
          url: string,
          method: "GET",
          params: {project_id: projectId, paging_size: 20, paging_offset: 10}
        })        
        .then(function(response){
          console.log('Fetched task', response.data.Task)
          if (response.status == 200) 
          {
            console.log('Task Fetched');
            resolve(response.data.Task);
          }
          else 
          {
            console.log('Task Fetching failed');
            reject('Task Fetching failed');
          }
        });
      });
  };

  var createTask = function(session, projectId, title, description){

      return new Promise(function(resolve, reject){
        var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
        console.log(session);
      $http({
        url: string,
        method: 'POST',
        data: {session: session, Project: {id: projectId}, Task: {title: title, description: description}},
        headers: {'Content-Type': 'application/json'}
      })       
        .then(function(response){
          console.log('Created task', response.data)
          if (response.status == 200) 
          {
            console.log('Task created',response.data);
            resolve(response.data.Task);
          }
          else 
          {
            console.log('Task creation failed');
            reject('Task creation failed');
          }
        });
      });
  };

  var updateTask = function(session, taskId, title, description){

      return new Promise(function(resolve, reject){
        var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
        $http({
          url: string,
          method: "POST",
          params: {Task: {id: taskId, title: title, description: description}},
          headers: { 'Content-Type': 'application/json' }    
        })        
        .then(function(response){
          console.log('Updated task', response.data)
          if (response.status == 200) 
          {
            console.log('Updated created');
            resolve(response.data.Task);
          }
          else 
          {
            console.log('Task update failed');
            reject('Task update failed');
          }
        });
      });
  };

   var deleteTask = function(session, taskId) {

      return new Promise(function(resolve, reject){
        var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
        $http({
          url: string,
          method: "DELETE",
          params: {session: session, task_id: taskId},
        })        
        .then(function(response){
          console.log('Updated task', response.data)
          if (response.status == 200) 
          {
            console.log('Updated created');
            resolve(response.data.Task);
          }
          else 
          {
            console.log('Task update failed');
            reject('Task update failed');
          }
        });
      });
  };

  return {
    fetchTasks: fetchTasks,
    fetchTask: fetchTask,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask


  };

});