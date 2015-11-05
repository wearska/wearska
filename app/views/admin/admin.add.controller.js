(function() {
    'use strict';

    angular.module('wearska')
        .controller('WskAddCtrl', function($scope, $timeout, $q, wskItems) {

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
                price: 0,
                stock: 0,
                created: new Date(),
                has_options: true,
                options: [{
                    type: 'Size',
                    name: 'XS',
                    count: 6
                }, {
                    type: 'Size',
                    name: 'S',
                    count: 12
                }]
            };


            $scope.$watch(
                'newitem.options',
                function(newNames, oldNames) {
                    $scope.getStock();
                    console.log($scope.newitem.options.length);
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

        });

})();
