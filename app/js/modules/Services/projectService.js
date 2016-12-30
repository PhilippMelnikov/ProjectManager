import app from './modules/main'

app.service('projectService', function($http) {

  var projectList = [];

  // var createProject = function (name)
  // {
  //   return{
  //     name: name,
  //     tasks: [],
  //     tasksQuantity: 0,
  //     tasksIdCount: 0  
  //   };
  // }

  var createProject = function (session, title)
  {
    console.log("session:", session, "title:", title);
    return new Promise(function(resolve, reject){
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'POST',
        data: {session: session, Project: {title: title}},
        headers: {'Content-Type': 'application/json'}
      })        
      .then(function(response){
        console.log('check result', response)
        if (response.status == 201) 
        {
          console.log('Project created');
          resolve("success");
        }
        else 
        {
          console.log('Project creation failed', response.status);
          reject('Project creation failed');
        }
      });
    });
  }

  var editProject = function (session, title)
  {
    console.log("session:", session, "title:", title);
    return new Promise(function(resolve, reject){
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'POST',
        data: {session: session, Project: {id: currentProjectId, title: title}},
        headers: {'Content-Type': 'application/json'}
      })        
      .then(function(response){
        console.log('check result', response)
        if (response.status == 200) 
        {
          console.log('Project has been updated');
          resolve("success");
        }
        else 
        {
          console.log('Project update failed', response.status);
          reject('Project update failed');
        }
      });
    });
  }

   var deleteProject = function (session)
  {
    console.log("Delete project:", currentProjectId);
    return new Promise(function(resolve, reject){
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'DELETE',
        params: {session: session, project_id: currentProjectId}
      })        
      .then(function(response){
        console.log('check result', response)
        if (response.status == 200) 
        {
          console.log('Project has been deleted');
          resolve("success");
        }
        else 
        {
          console.log('Project removal failed', response.status);
          reject('Project removal failed');
        }
      });
    });
  }

  var currentProjectId = "";


  var setCurrentProjectId = function (id)
  {
    currentProjectId = id;
  }

  var getCurrentProjectId = function ()
  {
    return currentProjectId;
  }

  var addProject = function(title) {

      projectList.unshift({newObj});
  };

  var getProjects = function(){
      return projectList;
  };

  var getUserProjects = function (session) {
    return new Promise(function(resolve, reject){
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects';
      $http({
        url: string,
        method: "GET",
        params: {session: session}
      })        
      .then(function(response){
        console.log('Initial projects', response)
        if (response.status == 200) 
        {
          console.log('Projects fetched successfully');
          projectList = response.data.projects.map(function (object) {
            return object.Project;
          });
          resolve("Success");
        }
        else 
        {
          console.log('Projects fetching failed');
          reject('Projects fetching');
        }
      });
    });
  };


  return {
    getUserProjects: getUserProjects,
    createProject: createProject,
    editProject: editProject,
    deleteProject: deleteProject,
    addProject: addProject,
    getProjects: getProjects,
    setCurrentProjectId: setCurrentProjectId,
    getCurrentProjectId: getCurrentProjectId


  };

});