(function() {
    'use strict';

    angular
        .module('daksports', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMaterial',
            'ngMessages',
            'ngSanitize',
            'ui.router',
            'firebase',
            'ngColorThief',
            'angularFileUpload',
            'dakCart'
        ]);
})();

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

(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('DakStoreCtrl', function($scope, $rootScope, $state, heroService) {
            $rootScope.$broadcast('store: open', {});

            console.log($state);

            $scope.department = $state.params.department;

            heroService.src = $scope.department.hero;
            heroService.position = $scope.department.position;

        });

})();

(function () {
    'use strict';

    angular
        .module('daksports')
        .service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();
                fd.append('file', file);
                $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .success(function () {})
                    .error(function () {});
            }
        }]);

})();

(function () {
    'use strict';

    angular
        .module('daksports')
        .controller('MainCtrl', function ($scope, heroService, fileUpload) {
            heroService.src = 'uploads/heroes/grand_opening.jpg';
            heroService.position = 'center';

        });

})();

(function() {
    'use strict';

    angular
        .module('daksports')
        .factory('dakItems', function($rootScope, $firebaseObject, FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL + '/items');
            var itemsObj = $firebaseObject(ref);

            return itemsObj;
        });

})();
(function() {
    'use strict';

    angular
        .module('daksports')
        .factory('dakAuth', function($rootScope, $log, $q, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, PLACEHOLDERS, $location) {
            var ref = new Firebase(FIREBASE_URL);
            var authObj = $firebaseAuth(ref);
            return authObj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakAuthCtrl', function($scope, $http, $location, $mdToast, $firebaseObject, $firebaseArray, dakAuth, FileUploader, FIREBASE_USERS_URL, PLACEHOLDERS, LOGOS) {


            $scope.PLACEHOLDERS = PLACEHOLDERS;
            $scope.LOGOS = LOGOS;
            $scope.dakAuth = dakAuth;
            $scope.credentials = {};

            $scope.atPass = false;
            $scope.atLogin = true;
            $scope.atCreate = false;

            $scope.toPass = function(email) {
                if (email) {
                    $scope.atPass = true;
                    var usersRef = new Firebase(FIREBASE_USERS_URL);
                    var usersObj = $firebaseObject(usersRef);
                    usersObj.$loaded(function(users) {
                        angular.forEach(users, function(data, key) {
                            if (data.email === email) {
                                $scope.credentials.user_photo = data.user_photo;
                            };
                        });
                    });
                };
            };
            $scope.toCreate = function() {
                $scope.atLogin = false;
                $scope.atCreate = true;
            };

            $scope.cancelCreate = function() {
                $scope.createForm.$setPristine();
                $scope.createForm.$setUntouched();
                $scope.loginForm.$setPristine();
                $scope.loginForm.$setUntouched();
                $scope.atLogin = true;
                $scope.atPass = false;
                $scope.atCreate = false;
            };

            // ----------------------
            // CREATE
            // ----------------------

            $scope.create = function(credentials) {
                if ($scope.createForm.$valid) {
                    var origPhoto = $scope.credentials.user_photo;
                    $scope.credentials.user_photo = 'uploads/user_photos/' + $scope.credentials.email + '/' + origPhoto;
                    $scope.credentials.user_photo = $scope.credentials.user_photo.replace(/\s+/g, '_');

                    // create the user
                    dakAuth.$createUser({
                        email: $scope.credentials.email,
                        password: $scope.credentials.password
                    }).then(function(authData) {
                        console.log("User " + authData.uid + " created successfully!");
                        if (!credentials.user_photo) {
                            credentials.user_photo = PLACEHOLDERS.user_photo;
                        };
                        console.log(authData);
                        var usersRef = new Firebase(FIREBASE_USERS_URL);
                        var usersObj = $firebaseArray(usersRef);
                        var userData = {
                            uid: authData.uid,
                            email: $scope.credentials.email,
                            first_name: $scope.credentials.first_name,
                            last_name: $scope.credentials.last_name,
                            user_photo: $scope.credentials.user_photo
                        };
                        usersRef.child(authData.uid).set(userData);
                        usersRef.child(authData.uid).update({ created: Firebase.ServerValue.TIMESTAMP });
                        $scope.cancelCreate;
                        $scope.showCreateSuccessToast();
                    }).catch(function(error) {
                        console.error("Error: ", error);
                        $scope.showErrorToast();
                    });
                } else {
                    $scope.createForm.submitted = true;
                }
            };

            // ------------------------
            // REMOVE
            // ------------------------


            $scope.removeUser = function(credentials) {
                dakAuth.remove(credentials)
                    .then(function() {
                        $scope.message = 'User removed';
                    }).catch(function(error) {
                        $scope.error = error;
                    });
            };

            // -------------------------
            // LOGIN
            // -------------------------

            $scope.login = function(credentials) {
                if ($scope.loginForm.$valid) {
                    dakAuth.$authWithPassword({
                            email: credentials.email,
                            password: credentials.password
                        })
                        .then(function(authData) {
                            $location.path('');
                        }).catch(function(error) {
                            var errorStr = error.toString();
                            if (errorStr.indexOf('password') > -1) {
                                $scope.showPwdErrorToast();
                            } else if (errorStr.indexOf('user') > -1) {
                                $scope.showUsrErrorToast();
                            } else {
                                $scope.showErrorToast();
                            };
                        });
                }
            };

            // CREATE TOASTS

            $scope.showCreateSuccessToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('User created succesfully. You may login now.')
                    .action('Ok')
                    .hideDelay(3000)
                );
            };

            // LOGIN TOASTS
            $scope.showPwdErrorToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Incorrect password, please try again!')
                    .action('Ok')
                    .hideDelay(0)
                );
            };
            $scope.showUsrErrorToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('This user does not exist!')
                    .action('Ok')
                    .hideDelay(0)
                );
            };
            $scope.showErrorToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content("We've encountered a problem, please try again!")
                    .action('Ok')
                    .hideDelay(0)
                );
            };

            // ----------------------
            // FILE UPLOAD
            // ----------------------

            // uploader options
            var uploader = $scope.uploader = new FileUploader({
                url: 'api/auth/upload-photo.php',
                formData: []
            });

            // uploader filters
            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            // uploader methods
            uploader.onAfterAddingAll = function(addedFileItems) {
                $scope.credentials.user_photo = addedFileItems[0].file.name;
                // $scope.credentials.user_photo = 'uploads/user_photo/' + $scope.credentials.email + '/' + uploader.queue[uploader.queue.length - 1].file.name;
                // $scope.credentials.user_photo = $scope.credentials.user_photo.replace(/\s+/g, '_');
            };
            var i = 0;
            uploader.onCompleteAll = function() {};
            uploader.onCompleteItem = function(fileItem, response, status, headers) {};
            uploader.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader.formData = [{
                    email: $scope.credentials.email
                }];
                Array.prototype.push.apply(item.formData, uploader.formData);
            };

            $scope.uploadPhoto = function() {
                if (uploader.queue.length) {
                    uploader.uploadItem(uploader.queue.length - 1);
                }
            };

        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakAdminCtrl', function($scope) {

        });

})();

(function () {
    'use strict';

    angular.module('daksports')
        .controller('DakAddCtrl', function ($scope, $timeout, $filter, $q, FileUploader, dakItems, FIREBASE_ITEMS_URL, FilePoster) {

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
            // FILE-READER
            // ------------------------

            $scope.postFile = function (files) {
            }
            $scope.files = [];

            $scope.selectFile = function (element) {
                $scope.$apply(function ($scope) {
                    $scope.files = element.files;
                    $scope.postFile(element.files);
                });
            }


            // ------------------------
            // BUY OPTIONS
            // ------------------------


            $scope.$watch(
                'newitem.options',
                function (newNames, oldNames) {
                    $scope.getStock();
                    if (!$scope.newitem.options.length) {
                        $scope.newitem.has_options = false;
                    }
                },
                true);

            $scope.getStock = function () {
                var stock = 0;
                angular.forEach($scope.newitem.options, function (option) {
                    stock = parseInt(stock + option.count);
                });
                $scope.newitem.stock = stock;
            };

            $scope.checkOptions = function () {
                if (!$scope.newitem.options.length) {
                    $scope.addOption();
                } else {
                    angular.forEach($scope.newitem.options, function (option) {
                        if (option.type == '' && option.name == '') {
                            var idx = $scope.newitem.options.indexOf(option);
                            $scope.newitem.options.splice(idx, 1);
                        }
                    });
                }
            };

            $scope.removeOption = function (idx) {
                $scope.newitem.options.splice(idx, 1);
            };

            $scope.addOption = function (idx) {
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

            $scope.getPrice = function () {
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

            $scope.submitItemForm = function () {
                FilePoster.post($scope.files, $scope.newitem.code);
                // if ($scope.addItemForm.$valid) {
                //     $scope.newitem.files = [];
                //     angular.forEach(postuploader.queue, function (file) {
                //         // sanitize file name
                //         var filename = file.file.name,
                //             value = 'uploads/items/' + $scope.newitem.code + '/' + filename;
                //         value = value.replace(/\s+/g, '_');
                //         $scope.updateFiles(value, true);
                //
                //         // send item code with post request
                //         file.formData = [{
                //             code: $scope.newitem.code
                //         }];
                //     });
                //     console.log($scope.newitem);
                //     postuploader.uploadAll();
                //     var itemsRef = new Firebase(FIREBASE_ITEMS_URL);
                //     var itemRef = itemsRef.child($scope.newitem.code);
                //     var newitem = angular.copy($scope.newitem);
                //     itemRef.set(newitem);
                // }
            };

            $scope.updateFiles = function (value, reset) {
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
                fn: function (item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });

            // METHODS
            uploader.onAfterAddingAll = function (addedFileItems) {
                // console.info('onAfterAddingAll', addedFileItems);
            };

            uploader.onBeforeUploadItem = function (item) {
                // console.info('onBeforeUploadItem', item);
            };

            postuploader.onBeforeUploadItem = function (item) {
                console.info('onBeforeUploadItem with postuploader', item);
            };

            uploader.onCompleteAll = function () {
                uploader.url = 'api/items/upload.php';
                angular.forEach(uploader.queue, function (file) {
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

            uploader.onAfterAddingFile = function (fileItem) {
                var added = Date.now();
                var rnd = '';
                rnd = $filter('dakSerialize')(rnd);
                fileItem.formData = [{
                    code: rnd
                }];
            };

        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('typesFactory', function() {
            var obj = {};

            obj.types = [];

            obj.length = function(){
                return obj.types.length;
            }

            return obj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('kindsFactory', function() {
            var obj = {};

            obj.kinds = [];

            obj.length = function(){
                return obj.kinds.length;
            }

            return obj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('gridFactory', function() {
            var obj = {};

            obj.grid = [];

            obj.length = function(){
                return obj.grid.length;
            }

            return obj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('depsFactory', function() {
            var obj = {};

            obj.deps = [];

            obj.length = function(){
                return obj.deps.length;
            }

            return obj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('brandsFactory', function() {
            var obj = {};

            obj.brands = [];

            obj.length = function(){
                return obj.brands.length;
            }

            return obj;
        });

})();

(function() {
    'use strict';

    angular
        .module('dakCart', [])
        .run(['$rootScope', 'dakAuth', 'dakShoppingLists', function($rootScope, dakAuth, dakShoppingLists) {

        }])

})();

(function() {
    'use strict';

    angular
        .module('dakCart')
        .factory('dakShoppingLists', function($rootScope, $http, $q, $filter, dakAuth, dakShoppingCart) {
            var obj = {};
            var api = 'api/shopping-lists/';
            var restoring = false;

            // ----------------------------
            // GET USER LISTS
            // ----------------------------
            obj.query = function(userid) {
                return $http.get(api + 'query.php?uid=' + userid)
                    .then(function(response) {
                        var lists = response.data;
                        obj.lists = [];
                        angular.forEach(lists, function(list) {
                            list.items = angular.fromJson(list.items);
                        });
                        return lists;
                    });
            };

            obj.post = function(list) {
                if (dakAuth.$getdakAuth()) {
                    var uid = dakAuth.$getdakAuth().uid;
                    var data = {};
                    data.userid = uid
                    data.listid = parseFloat(list.id);
                    data.added = list.added;
                    data.listname = list.name;
                    data.active = list.active;
                    data.incart = list.inCart;
                    data.items = [];
                    angular.forEach(list.items, function(listItem) {
                        var item = {};
                        item.product = listItem.product.code;
                        item.size = listItem.size;
                        item.count = listItem.count;
                        item.data = angular.toJson(listItem.data);
                        data.items.push(item);
                    });
                    data.items = angular.toJson(data.items);
                    $http.post(api + 'post.php', data).then(function(results) {
                        return results;
                    });
                }
            };

            obj.put = function(list) {
                if (dakAuth.$getdakAuth()) {
                    var uid = dakAuth.$getdakAuth().uid;
                    var data = {};
                    data.userid = dakAuth.$getdakAuth().uid;
                    data.listid = parseFloat(list.id);
                    data.added = list.added;
                    data.listname = list.name;
                    data.active = list.active;
                    data.incart = list.inCart;
                    data.items = [];
                    angular.forEach(list.items, function(listItem) {
                        var item = {};
                        item.product = listItem.product.code;
                        item.size = listItem.size;
                        item.count = listItem.count;
                        item.data = angular.toJson(listItem.data);
                        data.items.push(item);
                    });
                    data.items = angular.toJson(data.items);
                    $http.post(api + 'put.php', data).then(function(results) {
                        return results;
                    });
                }
            };
            obj.remove = function(list) {
                var data = {};
                data.listid = parseFloat(list.id);
                if (dakAuth.$getdakAuth()) {
                    return $http.post(api + 'remove.php', data).then(function(results) {
                        var idx = obj.lists.indexOf(list);
                        obj.lists.splice(idx, 1);
                        if (obj.lists[0]) {
                            obj.makeActive(obj.lists[0].id);
                        }
                    });
                };
            };

            $rootScope.$on('dakCart: changed', function() {
                angular.forEach(obj.lists, function(list) {
                    if (list.items.length > 0) {
                        list.update();
                    } else {
                        list.remove();
                    }
                });
            });

            $rootScope.$on('products:filled', function() {
                if (dakAuth.$getdakAuth()) {
                    var uid = dakAuth.$getdakAuth().uid;
                    obj.query(uid)
                        .then(function(lists) {
                            if (lists.length) {
                                angular.forEach(lists, function(list) {
                                    obj.restoreList(list);
                                });
                            } else {
                                obj.newList();
                                var firstList = obj.activeList();
                                firstList.syncToCart();
                            }
                        }).catch(function(error) {
                            return error;
                        });
                } else {
                    obj.newList();
                    var firstList = obj.activeList();
                    firstList.syncToCart();
                };
            });

            $rootScope.$on('dakCart: emptied', function() {
                angular.forEach(obj.lists, function(list) {
                    list.unSyncToCart(false);
                    list.update();
                });
            });

            $rootScope.$on('dakShoppingLists: item-changed', function() {
                if (!restoring) {
                    angular.forEach(obj.lists, function(list) {
                        list.update();
                    });
                }
            });


            // ----------------------------
            // LISTS ARRAY
            // ----------------------------

            obj.lists = [];

            // ADD NEW LIST
            obj.newList = function() {
                // define the initial state of the list to be added
                var date = new Date(),
                    year = $filter('date')(date, 'yy'),
                    month = $filter('date')(date, 'MM'),
                    day = $filter('date')(date, 'dd'),
                    idPrefix = '' + year + month + day + '',
                    list = {
                        id: $filter('serialize')(idPrefix),
                        name: '',
                        added: new Date(),
                        active: 1,
                        inCart: false,
                        items: [],
                        syncToCart: function() {
                            this.inCart = 1;
                            dakShoppingCart.lists.push(this);
                            $rootScope.$broadcast('dakShoppingLists: list-synced', {});
                            this.update();
                        },
                        unSyncToCart: function(broadcast) {
                            this.inCart = 0;
                            var idx = dakShoppingCart.lists.indexOf(this);
                            dakShoppingCart.lists.splice(idx, 1);
                            if (broadcast) {
                                $rootScope.$broadcast('dakShoppingLists: list-unsynced', {});
                            }
                            this.update();
                        },
                        count: function() {
                            var sum = 0;
                            angular.forEach(this.items, function(item) {
                                var count = parseFloat(item.count);
                                sum = sum + (count);
                            });
                            return sum;
                        },
                        total: function() {
                            var sum = 0;
                            angular.forEach(this.items, function(item) {
                                if (item.count) {
                                    var count = parseFloat(item.count);
                                    sum = sum + (count * item.product.new_price);
                                }
                            });
                            return sum;
                        },
                        shipping: function() {
                            var sum = 12;
                            if (this.total() > 150) {
                                sum = 0;
                            }
                            return sum;
                        },
                        update: function() {
                            obj.put(this);
                        },
                        remove: function() {
                            obj.remove(this);
                        },
                        removeItem: function(deadItem) {
                            var deferred = $q.defer();
                            var promise = deferred.promise;
                            var list = this;

                            promise.then(function() {
                                angular.forEach(list.items, function(item) {
                                    var iIdx = list.items.indexOf(deadItem);
                                    if (iIdx > -1) {
                                        list.items.splice(iIdx, 1);
                                    }
                                });
                            }).then(function() {
                                obj.put(list);
                                $rootScope.$broadcast('dakShoppingLists: list-changed', {});
                            });
                            deferred.resolve();
                        }
                    };
                // make all the other lists inactive
                // so when this list gets pushed it becomes the active one
                angular.forEach(obj.lists, function(list) {
                    list.active = false;
                });

                // push the list
                obj.lists.push(list);

                // broadcast the creation of the new list
                $rootScope.$broadcast('dakShoppingLists: list-added', list);
                obj.post(list);
            };
            obj.restoreList = function(data) {
                restoring = true;
                var list = {
                    id: data.id,
                    name: data.name,
                    added: data.added,
                    active: data.active,
                    inCart: data.in_cart,
                    items: [],
                    syncToCart: function() {
                        this.inCart = 1;
                        dakShoppingCart.lists.push(this);
                        $rootScope.$broadcast('dakShoppingLists: list-synced', {});
                    },
                    unSyncToCart: function(broadcast) {
                        this.inCart = 0;
                        var idx = dakShoppingCart.lists.indexOf(this);
                        dakShoppingCart.lists.splice(idx, 1);
                        if (broadcast) {
                            $rootScope.$broadcast('dakShoppingLists: list-unsynced', {});
                        }
                    },
                    count: function() {
                        var sum = 0;
                        angular.forEach(this.items, function(item) {
                            var count = parseFloat(item.count);
                            sum = sum + (count);
                        });
                        return sum;
                    },
                    total: function() {
                        var sum = 0;
                        angular.forEach(this.items, function(item) {
                            if (item.count) {
                                var count = parseFloat(item.count);
                                sum = sum + (count * item.product.new_price);
                            }
                        });
                        return sum;
                    },
                    shipping: function() {
                        var sum = 12;
                        if (this.total() > 150) {
                            sum = 0;
                        }
                        return sum;
                    },
                    update: function() {
                        obj.put(list);
                    },
                    remove: function() {
                        obj.remove(this);
                    },
                    removeItem: function(deadItem) {
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        var list = this;

                        promise.then(function() {
                            angular.forEach(list.items, function(item) {
                                var iIdx = list.items.indexOf(deadItem);
                                if (iIdx > -1) {
                                    list.items.splice(iIdx, 1);
                                }
                            });
                        }).then(function() {
                            obj.put(list);
                            $rootScope.$broadcast('dakShoppingLists: list-changed', {});
                        });
                        deferred.resolve();
                    }
                };
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function() {
                    angular.forEach(data.items, function(item) {
                        var product = $filter('filter')($rootScope.products, function(d) {
                            return d.code === item.product;
                        })[0];
                        obj.addItem(list, angular.copy(product), item.size, item.count, angular.copy(item.data));
                    });
                }).then(function() {
                    restoring = false;
                    // push the list
                    obj.lists.push(list);

                    if (list.inCart) {
                        list.syncToCart();
                    };

                    // broadcast the creation of the new list
                    $rootScope.$broadcast('dakShoppingLists: list-added', list);
                });
                deferred.resolve();

            };

            // ------------------------
            // FUNCTIONS
            // ------------------------

            // GET THE ACTIVE LIST
            obj.activeList = function() {
                var active = {};
                angular.forEach(obj.lists, function(list) {
                    if (list.active) {
                        active = list;
                    }
                });
                return active;
            };

            // MAKE LIST ACTIVE BY ID
            obj.makeActive = function(id) {
                angular.forEach(obj.lists, function(list) {
                    if (list.id == id) {
                        list.active = 1;
                        list.update();
                    } else {
                        list.active = 0;
                        list.update();
                    }
                });
            };

            // -------------------------
            // ITEMS
            // -------------------------

            // ADD AN ITEM BASED ON 5 ARGUMENTS
            // 1. the list to add the item to
            // 2. the product
            // 3. the selected size for the product
            // 4. the order count
            // 5. some optional data
            // -----------------------------------
            obj.addItem = function(list, product, size, count, data) {
                var inList = obj.getListItem(product.code, size, list);

                if (angular.isObject(inList)) {
                    //Update quantity of an item if it's already in the list
                    inList.setCount(count, false);
                    $rootScope.$broadcast('dakShoppingLists: item-changed', {});
                } else {
                    var item = {};
                    item.product = angular.copy(product);
                    item.size = size;
                    item.count = parseFloat(count);
                    item.data = angular.copy(data);

                    item.setCount = function(count, newCount) {
                        if (!newCount) {
                            this.count = this.count + parseFloat(count);
                        } else {
                            this.count = parseFloat(count);
                        }
                    };
                    item.maxCount = function() {
                            var max;
                            angular.forEach(this.product.sizes, function(productSize) {
                                if (productSize.name === size) {
                                    max = productSize.count;
                                }
                            });
                            return max;
                        },

                        list.items.push(item);

                    $rootScope.$broadcast('dakShoppingCart: item-added', {});
                    $rootScope.$broadcast('dakShoppingCart: cart-changed', {});
                    $rootScope.$broadcast('dakShoppingLists: item-added', {});
                    $rootScope.$broadcast('dakShoppingLists: item-changed', {});
                }
                $rootScope.$broadcast('dakShoppingLists: list-changed', {});
            };

            obj.getListItem = function(code, size, list) {
                var items = list.items;
                var item = false;

                angular.forEach(items, function(d) {
                    if (d.product.code === code && d.size == size) {
                        item = d;
                    }
                });
                return item;
            };

            obj.getCartItemByCode = function(code) {
                var items = dakShoppingCart.items;
                var item = false;

                angular.forEach(items, function(d) {
                    if (d.product.code === code) {
                        item = d;
                    }
                });
                return item;
            };


            // REMOVE AN ITEM BY PRODUCT.CODE FROM THE SPECIFIED LIST

            obj.removeItem = function(deadItem) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                promise.then(function() {
                    angular.forEach(obj.lists, function(list) {
                        angular.forEach(list.items, function(item) {
                            var iIdx = list.items.indexOf(deadItem);
                            if (iIdx > -1) {
                                list.items.splice(iIdx, 1);
                            }
                        });
                    });
                }).then(function() {
                    $rootScope.$broadcast('dakCart: changed', {});
                });
                deferred.resolve();
            };

            // ---------------------------
            // SEND TO CART
            // ---------------------------

            obj.sendToCart = function(lists, items) {}

            return obj;
        });

})();

(function() {
  'use strict';

  angular.module('daksports')
    .directive('dakShoppingList', function() {
      return {
        restrict: 'E',
        scope: {
          list: '=data',
        },
        replace: true,
        templateUrl: 'app/components/shopping-cart/shopping-list.tpl.html',
        link: function(scope, el, attr) {
            console.log(scope.list);
        }
      }
    });

})();
(function() {
    'use strict';

    angular
        .module('dakCart')
        .factory('dakShoppingCart', function($http, dakAuth, $rootScope, $q, $filter) {
            var obj = {};
            var api = 'api/shopping-lists/';

            obj.products = [];
            obj.items = [];
            obj.lists = [];
            obj.count = function() {
                var sum = 0;
                angular.forEach(this.items, function(item) {
                    var count = parseFloat(item.count);
                    sum = sum + (count);
                });
                return sum;
            };

            obj.getItems = function() {
                obj.items = [];
                angular.forEach(obj.lists, function(list) {
                    angular.forEach(list.items, function(item) {
                        obj.items.push(item);
                    });
                });
            };

            obj.removeItem = function(deadItem) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                promise.then(function() {
                    angular.forEach(obj.lists, function(list) {
                        angular.forEach(list.items, function(item) {
                            var iIdx = list.items.indexOf(deadItem);
                            if (iIdx > -1) {
                                list.items.splice(iIdx, 1);
                            }
                        });
                    });
                }).then(function() {
                    $rootScope.$broadcast('dakCart: changed', {});
                });
                deferred.resolve();
            };

            obj.empty = function() {
                obj.lists=[];
                $rootScope.$broadcast('dakCart: emptied', {});
            };

            obj.getTotal = function() {
                obj.getItems();
                var sum = 0;
                var items = obj.items;
                angular.forEach(items, function(item) {
                    var add = parseFloat(parseFloat(item.count) * parseFloat(item.product.new_price));
                    sum = sum + add;
                });
                return sum;
            };
            obj.shipping = function() {
                var sum = 12;
                if (this.getTotal() > 150) {
                    sum = 0;
                }
                return sum;
            };



            // watchers
            $rootScope.$on('dakShoppingLists: list-changed', function() {
                obj.getItems();
            });
            $rootScope.$on('dakShoppingLists: list-synced', function() {
                obj.getItems();
            });
            $rootScope.$on('dakShoppingLists: list-unsynced', function() {
                obj.getItems();
            });

            return obj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('dakScrollFactory', function() {
            var obj = {};
            
            // is element scrolled or not
            obj.scrolled = false;
            
            // scroll amount
            obj.scroll = 0;
            
            // is scroll position at the (specified) top position?
            obj.scrollTop = true;
            
            // is scroll position at the (specified) bottom position?
            obj.scrollBottom = false;
            
            // what element is in views
            // to be implemented in the future
            obj.scrollView = undefined;
            
            
            return obj;
        });

})();
(function() {
    'use strict';

    angular.module('daksports')
        .directive("dakScroll", function($window, $rootScope, dakScrollFactory) {
            return function(scope, element, attrs) {
                var initSHeight = element[0].scrollHeight, // initial element scroll height
                    initCHeight = element[0].clientHeight, // initial client height
                    offsets = parseFloat(element.css('padding-top')) + parseFloat(element.css('padding-bottom')),
                    initialPos = initSHeight - initCHeight - offsets;
                if (initialPos <= 0) {
                    dakScrollFactory.scrollTop = true;
                    dakScrollFactory.scrollBottom = true;
                    dakScrollFactory.scrolled = false;
                    $rootScope.$broadcast('scroll: bottom', {});
                }else if(initialPos > 0){
                    dakScrollFactory.scrollBottom = false;
                }
                element.on("scroll", function(){
                    var scrollTop = element[0].scrollTop, // scroll from top
                        sHeight = element[0].scrollHeight, // element scroll height
                        cHeight = element[0].clientHeight, // client height
                        scrollPosition = sHeight - cHeight - scrollTop;
                    dakScrollFactory.scroll = scrollTop;
                    if (scrollTop === 0 && scrollPosition > 0) {
                        dakScrollFactory.scrollTop = true;
                        dakScrollFactory.scrolled = false;
                        dakScrollFactory.scrollBottom = false;
                        $rootScope.$broadcast('scroll: top', {});
                    } else if(scrollTop !== 0 && scrollPosition > 0) {
                        dakScrollFactory.scrolled = true;
                        dakScrollFactory.scrollTop = false;
                        dakScrollFactory.scrollBottom = false;
                    };
                    if (scrollPosition === 0) {
                        dakScrollFactory.scrolled = true;
                        dakScrollFactory.scrollTop = false;
                        dakScrollFactory.scrollBottom = true;
                        $rootScope.$broadcast('scroll: bottom', {});
                    }
                    scope.$apply();
                });
                angular.element($window).on('resize', function(){
                    element.scroll();
                });

            };
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('dakNav', function() {
            var obj = {};

            obj.adminItems = [{
                title: 'Items list',
                icon: 'assets/icons/ic_view_list_24px.svg',
                ref: '/admin/list',
            }, {
                title: 'Add item',
                icon: 'assets/icons/ic_playlist_add_24px.svg',
                ref: '/admin/add',
            }, {
                title: 'Orders',
                icon: 'assets/icons/ic_shopping_basket_24px.svg',
                ref: '/admin/orders',
            }, {
                title: 'Settings',
                icon: 'assets/icons/ic_settings_24px.svg',
                ref: '/admin/settings',
            }];

            obj.accountItems = [{
                title: 'Shopping lists',
                icon: 'assets/icons/ic_view_list_24px.svg',
                ref: '/account/lists',
            }, {
                title: 'Favourites',
                icon: 'assets/icons/ic_favorite_24px.svg',
                ref: '/account/favourites',
            }, {
                title: 'My reviews',
                icon: 'assets/icons/ic_rate_review_24px.svg',
                ref: '/account/reviews',
            }, {
                title: 'Settings',
                icon: 'assets/icons/ic_settings_24px.svg',
                ref: '/account/settings',
            }];

            obj.menuItems = [{
                title: 'View Cart',
                icon: 'assets/icons/ic_shopping_cart_24px.svg',
                ref: '/cart',
            }, {
                title: 'Store',
                icon: 'assets/icons/ic_store_24px.svg',
                ref: '/store'
            }];

            obj.bottomItems = [{
                title: 'View Cart',
                icon: 'assets/icons/ic_shopping_cart_24px.svg',
                ref: '/cart',
            }, {
                title: 'Store',
                icon: 'assets/icons/ic_store_24px.svg',
                ref: '/store'
            },{
                title: 'Settings',
                icon: 'assets/icons/ic_settings_24px.svg',
                ref: '/account/settings',
            }];

            return obj;
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .controller('NavCtrl', function($rootScope, $scope, $state, $location, dakAuth, dakNav, dakShoppingCart ,Counter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter, FitFilter) {

            // LOGOUT
            this.logout = function() {
                dakAuth.$unauth();
                $location.path('');
            };

            // FILTERS
            $scope.dakShoppingCart = dakShoppingCart;
            $scope.Counter = Counter;
            $scope.BrandFilter = BrandFilter;
            $scope.TypeFilter = TypeFilter;
            $scope.KindFilter = KindFilter;
            $scope.PriceFilter = PriceFilter;
            $scope.PromoFilter = PromoFilter;
            $scope.FitFilter = FitFilter;

            $scope.state = $state;
            $scope.dakNav = dakNav;


        })
        .controller('NavSectionCtrl', function($rootScope, $scope, BrandFilter) {

        })
        .controller('NavListCtrl', function($rootScope, $scope, BrandFilter) {
            var scope = this;

            scope.size = 0;
            scope.expanded = false;
            scope.expand = function() {
                scope.expanded = !scope.expanded;
                (scope.expanded) ? scope.size = 44 : scope.size = 0;
            };
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .factory('heroService', function() {
            var obj = {};

            // hero file path
            obj.src = '';

            obj.position = 'center';

            return obj;
        });

})();

(function () {
    'use strict';

    angular
        .module('daksports')
        .component('dakHero', {
            restrict: 'E',
            controller: 'DakHeroCtrl',
            controllerAs: 'hero',
            templateUrl: 'app/components/hero/hero.tpl.html'
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .controller('DakHeroCtrl', function($rootScope, $scope, dakScrollFactory, heroService) {

            $rootScope.$broadcast('hero: on', {});

            $scope.$on('$destroy', function () {
                $rootScope.$broadcast('hero: off', {});
            });

            var hero = this;

            hero.dakScroll = dakScrollFactory;
            hero.heroService = heroService;
            hero.src = heroService.src;
        });

})();

(function() {
    'use strict';

    angular
        .module('daksports')
        .filter('brandFilter', function($rootScope) {
            return function(items, brand) {
                var filtered = [];
                // console.log(brand);
                // return items;
                if (brand.length <= 0 || brand[0] == 'All-brands') {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.brand && brand.indexOf(item.brand) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('typeFilter', function($rootScope) {
            return function(items, type) {
                var filtered = [];
                // return items;
                if (type.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    var itemType = item.type;
                    // console.log(itemType);
                    if (itemType && type.indexOf(itemType) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('kindFilter', function($rootScope) {
            return function(items, kind) {
                var filtered = [];
                // return items;
                if (kind.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.kind && kind.indexOf(item.kind) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('priceFilter', function($rootScope) {
            return function(items, range) {
                var filtered = [];
                if (range != null) {
                    range.min = parseFloat(range.min), range.max = parseFloat(range.max);
                }
                // return items;
                if (!angular.isObject(range)) {
                    return items;
                }
                angular.forEach(items, function(item) {

                    if (!range.min && !range.max) {
                        filtered.push(item);
                    } else if (range.min && !range.max) {
                        if (item.new_price >= range.min) {
                            filtered.push(item);
                        }
                    } else if (!range.min && range.max) {
                        if (item.new_price < range.max) {
                            filtered.push(item);
                        }
                    } else if (range.min && range.max) {
                        if (item.new_price >= range.min && item.new_price < range.max) {
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            };
        })
        .filter('promoFilter', function() {
            return function(items, value) {
                var filtered = [];
                if (!value) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.promo == value) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('favFilter', function() {
            return function(items, value) {
                var filtered = [];
                if (!value) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.favourite == value) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('fitForMeFilter', function($rootScope) {
            return function(items, value) {
                var filtered = [];
                if (!value || !$rootScope.userData) {
                    return items;
                }
                var gender = $rootScope.userData.gender;
                var shoeSize = $rootScope.userData.shoe_size;
                var topSize = $rootScope.userData.top_size;
                var pantsSize = $rootScope.userData.pants_size;
                angular.forEach(items, function(item) {
                    if (item.gender == gender || item.gender == 0) {
                        if (item.sizes) {
                            var i = 0;
                            angular.forEach(item.sizes, function(size) {
                                if (size.name == shoeSize || size.name == topSize || size.name == pantsSize && i < 1) {
                                    if (size.count > 0) {
                                        filtered.push(item);
                                        i++;
                                    }
                                }
                            });
                        } else if (!item.sizes) {
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            };
        })
        .filter('excludeFilter', function($rootScope) {
            return function(items, code) {
                var filtered = [];
                angular.forEach(items, function(item) {
                    if (item.code != code) {
                        filtered.push(item);
                    }
                })
                return filtered;
            };
        });

})();
(function() {
    'use strict';

    angular.module('daksports')
        .factory('Counter', function($rootScope, $filter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter, FitFilter){
            var obj = {};
            var res = {};
            obj.count = function(query, list) {
                if (list === 'brands') {
                    res = $filter('typeFilter')($rootScope.products, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('brandFilter')(res, query).length;
                }else if(list === 'types'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('typeFilter')(res, query).length;
                }else if(list === 'kinds'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('kindFilter')(res, query).length;
                }else if(list === 'prices'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('priceFilter')(res, query).length;
                }else if(list === 'promos'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('fitForMeFilter')(res, FitFilter.state);
                    return $filter('promoFilter')(res, query).length;
                }else if(list === 'fit'){
                    res = $filter('brandFilter')($rootScope.products, BrandFilter.selected);
                    res = $filter('typeFilter')(res, TypeFilter.selected);
                    res = $filter('kindFilter')(res, KindFilter.selected);
                    res = $filter('priceFilter')(res, PriceFilter.selected);
                    res = $filter('promoFilter')(res, PromoFilter.state);
                    return $filter('fitForMeFilter')(res, query).length;
                }
            }
            
            obj.filtersOn = function(){
                var bool = false;
                if(BrandFilter.selected.length || TypeFilter.selected.length || KindFilter.selected.length || PriceFilter.selected != null || PromoFilter.state){
                    bool = true;
                }
                return bool;
            }
            return obj;
        })
        .factory('BrandFilter', function() {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(brand) {
                var idx = obj.selected.indexOf(brand);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(brand);
            };
            obj.exists = function(brand) {
                return obj.selected.indexOf(brand) > -1;
            };
            obj.reset = function() {
                obj.selected = [];
            }

            return obj;
        })
        .factory('TypeFilter', function() {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(type) {
                var idx = obj.selected.indexOf(type);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(type);
            };
            obj.exists = function(type) {
                return obj.selected.indexOf(type) > -1;
            };
            obj.reset = function() {
                obj.selected = [];
            }
            return obj;
        })
        .factory('KindFilter', function() {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(kind) {
                var idx = obj.selected.indexOf(kind);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(kind);
            };
            obj.exists = function(kind) {
                return obj.selected.indexOf(kind) > -1;
            };
            obj.reset = function() {
                obj.selected = [];
            }
            return obj;
        })
        .factory('PriceFilter', function() {
            var obj = {};
            obj.selected = null;
            return obj;
        })
        .factory('PromoFilter', function() {
            var obj = {};
            obj.state = 0;
            return obj;
        })
        .factory('FitFilter', function() {
            var obj = {};
            obj.state = 0;
            return obj;
        });

})();
(function() {
  'use strict';

  angular.module('daksports')
    .controller('FilterBlockCtrl', function($scope) {

    })
    .controller('FilterParentCtrl', function($scope) {
      $scope.expanded = false;
      $scope.active = false;
      $scope.expand = function() {
        $scope.expanded = !$scope.expanded;
      }
    });

})();
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

(function() {
  'use strict';

  angular.module('daksports')
    .directive('dakCard', function() {
      return {
        restrict: 'E',
        controller: 'CardCtrl',
        scope: {
          item: '=cardResource',
        },
        replace: true,
        templateUrl: 'app/components/cards/card.tpl.html',
        link: function(scope, el, attr) {
        }
      }
    })
    .directive('dakCardPreview', function() {
      return {
        restrict: 'E',
        controller: 'CardCtrl',
        scope: {
          item: '=cardResource',
        },
        replace: true,
        templateUrl: 'app/components/cards/card.preview.tpl.html',
        link: function(scope, el, attr) {
        }
      }
    })
    .directive('dakTile', function() {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, el, attr) {
          el.addClass('dak-tile');
        }
      }
    });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .controller('CardCtrl', function($http, $rootScope, $scope, $mdDialog, $cookies, $mdBottomSheet, dakShoppingLists, dakShoppingCart) {

            // ADD TO CART
            $scope.order = {
                size: '',
                count: '',
                quantity: 1
            }
            $scope.showSetOrder = false;
            $scope.setOrder = function(){
                $scope.showSetOrder = !$scope.showSetOrder;
            };
            $scope.orderProduct = function(item, order){
                dakShoppingLists.addItem(dakShoppingLists.activeList(), item, order.size.name, order.quantity);
                $scope.discardOrder();
            };
            $scope.discardOrder = function(){
                $scope.order = {
                    size: '',
                    count: '',
                    quantity: 1
                };
                $scope.orderForm.$setPristine();
                $scope.orderForm.$setUntouched();
                $scope.showSetOrder = false;
            };
            $scope.dakShoppingLists = dakShoppingLists;
            $scope.addToCart = function(item) {
                dakShoppingLists.addItem(dakShoppingLists.activeList(), item, '', 1);
            };

            // CARD MENU
            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            // BOTTOM LIST
            $scope.showListBottomSheet = function(ev, target) {
                console.log(ev);
                $mdBottomSheet.show({
                    parent: ev.currentTarget.offsetParent.offsetParent,
                    templateUrl: 'app/components/card/card.bs.tpl.html',
                    controller: 'ListBottomSheetCtrl',
                    targetEvent: ev
                }).then(function(clickedItem) {
                    $scope.alert = clickedItem.name + ' clicked!';
                });
            }

            // ADD TO FAV
            $scope.postFav = function(code, fav) {
                var data = {
                    userid: $rootScope.userData.uid,
                    code: code
                };
                if (fav) {
                    $http.post('api/accounts/removeuserfav.php', data)
                        .then(function(response) {
                            $scope.item.favourite = false;
                        }).catch(function(error) {
                            console.log(error);
                        });
                } else {
                    $http.post('api/accounts/postuserfav.php', data)
                        .then(function(response) {
                            $scope.item.favourite = true;
                        }).catch(function(error) {
                            console.log(error);
                        });
                }

            }
        })
        .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
            $scope.items = [{
                name: 'Comanda',
                icon: 'assets/icons/ic_add_shopping_cart_black_24px.svg'
            }, {
                name: 'Favorite',
                icon: 'assets/icons/ic_favorite_border_black_24px.svg'
            }];
            $scope.listItemClick = function($index) {
                var clickedItem = $scope.items[$index];
                $mdBottomSheet.hide(clickedItem);
            };
        });

})();

(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('AppBarCtrl', function($scope, $log, LOGOS, dakScrollFactory) {

            $scope.LOGOS = LOGOS;

            // TOGGLE SEARCH BAR
            $scope.showSearchBar = false;
            $scope.toggleSearchBar = function() {
                $scope.showSearchBar = !$scope.showSearchBar;
            };
            $scope.hideSearchBar = function() {
                $scope.showSearchBar = false;
            };

            // -----------------------
            // HANDLE TRANSPARENCY IF THE PAGE HAS A HERO
            // -----------------------

            $scope.hasHero = false;
            $scope.$on('hero: on', function() {
                $log.warn('hero is on');
                if (dakScrollFactory.scrollTop) {
                    $scope.hasHero = true;
                } else {
                    $scope.hasHero = false;
                }
            });
            $scope.$on('hero: off', function() {
                $log.warn('hero is off');
                $scope.hasHero = false;
            });
            // $scope.$watch(
            //     // This function returns the value being watched. It is called for each turn of the $digest loop
            //     function() {
            //         return dakScrollFactory.scrollTop;
            //     },
            //     // This is the change listener, called when the value returned from the above function changes
            //     function(newValue, oldValue) {
            //         if (newValue !== oldValue) {
            //             // Only increment the counter if the value changed
            //             $scope.hasHero = newValue;
            //         }
            //     }
            // );

        });

})();

(function() {
  'use strict';

  angular
    .module('daksports')
    .value('AUTHDATA', {
        logged: false,
        uid: null
    })
    .value('PLACEHOLDERS', {
        user_photo: 'assets/media/placeholders/user-photo.png',
        user_photo_upload : 'assets/media/placeholders/user-photo-upload.png'
    })
    .value('LOGOS', {
        login_logo: 'assets/media/logos/dak_logo.svg',
        appbar_logo: 'assets/media/logos/dak_appbar_logo.svg',
        sidenav_logo: 'assets/media/logos/dak_sidenav_logo.svg'
    });

})();

(function () {
    'use strict';

    angular
        .module('daksports')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $firebaseAuth, FIREBASE_URL, AUTHDATA) {

        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);

        var authData = authObj.$getAuth();
        // $log.debug("checking if session exists");

        if (authData) {
            // $log.debug("Session exists");
            AUTHDATA.logged = true;
            AUTHDATA.uid = authData.uid;
        } else {
            // $log.debug("No session present");
            AUTHDATA.logged = false;
            AUTHDATA.uid = null;
        }
        // $log.debug('runBlock end');

    }

})();

(function() {
    'use strict';

    angular
        .module('daksports')
        .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'app/views/main/main.view.html',
                    controller: 'MainCtrl'
                })
                .state('store', {
                    url: '/store',
                    templateUrl: 'app/views/store/store.view.html',
                    params: {department: null},
                    controller: 'DakStoreCtrl'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'app/views/auth/auth.view.html',
                    controller: 'DakAuthCtrl'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'app/views/admin/admin.view.html',
                    controller: 'DakAdminCtrl'
                })
                .state('admin.add', {
                    url: '/add',
                    templateUrl: 'app/views/admin/admin.add.view.html',
                    controller: 'DakAddCtrl'
                })
                .state('admin.settings', {
                    url: '/settings',
                    templateUrl: 'app/views/admin/settings/admin.settings.view.html',
                    controller: 'DakAdminSettingsCtrl'
                });
            $locationProvider.html5Mode(true);
        });

})();

(function() {
    'use strict';

    angular
        .module('daksports')
        .filter('dakRandomize', function() {
            return function(input) {
                if (input !== null && input !== undefined && input > 1) {
                    return Math.floor((Math.random() * input) + 1);
                }
            };
        })
        .filter('dakShuffle', function() {
            var shuffledArr = [],
                shuffledLength = 0;
            return function(arr, shuffled) {
                if (arr && shuffled) {
                    var o = arr.slice(0, arr.length);
                    if (shuffledLength === arr.length) {
                        return shuffledArr;
                    }
                    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
                        shuffledArr = o;
                        shuffledLength = o.length;
                        return o;
                    }
                } else {
                    return arr;
                }
            };
        })
        .filter('dakReverse', function() {
            return function(items) {
                if (items) {
                    return items.slice().reverse();
                } else {
                    return items;
                }
            };
        })
        .filter('dakQuantize', function() {
            return function(input, steps) {
                var step = 100 / steps;
                var halfstep = step / 2;
                if (input !== null && input !== undefined) {
                    input = parseFloat(input);
                    while (--steps + 1 > 0) {
                        var threshold = step * steps + halfstep;
                        if (input >= threshold) {
                            return steps + 1;
                            break;
                        }
                    }
                }
            };
        })
        .filter('dakSerialize', function() {
            return function(input) {
                if (input !== null && input !== undefined) {
                    var min = 10000;
                    var max = 99999;
                    var num = Math.floor(Math.random() * (max - min + 1)) + min;
                    return input + '' + num;
                }
            };
        })
        .filter('dakShortify', function() {
            return function(input) {
                if (input !== null && input !== undefined && input !== "") {
                    return angular.uppercase(input.replace(/[aeiou]/ig, '').substring(0, 3));
                }else{
                    return input;
                }
            };
        })
        .filter('dakFilename', function() {
            return function(input) {
                if (input !== null && input !== undefined && input !== "") {
                    return input.substring(input.lastIndexOf('/')+1);
                }
            };
        })
        .filter('dakLowres', function() {
            return function(input) {
                // return input ? input.replace(/(\.[\w\d_-]+)$/i, '_low$1') : input;
                var checkFile = input.replace(/(\.[\w\d_-]+)$/i, '_low$1');
                var img = new Image();
                img.src = checkFile;
                if (img.height != 0){
                    return input ? input.replace(/(\.[\w\d_-]+)$/i, '_low$1') : input;
                }else{
                    return input;
                }
            };
        })
        .filter('dakMedres', function() {
            return function(input) {
                // return input ? input.replace(/(\.[\w\d_-]+)$/i, '_medium$1') : input;
                var checkFile = input.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                var img = new Image();
                img.src = checkFile;
                if (img.height != 0){
                    return input ? input.replace(/(\.[\w\d_-]+)$/i, '_medium$1') : input;
                }else{
                    return input;
                }
            };
        })
        .filter('dakHighres', function() {
            return function(input) {
                // return input ? input.replace(/(\.[\w\d_-]+)$/i, '_high$1') : input;
                var checkFile = input.replace(/(\.[\w\d_-]+)$/i, '_high$1');
                var img = new Image();
                img.src = checkFile;
                if (img.height != 0){
                    return input ? input.replace(/(\.[\w\d_-]+)$/i, '_high$1') : input;
                }else{
                    return input;
                }
            };
        });

})();

(function() {
    'use strict';

    angular.module('daksports')
        .directive('dakCapitalizeFirst', function($parse) {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, modelCtrl) {
                    var capitalize = function(inputValue) {
                        if (inputValue === undefined) {
                            inputValue = '';
                        }
                        var capitalized = inputValue.charAt(0).toUpperCase() +
                            inputValue.substring(1).toLowerCase();
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    };
                    modelCtrl.$parsers.push(capitalize);
                    capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
                }
            };
        })
        .directive('dakCapitalize', function($parse) {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, modelCtrl) {
                    var capitalize = function(inputValue) {
                        if (inputValue === undefined) {
                            inputValue = '';
                        }
                        var capitalized = inputValue.toUpperCase();
                        if (capitalized !== inputValue) {
                            modelCtrl.$setViewValue(capitalized);
                            modelCtrl.$render();
                        }
                        return capitalized;
                    };
                    modelCtrl.$parsers.push(capitalize);
                    capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
                }
            };
        });

})();

(function() {
    'use strict';

    angular
        .module('daksports')
        .controller('DakCtrl', function($scope, $rootScope, $timeout, $log, $firebaseArray, $firebaseObject, $mdMedia, FIREBASE_USERS_URL, FIREBASE_URL, AUTHDATA, LOGOS, dakAuth, dakItems, dakScrollFactory, depsFactory, gridFactory, typesFactory, kindsFactory, brandsFactory) {

            var dak = this;

            $scope.dakScroll = dakScrollFactory;
            dak.LOGOS = LOGOS;

            // ---------------------------
            // ACCOUNT
            // ---------------------------
            dak.account = {};
            dak.logged = false;

            dakAuth.$onAuth(function(authData) {
                if (authData) {
                    dak.logged = true;
                    // get user data
                    var userRef = new Firebase(FIREBASE_USERS_URL + '/' + authData.uid);
                    var userObj = $firebaseObject(userRef);
                    userObj.$bindTo($scope, "account")
                        .then(function() {
                            dak.account = $scope.account;
                        });


                } else {
                    dak.account = {};
                    dak.logged = false;
                }
            });

            // ---------------------------
            // SIDEBAR
            // ---------------------------

            // sidebar toggle

            dak.sidebarOpen = $mdMedia('gt-sm');
            dak.toggleSidebar = function() {
                dak.sidebarOpen = !dak.sidebarOpen;
            };

            // ------------------------
            // ITEMS
            // ------------------------

            dak.items = null;
            dakItems.$loaded()
                .then(function(data) {
                    data.$bindTo($scope, "dak.items")
                        .then(function() {
                            $rootScope.$broadcast('items: loaded', {});
                        });
                })
                .catch(function(error) {
                    console.error("Error:", error);
                });

            // ------------------------
            // STRUCTURE
            // ------------------------

            // DEPARTMENTS

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

            dak.structure = {};


            // load departments
            departments.$loaded()
                .then(function(data) {
                    dak.structure.departments = data;
                    depsFactory.deps = dak.structure.departments;
                    $rootScope.$broadcast('departments: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load departments
            grid.$loaded()
                .then(function(data) {
                    dak.structure.grid = data;
                    gridFactory.grid = dak.structure.grid;
                    $rootScope.$broadcast('grid: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load brands
            brands.$loaded()
                .then(function(data) {
                    dak.structure.brands = data;
                    brandsFactory.brands = dak.structure.brands;
                    $rootScope.$broadcast('brands: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load types
            types.$loaded()
                .then(function(data) {
                    dak.structure.types = data;
                    typesFactory.types = dak.structure.types;
                    $rootScope.$broadcast('types: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            // load kinds
            kinds.$loaded()
                .then(function(data) {
                    dak.structure.kinds = data;
                    kindsFactory.kinds = dak.structure.kinds;
                    $rootScope.$broadcast('kinds: bound', {});
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

        });

})();

(function() {
  'use strict';

  angular
    .module('daksports')
    .constant('FIREBASE_URL', 'https://daksports.firebaseio.com')
    .constant('FIREBASE_USERS_URL', 'https://daksports.firebaseio.com/users')
    .constant('FIREBASE_ITEMS_URL', 'https://daksports.firebaseio.com/items');

})();

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

angular.module("daksports").run(["$templateCache", function($templateCache) {$templateCache.put("app/components/appbar/appbar.tpl.html","<md-toolbar class=\"dak-appbar\" ng-class=\"{transparent : hasHero, scrolled : !dakScroll.scrollTop}\" md-theme=\"brand-black\" layout layout-align=\"start center\">\r\n    <div class=\"appbar-left\" flex-gt-md=\"25\" flex=\"60\">\r\n        <div class=\"slide-left\" ng-hide=\"dak.sidebarOpen\" layout=\"row\" layout-align=\"start center\">\r\n            <md-button aria-label=\"Toggle Menu\" class=\"md-icon-button l-left\" ng-click=\"dak.toggleSidebar(); dak.hideSearchBar()\">\r\n                <md-icon md-svg-src=\"assets/icons/ic_menu_24px.svg\"></md-icon>\r\n            </md-button>\r\n            <h1 class=\"appbar-logo-box\" md-ink-ripple md-theme=\"brand-black\" flex layout=\"row\" layout-align=\"start center\">\r\n                <a href=\"/\" class=\"logo-wrapper\" style=\"background-image: url({{LOGOS.appbar_logo}})\" flex></a>\r\n            </h1>\r\n        </div>\r\n    </div>\r\n    <span flex></span>\r\n    <div class=\"appbar-right\" layout=\"row\" layout-align=\"start center\">\r\n        <a aria-label=\"View facebook page\" class=\"md-icon-button l-right\" md-button ng-href=\"https://www.facebook.com/daksports\" target=\"_blank\">\r\n            <md-icon md-svg-src=\"assets/icons/social_facebook_24px.svg\"></md-icon>\r\n        </a>\r\n        <a aria-label=\"View facebook page\" class=\"md-icon-button l-right\" md-button ng-href=\"https://www.google.com/+ionutachim23\" target=\"_blank\">\r\n            <md-icon md-svg-src=\"assets/icons/social_google_plus_24px.svg\"></md-icon>\r\n        </a>\r\n        <md-button aria-label=\"Search\" class=\"appbar-search-button md-icon-button l-right\" ng-click=\"dak.toggleSearchBar($event)\">\r\n            <md-icon md-svg-src=\"assets/icons/ic_search_24px.svg\"></md-icon>\r\n        </md-button>\r\n    </div>\r\n</md-toolbar>\r\n<div class=\"dak-loader\" ng-if=\"0\">\r\n    <div class=\"dak-loader-colours\"></div>\r\n</div>");
$templateCache.put("app/components/cards/card.bs.tpl.html","<md-bottom-sheet class=\"md-list md-has-header\">\r\n  <md-subheader>Comment Actions</md-subheader>\r\n  <md-input-container class=\"item-count\" flex flex-gt-md=\"10\">\r\n      <label>Cantitate</label>\r\n      <input name=\"itemCount\" ng-model=\"order.quantity\" step=\"any\" type=\"number\">\r\n      <div ng-messages=\"productForm.promoprice.$error\" ng-show=\"orderForm.itemCount.$invalid && orderForm.itemCount.$dirty\">\r\n          <div ng-message=\"number\">Doar cifrele sunt permise</div>\r\n      </div>\r\n  </md-input-container>\r\n  <md-list>\r\n    <md-list-item ng-repeat=\"item in items\">\r\n      <md-button class=\"md-list-item-content\" ng-click=\"listItemClick($index)\">\r\n        <md-icon md-svg-src=\"{{item.icon}}\"></md-icon>\r\n        <span class=\"md-inline-list-icon-label\">{{ item.name }}</span>\r\n      </md-button>\r\n    </md-list-item>\r\n  </md-list>\r\n</md-bottom-sheet>");
$templateCache.put("app/components/cards/card.preview.tpl.html","<div class=\"dak-card paper resting slide-top\" ng-cloak>\r\n    <div class=\"product-media\">\r\n        <div accept=\"image/*\" class=\"product-img ar_1-1\" md-ink-ripple ng-cloak style=\"background-image: url({{item.files[item.thumb] | dakLowres}})\">\r\n            <input nv-file-select type=\"file\" uploader=\"uploader\" multiple=\"multiple\">\r\n            <div class=\"hoverlay\"></div>\r\n            <md-icon class=\"search-file\">\r\n                <i class=\"material-icons\">&#xE8B6;</i>\r\n            </md-icon>\r\n            <md-button class=\"md-icon-button remove-file\" ng-click=\"uploader1.clearQueue(); uploader1.clearThumb();\" ng-show=\"uploader1.queue.length > 0 || temp.photo1 != \'uploads/placeholder.png\'\" type=\"button\">\r\n                <md-icon>\r\n                    <i class=\"material-icons\">&#xE5CD;</i>\r\n                </md-icon>\r\n            </md-button>\r\n        </div>\r\n        <div class=\"hoverlay\"></div>\r\n        <div class=\"product-media-actions\">\r\n            <div class=\"scrim top\"></div>\r\n            <a aria-label=\"Editeaza produs\" class=\"md-icon-button add-to-favourites\" md-button ng-href=\"/admin/edit/{{item.code}}\" ng-if=\"$root.userData.admin && $root.logged\">\r\n                <md-tooltip>\r\n                    Editeaza produs\r\n                </md-tooltip>\r\n                <md-icon md-svg-src=\"assets/icons/ic_create_white_24px.svg\" style=\"width: 24px; height: 24px\"></md-icon>\r\n            </a>\r\n        </div>\r\n        <div class=\"promo-badge\" ng-show=\"item.is_promo\">\r\n            <md-tooltip>\r\n                Produs promo\r\n            </md-tooltip>\r\n            <md-icon class=\"brand-text\" md-svg-src=\"assets/icons/recommended_badge.svg\" style=\"width: 48px; height: 48px\"></md-icon>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-info\">\r\n        <div class=\"info-container\">\r\n            <h2 class=\"product-title single-line\">{{item.name}}</h2>\r\n            <div class=\"subtitle-container\">\r\n                <p class=\"product-subtitle single-line secondary-text-color\">{{item.subname}}</p>\r\n            </div>\r\n            <div class=\"excerpt-container\">\r\n                <p class=\"product-excerpt secondary-text-color\" dak-lines-limit=\"2\">{{item.excerpt}}</p>\r\n            </div>\r\n            <div aria-hidden=\"true\" class=\"description-container is-hidden\">\r\n                <p>{{item.excerpt}}</p>\r\n                <p>{{item.description}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-menu\">\r\n            <md-menu md-position-mode=\"target-right target\">\r\n                <md-button aria-label=\"Deschide meniu card\" class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\">\r\n                    <md-icon md-menu-origin md-svg-src=\"assets/icons/ic_more_vert_24px.svg\"></md-icon>\r\n                </md-button>\r\n                <md-menu-content width=\"3\">\r\n                    <md-menu-item>\r\n                        <md-button aria-label=\"Adauga in cos\" ng-click=\"setOrder()\">\r\n                            <div layout=\"row\">\r\n                                <p flex style=\"margin-left:8px\">Add to cart</p>\r\n                            </div>\r\n                        \r\n                    </md-button>\r\n                </md-menu-item>\r\n                <md-menu-item>\r\n                    <md-button aria-label=\"Adauga la favorite\" ng-click=\"postFav(item.code, item.favourite)\">\r\n                        <div layout=\"row\">\r\n                            <p flex style=\"margin-left:8px\">Add to favourites</p>\r\n                        </div>\r\n                    </md-button>\r\n                </md-menu-item>\r\n            </md-menu-content>\r\n        </md-menu>\r\n    </div>\r\n</div>\r\n<div class=\"product-actions\">\r\n    <div class=\"stars-container\">\r\n        <md-icon class=\"tiny-star\" md-svg-src=\"assets/icons/ic_star_tiny_14px.svg\" ng-class=\"{\'fill\' : count <= item.rating}\" ng-repeat=\"count in [1,2,3,4,5]\"></md-icon>\r\n    </div>\r\n    <div class=\"price-container\" ng-class=\"{promo : item.is_promo}\">\r\n        <div class=\"promo-price fade\" ng-cloak ng-show=\"item.is_promo\">\r\n            {{item.promo_price | number : 2  | currency : \"€\"}}</div>\r\n        <div ng-cloak>\r\n            <span class=\"price\" ng-cloak>{{item.price | number : 2 | currency : \"€\"}}</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"product-set-order\" ng-class=\"{on : showSetOrder}\"></div>\r\n</div>");
$templateCache.put("app/components/cards/card.tpl.html","<div class=\"dak-card paper resting slide-top\" ng-cloak>\r\n    <div class=\"product-media\">\r\n        <a href=\"/product/{{item.code}}\">\r\n            <div class=\"product-img ar_1-1\" md-ink-ripple ng-cloak style=\"background-image: url({{item.files[item.thumb] | dakLowres}})\"></div>\r\n            <div class=\"hoverlay\"></div>\r\n        </a>\r\n        <div class=\"product-media-actions\">\r\n            <div class=\"scrim top\"></div>\r\n            <a aria-label=\"Editeaza produs\" class=\"md-icon-button add-to-favourites\" md-button ng-href=\"/admin/edit/{{item.code}}\" ng-if=\"$root.userData.admin && $root.logged\">\r\n                <md-tooltip>\r\n                    Editeaza produs\r\n                </md-tooltip>\r\n                <md-icon md-svg-src=\"assets/icons/ic_create_white_24px.svg\" style=\"width: 24px; height: 24px\"></md-icon>\r\n            </a>\r\n        </div>\r\n        <div class=\"promo-badge\" ng-show=\"item.is_promo\">\r\n            <md-tooltip>\r\n                Discount\r\n            </md-tooltip>\r\n            <md-icon md-svg-src=\"assets/icons/promo_badge.svg\" style=\"width: 48px; height: 48px\"></md-icon>\r\n        </div>\r\n        <div class=\"promo-badge\" ng-show=\"!item.is_promo && item.is_recommended\">\r\n            <md-tooltip>\r\n                Recommended\r\n            </md-tooltip>\r\n            <md-icon class=\"brand-text\" md-svg-src=\"assets/icons/recommended_badge.svg\" style=\"width: 48px; height: 48px\"></md-icon>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-info\">\r\n        <div class=\"info-container\">\r\n            <h2 class=\"product-title single-line\">{{item.name}}</h2>\r\n            <div class=\"subtitle-container\">\r\n                <p class=\"product-subtitle single-line secondary-text-color\">{{item.subname}}</p>\r\n            </div>\r\n            <div class=\"excerpt-container\">\r\n                <p class=\"product-excerpt secondary-text-color\" dak-lines-limit=\"2\">{{item.excerpt}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-menu\">\r\n            <md-menu md-position-mode=\"target-right target\">\r\n                <md-button aria-label=\"Deschide meniu card\" class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\">\r\n                    <md-icon md-menu-origin md-svg-src=\"assets/icons/ic_more_vert_24px.svg\"></md-icon>\r\n                </md-button>\r\n                <md-menu-content width=\"3\">\r\n                    <md-menu-item>\r\n                        <md-button aria-label=\"Adauga in cos\" ng-click=\"setOrder()\">\r\n                            <div layout=\"row\">\r\n                                <p flex style=\"margin-left:8px\">Add to cart</p>\r\n                            </div>\r\n                        </md-button>\r\n                    </md-menu-item>\r\n                    <md-menu-item>\r\n                        <md-button aria-label=\"Adauga la favorite\" ng-click=\"postFav(item.code, item.favourite)\">\r\n                            <div layout=\"row\">\r\n                                <p flex style=\"margin-left:8px\">Add to favourites</p>\r\n                            </div>\r\n                        </md-button>\r\n                    </md-menu-item>\r\n                </md-menu-content>\r\n            </md-menu>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-actions\">\r\n        <div class=\"stars-container\">\r\n            <md-icon class=\"tiny-star\" md-svg-src=\"assets/icons/ic_star_tiny_14px.svg\" ng-class=\"{\'fill\' : count <= item.rating}\" ng-repeat=\"count in [1,2,3,4,5]\"></md-icon>\r\n        </div>\r\n        <div class=\"price-container\" ng-class=\"{promo : item.is_promo}\">\r\n            <div class=\"promo-price fade\" ng-cloak ng-show=\"item.is_promo\">\r\n                {{item.promo_price | number : 2  | currency : \"€\"}}</div>\r\n            <div ng-cloak>\r\n                <span class=\"price\" ng-cloak>{{item.price | number : 2 | currency : \"€\"}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-set-order\" ng-class=\"{on : showSetOrder}\"></div>\r\n    <form class=\"product-order-form\" name=\"orderForm\" ng-class=\"{on : showSetOrder}\" ng-submit=\"orderProduct(item, order)\" novalidate>\r\n        <md-icon class=\"discard-order-button\" md-ink-ripple md-svg-src=\"assets/icons/ic_close_24px.svg\" ng-click=\"discardOrder()\"></md-icon>\r\n        <!-- <span>Configureaza-ti comanda</span> -->\r\n        <div class=\"input-wrapper\">\r\n            <div class=\"item-count-wrapper\">\r\n                <md-input-container class=\"item-count\">\r\n                    <label>Cantitate</label>\r\n                    <input max=\"{{order.size.count}}\" min=\"1\" name=\"itemCount\" ng-model=\"order.quantity\" required step=\"any\" type=\"number\" value=\"1\">\r\n                    <div ng-messages=\"orderForm.itemCount.$error\" ng-show=\"orderForm.itemCount.$invalid && orderForm.itemCount.$dirty\">\r\n                        <div ng-message=\"number\" style=\"width:500px\">Doar cifrele sunt permise</div>\r\n                        <div ng-message=\"min\" style=\"width:500px\">Cantitatea minima este 1</div>\r\n                        <div ng-message=\"max\" style=\"width:500px\">Maxim\r\n                            {{order.size.count}}\r\n                            pt. marimea asta</div>\r\n                        <div ng-message=\"required\" style=\"width:100%\">Introdu o cantitate</div>\r\n                    </div>\r\n                </md-input-container>\r\n            </div>\r\n            <div class=\"item-size-wrapper\">\r\n                <md-input-container class=\"item-size\" ng-show=\"item.sizes.length > 1 || item.sizes[0].name\">\r\n                    <label>Marime</label>\r\n                    <md-select aria-label=\"Size select\" ng-model=\"order.size\" ng-required=\"{{item.sizes.length > 1  || item.sizes[0].name}}\">\r\n                        <md-option ng-repeat=\"size in item.sizes\" ng-value=\"size\">{{size.name}}</md-option>\r\n                    </md-select>\r\n                </md-input-container>\r\n            </div>\r\n            <!-- <span ng-show=\"item.sizes.length > 1\" show-gt-sm></span> -->\r\n            <span ng-show=\"item.sizes.length > 1\" show-gt-sm></span>\r\n            <button class=\"dak-button\" md-ink-ripple md-theme=\"brand-black\" ng-disabled=\"orderForm.$invalid\" type=\"submit\">\r\n                <div class=\"icon-bg\"></div>\r\n                <md-icon md-svg-src=\"assets/icons/ic_playlist_add_24px.svg\" style=\"position: relative; margin-right: 16px; color: #fff\"></md-icon>\r\n                Adauga in lista\r\n                <div class=\"button-border\"></div>\r\n            </button>\r\n            <div class=\"stock-info\">\r\n                <md-divider></md-divider>\r\n                <div ng-cloak ng-show=\"!order.size\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_help_black_24px.svg\" style=\"width:16px; height:16px\"></md-icon>\r\n                    <span>Alege o marime</span>\r\n                </div>\r\n                <div ng-cloak ng-show=\"order.size.count\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_check_circle_green_24px.svg\" style=\"width:16px; height:16px\"></md-icon>\r\n                    <span>In stoc. • ({{order.size.count}})</span>\r\n                </div>\r\n                <div ng-cloak ng-show=\"order.size.count == 0\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_warning_red_24px.svg\" style=\"width:16px; height:16px\"></md-icon>\r\n                    <span>Stoc furnizor.</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>");
$templateCache.put("app/components/hero/hero.tpl.html","<div class=\"dak-hero ar_3-1\" style=\"background-image:url({{hero.heroService.src}}); top:-{{hero.dakScroll.scroll/0.5}}px; background-position:center {{hero.heroService.position}}\">\r\n    <div class=\"scrim top fade\" ng-show=\"dakScroll.scrollTop\"></div>\r\n</div>");
$templateCache.put("app/components/navigation/navigation.account.inc.html","<a class=\"nav-item-container\" md-ink-ripple href=\"/account/lists\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_view_list_24px.svg\"></md-icon>Liste de cumparaturi</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/account/favourites\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_favorite_24px.svg\"></md-icon>Articole favorite</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/account/settings\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_rate_review_24px.svg\"></md-icon>Review-urile mele</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/account/settings\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_settings_24px.svg\"></md-icon>Setari cont</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/admin/orders\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_help_24px.svg\"></md-icon>Contact & Feedback</a>");
$templateCache.put("app/components/navigation/navigation.admin.inc.html","<a class=\"nav-item-container\" md-ink-ripple href=\"/admin/list\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_view_list_24px.svg\"></md-icon>Lista produse</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/admin/add\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_playlist_add_24px.svg\"></md-icon>Adauga produs</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/admin/settings\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_settings_24px.svg\"></md-icon>Setari</a>\r\n<a class=\"nav-item-container\" md-ink-ripple href=\"/admin/orders\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_shopping_basket_24px.svg\"></md-icon>Comenzi</a>");
$templateCache.put("app/components/navigation/navigation.filters.inc.html","<a class=\"nav-item-container\" md-ink-ripple href=\"/store\" style=\"margin-bottom: 8px\">\r\n    <md-icon md-svg-src=\"assets/icons/ic_filter_list_24px.svg\"></md-icon>Filter by</a>\r\n<div class=\"nav-section-title\">Departments:</div>\r\n<!-- brand filter -->\r\n<div ng-controller=\"NavListCtrl as list\">\r\n    <div class=\"nav-item-container\" ng-class=\"{expanded : list.expanded}\">\r\n        Brand\r\n        <md-icon class=\"reset-icon\" md-svg-src=\"assets/icons/ic_close_24px.svg\" ng-click=\"BrandFilter.reset()\" ng-show=\"BrandFilter.selected.length\" style=\"margin-left: 8px; width:16px\"></md-icon>\r\n        <md-icon class=\"right-icon l-right\" md-svg-src=\"assets/icons/ic_keyboard_arrow_down_black_24px.svg\" ng-click=\"list.expand();\" style=\"width:20px\"></md-icon>\r\n    </div>\r\n    <div class=\"nav-items-list\" style=\"max-height:{{results.length * list.size}}px\" layout=\"column\">\r\n        <md-checkbox ng-checked=\"BrandFilter.exists(brand)\" ng-class=\"{selected : BrandFilter.exists(brand)}\" ng-click=\"BrandFilter.toggle(brand)\" ng-disabled=\"!Counter.count(brand, \'brands\')\" ng-repeat=\"brand in dak.structure.brands | filter: q as results\">\r\n            {{ brand.name}}\r\n            <span style=\"color: rgba(0,0,0,.54)\">• ({{ Counter.count(brand.name, \'brands\')}})</span>\r\n        </md-checkbox>\r\n    </div>\r\n</div>\r\n<!-- main filter -->\r\n<div ng-controller=\"NavListCtrl as list\">\r\n    <div class=\"nav-item-container\" ng-class=\"{expanded : list.expanded}\">\r\n        Type\r\n        <md-icon class=\"reset-icon\" md-svg-src=\"assets/icons/ic_close_24px.svg\" ng-click=\"TypeFilter.reset()\" ng-show=\"TypeFilter.selected.length\" style=\"margin-left: 8px; width:16px\"></md-icon>\r\n        <md-icon class=\"right-icon l-right\" md-svg-src=\"assets/icons/ic_keyboard_arrow_down_black_24px.svg\" ng-click=\"list.expand();\" style=\"width:20px\"></md-icon>\r\n    </div>\r\n    <div class=\"nav-items-list\" style=\"max-height:{{results.length * list.size}}px\" layout=\"column\">\r\n        <md-checkbox ng-checked=\"TypeFilter.exists(type.name)\" ng-class=\"{selected : TypeFilter.exists(type.name)}\" ng-click=\"TypeFilter.toggle(type.name)\" ng-disabled=\"!Counter.count(type.name, \'types\')\" ng-repeat=\"type in dak.structure.types | filter: q as results\">\r\n            {{ type.name }}\r\n            <span style=\"color: rgba(0,0,0,.54)\">• ({{ Counter.count(type.name, \'types\')}})</span>\r\n        </md-checkbox>\r\n    </div>\r\n</div>\r\n<!-- sub filter -->\r\n<div ng-controller=\"NavListCtrl as list\">\r\n    <div class=\"nav-item-container\" ng-class=\"{expanded : list.expanded}\">\r\n        Kind\r\n        <md-icon class=\"reset-icon\" md-svg-src=\"assets/icons/ic_close_24px.svg\" ng-click=\"KindFilter.reset()\" ng-show=\"KindFilter.selected.length\" style=\"margin-left: 8px; width:16px\"></md-icon>\r\n        <md-icon class=\"right-icon l-right\" md-svg-src=\"assets/icons/ic_keyboard_arrow_down_black_24px.svg\" ng-click=\"list.expand();\" style=\"width:20px\"></md-icon>\r\n    </div>\r\n    <div class=\"nav-items-list\" style=\"max-height:{{results.length * list.size}}px\" layout=\"column\">\r\n        <md-checkbox ng-checked=\"KindFilter.exists(kind)\" ng-class=\"{selected : KindFilter.exists(kind)}\" ng-click=\"KindFilter.toggle(kind)\" ng-disabled=\"!Counter.count(kind, \'kinds\')\" ng-repeat=\"kind in dak.structure.kinds | filter: q as results\">\r\n            {{ kind.name }}\r\n            <span style=\"color: rgba(0,0,0,.54)\">• ({{ Counter.count(kind.name, \'kinds\')}})</span>\r\n        </md-checkbox>\r\n    </div>\r\n</div>\r\n<div class=\"nav-section-divider\"></div>\r\n<!-- price filter -->\r\n<div ng-controller=\"NavListCtrl as list\">\r\n    <div class=\"nav-item-container\" ng-class=\"{expanded : list.expanded}\">\r\n        <span class=\"nav-section-title expander\">Price & promo:</span>\r\n        <md-icon class=\"reset-icon\" md-svg-src=\"assets/icons/ic_close_24px.svg\" ng-click=\"PriceFilter.selected = null\" ng-show=\"PriceFilter.selected != null\" style=\"margin-left: 8px; width:16px\"></md-icon>\r\n        <md-icon class=\"right-icon l-right\" md-svg-src=\"assets/icons/ic_keyboard_arrow_down_black_24px.svg\" ng-click=\"list.expand();\" style=\"width:20px\"></md-icon>\r\n    </div>\r\n    <div class=\"nav-items-list price-range\" style=\"max-height:{{4 * list.size}}px; padding-left: 8px; padding-right: 16px\" layout=\"column\">\r\n        <div flex=\"\" layout>\r\n            <md-input-container flex>\r\n                <label>Min</label>\r\n                <input ng-model=\"PriceFilter.selected.min\">\r\n            </md-input-container>\r\n            <span flex=\"5\"></span>\r\n            <span style=\"text-align: center; font-size: 12px; font-weight: 400;color:  rgba(0,0,0,.54);line-height: 34px;margin-top: 18px;margin-bottom: 18px;position: relative\" flex=\"5\">-</span>\r\n            <span flex=\"5\"></span>\r\n            <md-input-container flex>\r\n                <label>Max</label>\r\n                <input ng-model=\"PriceFilter.selected.max\">\r\n            </md-input-container>\r\n            <span style=\"text-align: center; font-size: 12px; font-weight: 400;color:  rgba(0,0,0,.54);line-height: 34px;margin-top: 18px;margin-bottom: 18px;position: relative\">RON</span>\r\n        </div>\r\n        <!-- promo filter -->\r\n        <div flex=\"\" style=\"margin-left: -8px; margin-right: -16px; margin-top: -8px\">\r\n            <md-checkbox ng-model=\"PromoFilter.state\" ng-true-value=\"1\" ng-false-value=\"0\" ng-class=\"{selected : PromoFilter.state}\">\r\n                Promos\r\n                <span style=\"color: rgba(0,0,0,.54)\">• ({{ Counter.count(1, \'promos\')}})</span>\r\n            </md-checkbox>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- fit filter -->\r\n<div class=\"nav-section-divider\" ng-if=\"$root.logged\"></div>\r\n<div ng-if=\"$root.logged\">\r\n    <md-checkbox class=\"fit-check\" ng-model=\"FitFilter.state\" ng-true-value=\"1\" ng-false-value=\"0\" ng-class=\"{selected : FitFilter.state}\">\r\n        Doar pentru mine\r\n        <span style=\"color: rgba(0,0,0,.54)\">• ({{ Counter.count(1, \'fit\')}})</span>\r\n    </md-checkbox>\r\n</div>");
$templateCache.put("app/components/navigation/navigation.shop.inc.html","<a data-filter=\"item.filter\" class=\"nav-item-container\" ng-repeat=\"item in nav.shopItems\">\r\n    <md-icon md-svg-src=\"{{item.icon}}\"></md-icon>{{item.title}}</a>");
$templateCache.put("app/components/navigation/navigation.tpl.html","<!-- ACCOUNT SECTION START -->\r\n<section>\r\n\r\n    <div class=\"nav-section\" ng-if=\"!dak.logged\">\r\n        <a class=\"nav-item-container\" href=\"/auth\" md-ink-ripple>\r\n            <md-icon md-svg-src=\"assets/icons/ic_account_circle_24px.svg\"></md-icon>Log in</a>\r\n    </div>\r\n    <div class=\"nav-section-divider\" ng-if=\"!dak.logged\"></div>\r\n\r\n    <div class=\"nav-section\" ng-if=\"dak.logged\">\r\n        <div ng-controller=\"NavListCtrl as list\">\r\n            <div class=\"nav-item-container\" ng-class=\"{expanded : list.expanded}\">\r\n                <div aria-label=\"View Account\" class=\"account-photo\" class=\"md-icon-button l-right\" style=\"background-image: url({{dak.account.user_photo}})\"></div>{{dak.account.email}}\r\n                <md-icon class=\"right-icon l-right\" md-svg-src=\"assets/icons/ic_keyboard_arrow_down_black_24px.svg\" ng-click=\"list.expand();\" style=\"width:20px\"></md-icon>\r\n            </div>\r\n            <div class=\"nav-section-divider\"></div>\r\n            <div class=\"nav-items-list\" style=\"max-height:{{6 * list.size}}px\">\r\n                <!-- ADMIN SECTION START -->\r\n                <section ng-if=\"dak.logged && dak.account.admin\">\r\n                    <div class=\"nav-section\" ng-cloak>\r\n                        <a class=\"nav-item-container\" href=\"{{item.ref}}\" md-ink-ripple ng-repeat=\"item in dakNav.adminItems\">\r\n                            <md-icon md-svg-src=\"{{item.icon}}\"></md-icon>{{item.title}}</a>\r\n                    </div></section>\r\n                    <!-- ADMIN SECTION END -->\r\n                    <!-- USER SECTION START -->\r\n                    <section ng-if=\"dak.logged && !dak.account.admin\">\r\n                        <div class=\"nav-section\" ng-cloak>\r\n                            <a class=\"nav-item-container\" href=\"{{item.ref}}\" md-ink-ripple ng-repeat=\"item in dakNav.accountItems\">\r\n                                <md-icon md-svg-src=\"{{item.icon}}\"></md-icon>{{item.title}}</a>\r\n                        </div>\r\n                    </section>\r\n                    <!-- USER SECTION END -->\r\n                    <a class=\"nav-item-container sub\" md-ink-ripple ng-click=\"nav.logout()\" ng-show=\"dak.logged\">\r\n                        <md-icon md-svg-src=\"\"></md-icon>Logout</a>\r\n\r\n                    <div class=\"nav-section-divider\" ng-if=\"dak.logged\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    \r\n\r\n</section>\r\n<!-- ACCOUNT SECTION END -->\r\n\r\n\r\n<!-- STORE SECTION START -->\r\n\r\n<section ng-if=\"state.current.name !== \'store\'\">\r\n    <div class=\"nav-section\" ng-cloak>\r\n        <a class=\"nav-item-container no-icon\" md-ink-ripple ng-repeat=\"item in dak.structure.departments\" ui-sref=\"store({department : item})\">\r\n            {{item.name}}\r\n        </a>\r\n        <div class=\"nav-section-divider\" ng-if=\"dak.logged\"></div>\r\n    </div>\r\n</section>\r\n<section ng-if=\"state.current.name !== \'store\'\">\r\n    <div class=\"nav-section\" ng-cloak>\r\n        <a class=\"nav-item-container button\" data-type=\"sub\" href=\"\">\r\n            <md-button class=\"md-primary md-raised\" md-theme=\"brand-black\">Newsletter</md-button>\r\n        </a>\r\n    </div>\r\n    <div class=\"nav-section-divider\"></div>\r\n</section>\r\n<!-- STORE SECTION END -->\r\n<!-- FILTERS SECTION START -->\r\n<section ng-if=\"state.current.name === \'store\'\">\r\n    <div class=\"nav-section\" ng-controller=\"NavSectionCtrl as section\" ng-include=\"\'app/components/navigation/navigation.filters.inc.html\'\"></div>\r\n    <div class=\"nav-section-divider\"></div>\r\n</section>\r\n<!-- FILTERS SECTION END -->\r\n<br>\r\n<br>\r\n<br>\r\n<span flex></span>\r\n<!-- BOTTOM SECTION START -->\r\n<section>\r\n    <div class=\"nav-section-divider\"></div>\r\n    <div class=\"nav-section\" ng-cloak>\r\n        <a class=\"nav-item-container\" href=\"{{item.ref}}\" md-ink-ripple ng-repeat=\"item in dakNav.bottomItems\">\r\n            <md-icon md-svg-src=\"{{item.icon}}\"></md-icon>{{item.title}}</a>\r\n    </div>\r\n</section>\r\n<!-- BOTTOM SECTION END -->\r\n<section>\r\n    <div class=\"nav-section-divider\"></div>\r\n    <div class=\"nav-section\" ng-cloak>\r\n        <a class=\"nav-item-container\" href=\"/help\" md-ink-ripple>\r\n            <md-icon md-svg-src=\"assets/icons/ic_help_24px.svg\"></md-icon>Help & feedback</a>\r\n    </div>\r\n    <br>\r\n</section>");
$templateCache.put("app/components/shopping-cart/shopping-list.tpl.html","");
$templateCache.put("app/views/admin/admin.add.card-preview.inc.html","<div class=\"dak-card paper resting slide-top\" ng-cloak style=\"width:220px\">\r\n    <div class=\"product-media\">\r\n        <div class=\"product-img ar_1-1 file-upload\" md-ink-ripple ng-cloak style=\"background-image: url({{fileprev}})\">\r\n            <!-- <input multiple type=\"file\" accept=\"image/*\" name=\"file\" dak-file-poster/> -->\r\n            <input multiple=\"multiple\" type=\"file\" accept=\"image/*\" name=\"file\" dak-file-poster onchange=\"angular.element(this).scope().selectFile(this)\">\r\n            <div class=\"dak-hoverlay\"></div>\r\n            <md-icon class=\"search-file\" md-svg-src=\"assets/icons/ic_search_24px.svg\"></md-icon>\r\n            <md-button aria-label=\"Remove file\" class=\"md-icon-button remove-file\" ng-click=\"uploader.clearQueue(); uploader.clearThumb();\" ng-show=\"uploader.queue.length > 0\" type=\"button\">\r\n                <md-icon md-svg-src=\"assets/icons/ic_close_24px.svg\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n        <div class=\"hoverlay\"></div>\r\n        <div class=\"product-media-actions\">\r\n            <div class=\"scrim top\"></div>\r\n            <a aria-label=\"Editeaza produs\" class=\"md-icon-button add-to-favourites\" md-button ng-href=\"/admin/edit/{{newitem.code}}\" ng-if=\"$root.userData.admin && $root.logged\">\r\n                <md-tooltip>\r\n                    Editeaza produs\r\n                </md-tooltip>\r\n                <md-icon md-svg-src=\"assets/icons/ic_create_white_24px.svg\" style=\"width: 24px; height: 24px\"></md-icon>\r\n            </a>\r\n        </div>\r\n        <div class=\"promo-badge\" ng-show=\"newitem.is_promo\">\r\n            <md-tooltip>\r\n                Produs promo\r\n            </md-tooltip>\r\n            <md-icon class=\"brand-text\" md-svg-src=\"assets/icons/recommended_badge.svg\" style=\"width: 48px; height: 48px\"></md-icon>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-info\">\r\n        <div class=\"info-container\">\r\n            <h2 class=\"product-title single-line\">{{newitem.name}}</h2>\r\n            <div class=\"subtitle-container\">\r\n                <p class=\"product-subtitle single-line secondary-text-color\">{{newitem.subname}}</p>\r\n            </div>\r\n            <div class=\"excerpt-container\">\r\n                <p class=\"product-excerpt secondary-text-color\" dak-lines-limit=\"2\">{{newitem.excerpt}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-menu\">\r\n            <md-menu md-position-mode=\"target-right target\">\r\n                <md-button aria-label=\"Deschide meniu card\" class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\">\r\n                    <md-icon md-menu-origin md-svg-src=\"assets/icons/ic_more_vert_24px.svg\"></md-icon>\r\n                </md-button>\r\n                <md-menu-content width=\"3\">\r\n                    <md-menu-item>\r\n                        <md-button aria-label=\"Adauga in cos\" ng-click=\"setOrder()\">\r\n                            <div layout=\"row\">\r\n                                <p flex style=\"margin-left:8px\">Add to cart</p>\r\n                            </div>\r\n                        </md-button>\r\n                    </md-menu-item>\r\n                    <md-menu-item>\r\n                        <md-button aria-label=\"Adauga la favorite\" ng-click=\"postFav(newitem.code, newitem.favourite)\">\r\n                            <div layout=\"row\">\r\n                                <p flex style=\"margin-left:8px\">Add to favourites</p>\r\n                            </div>\r\n                        </md-button>\r\n                    </md-menu-item>\r\n                </md-menu-content>\r\n            </md-menu>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-actions\">\r\n        <div class=\"stars-container\">\r\n            <md-icon class=\"tiny-star\" md-svg-src=\"assets/icons/ic_star_tiny_14px.svg\" ng-class=\"{\'fill\' : count <= newitem.rating}\" ng-repeat=\"count in [1,2,3,4,5]\"></md-icon>\r\n        </div>\r\n        <div class=\"price-container\" ng-class=\"{promo : newitem.is_promo}\">\r\n            <div class=\"promo-price fade\" ng-cloak ng-show=\"newitem.is_promo\">\r\n                {{newitem.promo_price | number : 2  | currency : \"€\"}}</div>\r\n            <div ng-cloak>\r\n                <span class=\"price\" ng-cloak>{{newitem.price | number : 2 | currency : \"€\"}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"product-set-order\" ng-class=\"{on : showSetOrder}\"></div>\r\n</div>");
$templateCache.put("app/views/admin/admin.add.view.html","<div class=\"wrapper l-offset-nav\">\r\n    <md-content class=\"paper resting add-item-form\">\r\n        <form layout=\"column\" md-theme=\"brand-black\" name=\"addItemForm\" ng-submit=\"submitItemForm()\" novalidate>\r\n            <div class=\"form-header content-padding brand-bg dark\" layout-gt-md=\"row\" layout=\"column\">\r\n                <div flex layout=\"column\">\r\n                    <span flex></span>\r\n                    <h2 class=\"md-display-1 form-title\">Add new item</h2>\r\n                    <span class=\"md-body-1 form-subtitle\">Be sure to fill out every input</span>\r\n                </div>\r\n                <div class=\"form-card-preview l-right no-brand\" ng-include=\"\'app/views/admin/admin.add.card-preview.inc.html\'\">\r\n                    <!-- <dak-card-preview card-resource=\"newitem\" style=\"width:220px;\"></dak-card-preview> -->\r\n                </div>\r\n            </div>\r\n            <div class=\"form-content content-padding\">\r\n                <section>\r\n                    <h3 class=\"md-headline form-section-title brand-text\">Item info</h3>\r\n                    <md-input-container>\r\n                        <label for=\"\">Item code</label>\r\n                        <input name=\"code\" ng-model=\"newitem.code\" required type=\"text\">\r\n                    </md-input-container>\r\n                    <div layout-gt-md=\"row\" layout=\"column\">\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label for=\"\">Name</label>\r\n                            <input ng-model=\"newitem.name\" type=\"text\">\r\n                        </md-input-container>\r\n                        <span flex=\"\"></span>\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label for=\"\">Subname</label>\r\n                            <input ng-model=\"newitem.subname\" type=\"text\">\r\n                        </md-input-container>\r\n                        <span flex=\"\"></span>\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label>Brand</label>\r\n                            <md-select ng-model=\"newitem.brand\">\r\n                                <md-option ng-repeat=\"brand in dak.brands\" value=\"{{brand}}\">{{brand}}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n                    </div>\r\n                    <div layout-gt-md=\"row\" layout=\"column\">\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label>Department</label>\r\n                            <md-select ng-model=\"newitem.dep\">\r\n                                <md-option ng-repeat=\"dep in dak.structure.departments\" value=\"{{dep}}\">{{dep.name}}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n                        <span flex=\"\"></span>\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label>Type</label>\r\n                            <md-select ng-model=\"newitem.type\">\r\n                                <md-option ng-repeat=\"type in dak.structure.types\" value=\"{{type}}\">{{type.name}}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n                        <span flex=\"\"></span>\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label>Kind</label>\r\n                            <md-select ng-model=\"newitem.kind\">\r\n                                <md-option ng-repeat=\"kind in dak.structure.kinds\" value=\"{{kind}}\">{{kind.name}}</md-option>\r\n                            </md-select>\r\n                        </md-input-container>\r\n                    </div>\r\n                    <div layout-gt-md=\"row\">\r\n                        <md-chips class=\"tags-input\" delete-button-label=\"Remove Tag\" delete-hint=\"Press delete to remove tag\" flex ng-model=\"newitem.tags\" placeholder=\"Enter a tag\" secondary-placeholder=\"+Tag\"></md-chips>\r\n                    </div>\r\n                    <br>\r\n                    <div layout-gt-md=\"column\">\r\n                        <md-input-container flex>\r\n                            <label>Excerpt</label>\r\n                            <input md-maxlength=\"80\" name=\"excerpt\" ng-model=\"newitem.excerpt\">\r\n                            <div multiple=\"multiple\" ng-messages=\"addItemForm.excerpt.$error\" role=\"alert\">\r\n                                <div class=\"my-message\" ng-message=\"md-maxlength\">\r\n                                    Don\'t use the long version silly...we don\'t need to be that specific...\r\n                                </div>\r\n                            </div>\r\n                        </md-input-container>\r\n                        <md-input-container flex>\r\n                            <label>Description</label>\r\n                            <textarea columns=\"1\" ng-model=\"newitem.description\"></textarea>\r\n                        </md-input-container>\r\n                    </div>\r\n                    <div layout-gt-md=\"row\" layout=\"column\">\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label for=\"\">Price</label>\r\n                            <input ng-model=\"newitem.price\" type=\"number\">\r\n                        </md-input-container>\r\n                        <span flex=\"\"></span>\r\n                        <md-input-container flex-gt-md=\"30\">\r\n                            <label for=\"\">Stock count</label>\r\n                            <input ng-disabled=\"newitem.has_options\" ng-model=\"newitem.stock\" type=\"number\">\r\n                        </md-input-container>\r\n                        <span flex=\"\"></span>\r\n                        <md-datepicker md-placeholder=\"Enter date\" ng-model=\"newitem.created\"></md-datepicker>\r\n                    </div>\r\n                </section>\r\n                <br>\r\n                <br>\r\n                <br>\r\n                <section>\r\n                    <h3 class=\"md-headline form-section-title brand-text\">Buy options</h3>\r\n                    <md-switch aria-label=\"Enable buy options\" name=\"buy_options\" ng-change=\"getStock(); checkOptions();\" ng-false-value=\"false\" ng-model=\"newitem.has_options\" ng-true-value=\"true\"></md-switch>\r\n                    <div class=\"\" layout=\"column\">\r\n                        <div class=\"item-options\" flex layout layout-align=\"start center\" ng-repeat=\"option in newitem.options\">\r\n                            <md-input-container flex=\"25\" ng-class=\"{\'md-input-invalid\' : option.duplicate}\">\r\n                                <label>Type</label>\r\n                                <input ng-disabled=\"!newitem.has_options\" ng-model=\"option.type\" type=\"text\" dak-capitalize-first>\r\n                            </md-input-container>\r\n                            <md-input-container flex=\"25\">\r\n                                <label>Name</label>\r\n                                <input ng-disabled=\"!newitem.has_options\" ng-model=\"option.name\" type=\"text\" dak-capitalize>\r\n                            </md-input-container>\r\n                            <md-input-container flex=\"25\">\r\n                                <label>Count</label>\r\n                                <input ng-disabled=\"!newitem.has_options\" ng-model=\"option.count\" type=\"number\">\r\n                            </md-input-container>\r\n                            <span flex></span>\r\n                            <md-button aria-label=\"Remove option\" class=\"md-icon-button\" ng-click=\"removeOption($index)\" ng-disabled=\"!newitem.has_options\" type=\"button\">\r\n                                <md-icon md-svg-src=\"assets/icons/ic_remove_circle_outline_24px.svg\"></md-icon>\r\n                            </md-button>\r\n                        </div>\r\n                        <span class=\"add-option-link md-body-2 dak-link brand-text\" ng-class=\"{\'disabled\' : !newitem.has_options}\" ng-click=\"addOption()\">+ New</span>\r\n                    </div>\r\n                </section>\r\n                <br>\r\n                <br>\r\n                <br>\r\n                <section>\r\n                    <h3 class=\"md-headline form-section-title brand-text\">Colour options</h3>\r\n                    <md-switch aria-label=\"Enable color options\" name=\"colour_options\" ng-false-value=\"false\" ng-model=\"newitem.has_colours\" ng-true-value=\"true\"></md-switch>\r\n                </section>\r\n                <br>\r\n                <br>\r\n                <br>\r\n                <section>\r\n                    <h3 class=\"md-headline form-section-title brand-text\">Promo settings</h3>\r\n                    <md-switch aria-label=\"Enable promo options\" name=\"promo_settings\" ng-change=\"getPrice()\" ng-false-value=\"false\" ng-model=\"newitem.is_promo\" ng-true-value=\"true\"></md-switch>\r\n                    <div class=\"\" layout>\r\n                        <md-input-container flex flex-gt-md=\"30\">\r\n                            <label for=\"\">Promo Price</label>\r\n                            <input name=\"promo_price\" ng-disabled=\"!newitem.is_promo\" ng-model=\"newitem.promo_price\" type=\"number\">\r\n                        </md-input-container>\r\n                        <span flex-gt-md=\"5\"></span>\r\n                        <div flex flex-gt-md=\"20\" layout>\r\n                            <md-checkbox aria-label=\"Set stock count for promo\" ng-disabled=\"!newitem.is_promo\" ng-false-value=\"false\" ng-model=\"newitem.stock_promo\" ng-true-value=\"true\"></md-checkbox>\r\n                            <md-input-container flex>\r\n                                <label for=\"\">Stock</label>\r\n                                <input name=\"promo_stock\" ng-disabled=\"!newitem.is_promo || !newitem.stock_promo\" ng-model=\"newitem.promo_stock\" type=\"number\">\r\n                            </md-input-container>\r\n                        </div>\r\n                        <span flex-gt-md=\"5\"></span>\r\n                        <div flex flex-gt-md=\"40\" layout>\r\n                            <md-checkbox aria-label=\"Set promo end date\" ng-disabled=\"!newitem.is_promo\" ng-false-value=\"false\" ng-model=\"newitem.time_promo\" ng-true-value=\"true\"></md-checkbox>\r\n                            <md-datepicker flex md-placeholder=\"Promo end\" ng-disabled=\"!newitem.is_promo || !newitem.time_promo\" ng-model=\"newitem.promo_end\"></md-datepicker>\r\n                        </div>\r\n                    </div>\r\n                </section>\r\n                <br>\r\n                <br>\r\n                <section layout-align=\"start center\" layout-gt-md=\"row\" layout=\"column\">\r\n                    <md-checkbox aria-label=\"Publish\" ng-false-value=\"false\" ng-model=\"newitem.published\" ng-true-value=\"true\">Publish item</md-checkbox>\r\n                    <span flex-gt-md=\"\"></span>\r\n                    <md-button aria-label=\"Save item\" class=\"md-primary md-raised\" type=\"submit\">Add item</md-button>\r\n                </section>\r\n            </div>\r\n        </form>\r\n    </md-content>\r\n</div>");
$templateCache.put("app/views/admin/admin.upload.inc.html","<div layout=\"column\" layout-gt-sm=\"row\" style=\"margin-top: 16px\">\r\n    <div flex class=\"ar_1-1 file-upload\" style=\"background-image: url({{temp.photo1}}); margin-right: 8px; margin-bottom: 8px\">\r\n        <input nv-file-select=\"\" type=\"file\" uploader=\"uploader1\">\r\n        <div class=\"hoverlay\"></div>\r\n        <md-icon class=\"search-file\">\r\n            <i class=\"material-icons\">&#xE8B6;</i>\r\n        </md-icon>\r\n        <md-button type=\"button\" class=\"md-icon-button remove-file\" ng-click=\"uploader1.clearQueue(); uploader1.clearThumb();\" ng-show=\"uploader1.queue.length > 0 || temp.photo1 != \'uploads/placeholder.png\'\">\r\n            <md-icon>\r\n                <i class=\"material-icons\">&#xE5CD;</i>\r\n            </md-icon>\r\n        </md-button>\r\n    </div>\r\n    <div flex class=\"ar_1-1 file-upload\" style=\"background-image: url({{temp.photo2}}); margin-right: 8px; margin-bottom: 8px\">\r\n        <input nv-file-select=\"\" type=\"file\" uploader=\"uploader2\">\r\n        <div class=\"hoverlay\"></div>\r\n        <md-icon class=\"search-file\">\r\n            <i class=\"material-icons\">&#xE8B6;</i>\r\n        </md-icon>\r\n        <md-button type=\"button\" class=\"md-icon-button remove-file\" ng-click=\"uploader2.clearQueue(); uploader2.clearThumb();\" ng-show=\"uploader2.queue.length > 0\">\r\n            <md-icon>\r\n                <i class=\"material-icons\">&#xE5CD;</i>\r\n            </md-icon>\r\n        </md-button>\r\n    </div>\r\n    <div flex class=\"ar_1-1 file-upload\" style=\"background-image: url({{temp.photo3}}); margin-right: 8px; margin-bottom: 8px\">\r\n        <input nv-file-select=\"\" type=\"file\" uploader=\"uploader3\">\r\n        <div class=\"hoverlay\"></div>\r\n        <md-icon class=\"search-file\">\r\n            <i class=\"material-icons\">&#xE8B6;</i>\r\n        </md-icon>\r\n        <md-button type=\"button\" class=\"md-icon-button remove-file\" ng-click=\"uploader3.clearQueue(); uploader3.clearThumb();\" ng-show=\"uploader3.queue.length > 0\">\r\n            <md-icon>\r\n                <i class=\"material-icons\">&#xE5CD;</i>\r\n            </md-icon>\r\n        </md-button>\r\n    </div>\r\n    <div flex class=\"ar_1-1 file-upload\" style=\"background-image: url({{temp.photo4}}); margin-right: 8px; margin-bottom: 8px\">\r\n        <input nv-file-select=\"\" type=\"file\" uploader=\"uploader4\">\r\n        <div class=\"hoverlay\"></div>\r\n        <md-icon class=\"search-file\">\r\n            <i class=\"material-icons\">&#xE8B6;</i>\r\n        </md-icon>\r\n        <md-button type=\"button\" class=\"md-icon-button remove-file\" ng-click=\"uploader4.clearQueue(); uploader4.clearThumb();\" ng-show=\"uploader4.queue.length > 0\">\r\n            <md-icon>\r\n                <i class=\"material-icons\">&#xE5CD;</i>\r\n            </md-icon>\r\n        </md-button>\r\n    </div>\r\n    <div flex class=\"ar_1-1 file-upload\" style=\"background-image: url({{temp.photo5}}); margin-bottom: 8px\">\r\n        <input nv-file-select=\"\" type=\"file\" uploader=\"uploader5\">\r\n        <div class=\"hoverlay\"></div>\r\n        <md-icon class=\"search-file\">\r\n            <i class=\"material-icons\">&#xE8B6;</i>\r\n        </md-icon>\r\n        <md-button type=\"button\" class=\"md-icon-button remove-file\" ng-click=\"uploader5.clearQueue(); uploader5.clearThumb();\" ng-show=\"uploader5.queue.length > 0\">\r\n            <md-icon>\r\n                <i class=\"material-icons\">&#xE5CD;</i>\r\n            </md-icon>\r\n        </md-button>\r\n    </div>\r\n</div>");
$templateCache.put("app/views/admin/admin.view.html","<div class=\"page-content c-max\">\r\n    <div class=\"\" ui-view=\"\"></div>\r\n</div>");
$templateCache.put("app/views/auth/auth.view.html","<div class=\"page-content c-max main-page\">\r\n    <div class=\"paper md-whiteframe-18dp\" id=\"dak-login\" md-theme=\"brand-black\" ng-controller=\"DakAuthCtrl\">\r\n        <div class=\"login-box-actions fade dak-delayed-transition\" layout ng-show=\"atPass || atCreate\">\r\n            <md-button aria-label=\"Back to email input\" class=\"md-primary md-icon-button dak-no-margin dak-no-shadow\" ng-class=\"{\'md-raised\': !atCreate}\" ng-click=\"atPass = false;\" ng-hide=\"atCreate\" type=\"button\">\r\n                <md-icon class=\"login-back-button\" md-svg-src=\"assets/icons/ic_arrow_back_24px.svg\"></md-icon>\r\n            </md-button>\r\n            <span flex></span>\r\n            <md-button aria-label=\"reset Form\" class=\"md-primary md-icon-button dak-no-margin dak-no-shadow\" ng-class=\"{\'md-raised\': !atCreate}\" ng-click=\"cancelLogin(); cancelCreate()\" type=\"button\">\r\n                <md-icon class=\"login-cancel-button\" md-svg-src=\"assets/icons/ic_close_24px.svg\" md-theme=\"brand-black\"></md-icon>\r\n            </md-button>\r\n        </div>\r\n        <div class=\"login-user-data content-padding\" layout=\"column\" ng-class=\"{\'at-create\' : atCreate}\">\r\n            <span flex-order=\"2\" flex=\"\"></span>\r\n            <div class=\"login-user-info fade\" flex-order=\"3\" ng-show=\"atPass\">\r\n                <span class=\"md-title login-user-name\">{{dakAuth.userData.first_name}}</span>\r\n                <br>\r\n                <span class=\"md-subhead login-user-email\" ng-hide=\"!atPass\">{{dakAuth.userData.email}}</span>\r\n            </div>\r\n            <div class=\"login-user-photo\" flex-order=\"1\" flex=\"\">\r\n                <div class=\"login-user-photo-placeholder bg-image\" ng-class=\"{\'at-create\' : atCreate}\" ng-cloak ng-show=\"PLACEHOLDERS.user_photo\" style=\"background-image: url({{PLACEHOLDERS.user_photo}})\"></div>\r\n                <div class=\"login-user-photo-real bg-image blow-fade\" ng-class=\"{\'at-create\' : atCreate}\" ng-cloak ng-show=\"atPass\" style=\"background-image: url({{credentials.user_photo}})\"></div>\r\n                <div class=\"login-user-photo-upload bg-image\" ng-class=\"{\'at-create\' : atCreate}\" ng-cloak ng-show=\"atCreate\" style=\"background-image: url({{PLACEHOLDERS.user_photo_upload}})\">\r\n                    <input nv-file-select type=\"file\" uploader=\"uploader\"><br>\r\n                    <div class=\"user-temp-photo\" ng-repeat=\"item in uploader.queue\" ng-show=\"uploader.isHTML5\" ng-thumb=\"{ file: item._file, height: 96 }\"></div>\r\n                    <div class=\"dak-hoverlay\"></div>\r\n                    <md-icon md-svg-src=\"assets/icons/ic_photo_camera_24px.svg\"></md-icon>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <form autocomplete=\"off\" class=\"login-box-wrapper fade\" layout=\"row\" name=\"loginForm\" ng-class=\"{\'at-pass\' : atPass}\" ng-show=\"atLogin\" ng-submit=\"login(credentials)\">\r\n            <div class=\"login-email content-padding\" flex=\"\" layout=\"column\">\r\n                <md-input-container>\r\n                    <label>Enter your email</label>\r\n                    <input autocomplete=\"off\" autofocus ng-model=\"credentials.email\" required type=\"email\">\r\n                </md-input-container>\r\n                <div layout>\r\n                    <md-button aria-label=\"Next step\" class=\"md-primary md-raised\" flex-order=\"3\" ng-click=\"toPass(credentials.email)\" type=\"button\">Next</md-button>\r\n                    <md-button aria-label=\"Create account\" class=\"md-primary create-button\" flex-order=\"1\" md-no-ink ng-click=\"toCreate()\" type=\"button\">Create</md-button>\r\n                    <span flex flex-order=\"2\"></span>\r\n                </div>\r\n            </div>\r\n            <div class=\"login-pass content-padding\" flex=\"\" layout=\"column\">\r\n                <md-input-container>\r\n                    <label>Password</label>\r\n                    <input autocomplete=\"off\" ng-model=\"credentials.password\" required type=\"password\">\r\n                </md-input-container>\r\n                <div layout>\r\n                    <md-button class=\"md-primary md-raised\" flex-order=\"3\" type=\"submit\">Log in</md-button>\r\n                    <md-button class=\"md-primary create-button dak-lowercase\" flex-order=\"1\" md-no-ink type=\"button\">Forgot password?</md-button>\r\n                    <span flex flex-order=\"2\"></span>\r\n                </div>\r\n            </div>\r\n        </form>\r\n        <form autocomplete=\"off\" class=\"create-box-wrapper content-padding\" name=\"createForm\" ng-class=\"{\'at-pass\' : atPass}\" ng-show=\"atCreate\" ng-submit=\"create(credentials)\" novalidate>\r\n            <div layout=\"column\" style=\"margin: 16px\">\r\n                <div layout=\"row\">\r\n                    <md-input-container flex>\r\n                        <label>First Name</label>\r\n                        <input autocomplete=\"off\" autofocus ng-model=\"credentials.first_name\" required type=\"text\">\r\n                    </md-input-container>\r\n                    <md-input-container flex>\r\n                        <label>Last Name</label>\r\n                        <input autocomplete=\"off\" ng-model=\"credentials.last_name\" required type=\"text\">\r\n                    </md-input-container>\r\n                </div>\r\n                <md-input-container>\r\n                    <label>Enter your email</label>\r\n                    <input autocomplete=\"off\" autofocus ng-model=\"credentials.email\" required type=\"email\">\r\n                </md-input-container>\r\n                <md-input-container>\r\n                    <label>Password</label>\r\n                    <input autocomplete=\"off\" ng-model=\"credentials.password\" required type=\"password\">\r\n                </md-input-container>\r\n                <md-button class=\"md-primary md-raised dak-no-margin\" type=\"submit\">Create</md-button>\r\n            </div>\r\n        </form>\r\n        <div class=\"login-logo-box\">\r\n            <div class=\"login-logo\" style=\"background-image: url({{LOGOS.login_logo}})\"></div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("app/views/main/main.view.html","<div class=\"page-content c-max has-hero main-page\">\r\n\r\n    <input type=\"file\" file-model=\"myFile\">\r\n    <button ng-click=\"uploadFile()\">upload me</button>\r\n\r\n    <br>\r\n    <br>\r\n    <br>\r\n    <br>\r\n    <br>\r\n    <br>\r\n    <md-grid-list md-cols=\"1\" md-cols-sm=\"2\" md-cols-md=\"3\" md-cols-gt-md=\"4\" md-row-height=\"4:3\" md-gutter=\"16px\" md-gutter-gt-sm=\"8px\">\r\n    <md-grid-tile ng-repeat=\"tile in dak.structure.grid\" md-rowspan=\"{{tile.rowspan}}\" md-colspan=\"{{tile.colspan}}\" md-colspan-sm=\"1\" style=\"background-image: url({{tile.hero}})\" class=\"store-grid-tile dak-bg-img\">\r\n      <!-- <a href=\"\"><md-icon md-svg-icon=\"assets/icons/ic_launch_white_24px.svg\"></md-icon></a> -->\r\n      <md-grid-tile-footer><h3>{{tile.name}}</h3></md-grid-tile-footer>\r\n    </md-grid-tile>\r\n  </md-grid-list>\r\n</div>");
$templateCache.put("app/views/store/store.view.html","<div class=\"page-content c-max main-page\">\r\n    <div class=\"\" layout>\r\n        <div class=\"dak-cell\" flex=\"25\" ng-repeat=\"item in dak.items\">\r\n            <dak-card card-resource=\"item\"></dak-card>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("app/views/admin/settings/admin.settings.view.html","<div class=\"page-content c-max\">\r\n    <!-- DEPARTMENTS START -->\r\n    <div class=\"paper resting admin-settings-card settings-card\">\r\n        <div class=\"header content-padding\" layout>\r\n            <div>\r\n                <h1 class=\"settings-card-title\">Store departments</h1>\r\n                <div>This is where you add shop departments\r\n                    <br> These sit on the top level in the navbar menu</div>\r\n            </div>\r\n            <span flex></span>\r\n            <div>\r\n                <md-button aria-label=\"Expand card\" class=\"md-icon-button toggle-button\" ng-class=\"{open: depsExpand}\" ng-click=\"depsToggle(); dak.lengths.deps = dak.lengths.deps - 1\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_expand_more_black_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div class=\"content\" ng-class=\"{\'content-padding delayed\' : depsExpand}\" style=\"height: {{getDepsHeight()}}px\">\r\n            <div class=\"departments-list\">\r\n                <div class=\"\" layout layout-align=\"start center\" ng-repeat=\"(key, value) in dak.structure.departments\">\r\n                    <md-input-container>\r\n                        <label for=\"\">Name</label>\r\n                        <input ng-model=\"value.name\" type=\"text\">\r\n                    </md-input-container>\r\n                    <span flex></span>\r\n                    <md-button aria-label=\"Hero upload\" class=\"md-icon-button hero-upload\">\r\n                        <md-icon ng-if=\"!value.hero\" md-svg-src=\"assets/icons/ic_cloud_upload_24px.svg\" ng-class=\"{\'brand-text\' : value.hero}\"></md-icon>\r\n                        <md-icon class=\"brand-text\" ng-if=\"value.hero\" md-svg-src=\"assets/icons/ic_cloud_done_24px.svg\"></md-icon>\r\n                        <input nv-file-select type=\"file\" uploader=\"uploader\">\r\n                    </md-button>\r\n                    <span flex=\"40\" class=\"department-filename\">{{value.hero | dakFilename}}</span>\r\n                    <md-button aria-label=\"Remove department\" class=\"md-icon-button\" ng-click=\"removeDep(key); dak.lengths.deps = dak.lengths.deps + 1\" type=\"button\">\r\n                        <md-icon md-svg-src=\"assets/icons/ic_remove_circle_outline_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </div>\r\n            <!-- New department -->\r\n            <div class=\"\" layout layout-align=\"start center\">\r\n                <md-input-container>\r\n                    <label for=\"\">New department</label>\r\n                    <input dak-capitalize ng-model=\"newdep.name\" type=\"text\">\r\n                </md-input-container>\r\n                <span flex></span>\r\n                <md-button aria-label=\"Hero upload\" class=\"md-icon-button hero-upload\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_cloud_upload_24px.svg\"></md-icon>\r\n                    <input nv-file-select type=\"file\" uploader=\"uploader\">\r\n                </md-button>\r\n                <span flex=\"40\" class=\"department-filename\">{{newdep.hero | dakFilename}}</span>\r\n                <md-button aria-label=\"Add department\" class=\"md-icon-button\" ng-click=\"addDep(newdep)\" type=\"button\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_add_circle_outline_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- DEPARTMENTS END -->\r\n\r\n    <!-- BRANDS START -->\r\n    <div class=\"paper resting admin-settings-card settings-card\">\r\n        <div class=\"header content-padding\" layout>\r\n            <div>\r\n                <h1 class=\"settings-card-title\">Store brands</h1>\r\n                <div>This is where you add shop brands\r\n                    <br> These sit on the top level in the navbar menu</div>\r\n            </div>\r\n            <span flex></span>\r\n            <div>\r\n                <md-button aria-label=\"Expand card\" class=\"md-icon-button toggle-button\" ng-class=\"{open: brandsExpand}\" ng-click=\"brandsToggle()\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_expand_more_black_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div class=\"content\" ng-class=\"{\'content-padding delayed\' : brandsExpand}\" style=\"height: {{getBrandsHeight()}}px\">\r\n            <div class=\"brands-list\">\r\n                <div class=\"\" layout layout-align=\"start center\" ng-repeat=\"(key, value) in dak.structure.brands\">\r\n                    <md-input-container>\r\n                        <label for=\"\">Name</label>\r\n                        <input dak-capitalize-first ng-model=\"value.name\" type=\"text\">\r\n                    </md-input-container>\r\n                    <span flex></span>\r\n                    <md-button aria-label=\"Remove brand\" class=\"md-icon-button\" ng-click=\"removeBrand(key); dak.lengths.brands = dak.lengths.brands - 1\" type=\"button\">\r\n                        <md-icon md-svg-src=\"assets/icons/ic_remove_circle_outline_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </div>\r\n            <!-- New brand -->\r\n            <div class=\"\" layout layout-align=\"start center\">\r\n                <md-input-container>\r\n                    <label for=\"\">New brand</label>\r\n                    <input dak-capitalize-first ng-model=\"newbrand.name\" type=\"text\">\r\n                </md-input-container>\r\n                <span flex></span>\r\n                <md-button aria-label=\"Add brand\" class=\"md-icon-button\" ng-click=\"addBrand(newbrand); dak.lengths.brands = dak.lengths.brands + 1\" type=\"button\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_add_circle_outline_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- BRANDS END -->\r\n\r\n    <!-- TYPES START -->\r\n    <div class=\"paper resting admin-settings-card settings-card\">\r\n        <div class=\"header content-padding\" layout>\r\n            <div>\r\n                <h1 class=\"settings-card-title\">Item types</h1>\r\n                <div>Add some predefined types\r\n                    <br> Departments contain types which, in turn, have multiple \"Kinds\"</div>\r\n            </div>\r\n            <span flex></span>\r\n            <div>\r\n                <md-button aria-label=\"Expand card\" class=\"md-icon-button toggle-button\" ng-class=\"{open: typesExpand}\" ng-click=\"typesToggle()\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_expand_more_black_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div class=\"content\" ng-class=\"{\'content-padding delayed\' : typesExpand}\" style=\"height: {{getTypesHeight()}}px\">\r\n            <div class=\"departments-list\">\r\n                <div class=\"\" layout layout-align=\"start center\" ng-repeat=\"(key, value) in dak.structure.types\">\r\n                    <md-input-container>\r\n                        <label for=\"\">Name</label>\r\n                        <input ng-model=\"value.name\" type=\"text\">\r\n                    </md-input-container>\r\n                    <md-input-container style=\"margin-left: 8px; max-width:56px\">\r\n                        <label for=\"\">Type ID</label>\r\n                        <input dak-capitalize ng-model=\"value.short\" type=\"text\">\r\n                    </md-input-container>\r\n                    <span flex></span>\r\n                    <md-button aria-label=\"Remove type\" class=\"md-icon-button\" ng-click=\"removeType(key)\" type=\"button\">\r\n                        <md-icon md-svg-src=\"assets/icons/ic_remove_circle_outline_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </div>\r\n            <!-- New type -->\r\n            <div class=\"\" layout layout-align=\"start center\">\r\n                <md-input-container>\r\n                    <label for=\"\">New type</label>\r\n                    <input dak-capitalize-first ng-blur=\"shortify()\" ng-model=\"newtype.name\" type=\"text\">\r\n                </md-input-container>\r\n                <md-input-container style=\"margin-left: 8px; max-width:56px\">\r\n                    <label for=\"\">ID</label>\r\n                    <input dak-capitalize ng-model=\"newtype.short\" type=\"text\">\r\n                </md-input-container>\r\n                <span flex></span>\r\n                <md-button aria-label=\"Add type\" class=\"md-icon-button\" ng-click=\"addType(newtype)\" type=\"button\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_add_circle_outline_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- TYPES END -->\r\n\r\n    <!-- KINDS START -->\r\n    <div class=\"paper resting admin-settings-card settings-card\">\r\n        <div class=\"header content-padding\" layout>\r\n            <div>\r\n                <h1 class=\"settings-card-title\">Store kinds</h1>\r\n                <div>This is where you add shop kinds\r\n                    <br> These sit on the top level in the navbar menu</div>\r\n            </div>\r\n            <span flex></span>\r\n            <div>\r\n                <md-button aria-label=\"Expand card\" class=\"md-icon-button toggle-button\" ng-class=\"{open: kindsExpand}\" ng-click=\"kindsToggle()\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_expand_more_black_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div class=\"content\" ng-class=\"{\'content-padding delayed\' : kindsExpand}\" style=\"height: {{getKindsHeight()}}px\">\r\n            <div class=\"kinds-list\">\r\n                <div class=\"\" layout layout-align=\"start center\" ng-repeat=\"(key, value) in dak.structure.kinds\">\r\n                    <md-input-container>\r\n                        <label for=\"\">Name</label>\r\n                        <input dak-capitalize-first ng-model=\"value.name\" type=\"text\">\r\n                    </md-input-container>\r\n                    <span flex></span>\r\n                    <md-button aria-label=\"Remove kind\" class=\"md-icon-button\" ng-click=\"removeKind(key); dak.lengths.kinds = dak.lengths.kinds - 1\" type=\"button\">\r\n                        <md-icon md-svg-src=\"assets/icons/ic_remove_circle_outline_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </div>\r\n            <!-- New kind -->\r\n            <div class=\"\" layout layout-align=\"start center\">\r\n                <md-input-container>\r\n                    <label for=\"\">New kind</label>\r\n                    <input dak-capitalize-first ng-model=\"newkind.name\" type=\"text\">\r\n                </md-input-container>\r\n                <span flex></span>\r\n                <md-button aria-label=\"Add kind\" class=\"md-icon-button\" ng-click=\"addKind(newkind); dak.lengths.kinds = dak.lengths.kinds + 1\" type=\"button\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_add_circle_outline_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- KINDS END -->\r\n\r\n\r\n    <!-- GRID START -->\r\n\r\n    <div class=\"paper resting admin-settings-card settings-card\">\r\n        <div class=\"header content-padding\" layout>\r\n            <div>\r\n                <h1 class=\"settings-card-title\">Store grid</h1>\r\n                <div>This is where you add shop departments\r\n                    <br> These sit on the top level in the navbar menu</div>\r\n            </div>\r\n            <span flex></span>\r\n            <div>\r\n                <md-button aria-label=\"Expand card\" class=\"md-icon-button toggle-button\" ng-class=\"{open: gridExpand}\" ng-click=\"gridToggle();\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_expand_more_black_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div class=\"content\" ng-class=\"{\'content-padding delayed\' : gridExpand}\" style=\"height: {{getGridHeight()}}px\">\r\n            <div class=\"departments-list\">\r\n                <div class=\"\" layout layout-align=\"start center\" ng-repeat=\"(key, value) in dak.structure.grid\">\r\n                    <md-input-container>\r\n                        <label for=\"\">Name</label>\r\n                        <input dak-capitalize-first ng-model=\"value.name\" type=\"text\">\r\n                    </md-input-container>\r\n                    <span flex></span>\r\n                    <md-button aria-label=\"Hero upload\" class=\"md-icon-button hero-upload\">\r\n                        <md-icon ng-if=\"!value.hero\" md-svg-src=\"assets/icons/ic_cloud_upload_24px.svg\" ng-class=\"{\'brand-text\' : value.hero}\"></md-icon>\r\n                        <md-icon class=\"brand-text\" ng-if=\"value.hero\" md-svg-src=\"assets/icons/ic_cloud_done_24px.svg\"></md-icon>\r\n                        <input nv-file-select type=\"file\" uploader=\"uploader\">\r\n                    </md-button>\r\n                    <span flex=\"40\" class=\"department-filename\">{{value.hero | dakFilename}}</span>\r\n                    <span flex></span>\r\n                    <md-input-container style=\"margin-bottom: 38px\">\r\n                        <md-select ng-model=\"value.colspan\">\r\n                            <md-option ng-repeat=\"size in [\'1\', \'2\', \'3\']\" value=\"{{size}}\">\r\n                                {{size}}\r\n                            </md-option>\r\n                        </md-select>\r\n                    </md-input-container>\r\n                    <span style=\"margin-bottom: 16px\">:</span>\r\n                    <md-input-container style=\"margin-bottom: 38px\">\r\n                        <md-select ng-model=\"value.rowspan\">\r\n                            <md-option ng-repeat=\"size in [\'1\', \'2\', \'3\']\" value=\"{{size}}\">\r\n                                {{size}}\r\n                            </md-option>\r\n                        </md-select>\r\n                    </md-input-container>\r\n                    <md-button aria-label=\"Remove grid tile\" class=\"md-icon-button\" ng-click=\"removeTile(key);\" type=\"button\">\r\n                        <md-icon md-svg-src=\"assets/icons/ic_remove_circle_outline_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                </div>\r\n            </div>\r\n            <!-- New tile -->\r\n            <div class=\"\" layout layout-align=\"start center\">\r\n                <md-input-container>\r\n                    <label for=\"\">New tile</label>\r\n                    <input dak-capitalize-first ng-model=\"newtile.name\" type=\"text\">\r\n                </md-input-container>\r\n                <span flex></span>\r\n                <md-button aria-label=\"Hero upload\" class=\"md-icon-button hero-upload\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_cloud_upload_24px.svg\"></md-icon>\r\n                    <input nv-file-select type=\"file\" uploader=\"uploader\">\r\n                </md-button>\r\n                <span flex=\"40\" class=\"department-filename\">{{newtile.hero | dakFilename}}</span>\r\n                <span flex></span>\r\n                <md-input-container style=\"margin-bottom: 38px\">\r\n                    <md-select ng-model=\"newtile.colspan\">\r\n                        <md-option ng-repeat=\"size in [\'1\', \'2\', \'3\']\" value=\"{{size}}\">\r\n                            {{size}}\r\n                        </md-option>\r\n                    </md-select>\r\n                </md-input-container>\r\n                <span style=\"margin-bottom: 16px\">:</span>\r\n                <md-input-container style=\"margin-bottom: 38px\">\r\n                    <md-select ng-model=\"newtile.rowspan\">\r\n                        <md-option ng-repeat=\"size in [\'1\', \'2\', \'3\']\" value=\"{{size}}\">\r\n                            {{size}}\r\n                        </md-option>\r\n                    </md-select>\r\n                </md-input-container>\r\n                <md-button aria-label=\"Add grid tile\" class=\"md-icon-button\" ng-click=\"addTile(newtile)\" type=\"button\">\r\n                    <md-icon md-svg-src=\"assets/icons/ic_add_circle_outline_24px.svg\"></md-icon>\r\n                </md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- GRID END -->\r\n</div>");}]);