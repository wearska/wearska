(function () {
    'use strict';

    angular
        .module('daksports')
        .directive('dakFilePoster', ['$parse', '$filter', 'FIREBASE_URL', function ($parse, $filter, FIREBASE_URL) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element, attrs) {

                    element.bind('change', function (evt) {
                        handleFileSelect(evt);
                    });

                    var handleFileSelect = function (evt) {
                        var f = evt.target.files[0];
                        var reader = new FileReader();
                        reader.onload = (function (theFile) {
                            return function (e) {
                                var filePayload = e.target.result;
                                // Generate a location that can't be guessed using the file's contents and a random number
                                var f = new Firebase(FIREBASE_URL + '/uploads/newitem');
                                scope.fileprev = filePayload;
                                scope.$apply();
                                f.set(filePayload, function () {
                                    console.log('file data posted');
                                });
                            };
                        })(f);
                        reader.readAsDataURL(f);
                    };

                }
            };
        }]);

})();
