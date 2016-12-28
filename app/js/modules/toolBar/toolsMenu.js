import app from './modules/main'

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