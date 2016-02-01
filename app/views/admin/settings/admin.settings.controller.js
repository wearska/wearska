(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakAdminSettingsCtrl', function($scope, $filter, $rootScope, $firebaseObject, $firebaseArray, FileUploader, dakStoreStructure) {


            // --------------------------
            // DEPARTMENTS
            // --------------------------

            $scope.depsExpand = false;

            $scope.depsExpandFactor = 0;

            $scope.depsToggle = function() {
                $scope.depsExpand = !$scope.depsExpand;
                $scope.depsExpandFactor = $scope.depsExpand ? 1 : 0;
            }


            // --------------------------
            // BRANDS
            // --------------------------

            $scope.brandsExpand = false;

            $scope.brandsExpandFactor = 0;

            $scope.brandsToggle = function() {
                $scope.brandsExpand = !$scope.brandsExpand;
                $scope.brandsExpandFactor = $scope.brandsExpand ? 1 : 0;
            }

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

            // --------------------------
            // TYPES
            // --------------------------

            $scope.shortify = function() {
                if ($scope.newtype.name) {
                    $scope.newtype.short = $filter('dakShortify')($scope.newtype.name);
                }
            }

            $scope.typesExpand = false;

            $scope.typesExpandFactor = 0;
            
            $scope.typesToggle = function() {
                $scope.typesExpand = !$scope.typesExpand;
                $scope.typesExpandFactor = $scope.typesExpand ? 1 : 0;
            }

        });

})();
