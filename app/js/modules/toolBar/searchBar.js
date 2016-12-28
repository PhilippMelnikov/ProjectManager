import app from './modules/main'

// Seach Bar
  app.directive('searchBar', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs){

        var searchButton = $("#search-button");;
        var searchBar = $("#search-bar");
        var active = false;
        var clickPermission = true;

        function activateDisactivateSearchBar() {
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
          }
          else {console.log("doubleClick");}
        }

        searchButton.on('click', function () {
          activateDisactivateSearchBar()
        });

         searchBar.focusout(function (event) {
          activateDisactivateSearchBar()
         });
      }
    };

  });