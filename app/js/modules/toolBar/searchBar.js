import app from './modules/main'

// Seach Bar
  app.directive('searchBar', function() {
    return {
      restrict: 'E',
      link: function($scope, element, attrs){

        var searchButton = $("#search-button");;
        var searchBar = $("#search-bar");
        $scope.active = false;
        var clickPermission = true;

        function activateDisactivateSearchBar() {

              if (clickPermission)
                {
                    clickPermission = false;
                    setTimeout(function () {
                      clickPermission = true;
                    },200);
                    event.preventDefault();
                    $scope.active = !$scope.active;

                  if($scope.active)
                  {
                    searchBar.removeClass('not-active');
                    searchBar.addClass('active');
                    searchBar.find("input").focus();
                   }
                  else
                  {
                    if($scope.searchQuery === "" || $scope.searchQuery === " ")
                    { searchBar.addClass('not-active');
                       setTimeout(function () {
                       searchBar.removeClass('active');
                       searchBar.find("input").val("");
                       }, 100);
                    }
                    else
                    {
                      $scope.active = !$scope.active;
                    }
                  }
                }
                else {console.log("doubleClick");}
          
        }

        searchButton.on('click', function () {
          activateDisactivateSearchBar()
        });

         searchBar.focusout(function (event) {
          if($scope.clearSerchInputEvent)
            {this.focus();}
          activateDisactivateSearchBar()
         });

         // Begin clearable input
         // CLEARABLE INPUT
          function tog(v){return v?'addClass':'removeClass';} 
          $(document).on('input', '.clearable', function(){
              $(this)[tog(this.value)]('x');
          }).on('mousemove', '.x', function( e ){
              $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
          }).on('touchstart click', '.onX', function( ev ){
              ev.preventDefault();
              $(this).removeClass('x onX').val('').change();
          });
         // End clearable input
      }
    };

  });