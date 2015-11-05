(function() {
    'use strict';

    angular.module('wearska')
        .controller('CardCtrl', function($http, $rootScope, $scope, $mdDialog, $cookies, $mdBottomSheet, wskShoppingLists, wskShoppingCart) {

            // ADD TO CART
            $scope.order = {
                size: '',
                count: '',
                quantity: 1
            }
            $scope.showSetOrder = false;
            $scope.setOrder = function(){
                $scope.showSetOrder = !$scope.showSetOrder;
            };
            $scope.orderProduct = function(item, order){
                wskShoppingLists.addItem(wskShoppingLists.activeList(), item, order.size.name, order.quantity);
                $scope.discardOrder();
            };
            $scope.discardOrder = function(){
                $scope.order = {
                    size: '',
                    count: '',
                    quantity: 1
                };
                $scope.orderForm.$setPristine();
                $scope.orderForm.$setUntouched();
                $scope.showSetOrder = false;
            };
            $scope.wskShoppingLists = wskShoppingLists;
            $scope.addToCart = function(item) {
                wskShoppingLists.addItem(wskShoppingLists.activeList(), item, '', 1);
            };

            // CARD MENU
            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            // BOTTOM LIST
            $scope.showListBottomSheet = function(ev, target) {
                console.log(ev);
                $mdBottomSheet.show({
                    parent: ev.currentTarget.offsetParent.offsetParent,
                    templateUrl: 'app/components/card/card.bs.tpl.html',
                    controller: 'ListBottomSheetCtrl',
                    targetEvent: ev
                }).then(function(clickedItem) {
                    $scope.alert = clickedItem.name + ' clicked!';
                });
            }

            // ADD TO FAV
            $scope.postFav = function(code, fav) {
                var data = {
                    userid: $rootScope.userData.uid,
                    code: code
                };
                if (fav) {
                    $http.post('api/accounts/removeuserfav.php', data)
                        .then(function(response) {
                            $scope.item.favourite = false;
                        }).catch(function(error) {
                            console.log(error);
                        });
                } else {
                    $http.post('api/accounts/postuserfav.php', data)
                        .then(function(response) {
                            $scope.item.favourite = true;
                        }).catch(function(error) {
                            console.log(error);
                        });
                }

            }
        })
        .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
            $scope.items = [{
                name: 'Comanda',
                icon: 'assets/icons/ic_add_shopping_cart_black_24px.svg'
            }, {
                name: 'Favorite',
                icon: 'assets/icons/ic_favorite_border_black_24px.svg'
            }];
            $scope.listItemClick = function($index) {
                var clickedItem = $scope.items[$index];
                $mdBottomSheet.hide(clickedItem);
            };
        });

})();
