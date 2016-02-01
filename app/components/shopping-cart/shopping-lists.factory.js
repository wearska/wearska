(function() {
    'use strict';

    angular
        .module('dakCart')
        .factory('dakShoppingLists', function($rootScope, $http, $q, $filter, dakAuth, dakShoppingCart) {
            var obj = {};
            var api = 'api/shopping-lists/';
            var restoring = false;

            // ----------------------------
            // GET USER LISTS
            // ----------------------------
            obj.query = function(userid) {
                return $http.get(api + 'query.php?uid=' + userid)
                    .then(function(response) {
                        var lists = response.data;
                        obj.lists = [];
                        angular.forEach(lists, function(list) {
                            list.items = angular.fromJson(list.items);
                        });
                        return lists;
                    });
            };

            obj.post = function(list) {
                if (dakAuth.$getdakAuth()) {
                    var uid = dakAuth.$getdakAuth().uid;
                    var data = {};
                    data.userid = uid
                    data.listid = parseFloat(list.id);
                    data.added = list.added;
                    data.listname = list.name;
                    data.active = list.active;
                    data.incart = list.inCart;
                    data.items = [];
                    angular.forEach(list.items, function(listItem) {
                        var item = {};
                        item.product = listItem.product.code;
                        item.size = listItem.size;
                        item.count = listItem.count;
                        item.data = angular.toJson(listItem.data);
                        data.items.push(item);
                    });
                    data.items = angular.toJson(data.items);
                    $http.post(api + 'post.php', data).then(function(results) {
                        return results;
                    });
                }
            };

            obj.put = function(list) {
                if (dakAuth.$getdakAuth()) {
                    var uid = dakAuth.$getdakAuth().uid;
                    var data = {};
                    data.userid = dakAuth.$getdakAuth().uid;
                    data.listid = parseFloat(list.id);
                    data.added = list.added;
                    data.listname = list.name;
                    data.active = list.active;
                    data.incart = list.inCart;
                    data.items = [];
                    angular.forEach(list.items, function(listItem) {
                        var item = {};
                        item.product = listItem.product.code;
                        item.size = listItem.size;
                        item.count = listItem.count;
                        item.data = angular.toJson(listItem.data);
                        data.items.push(item);
                    });
                    data.items = angular.toJson(data.items);
                    $http.post(api + 'put.php', data).then(function(results) {
                        return results;
                    });
                }
            };
            obj.remove = function(list) {
                var data = {};
                data.listid = parseFloat(list.id);
                if (dakAuth.$getdakAuth()) {
                    return $http.post(api + 'remove.php', data).then(function(results) {
                        var idx = obj.lists.indexOf(list);
                        obj.lists.splice(idx, 1);
                        if (obj.lists[0]) {
                            obj.makeActive(obj.lists[0].id);
                        }
                    });
                };
            };

            $rootScope.$on('dakCart: changed', function() {
                angular.forEach(obj.lists, function(list) {
                    if (list.items.length > 0) {
                        list.update();
                    } else {
                        list.remove();
                    }
                });
            });

            $rootScope.$on('products:filled', function() {
                if (dakAuth.$getdakAuth()) {
                    var uid = dakAuth.$getdakAuth().uid;
                    obj.query(uid)
                        .then(function(lists) {
                            if (lists.length) {
                                angular.forEach(lists, function(list) {
                                    obj.restoreList(list);
                                });
                            } else {
                                obj.newList();
                                var firstList = obj.activeList();
                                firstList.syncToCart();
                            }
                        }).catch(function(error) {
                            return error;
                        });
                } else {
                    obj.newList();
                    var firstList = obj.activeList();
                    firstList.syncToCart();
                };
            });

            $rootScope.$on('dakCart: emptied', function() {
                angular.forEach(obj.lists, function(list) {
                    list.unSyncToCart(false);
                    list.update();
                });
            });

            $rootScope.$on('dakShoppingLists: item-changed', function() {
                if (!restoring) {
                    angular.forEach(obj.lists, function(list) {
                        list.update();
                    });
                }
            });


            // ----------------------------
            // LISTS ARRAY
            // ----------------------------

            obj.lists = [];

            // ADD NEW LIST
            obj.newList = function() {
                // define the initial state of the list to be added
                var date = new Date(),
                    year = $filter('date')(date, 'yy'),
                    month = $filter('date')(date, 'MM'),
                    day = $filter('date')(date, 'dd'),
                    idPrefix = '' + year + month + day + '',
                    list = {
                        id: $filter('serialize')(idPrefix),
                        name: '',
                        added: new Date(),
                        active: 1,
                        inCart: false,
                        items: [],
                        syncToCart: function() {
                            this.inCart = 1;
                            dakShoppingCart.lists.push(this);
                            $rootScope.$broadcast('dakShoppingLists: list-synced', {});
                            this.update();
                        },
                        unSyncToCart: function(broadcast) {
                            this.inCart = 0;
                            var idx = dakShoppingCart.lists.indexOf(this);
                            dakShoppingCart.lists.splice(idx, 1);
                            if (broadcast) {
                                $rootScope.$broadcast('dakShoppingLists: list-unsynced', {});
                            }
                            this.update();
                        },
                        count: function() {
                            var sum = 0;
                            angular.forEach(this.items, function(item) {
                                var count = parseFloat(item.count);
                                sum = sum + (count);
                            });
                            return sum;
                        },
                        total: function() {
                            var sum = 0;
                            angular.forEach(this.items, function(item) {
                                if (item.count) {
                                    var count = parseFloat(item.count);
                                    sum = sum + (count * item.product.new_price);
                                }
                            });
                            return sum;
                        },
                        shipping: function() {
                            var sum = 12;
                            if (this.total() > 150) {
                                sum = 0;
                            }
                            return sum;
                        },
                        update: function() {
                            obj.put(this);
                        },
                        remove: function() {
                            obj.remove(this);
                        },
                        removeItem: function(deadItem) {
                            var deferred = $q.defer();
                            var promise = deferred.promise;
                            var list = this;

                            promise.then(function() {
                                angular.forEach(list.items, function(item) {
                                    var iIdx = list.items.indexOf(deadItem);
                                    if (iIdx > -1) {
                                        list.items.splice(iIdx, 1);
                                    }
                                });
                            }).then(function() {
                                obj.put(list);
                                $rootScope.$broadcast('dakShoppingLists: list-changed', {});
                            });
                            deferred.resolve();
                        }
                    };
                // make all the other lists inactive
                // so when this list gets pushed it becomes the active one
                angular.forEach(obj.lists, function(list) {
                    list.active = false;
                });

                // push the list
                obj.lists.push(list);

                // broadcast the creation of the new list
                $rootScope.$broadcast('dakShoppingLists: list-added', list);
                obj.post(list);
            };
            obj.restoreList = function(data) {
                restoring = true;
                var list = {
                    id: data.id,
                    name: data.name,
                    added: data.added,
                    active: data.active,
                    inCart: data.in_cart,
                    items: [],
                    syncToCart: function() {
                        this.inCart = 1;
                        dakShoppingCart.lists.push(this);
                        $rootScope.$broadcast('dakShoppingLists: list-synced', {});
                    },
                    unSyncToCart: function(broadcast) {
                        this.inCart = 0;
                        var idx = dakShoppingCart.lists.indexOf(this);
                        dakShoppingCart.lists.splice(idx, 1);
                        if (broadcast) {
                            $rootScope.$broadcast('dakShoppingLists: list-unsynced', {});
                        }
                    },
                    count: function() {
                        var sum = 0;
                        angular.forEach(this.items, function(item) {
                            var count = parseFloat(item.count);
                            sum = sum + (count);
                        });
                        return sum;
                    },
                    total: function() {
                        var sum = 0;
                        angular.forEach(this.items, function(item) {
                            if (item.count) {
                                var count = parseFloat(item.count);
                                sum = sum + (count * item.product.new_price);
                            }
                        });
                        return sum;
                    },
                    shipping: function() {
                        var sum = 12;
                        if (this.total() > 150) {
                            sum = 0;
                        }
                        return sum;
                    },
                    update: function() {
                        obj.put(list);
                    },
                    remove: function() {
                        obj.remove(this);
                    },
                    removeItem: function(deadItem) {
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        var list = this;

                        promise.then(function() {
                            angular.forEach(list.items, function(item) {
                                var iIdx = list.items.indexOf(deadItem);
                                if (iIdx > -1) {
                                    list.items.splice(iIdx, 1);
                                }
                            });
                        }).then(function() {
                            obj.put(list);
                            $rootScope.$broadcast('dakShoppingLists: list-changed', {});
                        });
                        deferred.resolve();
                    }
                };
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function() {
                    angular.forEach(data.items, function(item) {
                        var product = $filter('filter')($rootScope.products, function(d) {
                            return d.code === item.product;
                        })[0];
                        obj.addItem(list, angular.copy(product), item.size, item.count, angular.copy(item.data));
                    });
                }).then(function() {
                    restoring = false;
                    // push the list
                    obj.lists.push(list);

                    if (list.inCart) {
                        list.syncToCart();
                    };

                    // broadcast the creation of the new list
                    $rootScope.$broadcast('dakShoppingLists: list-added', list);
                });
                deferred.resolve();

            };

            // ------------------------
            // FUNCTIONS
            // ------------------------

            // GET THE ACTIVE LIST
            obj.activeList = function() {
                var active = {};
                angular.forEach(obj.lists, function(list) {
                    if (list.active) {
                        active = list;
                    }
                });
                return active;
            };

            // MAKE LIST ACTIVE BY ID
            obj.makeActive = function(id) {
                angular.forEach(obj.lists, function(list) {
                    if (list.id == id) {
                        list.active = 1;
                        list.update();
                    } else {
                        list.active = 0;
                        list.update();
                    }
                });
            };

            // -------------------------
            // ITEMS
            // -------------------------

            // ADD AN ITEM BASED ON 5 ARGUMENTS
            // 1. the list to add the item to
            // 2. the product
            // 3. the selected size for the product
            // 4. the order count
            // 5. some optional data
            // -----------------------------------
            obj.addItem = function(list, product, size, count, data) {
                var inList = obj.getListItem(product.code, size, list);

                if (angular.isObject(inList)) {
                    //Update quantity of an item if it's already in the list
                    inList.setCount(count, false);
                    $rootScope.$broadcast('dakShoppingLists: item-changed', {});
                } else {
                    var item = {};
                    item.product = angular.copy(product);
                    item.size = size;
                    item.count = parseFloat(count);
                    item.data = angular.copy(data);

                    item.setCount = function(count, newCount) {
                        if (!newCount) {
                            this.count = this.count + parseFloat(count);
                        } else {
                            this.count = parseFloat(count);
                        }
                    };
                    item.maxCount = function() {
                            var max;
                            angular.forEach(this.product.sizes, function(productSize) {
                                if (productSize.name === size) {
                                    max = productSize.count;
                                }
                            });
                            return max;
                        },

                        list.items.push(item);

                    $rootScope.$broadcast('dakShoppingCart: item-added', {});
                    $rootScope.$broadcast('dakShoppingCart: cart-changed', {});
                    $rootScope.$broadcast('dakShoppingLists: item-added', {});
                    $rootScope.$broadcast('dakShoppingLists: item-changed', {});
                }
                $rootScope.$broadcast('dakShoppingLists: list-changed', {});
            };

            obj.getListItem = function(code, size, list) {
                var items = list.items;
                var item = false;

                angular.forEach(items, function(d) {
                    if (d.product.code === code && d.size == size) {
                        item = d;
                    }
                });
                return item;
            };

            obj.getCartItemByCode = function(code) {
                var items = dakShoppingCart.items;
                var item = false;

                angular.forEach(items, function(d) {
                    if (d.product.code === code) {
                        item = d;
                    }
                });
                return item;
            };


            // REMOVE AN ITEM BY PRODUCT.CODE FROM THE SPECIFIED LIST

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
                    $rootScope.$broadcast('dakCart: changed', {});
                });
                deferred.resolve();
            };

            // ---------------------------
            // SEND TO CART
            // ---------------------------

            obj.sendToCart = function(lists, items) {}

            return obj;
        });

})();
