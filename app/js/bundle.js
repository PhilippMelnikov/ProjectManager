'use strict';

var app = angular.module('ProjectManagerApp', ['ngMaterial', 'ngMessages', 'ngCookies']);

app.config(function ($mdThemingProvider, $httpProvider) {

  var customPrimary = {
    '50': '#b6b6cd',
    '100': '#a7a7c3',
    '200': '#9898b8',
    '300': '#8989ae',
    '400': '#7a7aa3',
    '500': '#6b6b99',
    '600': '#60608b',
    '700': '#55557c',
    '800': '#4b4b6d',
    '900': '#40405e',
    'A100': '#c6c6d7',
    'A200': '#d5d5e2',
    'A400': '#e4e4ec',
    'A700': '#36364e'
  };
  $mdThemingProvider.definePalette('customPrimary', customPrimary);

  $mdThemingProvider.theme('default').primaryPalette('customPrimary').accentPalette('red');
  // delete $httpProvider.defaults.headers.post['Content-type']
  // $httpProvider.defaults.useXDomain = true;
  // $httpProvider.defaults.withCredentials = true;
  // delete $httpProvider.defaults.headers.common["X-Requested-With"];
  // $httpProvider.defaults.headers.common["Accept"] = "application/json";
  // $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
});

module.exports = app;
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('createProject', function () {
  return {
    restrict: 'EC',
    templateUrl: './js/modules/ProjectList/create.project.dialog.html',
    scope: {},
    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('deleteProject', function () {
  return {
    restrict: 'EC',
    templateUrl: './js/modules/ProjectList/delete.project.dialog.html',
    scope: {},
    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('editProject', function () {
  return {
    restrict: 'EC',
    templateUrl: './js/modules/ProjectList/edit.project.dialog.html',
    scope: {},
    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Project List
_main2.default.controller('ProjectListCtrl', function ($scope, $rootScope, $mdDialog, projectService, authService, loadingScreenService) {
  // data
  // $scope.projects = projectService.getProjects();
  $scope.projects = {
    projects: [],
    setProjects: function setProjects(projects) {
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
    projectService.createProject(authService.getCurrentSession(), title).then(function (result) {
      projectService.fetchProject(authService.getCurrentSession(), result).then(function (res) {
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
    projectService.editProject(authService.getCurrentSession(), newTitle).then(function (result) {
      getProjects();
    });
  });

  $scope.$on('deleteProject', function (event) {
    $scope.$parent.untoggle();
    loadingScreenService.show();
    projectService.deleteProject(authService.getCurrentSession()).then(function (result) {
      getProjects();
    });
  });

  function getProjects() {

    projectService.getUserProjects(authService.getCurrentSession()).then(function (result) {

      var projects = projectService.getProjects();

      $scope.$apply(function () {

        $scope.projects.setProjects(projects);
        loadingScreenService.hide();
        if ($scope.firstTime) {
          $scope.firstTime = false;
          $scope.setCurrentProject(undefined, $scope.projects.projects[0]);
        }
      });
      console.log("new Projects", $scope.projects.projects);
    });
  }

  $scope.taskIncrement = function () {
    $scope.projects.projects.forEach(function (elem, index, arr) {
      if (elem.id === projectService.getCurrentProjectId()) {
        elem.task_count = parseInt(elem.task_count, 10) + 1;
      }
    });
  };

  $scope.taskDecrement = function () {
    $scope.projects.projects.forEach(function (elem, index, arr) {
      if (elem.id === projectService.getCurrentProjectId()) {
        elem.task_count = parseInt(elem.task_count, 10) - 1;
      }
    });
  };

  // Get projects
  $scope.setCurrentProject = function (event, project) {
    console.log("setCurrentProject", project);
    if (event) {
      if (event.target) {
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
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.controller('AppCtrl', function ($scope, $rootScope, $timeout, projectService) {

  $scope.newProjectTitle = '';
  $scope.currentProject = {};

  $scope.$on('setCurrentProject', function (event) {
    $scope.currentProject = projectService.getCurrentProject();
  });

  $scope.closeRightSidenav = function () {
    return function () {
      console.log('closeRightSidenav');
      var darkenTheScreen = angular.element(document.querySelector('.darken-the-screen'));
      var myNav = angular.element(document.querySelector('.sidenav-open'));
      myNav.removeClass('sidenav-open');
      darkenTheScreen.addClass('fade-out');
      $timeout(function () {
        darkenTheScreen.removeClass('fade-out');
        darkenTheScreen.addClass('hidden');
      }, 180);
    };
  };

  $scope.openRightSidenav = function (navID) {
    return function () {
      var darkenTheScreen = $('.darken-the-screen');
      var myNav = $('#' + navID);
      darkenTheScreen.removeClass('hidden');
      myNav.addClass('sidenav-open');
    };
  };

  $scope.createProject = function (title) {
    $rootScope.$broadcast('createProject', title);
  };

  $scope.deleteProject = function (title) {
    $rootScope.$broadcast('deleteProject');
  };

  $scope.editProject = function (newTitle) {
    $rootScope.$broadcast('editProject', newTitle);
  };

  $scope.toggleCreateProject = $scope.openRightSidenav('create-project');
  $scope.toggleDeleteProject = $scope.openRightSidenav('delete-project');
  $scope.toggleEditProject = $scope.openRightSidenav('edit-project');
  $scope.toggleCreateTask = $scope.openRightSidenav('create-task');
  $scope.toggleOpenTask = $scope.openRightSidenav('open-task');
  $scope.untoggle = $scope.closeRightSidenav();
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('authService', function ($http, $cookies) {

	var session = "";

	var getCurrentSession = function getCurrentSession() {
		return session;
	};

	var getSession = function getSession() {
		return new Promise(function (resolve, reject) {
			session = $cookies.get('session');
			if (session) {
				console.log('Nice Cookies!');
				console.log(session);
				resolve(session);
			} else {
				$http.post('https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/signup').then(function (response) {
					$cookies.put('session', response.data.session);
					session = response.data.session;
					resolve(session);
				}).then(function () {
					console.log('Failed to get session');
					reject('Failed to get session');
				});
			}
		});
	};

	var checkSession = function checkSession(session) {

		return new Promise(function (resolve, reject) {
			var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/session';
			$http({
				url: string,
				method: "GET",
				withCredentials: false,
				params: { session: session }
			}).then(function (response) {
				console.log('check result', response);
				if (response.status == 200) {
					console.log('Session passed Checking');
					resolve(session);
				} else {
					console.log('Session check failed');
					reject('Session check failed');
				}
			});
		});
	};

	var fetchAccount = function fetchAccount(session) {
		return new Promise(function (resolve, reject) {
			console.log('session', session);
			var account = {};
			var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/account';
			$http({
				url: string,
				method: 'GET',
				params: { session: session }
			}).then(function (response) {
				account = response.data.Account;
				resolve(account);
			}, function (err) {
				console.log("Failed to fetch an account");
				reject(err);
			});
		});
	};

	return {
		getSession: getSession,
		getCurrentSession: getCurrentSession,
		checkSession: checkSession,
		fetchAccount: fetchAccount

	};
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = require('util');

_main2.default.service('finalTaskListService', function () {

  var finalTaskList = [];
  var searchResults = [];

  var sortByDateAsc = function sortByDateAsc(obj1, obj2) {

    if (obj1.date > obj2.date) return 1;
    if (obj1.date < obj2.date) return -1;
    return 0;
  };

  var sortByDateDesc = function sortByDateDesc(obj1, obj2) {

    if (obj1.date > obj2.date) return -1;
    if (obj1.date < obj2.date) return 1;
    return 0;
  };
  var formatDate = function formatDate(userDate) {
    var date = new Date(userDate),
        yr = date.getFullYear(),
        month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        newDate = day + '.' + month + '.' + yr;
    return newDate;
  };

  var getDayOfWeek = function getDayOfWeek(date) {
    var string = "";
    var now = moment();
    var myDate = moment(date, "YYYY-MM-DD +-HH:mm:ss");

    if (myDate.isSame(now, 'day')) {
      string = "Today";
      return string;
    }
    if (myDate.isSame(now.add(1, 'days'), 'day')) {
      string = "Tomorrow";
      return string;
    }

    var day = myDate.day();

    switch (day) {
      case 0:
        string = "Sunday";
        break;
      case 1:
        string = "Monday";
        break;
      case 2:
        string = "Tuesday";
        break;
      case 3:
        string = "Wednesday";
        break;
      case 4:
        string = "Thursday";
        break;
      case 5:
        string = "Friday";
        break;
      case 6:
        string = "Saturday";
        break;
      default:
        string = 'Потом';
    }
    return string;
  };

  var formTaskList = function formTaskList(tasks) {
    // sorting based on date

    var days = [];
    console.log('formTaskList');

    for (var key = 0; key < tasks.length; key++) {

      if (days.length < 1) {
        var day = new Object();
        day.date = tasks[key].Task.created_at;
        console.log('date', day.date);
        day.tasks = [tasks[key].Task];
        days.push(day);
      } else {
        var flag = false;
        for (var taskListKey = 0; taskListKey < days.length; taskListKey++) {
          if (moment(days[taskListKey].date).isSame(moment(tasks[key].Task.created_at), 'day')) {
            days[taskListKey].tasks.push(tasks[key].Task);
            flag = true;
          }
        }
        if (flag) {
          continue;
        }
        var day = new Object();
        day.date = tasks[key].Task.created_at;
        day.tasks = [tasks[key].Task];

        days.push(day);
      }
    }
    // days.sort(sortByDateAsc);
    for (var i = 0; i < days.length; i++) {
      days[i].dayOfWeek = getDayOfWeek(days[i].date);
      days[i].date = moment(days[i].date, "YYYY-MM-DD +-HH:mm:ss").format("DD.MM.YYYY");
      // days[i].tasks.reverse();
    }

    searchResults = angular.copy(days);

    console.log('searchResults', searchResults);
    finalTaskList = days;

    return true;
  };

  var getFinalTaskList = function getFinalTaskList() {
    return finalTaskList;
  };

  var search = function search(searchText) {
    searchResults = angular.copy(finalTaskList);
    if (searchText == '') {
      return searchResults;
    }
    function CustomSearch(searchQuery, element) {
      // var regexp = new RegExp(searchText, "i");
      var regexp = new RegExp(searchText, "i");
      var res = -1;
      for (var key in element) {
        if (key != 'image') {
          // console.log('element[key] ', element[key]);
          if (util.isString(element[key])) {
            res = element[key].search(regexp);
            if (res > -1) {
              return true;
            }
          }
        }
      }

      return false;
    }

    for (var i = 0; i < searchResults.length; i++) {
      console.log('searchResults' + i, searchResults[i]);
      searchResults[i].tasks = searchResults[i].tasks.filter(CustomSearch.bind(this, searchText));
      if (!searchResults[i].tasks[0]) {
        searchResults.splice(i, 1);
        i--;
      }
    }
    return searchResults;
  };

  var postCreateAppendTask = function postCreateAppendTask(task) {
    var now = new Date();
    var dayOfWeek = getDayOfWeek(now);
    var date = moment(now, "YYYY-MM-DD +-HH:mm:ss").format("DD.MM.YYYY");
    for (var i = 0; i < finalTaskList.length; i++) {
      if (finalTaskList[i].date === date) {
        finalTaskList[i].tasks.unshift(task);
        return true;
      }
    }
    var day = new Object();
    day.date = date;
    day.tasks = [task];
    day.dayOfWeek = dayOfWeek;
    finalTaskList.unshift(day);
  };

  var appendTask = function appendTask(task) {

    var flag = true;
    var date = moment(task.created_at, "YYYY-MM-DD +-HH:mm:ss").format("DD.MM.YYYY");

    for (var i = 0; i < finalTaskList.length; i++) {
      if (finalTaskList[i].date === date) {
        finalTaskList[i].tasks.push(task);
        flag = false;
        break;
      }
    }
    if (flag) {
      var day = new Object();
      day.date = date;
      day.tasks = [task];
      day.dayOfWeek = getDayOfWeek(task.created_at);
      finalTaskList.push(day);
    }
  };

  var appendNewTasks = function appendNewTasks(tasks) {

    for (var i = 0; i < tasks.length; i++) {
      appendTask(tasks[i].Task);
    }
  };

  return {
    formTaskList: formTaskList,
    getFinalTaskList: getFinalTaskList,
    search: search,
    postCreateAppendTask: postCreateAppendTask,
    appendNewTasks: appendNewTasks,
    getDayOfWeek: getDayOfWeek,
    formatDate: formatDate

  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('loadingScreenService', function () {
	var show = function show() {
		$('body').addClass('unscrollable');
		$('.loading-screen').removeClass('hidden');
	};

	var hide = function hide() {
		$('body').removeClass('unscrollable');
		$('.loading-screen').addClass('hidden');
	};

	return {
		show: show,
		hide: hide
	};
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('loadingTaskService', function () {
	var show = function show() {
		$('.loading-circle').removeClass('hidden');
	};

	var hide = function hide() {
		$('.loading-circle').addClass('hidden');
	};

	return {
		show: show,
		hide: hide
	};
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('projectService', function ($http) {

  var projectList = [];

  var createProject = function createProject(session, title) {
    console.log("session:", session, "title:", title);
    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'POST',
        data: { session: session, Project: { title: title } },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('check result', response);
        if (response.status == 201) {
          console.log('Project created');
          resolve(response.data.Project.id);
        } else {
          console.log('Project creation failed', response.status);
          reject('Project creation failed');
        }
      });
    });
  };

  var fetchProject = function fetchProject(session, id) {
    console.log("session: ", session, "id: ", id);
    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'GET',
        params: { session: session, project_id: id },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('check result', response);
        if (response.status == 200) {
          console.log('Project fetched');
          resolve(response.data.Project);
        } else {
          console.log('Project creation failed', response.status);
          reject('Project creation failed');
        }
      });
    });
  };

  var editProject = function editProject(session, title) {
    console.log("session:", session, "title:", title);
    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'POST',
        data: { session: session, Project: { id: currentProject.id, title: title } },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('check result', response);
        if (response.status == 200) {
          console.log('Project has been updated');
          resolve("success");
        } else {
          console.log('Project update failed', response.status);
          reject('Project update failed');
        }
      });
    });
  };

  var deleteProject = function deleteProject(session) {
    console.log("Delete project:", currentProject.id);
    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'DELETE',
        params: { session: session, project_id: currentProject.id }
      }).then(function (response) {
        console.log('check result', response);
        if (response.status == 200) {
          console.log('Project has been deleted');
          resolve("success");
        } else {
          console.log('Project removal failed', response.status);
          reject('Project removal failed');
        }
      });
    });
  };

  var currentProject = {};

  var setCurrentProject = function setCurrentProject(project) {
    currentProject = project;
    console.log('currentProjectId: ', currentProject);
  };

  var getCurrentProjectId = function getCurrentProjectId() {
    return currentProject.id;
  };

  var getCurrentProject = function getCurrentProject() {
    return currentProject;
  };

  var appendProject = function appendProject(project) {
    projectList.unshift(project);
  };

  var getProjects = function getProjects() {
    return projectList;
  };

  var getUserProjects = function getUserProjects(session) {
    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects';
      $http({
        url: string,
        method: "GET",
        params: { session: session }
      }).then(function (response) {
        console.log('Initial projects', response);
        if (response.status == 200) {
          console.log('Projects fetched successfully');
          projectList = response.data.projects.map(function (object) {
            return object.Project;
          });
          resolve("Success");
        } else {
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
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('taskService', function ($http) {

  // delete $http.defaults.headers.common['X-Requested-With'];
  // var paging_size = 5;
  // var paging_offset = 0;

  var incrementPagingOffset = function incrementPagingOffset() {
    paging_offset = paging_offset + 5;
  };

  var addTask = function addTask(currentProject, newObj) {
    currentProject.tasks.push(newObj);
  };

  var fetchTasks = function fetchTasks(session, project) {

    console.log("Fetching tasks");

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks';
      $http({
        url: string,
        method: "GET",
        params: { session: session, project_id: project.id, paging_size: project.task_count, paging_offset: 0 }
      }).then(function (response) {
        console.log('tasks for project', response.data.tasks);
        if (response.status == 200) {
          console.log('Tasks Fetched', response.data);
          resolve(response.data.tasks);
        } else {
          console.log('Tasks fetching failed');
          reject('Tasks fetchingfailed');
        }
      });
    });
  };

  var fetchTask = function fetchTask(session, taskId) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
      $http({
        url: string,
        method: "GET",
        params: { session: session, task_id: taskId },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('Fetched task', response.data.Task);
        if (response.status == 200) {
          console.log('Task Fetched');
          resolve(response.data.Task);
        } else {
          console.log('Task Fetching failed');
          reject('Task Fetching failed');
        }
      });
    });
  };

  var createTask = function createTask(session, projectId, task) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
      console.log(session);
      $http({
        url: string,
        method: 'POST',
        data: { session: session, Project: { id: projectId }, Task: { title: task.title, description: task.description } },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('Created task', response.data);
        if (response.status == 201) {
          console.log('Task created', response.data);
          resolve(response.data.Task.id);
        } else {
          console.log('Task creation failed');
          reject('Task creation failed');
        }
      }, function (response) {
        console.log('Fa', response);
      });
    });
  };

  var updateTask = function updateTask(session, taskId, title, description) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
      $http({
        url: string,
        method: "POST",
        params: { Task: { id: taskId, title: title, description: description } },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('Updated task', response.data);
        if (response.status == 200) {
          console.log('Updated created');
          resolve(response.data.Task);
        } else {
          console.log('Task update failed');
          reject('Task update failed');
        }
      });
    });
  };

  var deleteTask = function deleteTask(session, taskId) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
      $http({
        url: string,
        method: "DELETE",
        params: { session: session, task_id: taskId }
      }).then(function (response) {
        console.log('Updated task', response.data);
        if (response.status == 200) {
          console.log('Updated created');
          resolve(response.data.Task);
        } else {
          console.log('Task update failed');
          reject('Task update failed');
        }
      });
    });
  };

  var completeTask = function completeTask(session, taskId) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task/complite';
      $http({
        url: string,
        method: "POST",
        data: { session: session, Task: { id: parseInt(taskId) } },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        if (response.status == 200) {
          console.log('Task complete');
          resolve(response);
        } else {
          console.log('Complete failed');
          reject('Complete failed');
        }
      });
    });
  };

  return {
    fetchTasks: fetchTasks,
    fetchTask: fetchTask,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    completeTask: completeTask,
    incrementPagingOffset: incrementPagingOffset

  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('createTask', function () {
  return {
    restrict: 'E',
    transclude: 'element',
    templateUrl: './js/modules/TaskList/create.task.dialog.html',
    replace: true,

    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Task List
_main2.default.directive('openTask', function () {
  return {
    restrict: 'E',
    transclude: 'element',
    templateUrl: './js/modules/TaskList/open.task.dialog.html',
    replace: true,

    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.controller('TaskListCtrl', function ($scope, $rootScope, $mdDialog, projectService, taskService, finalTaskListService, authService, loadingScreenService, loadingTaskService, $location) {
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
  });

  function setTaskList(currentSession, project) {
    loadingScreenService.show();
    taskService.fetchTasks(authService.getCurrentSession(), project).then(function (result) {
      console.log(result);
      finalTaskListService.formTaskList(result);
      $scope.finalTaskList = finalTaskListService.getFinalTaskList();
      console.log($scope.finalTaskList);
      setTimeout(function () {
        loadingScreenService.hide();
      }, 300);
      $scope.$apply();
    });
  };

  $scope.$on('switchProject', function (event, project) {
    projectService.setCurrentProject(project);
    currentProject = projectService.getCurrentProject();
    formListForShow();
  });

  $scope.searchTask = function (searchQuery) {
    $('.match-not-found-screen').addClass('hidden');
    console.log('search');
    $scope.finalTaskList = finalTaskListService.search(searchQuery);
    if (!$scope.finalTaskList[0]) {
      $('.match-not-found-screen').removeClass('hidden');
    }
  };

  function formListForShow() {
    console.log("formListForShow");
    $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
  }

  // push task into current project
  $scope.createTask = function (task) {
    $scope.$parent.untoggle();
    loadingScreenService.show();
    taskService.createTask(authService.getCurrentSession(), projectService.getCurrentProjectId(), task).then(function (result) {
      taskService.fetchTask(authService.getCurrentSession(), result).then(function (res) {
        finalTaskListService.postCreateAppendTask(res);
        $scope.finalTaskList = finalTaskListService.getFinalTaskList();
        console.log('final List', $scope.finalTaskList);
        $rootScope.$broadcast('taskIncrement');
        $scope.$apply();
        loadingScreenService.hide();
      });
    });
  };

  $scope.openTask = function (title, description) {

    $scope.currentTask = {
      title: title,
      description: description
    };

    $scope.$parent.toggleOpenTask();
  };

  $scope.completeTask = function (event, taskId) {
    taskService.completeTask(authService.getCurrentSession(), taskId).then(function (result) {
      var listLength = $scope.finalTaskList.length;
      for (var i = 0; i < listLength; i++) {
        for (var j = 0; j < $scope.finalTaskList[i].tasks.length; j++) {
          if ($scope.finalTaskList[i].tasks[j].id == taskId) {
            $scope.finalTaskList[i].tasks.splice(j, 1);
            if ($scope.finalTaskList[i].tasks.length < 1) {
              $scope.finalTaskList.splice(i, 1);
              listLength -= 1;
              $rootScope.$broadcast('taskDecrement');
              break;
            }
            $rootScope.$broadcast('taskDecrement');
          }
        }
      }

      $scope.$apply();
    });
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Task List
_main2.default.directive('taskList', function () {
  return {
    restrict: 'E',
    transclude: 'element',
    templateUrl: './js/modules/TaskList/taskList.html',
    replace: true,

    controller: function controller($scope) {}
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.controller('userProfileCtrl', function ($scope, $rootScope, authService) {
	// Begin getting Session
	$scope.session = "";
	$scope.account = {};

	$scope.setAccount = function (account) {
		$scope.account = account;
	};

	authService.getSession().then(function (result) {
		$scope.session = result;
		console.log("session check");
		return authService.checkSession(result);
	}).then(function (result) {
		console.log("fetch account");
		return authService.fetchAccount(result);
	}).then(function (result) {
		$scope.setAccount(result);
		// $scope.$apply();
		// console.log('apply');
		$rootScope.$broadcast('getProjects', $scope.session);
		$rootScope.$broadcast('setSession', $scope.session);
	});
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('userProfile', function () {
  return {
    restrict: 'E',
    templateUrl: './js/modules/User/userProfile.tmpl.html',
    scope: {},
    controller: function controller($scope) {}

  };
}); // User Profile
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Seach Bar
_main2.default.directive('searchBar', function () {
  return {
    restrict: 'E',
    link: function link(scope, element, attrs) {

      var searchButton = $("#search-button");;
      var searchBar = $("#search-bar");
      var active = false;
      var clickPermission = true;

      function activateDisactivateSearchBar() {
        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          event.preventDefault();
          active = !active;
          if (active) {
            searchBar.removeClass('not-active');
            searchBar.addClass('active');
            searchBar.find("input").focus();
          } else {
            searchBar.addClass('not-active');
            setTimeout(function () {
              searchBar.removeClass('active');
              searchBar.find("input").val("");
            }, 200);
          }
        } else {
          console.log("doubleClick");
        }
      }

      searchButton.on('click', function () {
        activateDisactivateSearchBar();
      });

      searchBar.focusout(function (event) {
        activateDisactivateSearchBar();
      });
    }
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Project List
_main2.default.controller('toolbarCtrl', function ($scope, $rootScope, $mdDialog) {

  $scope.newProjectTitle = "";

  var editProject = function editProject(newTitle) {
    $rootScope.$broadcast('editProject', newTitle);
  };

  var deleteProject = function deleteProject() {
    console.log("deleteProject");
    $rootScope.$broadcast('deleteProject');
  };

  $scope.showEditProjectDialog = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'js/modules/ProjectList/edit.project.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen
    }).then(function (date, text) {
      $scope.status = 'You said the information was "' + '".';
    }, function () {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (newTitle) {

      editProject(newTitle);
      $mdDialog.hide("answer");
    };

    $scope.confirmDelete = function () {
      deleteProject();
      $mdDialog.hide("answer");
    };
  }

  $scope.showDeleteProjectDialog = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'js/modules/ProjectList/delete.project.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen
    }).then(function (date, text) {
      $scope.status = 'You said the information was "' + '".';
    }, function () {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  // $scope.showDeleteConfirm = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.confirm()
  //         .title('You are trying to delete your project?')
  //         .textContent('Your project will be comletely deleted.')
  //         .ariaLabel('Delete project')
  //         .targetEvent(ev)
  //         .ok('Please do it!')
  //         .cancel('No. Why would i do that?');

  //   $mdDialog.show(confirm).then(function() {
  //   	deleteProject();
  //     $scope.status = 'You decided to get rid of your project.';
  //   }, function() {
  //     $scope.status = 'You decided to keep your project.';
  //   });
  // };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.directive('toolsMenu', function () {
  return {
    restrict: 'E',
    link: function link(scope, element, attrs) {
      var tButton = document.getElementById("tools-button");
      var dMenu = document.getElementById("drop-down-menu");

      var toolsButton = angular.element(tButton);
      // var dropMenu = angular.element(dMenu);
      var dropMenu = $("#drop-down-menu");
      var active = false;
      var clickPermission = true;
      dropMenu.attr('tabindex', -1);

      dropMenu.children().on('click', function () {
        active = !active;
      });

      toolsButton.on('click', function (event) {
        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          event.preventDefault();
          active = !active;
          if (active) {

            dropMenu.removeClass('not-active');
            dropMenu.addClass('active');
            dropMenu.focus();
          } else {}
        } else {
          console.log("doubleClick");
        }
      });

      dropMenu.focusout(function (event) {
        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          event.preventDefault();
          active = !active;
          dropMenu.addClass('not-active');
          setTimeout(function () {
            dropMenu.removeClass('active');
          }, 200);
        } else {
          console.log("doubleClick");
        }
      });
    }
  };
});
//# sourceMappingURL=bundle.js.map
