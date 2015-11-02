(function() {
  'use strict';

  angular
    .module('wearska')
    .value('AUTHDATA', {
        logged: false,
        uid: null
    })
    .value('PLACEHOLDERS', {
        user_photo: 'assets/media/placeholders/user-photo.png',
        user_photo_upload : 'assets/media/placeholders/user-photo-upload.png'
    })
    .value('LOGOS', {
        login_logo: 'assets/media/logos/wsk_logo.svg',
        appbar_logo: 'assets/media/logos/wsk_appbar_logo.svg',
        sidenav_logo: 'assets/media/logos/wsk_sidenav_logo.svg'
    });

})();
