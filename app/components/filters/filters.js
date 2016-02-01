(function() {
    'use strict';

    angular
        .module('daksports')
        .filter('brandFilter', function($rootScope) {
            return function(items, brand) {
                var filtered = [];
                // console.log(brand);
                // return items;
                if (brand.length <= 0 || brand[0] == 'All-brands') {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.brand && brand.indexOf(item.brand) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('typeFilter', function($rootScope) {
            return function(items, type) {
                var filtered = [];
                // return items;
                if (type.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    var itemType = item.type;
                    // console.log(itemType);
                    if (itemType && type.indexOf(itemType) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('kindFilter', function($rootScope) {
            return function(items, kind) {
                var filtered = [];
                // return items;
                if (kind.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.kind && kind.indexOf(item.kind) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('priceFilter', function($rootScope) {
            return function(items, range) {
                var filtered = [];
                if (range != null) {
                    range.min = parseFloat(range.min), range.max = parseFloat(range.max);
                }
                // return items;
                if (!angular.isObject(range)) {
                    return items;
                }
                angular.forEach(items, function(item) {

                    if (!range.min && !range.max) {
                        filtered.push(item);
                    } else if (range.min && !range.max) {
                        if (item.new_price >= range.min) {
                            filtered.push(item);
                        }
                    } else if (!range.min && range.max) {
                        if (item.new_price < range.max) {
                            filtered.push(item);
                        }
                    } else if (range.min && range.max) {
                        if (item.new_price >= range.min && item.new_price < range.max) {
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            };
        })
        .filter('promoFilter', function() {
            return function(items, value) {
                var filtered = [];
                if (!value) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.promo == value) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('favFilter', function() {
            return function(items, value) {
                var filtered = [];
                if (!value) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.favourite == value) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('fitForMeFilter', function($rootScope) {
            return function(items, value) {
                var filtered = [];
                if (!value || !$rootScope.userData) {
                    return items;
                }
                var gender = $rootScope.userData.gender;
                var shoeSize = $rootScope.userData.shoe_size;
                var topSize = $rootScope.userData.top_size;
                var pantsSize = $rootScope.userData.pants_size;
                angular.forEach(items, function(item) {
                    if (item.gender == gender || item.gender == 0) {
                        if (item.sizes) {
                            var i = 0;
                            angular.forEach(item.sizes, function(size) {
                                if (size.name == shoeSize || size.name == topSize || size.name == pantsSize && i < 1) {
                                    if (size.count > 0) {
                                        filtered.push(item);
                                        i++;
                                    }
                                }
                            });
                        } else if (!item.sizes) {
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            };
        })
        .filter('excludeFilter', function($rootScope) {
            return function(items, code) {
                var filtered = [];
                angular.forEach(items, function(item) {
                    if (item.code != code) {
                        filtered.push(item);
                    }
                })
                return filtered;
            };
        });

})();