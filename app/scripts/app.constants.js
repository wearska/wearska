(function() {
  'use strict';

  angular
    .module('daksports')
    .constant('FIREBASE_URL', 'https://daksports.firebaseio.com')
    .constant('FIREBASE_USERS_URL', 'https://daksports.firebaseio.com/users')
    .constant('FIREBASE_ITEMS_URL', 'https://daksports.firebaseio.com/items');

})();
