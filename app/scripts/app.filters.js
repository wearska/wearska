(function() {
    'use strict';

    angular
        .module('daksports')
        .filter('dakRandomize', function() {
            return function(input) {
                if (input !== null && input !== undefined && input > 1) {
                    return Math.floor((Math.random() * input) + 1);
                }
            };
        })
        .filter('dakShuffle', function() {
            var shuffledArr = [],
                shuffledLength = 0;
            return function(arr, shuffled) {
                if (arr && shuffled) {
                    var o = arr.slice(0, arr.length);
                    if (shuffledLength === arr.length) {
                        return shuffledArr;
                    }
                    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
                        shuffledArr = o;
                        shuffledLength = o.length;
                        return o;
                    }
                } else {
                    return arr;
                }
            };
        })
        .filter('dakReverse', function() {
            return function(items) {
                if (items) {
                    return items.slice().reverse();
                } else {
                    return items;
                }
            };
        })
        .filter('dakQuantize', function() {
            return function(input, steps) {
                var step = 100 / steps;
                var halfstep = step / 2;
                if (input !== null && input !== undefined) {
                    input = parseFloat(input);
                    while (--steps + 1 > 0) {
                        var threshold = step * steps + halfstep;
                        if (input >= threshold) {
                            return steps + 1;
                            break;
                        }
                    }
                }
            };
        })
        .filter('dakSerialize', function() {
            return function(input) {
                if (input !== null && input !== undefined) {
                    var min = 10000;
                    var max = 99999;
                    var num = Math.floor(Math.random() * (max - min + 1)) + min;
                    return input + '' + num;
                }
            };
        })
        .filter('dakShortify', function() {
            return function(input) {
                if (input !== null && input !== undefined && input !== "") {
                    return angular.uppercase(input.replace(/[aeiou]/ig, '').substring(0, 3));
                }
            };
        })
        .filter('dakFilename', function() {
            return function(input) {
                if (input !== null && input !== undefined && input !== "") {
                    return input.substring(input.lastIndexOf('/')+1);
                }
            };
        })
        .filter('dakLowres', function() {
            return function(input) {
                // return input ? input.replace(/(\.[\w\d_-]+)$/i, '_low$1') : input;
                var checkFile = input.replace(/(\.[\w\d_-]+)$/i, '_low$1');
                var img = new Image();
                img.src = checkFile;
                if (img.height != 0){
                    return input ? input.replace(/(\.[\w\d_-]+)$/i, '_low$1') : input;
                }else{
                    return input;
                }
            };
        })
        .filter('dakMedres', function() {
            return function(input) {
                // return input ? input.replace(/(\.[\w\d_-]+)$/i, '_medium$1') : input;
                var checkFile = input.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                var img = new Image();
                img.src = checkFile;
                if (img.height != 0){
                    return input ? input.replace(/(\.[\w\d_-]+)$/i, '_medium$1') : input;
                }else{
                    return input;
                }
            };
        })
        .filter('dakHighres', function() {
            return function(input) {
                // return input ? input.replace(/(\.[\w\d_-]+)$/i, '_high$1') : input;
                var checkFile = input.replace(/(\.[\w\d_-]+)$/i, '_high$1');
                var img = new Image();
                img.src = checkFile;
                if (img.height != 0){
                    return input ? input.replace(/(\.[\w\d_-]+)$/i, '_high$1') : input;
                }else{
                    return input;
                }
            };
        });

})();
