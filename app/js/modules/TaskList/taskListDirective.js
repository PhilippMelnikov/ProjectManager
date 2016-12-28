import app from './modules/main'

// Task List
app.directive('taskList', function () {
    return {
      restrict: 'EC',
      templateUrl: './js/modules/TaskList/taskList.html',
      scope: {
        	
      },
      controller: function ($scope) {
      
      }
    }
  });