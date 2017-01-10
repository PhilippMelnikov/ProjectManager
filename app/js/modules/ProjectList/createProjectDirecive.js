import app from './modules/main'

app.directive('createProject', function () {
    return {
      restrict: 'EC',
      templateUrl: './js/modules/ProjectList/create.project.dialog.html',
      scope: {
        	
      },
      controller: function ($scope) {
      
      }
    }
  });