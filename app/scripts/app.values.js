(function() {
  'use strict';

  angular
    .module('wearska')
    .value('PLACEHOLDERS', {
        user_photo: 'assets/media/placeholders/user-photo.png',
        user_photo_upload : 'assets/media/placeholders/user-photo-upload.png'
    })
    .value('LOGOS', {
        login_logo: 'assets/media/logos/wsk_logo.svg'
    });

})();
