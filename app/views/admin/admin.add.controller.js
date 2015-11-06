(function() {
    'use strict';

    angular.module('wearska')
        .controller('WskAddCtrl', function($scope, $timeout, $q, wskItems, FIREBASE_ITEMS_URL) {

            // -----------------------------
            // INIT ITEM
            // -----------------------------

            $scope.newitem = {
                name: '',
                subname: '',
                brand: '',
                dep: '',
                type: '',
                kind: '',
                tags: [],
                excerpt: '',
                description: '',
                price: null,
                stock: 0,
                created: new Date(),
                has_options: true,
                options: [],
                has_colours : false,
                colour : [],
                sibling : null,
                is_promo : false,
                promo_price: null,
                old_price: null,
                stock_promo: false,
                promo_stock : null,
                date_promo: false,
                promo_end : null,
                thumb: 'file1',
                files : {
                    file1 : 'uploads/items/placeholder.png',
                    file2 : 'uploads/items/placeholder.png',
                    file3 : 'uploads/items/placeholder.png',
                    file4 : 'uploads/items/placeholder.png',
                    file5 : 'uploads/items/placeholder.png'
                },
                published: true

            };

            // ------------------------
            // BUY OPTIONS
            // ------------------------


            $scope.$watch(
                'newitem.options',
                function(newNames, oldNames) {
                    $scope.getStock();
                    if(!$scope.newitem.options.length){
                        $scope.newitem.has_options = false;
                    }
                },
                true);

            $scope.getStock = function() {
                var stock = 0;
                angular.forEach($scope.newitem.options, function(option) {
                    stock = parseInt(stock + option.count);
                });
                $scope.newitem.stock = stock;
            };

            $scope.checkOptions = function() {
                if(!$scope.newitem.options.length){
                    $scope.addOption();
                }else{
                    angular.forEach($scope.newitem.options, function(option){
                        if(option.type == '' && option.name == ''){
                            var idx = $scope.newitem.options.indexOf(option);
                            $scope.newitem.options.splice(idx, 1);
                        }
                    });
                }
            };

            $scope.removeOption = function(idx){
                $scope.newitem.options.splice(idx, 1);
            };

            $scope.addOption = function(idx){
                var newoption = {
                    type: '',
                    name: '',
                    count: 0
                };

                if($scope.newitem.options.length){
                    var last_idx = $scope.newitem.options.length - 1;
                    var last_option = $scope.newitem.options[last_idx];
                    if(last_option.type != '' && last_option.name != '' && last_option.count != ''){
                        $scope.newitem.options.push(newoption);
                    }
                }else{
                    $scope.newitem.options.push(newoption);
                }
            };

            // ------------------------
            // COLOUR OPTIONS
            // ------------------------




            // ------------------------
            // PROMO SETTINGS
            // ------------------------

            $scope.getPrice = function() {
                if ($scope.newitem.is_promo){
                    if(!$scope.newitem.promo_price){
                        $scope.newitem.promo_price = 0;
                    };
                }else{
                    if(!$scope.newitem.promo_price){
                        $scope.newitem.promo_price = null;
                    };
                };
            };

            // -----------------------
            // ADD ITEM
            // -----------------------

            $scope.submitItemForm = function(){
                var itemsRef = new Firebase(FIREBASE_ITEMS_URL);
                var itemRef = itemsRef.child($scope.newitem.code);
                itemRef.set($scope.newitem);
            };

        });

})();
