app = angular.module('ProjectManagerApp', ['ngMaterial', 'ngMessages']);

app.config(function ($mdThemingProvider) {

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

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('green');

  });
// User Profile 
app.directive('userProfile', function () {
    return {
      restrict: 'E',
      templateUrl: 'userProfile.tmpl.html',
      scope: {
        name: '@',
        theme: '@'
      },
      controller: function ($scope) {
      
      }
    }
  });

// Project List
app.controller('ProjectListCtrl', function($scope, $mdDialog) {
// fake data
	$scope.projects = [
    { name: 'Private', tasksQuantity: '9' },
    { name: 'Decode', tasksQuantity: '13' },
    { name: 'Family', tasksQuantity: '10' },
    { name: 'Cookie', tasksQuantity: '12' }
  ];
// end fake data
  $scope.status = '  ';
  $scope.customFullscreen = false;

   $scope.showAddProjectDialog = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .clickOutsideToClose(true)
      .title('What would you name your brand new project?')
      .textContent('Bowser is a common name.')
      .placeholder('Project name')
      .ariaLabel('Project name')
      .initialValue('Bowser')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };


} );

// Task List
app.directive('taskList', function () {
    return {
      restrict: 'E',
      templateUrl: 'taskList.html',
      scope: {
        
      },
      controller: function ($scope) {
      
      }
    }
  });

app.controller('TaskListCtrl', function($scope, $mdDialog) {

	$scope.tasks = [
    { date: '20.12.2016', description: 'Create a company'},
    { date: '21.12.2016', description: 'Call in a barber shop'},
    { date: '22.12.2016', description: 'Earn a lot of money'},
    { date: '22.12.2016', description: 'Go to the shop'},
    { date: '23.12.2016', description: 'Buy gifts'},
    { date: '24.12.2016', description: 'Brush teeth'},
    { date: '25.12.2016', description: 'Buy a plane tickets'},
    { date: '25.12.2016', description: 'Fly away to the Thailand'}
  ];
  	$scope.formTaskList = function () { // sorting based on date
  		console.log('formTaskList');
 		
  		var taskList = []; // Final list user will see

  		var tasks = $scope.tasks;

  		for (key in tasks) 
  		{
  			
  			if (taskList.length<1)
  			{
  				var taskObject = new Object();
  				taskObject.date = tasks[key].date;
  				taskObject.tasks = [tasks[key].description];
				
  				taskList.push(taskObject);
  			}
  			else
  			{
  				var flag = false;
  				for (taskListKey in taskList)
  				{
  					if(taskList[taskListKey].date === tasks[key].date)
  					{
  						taskList[taskListKey].tasks.push(tasks[key].description);
  						flag = true;
  					}
  				}
  				if(flag)
  				{
  					continue;
  				}
  				var taskObject = new Object();
  				taskObject.date = tasks[key].date;
  				taskObject.tasks = [tasks[key].description];

  				taskList.push(taskObject);

  			}
  		}
  		return taskList;

  	};
  	$scope.finalTaskList = $scope.formTaskList();

     $scope.showAddTaskDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'add.task.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

    function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

} );


// Seach Bar
  app.directive('searchBar', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs){
        var sButton = document.getElementById("search-button");
        var sBar = document.getElementById("search-bar");

        var searchButton = angular.element(sButton);
        var searchBar = angular.element(sBar);
        var active = false;
        searchButton.on('click', function () {
          active = !active;
          if(active)
          {
            searchBar.removeClass('not-active');
            searchBar.addClass('active');
            searchBar.find("input").focus();
           }
          else
          {
            searchBar.addClass('not-active');
            setTimeout(function () {
              searchBar.removeClass('active');
              searchBar.find("input").val("");
            }, 200);
          }
        });
      }
    };

  });

  app.directive('toolsMenu', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs){
        var tButton = document.getElementById("tools-button");
        var dMenu = document.getElementById("drop-down-menu");

        var toolsButton = angular.element(tButton);
        // var dropMenu = angular.element(dMenu);
        var dropMenu = $("#drop-down-menu");
        var active = false;
        var clickPermission = true;
        dropMenu.attr('tabindex',-1);

        toolsButton.on('click', function (event) {
          if (clickPermission)
          {
            clickPermission = false;
            setTimeout(function () {
              clickPermission = true;
            },200);
            event.preventDefault();
            active = !active;
            if(active)
            {

              dropMenu.removeClass('not-active');
              dropMenu.addClass('active');
              dropMenu.focus();
             }
            else
            {

            }
          }
          else
          {
            console.log("doubleClick");
          }
          
        });

        dropMenu.focusout(function (event) {
          if (clickPermission)
          { 
              clickPermission = false;
              setTimeout(function () {
                clickPermission = true;
              },200);
              event.preventDefault();
              active = !active;
              dropMenu.addClass('not-active');
              setTimeout(function () {
                dropMenu.removeClass('active');
                }, 200);
          }
          else
          {
            console.log("doubleClick");
          }
          
        });

      }
    };

  });