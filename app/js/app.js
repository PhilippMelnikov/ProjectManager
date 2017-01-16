(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    var customAccent = {
        '50': '#f7f7f7',
        '100': '#f7f7f7',
        '200': '#f7f7f7',
        '300': '#f7f7f7',
        '400': '#f7f7f7',
        '500': '#f7f7f7',
        '600': '#f7f7f7',
        '700': '#f7f7f7',
        '800': '#f7f7f7',
        '900': '#f7f7f7',
        'A100': '#f7f7f7',
        'A200': '#f7f7f7',
        'A400': '#f7f7f7',
        'A700': '#f7f7f7'
    };

    var customWarn = {
        '50': '#bfbfbf',
        '100': '#bfbfbf',
        '200': '#bfbfbf',
        '300': '#bfbfbf',
        '400': '#bfbfbf',
        '500': '#bfbfbf',
        '600': '#bfbfbf',
        '700': '#bfbfbf',
        '800': '#bfbfbf',
        '900': '#bfbfbf',
        'A100': '#bfbfbf',
        'A200': '#bfbfbf',
        'A400': '#bfbfbf',
        'A700': '#bfbfbf'
    };

    $mdThemingProvider.definePalette('customPrimary', customPrimary);
    $mdThemingProvider.definePalette('customAccent', customAccent);
    $mdThemingProvider.definePalette('customWarn', customWarn);

    $mdThemingProvider.theme('default').primaryPalette('customPrimary').accentPalette('customAccent').warnPalette('customWarn');
});

module.exports = app;
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

  $scope.dadeOut = false;
  $scope.hidden = true;
  $scope.closeRightSidenav = function () {

    return function () {

      $scope.newProjectTitle = 'lololo';

      setTimeout(function () {
        console.log('onesc apply', $scope.newProjectTitle);
        $scope.newProjectTitle = '';
        $scope.$apply();
        $rootScope.$broadcast('resetNewTask');
      }, 100);

      $scope.dadeOut = false;
      $scope.hidden = true;
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
    if (title !== '' && title !== ' ' && title !== '\t' && title !== '\n' && title) {
      setTimeout(function () {
        $scope.newProjectTitle = '';
      }, 100);
      $rootScope.$broadcast('createProject', title);
    } else {
      $scope.hidden = false;
      $scope.fadeOut = false;
    }
  };

  $scope.deleteProject = function () {
    $rootScope.$broadcast('deleteProject');
  };

  $scope.editProject = function (newTitle) {
    if (newTitle !== '' && newTitle !== ' ' && newTitle !== '\t' && newTitle !== '\n' && newTitle) {
      setTimeout(function () {
        $scope.newProjectTitle = '';
      }, 100);
      $rootScope.$broadcast('editProject', newTitle);
    } else {
      $scope.hidden = false;
      $scope.fadeOut = false;
    }
  };
  var altPressed = false;
  var Altexpression = "";
  var redFlag = false;

  $('.title-input').on("keypress", function (event) {

    $scope.fadeOut = true;
    setTimeout(function () {
      hide();
    }, 100);
  });

  $('.title-input').on("keydown", function (event) {

    if (event.altKey == true) {
      altPressed = true;
    }
  });

  $('.title-input').on("keyup", function (event) {

    if (this.value.length == 0) {
      if (event.keyCode == 18) {
        altPressed = false;
        // console.log("Alt unpressed");
      }
      if (altPressed) {
        var keyCode = event.keyCode.toString();
        Altexpression = Altexpression + keyCode;

        var espression = "969798103";
        if (Altexpression == espression) {
          Altexpression = "";
          redFlag = true;
        }
      }
    }
  });
  function hide() {

    setTimeout(function () {
      $scope.hidden = true;
    }, 100);
  }
  $('.title-input').on("input", function (event) {

    if (this.value.length == 1 && redFlag) {
      this.value = "";
      redFlag = false;
    }
  });

  $scope.toggleCreateProject = $scope.openRightSidenav('create-project');
  $scope.toggleDeleteProject = $scope.openRightSidenav('delete-project');
  $scope.toggleEditProject = $scope.openRightSidenav('edit-project');
  $scope.toggleCreateTask = $scope.openRightSidenav('create-task');
  $scope.toggleOpenTask = $scope.openRightSidenav('open-task');
  $scope.untoggle = $scope.closeRightSidenav();

  $('.darken-the-screen').on('click', function () {
    $scope.untoggle();
  });

  $(document).on('keyup', function (event) {
    if (event.keyCode == 27) {
      $scope.untoggle();
    }
  });
});
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
_main2.default.controller('ProjectListCtrl', function ($scope, $rootScope, $mdDialog, projectService, authService, loadingImageService) {

  $scope.projects = {
    projects: [],
    setProjects: function setProjects(projects) {
      this.projects = projects;
    },
    setTitle: function setTitle(id, newTitle) {
      for (var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id == id) {
          this.projects[i].title = newTitle;
        }
      }
    },
    deleteProject: function deleteProject(id) {
      for (var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id == id) {
          this.projects.splice(i, 1);
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
    projectService.createProject(authService.getCurrentSession(), title).then(function (result) {

      var obj = new Object();
      obj.id = result;
      obj.task_count = 0;
      obj.title = title;
      appendProject(obj);
      $scope.setCurrentProject(undefined, obj, false);
      loadingImageService.hideProjectLoad();
    });
  });

  function appendProject(project) {
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
    projectService.editProject(authService.getCurrentSession(), newTitle).then(function (result) {});
    $scope.projects.setTitle(projectService.getCurrentProjectId(), newTitle);
  });

  $scope.$on('deleteProject', function (event) {
    $scope.$parent.untoggle();
    $rootScope.$broadcast('clearTaskList');
    loadingImageService.showTaskLoad();
    loadingImageService.scrollTopOnDeleteProject();
    projectService.deleteProject(authService.getCurrentSession()).then(function (result) {
      $scope.projects.deleteProject(projectService.getCurrentProjectId());
      $scope.$apply();
      loadingImageService.hideTaskLoad();
      $scope.setCurrentProject(undefined, $scope.projects.projects[0], false, true);
    });
  });

  function getProjects() {

    projectService.getUserProjects(authService.getCurrentSession()).then(function (result) {

      var projects = projectService.getProjects();

      $scope.$apply(function () {

        $scope.projects.setProjects(projects);
        loadingImageService.hideLoadingScreen();
        if ($scope.firstTime) {
          $scope.firstTime = false;
          $scope.setCurrentProject(undefined, $scope.projects.projects[0], true, false);
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

  $scope.setCurrentProject = function (event, project, onLoad, onDelete) {
    console.log("setCurrentProject", project);
    var projectListElements = document.getElementsByClassName("current-project");
    angular.element(projectListElements).removeClass("current-project");
    if (event) {
      if (event.target) {
        angular.element(event.target).parent().addClass("current-project");
      }
    }
    projectService.setCurrentProject(project);
    $rootScope.$broadcast('setCurrentProject');
    // $rootScope.$broadcast('setTaskList', project);
    if (onLoad) {
      $rootScope.$broadcast('getAllTheTasks', $scope.projects);
    } else {
      if (onDelete) {
        $rootScope.$broadcast('setTasksOnDeleteProject');
      } else {
        $rootScope.$broadcast('setTasksForCurrentProject');
      }
    }
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

_main2.default.controller('TaskListCtrl', function ($scope, $rootScope, $mdDialog, projectService, taskService, finalTaskListService, authService, loadingImageService, $location) {
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

  $scope.dadeOut = false;
  $scope.hidden = true;

  var onCreate = false;

  $scope.$on('getAllTheTasks', function (event, projects) {
    loadingImageService.showLoadingScreen();
    getAllTheTasks(projects);
  });

  $scope.$on('setTasksForCurrentProject', function (event) {
    setTaskList(true);
  });

  $scope.$on('setTasksOnDeleteProject', function (event) {
    setTaskList(false);
  });

  $scope.$on('clearTaskList', function (event) {
    $scope.finalTaskList = [];
  });

  $scope.$on('resetNewTask', function (event) {
    if (!onCreate) {
      setTimeout(function () {
        $scope.newTask.title = 'lololo';
        $scope.newTask.description = 'lalala';
        $scope.$apply();
        $scope.newTask.title = '';
        $scope.newTask.description = '';
        $scope.newTask.id = '';
        $scope.newTask.created_at = '';
        $rootScope.$apply();
      }, 200);
    }
  });

  function getAllTheTasks(projects) {
    var fetchTasksPromises = [];
    for (var i = 0; i < projects.projects.length; i++) {
      fetchTasksPromises.push(taskService.fetchTasks(authService.getCurrentSession(), projects.projects[i]));
    }
    Promise.all(fetchTasksPromises).then(function (results) {
      for (var j = 0; j < results.length; j++) {
        var obj = {
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

  function setTaskList(onSwitch) {
    console.log("entered setTaskList");
    var curProjId = projectService.getCurrentProjectId();

    var currentProj = $scope.AllTheTasksList.filter(function (elem) {
      return elem.projectId == curProjId;
    });
    if (currentProj[0]) {
      var tasks = currentProj[0].tasks;

      finalTaskListService.formTaskList(tasks);
      $scope.finalTaskList = finalTaskListService.getFinalTaskList();
      if (!onSwitch) $scope.$apply();
      console.log("finalTaskList ", $scope.finalTaskList);
    } else {
      var obj = new Object();
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
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i].tasks.length !== b[i].tasks.length) {
        return false;
      }
      for (var j = 0; j < a[i].tasks.length; j++) {
        if (a[i].tasks[j].title !== b[i].tasks[j].title) {
          return false;
        }
      }
    }
    return true;
  }

  $scope.searchTask = function (searchQuery) {
    $('.match-not-found-screen').addClass('hidden');
    console.log('search');
    var list = finalTaskListService.search(searchQuery);
    if (!isEquivalent(list, $scope.finalTaskList)) {
      console.log("signal");
      $scope.finalTaskList = list;
    }

    if (!$scope.finalTaskList[0] && searchQuery !== "") {
      $('.match-not-found-screen').removeClass('hidden');
    }
  };
  $scope.clearSerchInputEvent = false;
  $scope.clearSearchInput = function () {
    $scope.clearSerchInputEvent = true;
    this.searchQuery = "";
    console.log("clear active", $scope.active);
    $('.match-not-found-screen').addClass('hidden');
  };

  function formListForShow() {
    console.log("formListForShow");
    $scope.finalTaskList = finalTaskListService.formTaskList(currentProject);
  }

  // push task into current project
  function createTask(task) {
    onCreate = true;
    $scope.$parent.untoggle();
    $('#create-task-button').attr("disabled", true);
    loadingImageService.showTaskLoad();
    taskService.createTask(authService.getCurrentSession(), projectService.getCurrentProjectId(), task).then(function (result) {
      $scope.newTask.id = result;
      $scope.newTask.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      finalTaskListService.postCreateAppendTask($scope.newTask);
      $scope.finalTaskList = finalTaskListService.getFinalTaskList();
      console.log('final List after create task', $scope.finalTaskList);
      $rootScope.$broadcast('taskIncrement');
      for (var i = 0; i < $scope.AllTheTasksList.length; i++) {
        if ($scope.AllTheTasksList[i].projectId == projectService.getCurrentProjectId()) {
          var Task = {
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
      $('#create-task-button').attr("disabled", false);
    });
  }

  $scope.createTask = function (task) {
    console.log("alt code", task.title);
    if (task.title !== '' && task.title !== ' ' && task.title !== '\t' && task.title !== '\n' && task.title) {
      console.log("create task no mater what");
      createTask(task);
    } else {
      $scope.hidden = false;
      $scope.fadeOut = false;
    }
  };

  $scope.openTask = function (title, description) {

    $scope.currentTask = {
      title: title,
      description: description
    };

    $scope.$parent.toggleOpenTask();
  };

  $scope.completeTask = function (event, taskId) {
    taskService.completeTask(authService.getCurrentSession(), taskId).then(function (result) {});

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

    var AllTheTasksListLength = $scope.AllTheTasksList.length;
    for (var _i = 0; _i < AllTheTasksListLength; _i++) {
      for (var _j = 0; _j < $scope.AllTheTasksList[_i].tasks.length; _j++) {
        if ($scope.AllTheTasksList[_i].tasks[_j].Task.id == taskId) {
          console.log("AllTheTasksList[i].tasks[j] deleted", $scope.AllTheTasksList[_i].tasks[_j].Task.id);
          $scope.AllTheTasksList[_i].tasks.splice(_j, 1);
        }
      }
    }
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

// Seach Bar
_main2.default.directive('searchBar', function () {
  return {
    restrict: 'E',
    link: function link($scope, element, attrs) {

      var searchButton = $("#search-button");;
      var searchBar = $("#search-bar");
      $scope.active = false;
      var clickPermission = true;

      function activateDisactivateSearchBar(event) {

        if (clickPermission) {
          clickPermission = false;
          setTimeout(function () {
            clickPermission = true;
          }, 200);
          // event.preventDefault();
          $scope.active = !$scope.active;

          if ($scope.active) {
            searchBar.removeClass('not-active');
            searchBar.addClass('active');
            searchBar.find("input").focus();
          } else {
            if ($scope.searchQuery === "" || $scope.searchQuery === " ") {
              searchBar.addClass('not-active');
              setTimeout(function () {
                searchBar.removeClass('active');
                searchBar.find("input").val("");
              }, 100);
            } else {
              $scope.active = !$scope.active;
            }
          }
        } else {
          console.log("doubleClick");
        }
      }

      searchButton.on('click', function (event) {
        activateDisactivateSearchBar(event);
      });

      searchBar.focusout(function (event) {
        if ($scope.clearSerchInputEvent) {
          this.focus();
        }
        activateDisactivateSearchBar();
      });

      // Begin clearable input
      // CLEARABLE INPUT
      function tog(v) {
        return v ? 'addClass' : 'removeClass';
      }
      $(document).on('input', '.clearable', function () {
        $(this)[tog(this.value)]('x');
      }).on('mousemove', '.x', function (e) {
        $(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
      }).on('touchstart click', '.onX', function (ev) {
        ev.preventDefault();
        $(this).removeClass('x onX').val('').change();
      });
      // End clearable input
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

  var setFinalTaskList = function setFinalTaskList(list) {
    finalTaskList = list;
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
        if (key == 'title') {
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
    setFinalTaskList: setFinalTaskList,
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

_main2.default.service('loadingImageService', function () {
		var showLoadingScreen = function showLoadingScreen() {
				$('body').addClass('unscrollable');
				$('.loading-screen').removeClass('hidden');
		};

		var hideLoadingScreen = function hideLoadingScreen() {
				$('body').removeClass('unscrollable');
				$('.loading-screen').addClass('hidden');
		};
		var showProjectLoad = function showProjectLoad() {
				$('.loading-project').removeClass('hidden');
				$('.project-list').animate({
						scrollTop: 0
				}, 100);
		};

		var hideProjectLoad = function hideProjectLoad() {
				$('.loading-project').addClass('hidden');
		};

		var showTaskLoad = function showTaskLoad() {

				$('.loading-task').removeClass('hidden');

				$('.task-list-content').animate({
						scrollTop: 0
				}, 100);
		};

		var hideTaskLoad = function hideTaskLoad() {
				$('.loading-task').addClass('hidden');
		};

		var scrollTopOnDeleteProject = function scrollTopOnDeleteProject() {
				$('.project-list').animate({
						scrollTop: 0
				}, 100);
		};

		return {
				showLoadingScreen: showLoadingScreen,
				hideLoadingScreen: hideLoadingScreen,
				showProjectLoad: showProjectLoad,
				hideProjectLoad: hideProjectLoad,
				showTaskLoad: showTaskLoad,
				hideTaskLoad: hideTaskLoad,
				scrollTopOnDeleteProject: scrollTopOnDeleteProject

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
    console.log('currentProject: ', currentProject);
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
          var obj = {
            projectId: project.id,
            tasks: response.data.tasks
          };
          console.log('Tasks Fetched', obj);

          resolve(obj);
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


},{"./modules/main":2,"util":6}],2:[function(require,module,exports){
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

    var customAccent = {
        '50': '#f7f7f7',
        '100': '#f7f7f7',
        '200': '#f7f7f7',
        '300': '#f7f7f7',
        '400': '#f7f7f7',
        '500': '#f7f7f7',
        '600': '#f7f7f7',
        '700': '#f7f7f7',
        '800': '#f7f7f7',
        '900': '#f7f7f7',
        'A100': '#f7f7f7',
        'A200': '#f7f7f7',
        'A400': '#f7f7f7',
        'A700': '#f7f7f7'
    };

    var customWarn = {
        '50': '#bfbfbf',
        '100': '#bfbfbf',
        '200': '#bfbfbf',
        '300': '#bfbfbf',
        '400': '#bfbfbf',
        '500': '#bfbfbf',
        '600': '#bfbfbf',
        '700': '#bfbfbf',
        '800': '#bfbfbf',
        '900': '#bfbfbf',
        'A100': '#bfbfbf',
        'A200': '#bfbfbf',
        'A400': '#bfbfbf',
        'A700': '#bfbfbf'
    };

    $mdThemingProvider.definePalette('customPrimary', customPrimary);
    $mdThemingProvider.definePalette('customAccent', customAccent);
    $mdThemingProvider.definePalette('customWarn', customWarn);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn');
 

  });

module.exports = app;
},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],5:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],6:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":5,"_process":3,"inherits":4}]},{},[1]);
