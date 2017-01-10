import app from './modules/main'

app.service('projectService', function($http) {

  var projectList = [];

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
          resolve(response.data.Project.id);
        }
        else 
        {
          console.log('Project creation failed', response.status);
          reject('Project creation failed');
        }
      });
    });
  }

  var fetchProject = function (session, id)
  {
    console.log("session: ", session, "id: ", id);
    return new Promise(function(resolve, reject){
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'GET',
        params: {session: session, project_id: id},
        headers: {'Content-Type': 'application/json'}
      })        
      .then(function(response){
        console.log('check result', response)
        if (response.status == 200) 
        {
          console.log('Project fetched');
          resolve(response.data.Project);
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
        data: {session: session, Project: {id: currentProject.id, title: title}},
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
    console.log("Delete project:", currentProject.id);
    return new Promise(function(resolve, reject){
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'DELETE',
        params: {session: session, project_id: currentProject.id}
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

  var currentProject = {};


  var setCurrentProject = function (project)
  {
    currentProject = project;
    console.log('currentProjectId: ', currentProject);
  }

  var getCurrentProjectId = function ()
  {
    return currentProject.id;
  }

  var getCurrentProject = function ()
  {
    return currentProject;
  }

  var appendProject = function(project) {
    projectList.unshift(project);
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
    fetchProject: fetchProject,
    editProject: editProject,
    deleteProject: deleteProject,
    appendProject: appendProject,
    getProjects: getProjects,
    setCurrentProject: setCurrentProject,
    getCurrentProjectId: getCurrentProjectId,
    getCurrentProject: getCurrentProject


  };

});