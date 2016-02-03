(function () {
    'use strict';

    angular
        .module('daksports')
        .service('FilePoster', function (FIREBASE_ITEMS_URL) {
            var postFile = function (file, f) {
                var reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        var filePayload = e.target.result;
                        var fRef = f.push()
                        fRef.set(filePayload, function () {
                            console.log('file data posted from service');
                        });
                    };
                })(file);
                reader.readAsDataURL(file);
            }

            this.post = function (files, code) {

                var f = new Firebase(FIREBASE_ITEMS_URL + '/' + code + '/files');
                angular.forEach(files, function (file) {
                    postFile(file, f);
                    console.log('file to post ', file.name)
                });
            };
        });

})();
