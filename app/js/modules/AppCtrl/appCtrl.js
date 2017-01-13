import app from './modules/main'

app.controller('AppCtrl', function($scope, $rootScope, $timeout, projectService) {

  $scope.newProjectTitle = '';
  $scope.currentProject = {};

  $scope.$on('setCurrentProject', function (event) {
    $scope.currentProject=projectService.getCurrentProject();
  });

  $scope.closeRightSidenav = function () {
    return function () {
      console.log('closeRightSidenav');
      var darkenTheScreen = angular.element( document.querySelector( '.darken-the-screen') );
      var myNav = angular.element( document.querySelector( '.sidenav-open') );
      myNav.removeClass('sidenav-open');
      darkenTheScreen.addClass('fade-out');
      $timeout(function(){
        darkenTheScreen.removeClass('fade-out');
        darkenTheScreen.addClass('hidden');
      },180);

    }
  };

  $scope.openRightSidenav = function (navID) {
    return function () {
      var darkenTheScreen = $('.darken-the-screen');
      var myNav = $('#' + navID);
      darkenTheScreen.removeClass('hidden');
      myNav.addClass('sidenav-open');
      }
    }

    $scope.createProject = function(title) {
      title.trim();
      console.log("Титл", title);
      if((title !== '') && (title !== ' ') && (title !== '\t') && (title !== '\n'))
        { 
          $scope.newProjectTitle = '';
          $rootScope.$broadcast('createProject', title);
        }
    }

    $scope.deleteProject = function() {
      $rootScope.$broadcast('deleteProject');
    }

    $scope.editProject = function(newTitle) {
      if((newTitle !== '') && (newTitle !== ' ') && (newTitle !== '\t') && (newTitle !== '\n'))
      { 
          $scope.newProjectTitle = '';
          $rootScope.$broadcast('editProject', newTitle);
      }
    }
    var altPressed = false;
    var Altexpression = "";
    var redFlag = false;

    $('.title-input').on("keydown",function(event){
      if(event.altKey==true)
      {
        altPressed = true;
      }
    })

    $('.title-input').on( "keyup",function(event){

      if(this.value.length == 0)
      {
          if(event.keyCode==18)
        {
           altPressed = false;
          // console.log("Alt unpressed");
        }
        if(altPressed)
        {
          var keyCode = event.keyCode.toString();
        Altexpression = Altexpression + keyCode;
        console.log('input',Altexpression);
        var espression = "969798103";
        if(Altexpression == espression)
          {
            Altexpression = "";
            redFlag = true;
          }
        }
      }
     
    })
    $('.title-input').on( "input",function(event){
      console.log(this.value.length);
      if(this.value.length == 1 && redFlag)
      {
        this.value = "";
        redFlag = false;
      }
    })
 
  $scope.toggleCreateProject = $scope.openRightSidenav('create-project');
  $scope.toggleDeleteProject = $scope.openRightSidenav('delete-project');
  $scope.toggleEditProject = $scope.openRightSidenav('edit-project');
  $scope.toggleCreateTask = $scope.openRightSidenav('create-task');
  $scope.toggleOpenTask = $scope.openRightSidenav('open-task');
	$scope.untoggle = $scope.closeRightSidenav();

  $('.darken-the-screen').on('click', function (){
    $scope.untoggle();
  });



});