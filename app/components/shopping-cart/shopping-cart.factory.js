(function() {
    'use strict';

    angular
        .module('wskCart')
        .factory('wskShoppingCart', function($http, wskAuth, $rootScope, $q, $filter) {
            var obj = {};
            var api = 'api/shopping-lists/';

            obj.products = [];
            obj.items = [];
            obj.lists = [];
            obj.count = function() {
                var sum = 0;
                angular.forEach(this.items, function(item) {
                    var count = parseFloat(item.count);
                    sum = sum + (count);
                });
                return sum;
            };

            obj.getItems = function() {
                obj.items = [];
                angular.forEach(obj.lists, function(list) {
                    angular.forEach(list.items, function(item) {
                        obj.items.push(item);
                    });
                });
            };

            obj.removeItem = function(deadItem) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                promise.then(function() {
                    angular.forEach(obj.lists, function(list) {
                        angular.forEach(list.items, function(item) {
                            var iIdx = list.items.indexOf(deadItem);
                            if (iIdx > -1) {
                                list.items.splice(iIdx, 1);
                            }
                        });
                    });
                }).then(function() {
                    $rootScope.$broadcast('wskCart: changed', {});
                });
                deferred.resolve();
            };

            obj.empty = function() {
                obj.lists=[];
                $rootScope.$broadcast('wskCart: emptied', {});
            };

            obj.getTotal = function() {
                obj.getItems();
                var sum = 0;
                var items = obj.items;
                angular.forEach(items, function(item) {
                    var add = parseFloat(parseFloat(item.count) * parseFloat(item.product.new_price));
                    sum = sum + add;
                });
                return sum;
            };
            obj.shipping = function() {
                var sum = 12;
                if (this.getTotal() > 150) {
                    sum = 0;
                }
                return sum;
            };



            // watchers
            $rootScope.$on('wskShoppingLists: list-changed', function() {
                obj.getItems();
            });
            $rootScope.$on('wskShoppingLists: list-synced', function() {
                obj.getItems();
            });
            $rootScope.$on('wskShoppingLists: list-unsynced', function() {
                obj.getItems();
            });

            return obj;
        });

})();
