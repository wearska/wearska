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
