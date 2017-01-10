import app from './modules/main'

app.directive('deleteProject', function () {
    return {
      restrict: 'EC',
      templateUrl: './js/modules/ProjectList/delete.project.dialog.html',
      scope: {
        	
      },
      controller: function ($scope) {
      
      }
    }
  });