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
            };

            // hero uploader
            // -----------------------
            // UPLOAD FILES
            // -----------------------

            var uploader = $scope.uploader = new FileUploader({
                url: 'api/items/uploadtemp.php',
                formData: [],
                autoUpload: true
            });

            var postuploader = $scope.postuploader = new FileUploader({
                url: 'api/items/upload.php',
                formData: []
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
            uploader.onAfterAddingAll = function(addedFileItems) {
                // console.info('onAfterAddingAll', addedFileItems);
            };

            uploader.onBeforeUploadItem = function(item) {
                // console.info('onBeforeUploadItem', item);
            };

            postuploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem with postuploader', item);
            };

            uploader.onCompleteAll = function() {
                uploader.url = 'api/items/upload.php';
                angular.forEach(uploader.queue, function(file) {
                    file.url = 'api/items/upload.php';
                    file.progress = 0;
                    file.isSuccess = false;
                    file.isUploaded = false;
                    // preview files
                    var filename = file.file.name,
                        value = 'uploads/temp/' + file.formData[0].code + '/' + filename;
                    value = value.replace(/\s+/g, '_');
                    $scope.updateFiles(value, false);

                    postuploader.queue.push(file);
                });
            };

            uploader.onAfterAddingFile = function(fileItem) {
                var added = Date.now();
                var rnd = '';
                rnd = $filter('wskSerialize')(rnd);
                fileItem.formData = [{
                    code: rnd
                }];
            };

        });

})();
