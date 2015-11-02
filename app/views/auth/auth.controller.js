(function() {
    'use strict';

    angular.module('wearska')
        .controller('WskAuthController', function($scope, $http, $location, $mdToast, $firebaseObject, wskAuth, FileUploader, PLACEHOLDERS, LOGOS) {


            $scope.PLACEHOLDERS = PLACEHOLDERS;
            $scope.LOGOS = LOGOS;
            $scope.wskAuth = wskAuth;
            $scope.credentials = {};

            $scope.atPass = false;
            $scope.atLogin = true;
            $scope.atCreate = false;

            $scope.toPass = function(email) {
                if (email) {
                    $scope.atPass = true;
                    wskAuth.get(email)
                        .then(function(userData) {
                            // console.log(userData);
                        }).catch(function(error) {
                            // console.log(error);
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
                    wskAuth.create(credentials)
                        .then(function(authData) {
                            $scope.uploadPhoto();
                            wskAuth.login(credentials)
                                .then(function(authData) {
                                    wskAuth.bind(authData.uid)
                                        .then(function(user) {
                                            user.$bindTo($scope, "userData")
                                                .then(function() {
                                                    $scope.$emit('user-data: bound', $scope.userData);
                                                    $location.path('');
                                                });
                                        });
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
                        });
                } else {
                    $scope.signupForm.submitted = true;
                }
            };

            // ------------------------
            // REMOVE
            // ------------------------


            $scope.removeUser = function(credentials) {
                wskAuth.remove(credentials)
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
                    wskAuth.login(credentials)
                        .then(function(authData) {
                            wskAuth.bind(authData.uid)
                                .then(function(user) {
                                    user.$bindTo($scope, "userData")
                                        .then(function() {
                                            $scope.$emit('user-data: bound', $scope.userData);
                                            $location.path('');
                                        });
                                });
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