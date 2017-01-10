import app from './modules/main'

app.directive('editProject', function () {
    return {
      restrict: 'EC',
      templateUrl: './js/modules/ProjectList/edit.project.dialog.html',
      scope: {
        	
      },
      controller: function ($scope) {
      
      }
    }
  });