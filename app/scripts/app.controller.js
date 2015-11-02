(function() {
    'use strict';

    angular
        .module('wearska')
        .controller('WskController', function($scope, $mdMedia, AUTHDATA, LOGOS, wskAuth, wskScrollFactory) {

            $scope.wsk = {};
            $scope.wskScroll = wskScrollFactory;
            var wsk = $scope.wsk;


            // --------------------------
            // AUTH
            // --------------------------

            // initial state
            wsk.account = {};
            wsk.logged = false;

            // handle initial check for authdata
            $scope.$on('users: loaded', function() {
                if (AUTHDATA.logged) {
                    // set logged to true
                    wsk.logged = true;
                    // get and bind the user data
                    wskAuth.bind(AUTHDATA.uid)
                        .then(function(user) {
                            user.$bindTo($scope, "wsk.account");
                        });
                }
            });

            // handle user login
            $scope.$on('user-data: bound', function(event, obj) {
                wsk.account = obj;
                wsk.logged = true;
            });

            // handle user logout
            $scope.$on('user: notlogged', function(){
                wsk.account = {};
                wsk.logged = false;
                AUTHDATA.logged = false;
                AUTHDATA.uid = null;
            });
                        
            wsk.LOGOS = LOGOS;



            // ---------------------------
            // SIDEBAR
            // ---------------------------

            // sidebar toggle

            wsk.sidebarOpen = $mdMedia('gt-sm');
            wsk.toggleSidebar = function() {
                wsk.sidebarOpen = !wsk.sidebarOpen;
            }


        });

})();