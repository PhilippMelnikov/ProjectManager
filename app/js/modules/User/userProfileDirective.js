// User Profile 
import app from "./modules/main"

app.directive('userProfile', function () {
    return {
      restrict: 'E',
      templateUrl: './js/modules/User/userProfile.tmpl.html',
       scope: {
        
      },
      controller: function ($scope) {
      
      }

    }
  });