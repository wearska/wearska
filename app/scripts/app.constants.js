(function() {
  'use strict';

  angular
    .module('wearska')
    .constant('FIREBASE_URL', 'https://wearska.firebaseio.com')
    .constant('FIREBASE_USERS_URL', 'https://wearska.firebaseio.com/users')
    .constant('FIREBASE_ITEMS_URL', 'https://wearska.firebaseio.com/items');

})();
