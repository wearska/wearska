(function () {
    'use strict';

    angular
        .module('daksports')
        .config(function ($mdThemingProvider) {
            var dakRed = $mdThemingProvider.extendPalette('red', {
                '500': 'E12A2A',
                'contrastDefaultColor': 'light', // whether, by default, text (contrast)
                // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', // hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'
                ],
                'contrastLightColors': undefined // could also specify this if default was 'dark'
            });
            // Register the new color palette map with the name <code>neonRed</code>
            $mdThemingProvider.definePalette('dak-red', dakRed);

            $mdThemingProvider
                .theme('brand-red')
                .primaryPalette('dak-red', {
                    'default': '500'
                })
                .accentPalette('red');
            // .dark();

            $mdThemingProvider
                .theme('brand-black')
                .primaryPalette('grey', {
                    'default': '900'
                })
                .warnPalette('red');
            // .dark();

            $mdThemingProvider
                .theme('light')
                .primaryPalette('grey', {
                    'default': '50'
                })
                .warnPalette('grey')
                .dark();
        });

})();
