import app from './modules/main'

// Task List
app.directive('taskList', function () {
    return {
      restrict: 'E',
      transclude: 'element',
      templateUrl: './js/modules/TaskList/taskList.html',
      replace: true,
      
      controller: function ($scope) {
      
      }
    }
  });