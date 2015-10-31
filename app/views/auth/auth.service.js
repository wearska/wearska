(function() {
    'use strict';

    angular
        .module('wearska')
        .factory('wskAuth', function($log, $q, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, PLACEHOLDERS, $location) {
            var ref = new Firebase(FIREBASE_URL);
            var authObj = $firebaseAuth(ref);
            var users = ref.child('users');
            var usersObj = $firebaseArray(users);
            var usersList = [];
            var auth = {};

            usersObj.$loaded()
                .then(function(users) {
                    usersList = users;
                })
                .catch(function(error) {
                    console.log("Error:", error);
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
                return auth.getById(uid)
                    .then(function(result) {
                        var profileRef = users.child(result.$id);
                        var userObj = $firebaseObject(profileRef);
                        return userObj;
                    });
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
                var deferred = $q.defer();
                angular.forEach(usersList, function(user) {
                    if (user.uid === uid) {
                        auth.userData = angular.copy(user);
                        deferred.resolve(user);
                    } else {
                        deferred.reject('no such user');
                    };
                });
                // return fetchedUser;
                return deferred.promise;
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


            return auth;
        });

})();