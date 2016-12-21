app = angular.module('TaskManagerApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.config(function ($mdThemingProvider, $mdIconProvider) {

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

    $mdIconProvider
      .defaultIconSet('img/icons/sets/social-icons.svg', 24);
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
app.controller('ProjectListCtrl', function($scope) {

	$scope.projects = [
    { name: 'Private', tasksQuantity: '9' },
    { name: 'Decode', tasksQuantity: '13' },
    { name: 'Family', tasksQuantity: '10' },
    { name: 'Cookie', tasksQuantity: '12' }
  ];

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

app.controller('TaskListCtrl', function($scope) {

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
} );


// Seach Bar
  app.directive('searchBar', function() {
    return {
      restrict: 'E',
    
      controller: function ($scope) {
        var sButton = document.getElementById("search-button");
        var sBar = document.getElementById("search-bar");

        var searchButton = angular.element(sButton);
        var searchBar = angular.element(sBar);
        var active = false;
        $scope.activateSearch = function () {
          console.log(searchButton);
          active = !active;
          if(active)
          {searchBar.addClass('search-active');}
          else
          {searchBar.removeClass('search-active');}
        };
      }
    };

  });