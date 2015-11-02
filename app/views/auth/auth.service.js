(function() {
    'use strict';

    angular
        .module('wearska')
        .factory('wskAuth', function($rootScope, $log, $q, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, PLACEHOLDERS, $location) {
            var ref = new Firebase(FIREBASE_URL);
            var authObj = $firebaseAuth(ref);
            var users = ref.child('users');
            var usersObj = $firebaseArray(users);
            var usersList = [];
            var userObj;
            var auth = {};

            usersObj.$loaded()
                .then(function(users) {
                    usersList = users;
                    $rootScope.$broadcast('users: loaded', {});
                })
                .catch(function(error) {
                    console.log("iiiiError:", error);
                });

            authObj.$onAuth(function(authData) {
                if (authData) {
                    $rootScope.$broadcast('user: logged', {});
                } else {
                    $rootScope.$broadcast('user: notlogged', {});
                }
            });

            auth.userData = {
                uid: '',
                email: '',
                first_name: '',
                last_name: '',
                user_photo: PLACEHOLDERS.user_photo,
                gender: '',
                shoe_size: '',
                pants_size: '',
                top_size: '',
                reviews: [],
                favourites: [],
                created: new Date(),
                admin: 0
            };

            auth.bind = function(uid) {
                var id = auth.getById(uid).$id;
                var profileRef = users.child(id);
                userObj = $firebaseObject(profileRef);
                return userObj.$loaded();
            };

            auth.get = function(email) {
                var deferred = $q.defer();
                angular.forEach(usersList, function(user) {
                    if (user.email === email) {
                        auth.userData = angular.copy(user);
                        deferred.resolve(user);
                    } else {
                        deferred.reject('nooooo');
                    };
                });
                // return fetchedUser;
                return deferred.promise;
            };

            auth.getById = function(uid) {
                var fetchedUser;
                angular.forEach(usersList, function(user) {
                    if (user.uid === uid) {
                        auth.userData = angular.copy(user);
                        fetchedUser = user;
                    };
                });
                return fetchedUser;
            };

            auth.create = function(credentials) {
                return authObj.$createUser({
                    email: credentials.email,
                    password: credentials.password
                }).then(function(authData) {
                    if (!credentials.user_photo) {
                        credentials.user_photo = PLACEHOLDERS.user_photo;
                    };
                    var data = {
                        uid: authData.uid,
                        email: credentials.email,
                        first_name: credentials.first_name,
                        last_name: credentials.last_name,
                        user_photo: credentials.user_photo,
                        gender: '',
                        shoe_size: '',
                        pants_size: '',
                        top_size: '',
                        reviews: [],
                        favourites: [],
                        created: new Date(),
                        admin: 0
                    };
                    usersObj.$add(data);
                });
            };

            auth.remove = function(credentials) {
                return authObj.$removeUser({
                    email: credentials.email,
                    password: credentials.password
                });
            };

            auth.login = function(credentials) {
                return authObj.$authWithPassword({
                    email: credentials.email,
                    password: credentials.password
                });
            };

            auth.logout = function() {
                userObj.$destroy();
                return authObj.$unauth();
            };

            return auth;
        });

})();