var app = angular.module('ProjectManagerApp', ['ngMaterial', 'ngMessages', 'ngCookies']);

app.config(function ($mdThemingProvider, $httpProvider) {

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

    var customAccent = {
        '50': '#f7f7f7',
        '100': '#f7f7f7',
        '200': '#f7f7f7',
        '300': '#f7f7f7',
        '400': '#f7f7f7',
        '500': '#f7f7f7',
        '600': '#f7f7f7',
        '700': '#f7f7f7',
        '800': '#f7f7f7',
        '900': '#f7f7f7',
        'A100': '#f7f7f7',
        'A200': '#f7f7f7',
        'A400': '#f7f7f7',
        'A700': '#f7f7f7'
    };

    var customWarn = {
        '50': '#bfbfbf',
        '100': '#bfbfbf',
        '200': '#bfbfbf',
        '300': '#bfbfbf',
        '400': '#bfbfbf',
        '500': '#bfbfbf',
        '600': '#bfbfbf',
        '700': '#bfbfbf',
        '800': '#bfbfbf',
        '900': '#bfbfbf',
        'A100': '#bfbfbf',
        'A200': '#bfbfbf',
        'A400': '#bfbfbf',
        'A700': '#bfbfbf'
    };

    $mdThemingProvider.definePalette('customPrimary', customPrimary);
    $mdThemingProvider.definePalette('customAccent', customAccent);
    $mdThemingProvider.definePalette('customWarn', customWarn);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn');
 

  });

module.exports = app;