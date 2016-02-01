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
