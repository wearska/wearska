(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakAdminSettingsCtrl', function($scope, $filter, $rootScope, $firebaseArray, FIREBASE_URL, FileUploader, depsFactory, gridFactory, brandsFactory, typesFactory, kindsFactory) {


            // --------------------------
            // FIREBASE ARRAYS
            // --------------------------

            var structureRef = new Firebase(FIREBASE_URL + '/structure');
            var departmentsRef = structureRef.child('departments');
            var departments = $firebaseArray(departmentsRef);
            var gridRef = structureRef.child('grid');
            var grid = $firebaseArray(gridRef);
            var brandsRef = structureRef.child('brands');
            var brands = $firebaseArray(brandsRef);
            var typesRef = structureRef.child('types');
            var types = $firebaseArray(typesRef);
            var kindsRef = structureRef.child('kinds');
            var kinds = $firebaseArray(kindsRef);

            // --------------------------
            // DEPARTMENTS
            // --------------------------

            $scope.newdep = {
                name: '',
                hero: '',
                icon: ''
            };

            $scope.depsExpand = false;

            $scope.depsExpandFactor = 0;

            $scope.depsToggle = function() {
                $scope.depsExpand = !$scope.depsExpand;
                $scope.depsExpandFactor = $scope.depsExpand ? 1 : 0;
            }

            $scope.getDepsHeight = function() {
                return ((depsFactory.length() + 1) * 94 * $scope.depsExpandFactor);
            }

            $scope.addDep = function(newdep) {
                newdep.hero = 'uploads/structure/departments/' + newdep.hero;
                // depsFactory.deps.push(newdep);
                departments.$add(newdep);
                uploader.uploadAll();
                $scope.newdep = {
                    name: '',
                    hero: '',
                    icon: ''
                };
            }

            $scope.removeDep = function(key) {
                departments.$remove(key);
            }


            // --------------------------
            // GRID
            // --------------------------

            $scope.newtile = {
                name: '',
                hero: '',
                rowspan: '1',
                colspan: '1'
            };

            $scope.gridExpand = false;

            $scope.gridExpandFactor = 0;

            $scope.gridToggle = function() {
                $scope.gridExpand = !$scope.gridExpand;
                $scope.gridExpandFactor = $scope.gridExpand ? 1 : 0;
            }

            $scope.getGridHeight = function() {
                return ((gridFactory.length() + 1) * 94 * $scope.gridExpandFactor);
            }

            $scope.addTile = function(newtile) {
                newtile.hero = 'uploads/structure/grid/' + newtile.hero;
                // depsFactory.deps.push(newtile);
                grid.$add(newtile);
                uploader.uploadAll();
                $scope.newtile = {
                    name: '',
                    hero: '',
                    rowspan: '1',
                    colspan: '1'
                };
            }

            $scope.removeTile = function(key) {
                departments.$remove(key);
            }


            // --------------------------
            // BRANDS
            // --------------------------

            $scope.newbrand = {
                name: ''
            };

            $scope.brandsExpand = false;

            $scope.brandsExpandFactor = 0;

            $scope.brandsToggle = function() {
                $scope.brandsExpand = !$scope.brandsExpand;
                $scope.brandsExpandFactor = $scope.brandsExpand ? 1 : 0;
            }

            $scope.getBrandsHeight = function() {
                return ((brandsFactory.length() + 1) * 94 * $scope.brandsExpandFactor);
            }

            $scope.addBrand = function(newbrand) {
                brands.$add(newbrand);
                $scope.newbrand = {
                    name: ''
                };
            }

            $scope.removeBrand = function(key) {
                brands.$remove(key);
            }

            // --------------------------
            // TYPES
            // --------------------------

            $scope.newtype = {
                name: '',
                short: ''
            }

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

            $scope.getTypesHeight = function() {
                return ((typesFactory.length() + 1) * 94 * $scope.typesExpandFactor);
            }

            $scope.addType = function(newtype) {
                types.$add(newtype);
                $scope.newtype = {
                    name: '',
                    short: ''
                };
            }

            $scope.removeType = function(key) {
                types.$remove(key);
            }

            // --------------------------
            // KINDS
            // --------------------------

            $scope.newkind = {
                name: '',
                short: ''
            }

            $scope.kindsExpand = false;

            $scope.kindsExpandFactor = 0;

            $scope.kindsToggle = function() {
                $scope.kindsExpand = !$scope.kindsExpand;
                $scope.kindsExpandFactor = $scope.kindsExpand ? 1 : 0;
            }

            $scope.getKindsHeight = function() {
                return ((kindsFactory.length() + 1) * 94 * $scope.kindsExpandFactor);
            }

            $scope.addKind = function(newkind) {
                kinds.$add(newkind);
                $scope.newkind = {
                    name: '',
                    short: ''
                };
            }

            $scope.removeKind = function(key) {
                kinds.$remove(key);
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

        });

})();
