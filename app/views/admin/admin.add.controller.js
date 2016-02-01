(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakAddCtrl', function($scope, $timeout, $filter, $q, FileUploader, dakItems, FIREBASE_ITEMS_URL) {

            // -----------------------------
            // INIT ITEM
            // -----------------------------

            $scope.newitem = {
                name: '',
                subname: '',
                brand: '',
                dep: '',
                type: '',
                kind: '',
                tags: [],
                excerpt: '',
                description: '',
                price: null,
                stock: 0,
                has_options: true,
                options: [],
                has_colours: false,
                colour: [],
                sibling: null,
                is_promo: false,
                promo_price: null,
                old_price: null,
                stock_promo: false,
                promo_stock: null,
                date_promo: false,
                promo_end: null,
                thumb: 0,
                files: [
                    'uploads/items/placeholder.png'
                ],
                published: true

            };

            // ------------------------
            // BUY OPTIONS
            // ------------------------


            $scope.$watch(
                'newitem.options',
                function(newNames, oldNames) {
                    $scope.getStock();
                    if (!$scope.newitem.options.length) {
                        $scope.newitem.has_options = false;
                    }
                },
                true);

            $scope.getStock = function() {
                var stock = 0;
                angular.forEach($scope.newitem.options, function(option) {
                    stock = parseInt(stock + option.count);
                });
                $scope.newitem.stock = stock;
            };

            $scope.checkOptions = function() {
                if (!$scope.newitem.options.length) {
                    $scope.addOption();
                } else {
                    angular.forEach($scope.newitem.options, function(option) {
                        if (option.type == '' && option.name == '') {
                            var idx = $scope.newitem.options.indexOf(option);
                            $scope.newitem.options.splice(idx, 1);
                        }
                    });
                }
            };

            $scope.removeOption = function(idx) {
                $scope.newitem.options.splice(idx, 1);
            };

            $scope.addOption = function(idx) {
                var newoption = {
                    type: '',
                    name: '',
                    count: 0
                };

                if ($scope.newitem.options.length) {
                    var last_idx = $scope.newitem.options.length - 1;
                    var last_option = $scope.newitem.options[last_idx];
                    if (last_option.type != '' && last_option.name != '' && last_option.count != '') {
                        $scope.newitem.options.push(newoption);
                    }
                } else {
                    $scope.newitem.options.push(newoption);
                }
            };

            // ------------------------
            // COLOUR OPTIONS
            // ------------------------




            // ------------------------
            // PROMO SETTINGS
            // ------------------------

            $scope.getPrice = function() {
                if ($scope.newitem.is_promo) {
                    if (!$scope.newitem.promo_price) {
                        $scope.newitem.promo_price = 0;
                    };
                } else {
                    if (!$scope.newitem.promo_price) {
                        $scope.newitem.promo_price = null;
                    };
                };
            };

            // -----------------------
            // ADD ITEM
            // -----------------------

            $scope.submitItemForm = function() {
                if ($scope.addItemForm.$valid) {
                    $scope.newitem.files = [];
                    angular.forEach(postuploader.queue, function(file) {
                        // sanitize file name
                        var filename = file.file.name,
                            value = 'uploads/items/' + $scope.newitem.code + '/' + filename;
                        value = value.replace(/\s+/g, '_');
                        $scope.updateFiles(value, true);

                        // send item code with post request
                        file.formData = [{
                            code: $scope.newitem.code
                        }];
                    });
                    console.log($scope.newitem);
                    postuploader.uploadAll();
                    var itemsRef = new Firebase(FIREBASE_ITEMS_URL);
                    var itemRef = itemsRef.child($scope.newitem.code);
                    var newitem = angular.copy($scope.newitem);
                    itemRef.set(newitem);
                }
            };

            $scope.updateFiles = function(value, reset) {
                if (!$scope.newitem.files.length) {
                    $scope.newitem.files = [];
                    $scope.newitem.files.push(value);
                } else if ($scope.newitem.files.length === 1) {
                    if ($scope.newitem.files[0].indexOf('placeholder') !== -1) {
                        $scope.newitem.files = [];
                        $scope.newitem.files.push(value);
                    } else {
                        $scope.newitem.files.push(value);
                    }
                } else {
                    $scope.newitem.files.push(value);
                }
            };

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
                rnd = $filter('dakSerialize')(rnd);
                fileItem.formData = [{
                    code: rnd
                }];
            };

        });

})();
