(function() {
    'use strict';

    angular.module('wearska')
        .controller('WskAdminSettingsCtrl', function($scope, $firebaseObject, $firebaseArray, FileUploader, wskStoreStructure) {

            $scope.wskStoreStructure = wskStoreStructure;
            var structureRef = wskStoreStructure.$ref();
            var departmentsRef = structureRef.child('departments');
            var departments = $firebaseArray(departmentsRef);

            wskStoreStructure.$loaded()
                .then(function(data) {
                    wskStoreStructure.$bindTo($scope, "structure").then(function() {
                        console.log($scope.structure);
                    });
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // --------------------------
            // DEPARTMENTS
            // --------------------------

            $scope.newdep = {
                name: '',
                hero: '',
                icon: ''
            };

            $scope.addDep = function(newdep){
                departments.$add(newdep);
                uploader.uploadAll();
                $scope.newdep = {
                    name: '',
                    hero: '',
                    icon: ''
                };
            };

            // hero uploader
            // -----------------------
            // UPLOAD FILES
            // -----------------------

            var uploader = $scope.uploader = new FileUploader({
                url: 'api/structure/uploaddeps.php',
                formData: [],
                autoUpload: true
            });

            // FILTERS

            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            // METHODS

            uploader.onAfterAddingFile = function(fileItem) {
                var filename = fileItem.file.name,
                    value = 'uploads/structure/departments/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.newdep.hero = value;
            };

        });

})();
