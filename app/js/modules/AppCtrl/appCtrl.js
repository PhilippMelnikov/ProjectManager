import app from './modules/main'

app.controller('AppCtrl', function($scope, $rootScope, $timeout, projectService) {

  $scope.newProjectTitle = '';
  $scope.currentProject = {};

  $scope.$on('setCurrentProject', function (event) {
    $scope.currentProject=projectService.getCurrentProject();
  });
  
  $scope.dadeOut= false;
  $scope.hidden= true;
  $scope.closeRightSidenav = function () {
    return function () {

      setTimeout(function(){
        $scope.newProjectTitle = '';
        $rootScope.$broadcast('resetNewTask');
      },100);

      $scope.dadeOut= false;
      $scope.hidden= true;
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
      console.log("Титл", title);
      if((title !== '') && (title !== ' ') && (title !== '\t') && (title !== '\n') && (title))
        { 
          setTimeout(function(){
            $scope.newProjectTitle = '';
          },100);
          $rootScope.$broadcast('createProject', title);
        }
        else
        {
          $scope.hidden = false;
          $scope.fadeOut = false;
        }
        
    }

    $scope.deleteProject = function() {
      $rootScope.$broadcast('deleteProject');
    }

    $scope.editProject = function(newTitle) {
      if((newTitle !== '') && (newTitle !== ' ') && (newTitle !== '\t') && (newTitle !== '\n') && (newTitle))
      { 
          setTimeout(function(){
            $scope.newProjectTitle = '';
          },100);
          $rootScope.$broadcast('editProject', newTitle);
      }
      else
      {
        $scope.hidden = false;
        $scope.fadeOut = false;
      }
     
    }
    var altPressed = false;
    var Altexpression = "";
    var redFlag = false;


    $('.title-input').on("keypress",function(event){

      $scope.fadeOut = true;
      setTimeout(function(){
       hide();
      },100)
    })

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
    function hide() {

         setTimeout(function(){
          $scope.hidden = true;
         }, 100)
    }
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

  $(document).on('keyup', function(event) {
      if (event.keyCode == 27)
      {
        $scope.untoggle();
      }
  })


});