import app from './modules/main'

app.directive('createTask', function () {
    return {
      restrict: 'E',
      transclude: 'element',
      templateUrl: './js/modules/TaskList/create.task.dialog.html',
      replace: true,
     
      controller: function ($scope) {
      
      }
    }
  });