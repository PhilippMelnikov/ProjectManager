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

  $mdThemingProvider.theme('default').primaryPalette('customPrimary').accentPalette('green');

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

_main2.default.service('finalTaskListService', function () {

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
    var myDate = moment(date, "YYYY-DD-MM +-HH:mm:ss");

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

  // var finalTaskList = [];
  var formTaskList = function formTaskList(tasks) {
    // sorting based on date

    var days = [];
    console.log('formTaskList');

    for (var key = 0; key < tasks.length; key++) {

      if (days.length < 1) {
        var day = new Object();
        day.date = tasks[key].Task.created_at;
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
    days.sort(sortByDateAsc);
    for (var i = 0; i < days.length; i++) {
      days[i].dayOfWeek = getDayOfWeek(days[i].date);
      days[i].date = moment(days[i].date, "YYYY-DD-MM +-HH:mm:ss").format("DD.MM.YYYY");
    }

    // finalTaskList = taskList;
    if (days[0]) console.log("final list", days[0].tasks[0].title);
    return days;
  };

  return {
    formTaskList: formTaskList
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

_main2.default.service('projectService', function ($http) {

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
          resolve("success");
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
        data: { session: session, Project: { id: currentProjectId, title: title } },
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
    console.log("Delete project:", currentProjectId);
    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/projects/project';
      $http({
        url: string,
        method: 'DELETE',
        params: { session: session, project_id: currentProjectId }
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

  var currentProjectId = "";

  var setCurrentProjectId = function setCurrentProjectId(id) {
    currentProjectId = id;
    console.log('currentProjectId: ', currentProjectId);
  };

  var getCurrentProjectId = function getCurrentProjectId() {
    return currentProjectId;
  };

  var addProject = function addProject(title) {

    projectList.unshift({ newObj: newObj });
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
    editProject: editProject,
    deleteProject: deleteProject,
    addProject: addProject,
    getProjects: getProjects,
    setCurrentProjectId: setCurrentProjectId,
    getCurrentProjectId: getCurrentProjectId

  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.service('taskService', function ($http) {

  // delete $http.defaults.headers.common['X-Requested-With'];

  var addTask = function addTask(currentProject, newObj) {
    currentProject.tasks.push(newObj);
  };

  var fetchTasks = function fetchTasks(session, projectId) {
    console.log("projectId", projectId);

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks';
      $http({
        url: string,
        method: "GET",
        params: { session: session, project_id: projectId, paging_size: 20, paging_offset: 10 }
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

  var fetchTask = function fetchTask(taskId, session) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
      $http({
        url: string,
        method: "GET",
        params: { project_id: projectId, paging_size: 20, paging_offset: 10 }
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

  var createTask = function createTask(session, projectId, title, description) {

    return new Promise(function (resolve, reject) {
      var string = 'https://private-anon-ba926edde6-testfrontend1.apiary-proxy.com/tasks/task';
      console.log(session);
      $http({
        url: string,
        method: 'POST',
        data: { session: session, Project: { id: projectId }, Task: { title: title, description: description } },
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        console.log('Created task', response.data);
        if (response.status == 200) {
          console.log('Task created', response.data);
          resolve(response.data.Task);
        } else {
          console.log('Task creation failed');
          reject('Task creation failed');
        }
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

  return {
    fetchTasks: fetchTasks,
    fetchTask: fetchTask,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask

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
  $scope.status = '  ';
  $scope.customFullscreen = false;
  $scope.newTitle = "";

  $scope.$on('getProjects', function (event) {
    getProjects();
  });

  $scope.$on('editProject', function (event, newTitle) {
    loadingScreenService.show();
    projectService.editProject(authService.getCurrentSession(), newTitle).then(function (result) {
      getProjects();
    });
  });

  $scope.$on('deleteProject', function (event) {
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
        $scope.setCurrentProjectId(undefined, $scope.projects.projects[0].id);
      });
      console.log("new Projects", $scope.projects.projects);
      // $scope.$apply();
    });
  }
  // Get projects
  $scope.setCurrentProjectId = function (event, projectId) {
    console.log("setCurrentProject", projectId);
    if (event) {
      if (event.target) {
        var projectListElements = document.getElementsByClassName("current-project");
        angular.element(projectListElements).removeClass("current-project");
        angular.element(event.target).parent().addClass("current-project");
      }
    }
    projectService.setCurrentProjectId(projectId);
    $rootScope.$broadcast('setTaskList', projectId);
    // $rootScope.$broadcast('switchProject', project);
  };
  // end fake data

  $scope.showAddProjectDialog = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt().clickOutsideToClose(true).title('What would you name your brand new project?').textContent('Bowser is a common name.').placeholder('Project name').ariaLabel('Project name').initialValue('Bowser').targetEvent(ev).ok('Okay!').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {
      loadingScreenService.show();
      projectService.createProject(authService.getCurrentSession(), result).then(function (result) {

        $rootScope.$broadcast('getProjects');
      });
    }, function () {
      console.log("cancel");
      $scope.status = 'Adding new project canceled.';
    });
  };
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.controller('TaskListCtrl', function ($scope, $mdDialog, projectService, taskService, finalTaskListService, authService) {
  $scope.myTask = {
    title: "",
    description: ""
  };

  // $scope.taskList = {};
  // var currentProjectId = projectService.getCurrentProjectId();
  $scope.finalTaskList = [];

  $scope.$on('setTaskList', function (event, projectId) {
    setTaskList(authService.getCurrentSession(), projectId);
  });

  function setTaskList(currentSession, projectId) {
    taskService.fetchTasks(authService.getCurrentSession(), projectId).then(function (result) {
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

  function formListForShow() {
    console.log("formListForShow");
    $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
  }

  // push task into current project
  function addTask(task) {
    taskService.createTask(authService.getCurrentSession(), projectService.getCurrentProjectId(), task).then(function (result) {
      taskService.fetchTasks(authService.getCurrentSession(), projectService.getCurrentProjectId()).then(function (result) {
        $scope.finalTaskList = finalTaskListService.formTaskList(result);
      });
    });
  }

  $scope.showAddTaskDialog = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'js/modules/TaskList/add.task.dialog.html',
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

  function DialogController($scope, $mdDialog, taskService, projectService) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (title, description) {

      var task = {
        title: title,
        description: description
      };
      addTask(task);
      $mdDialog.hide("answer");
    };
  }
});
'use strict';

var _main = require('./modules/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Task List
_main2.default.directive('taskList', function () {
  return {
    restrict: 'EC',
    templateUrl: './js/modules/TaskList/taskList.html',
    scope: {},
    controller: function controller($scope) {}
  };
});
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
//# sourceMappingURL=bundle.js.map
