import app from './modules/main'

// Task List
app.directive('openTask', function () {
    return {
      restrict: 'E',
      transclude: 'element',
      templateUrl: './js/modules/TaskList/open.task.dialog.html',
      replace: true,
      
      controller: function ($scope) {
      
      }
    }
  });