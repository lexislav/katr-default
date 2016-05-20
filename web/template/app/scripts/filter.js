// parse url with php arrays to JS object
(function ($) {
    //
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function (str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    $.parseParams = function (query) {

        // recursive function to construct the result object
        function createElement(params, key, value) {
            key = key + '';

            // if the key is a property
            if (key.indexOf('.') !== -1) {
                // extract the first part with the name of the object
                var list = key.split('.');

                // the rest of the key
                var new_key = key.split(/\.(.+)?/)[1];

                // create the object if it doesnt exist
                if (!params[list[0]]) params[list[0]] = {};

                // if the key is not empty, create it in the object
                if (new_key !== '') {
                    createElement(params[list[0]], new_key, value);
                } else console.warn('parseParams :: empty property in key "' + key + '"');
            } else
            // if the key is an array
            if (key.indexOf('[') !== -1) {
                // extract the array name
                var list = key.split('[');
                key = list[0];

                // extract the index of the array
                var list = list[1].split(']');
                var index = list[0]

                // if index is empty, just push the value at the end of the array
                if (index == '') {
                    if (!params) params = {};
                    if (!params[key] || !$.isArray(params[key])) params[key] = [];
                    params[key].push(value);
                } else
                // add the value at the index (must be an integer)
                {
                    if (!params) params = {};
                    if (!params[key] || !$.isArray(params[key])) params[key] = [];
                    params[key][parseInt(index)] = value;
                }
            } else
            // just normal key
            {
                if (!params) params = {};
                params[key] = value;
            }
        }

        // be sure the query is a string
        query = query + '';

        if (query === '') query = window.location + '';

        var params = {}, e;
        if (query) {
            // remove # from end of query
            if (query.indexOf('#') !== -1) {
                query = query.substr(0, query.indexOf('#'));
            }

            // remove ? at the begining of the query
            if (query.indexOf('?') !== -1) {
                query = query.substr(query.indexOf('?') + 1, query.length);
            } else return {};

            // empty parameters
            if (query == '') return {};

            // execute a createElement on every key and value
            while (e = re.exec(query)) {
                var key = decode(e[1]);
                var value = decode(e[2]);
                createElement(params, key, value);
            }
        }
        return params;
    };
})(jQuery);


// APP
var app = angular.module('komaApp', ['rzModule']);

app.directive('komaFilter', function () {

    return {
        replace: true,
        scope: {
            sendLabel: '=',
            headline: '=',
            language: '='
        },
        controller: ['$scope', '$httpParamSerializer', '$http', '$timeout',
            function ($scope, $httpParamSerializer, $http, $timeout) {

                $scope.queryUrl = 'http://' + window.location.host + '/polozky?';
                $scope.query = null;
                $scope.config = FilterConfig;
                $scope.queryItems = null;
                $scope.queryItemsLabeled = null;
                $scope.loading = false;
                $scope.first = false;
                var timer = null;

                if (!$scope.config) {
                    console.error("Filter config is not defined");
                    return;
                }

                // parse url to object
                $scope.urlObject = null;
                $scope.urlObject = $.parseParams(window.location.href);


                $scope.displaytype = $scope.urlObject.displaytype;
                $scope.sort = $scope.urlObject.sort;


                $scope.parseGetQuery = function () {

                    $scope.config.forEach(function (section) {
                        section.fields.forEach(function (field) {

                                if (field.type === 'range') {
                                    var urlFieldValueMax = $scope.urlObject[field.id + '-max'];
                                    var urlFieldValueMin = $scope.urlObject[field.id + '-min'];

                                    if (urlFieldValueMax != null && urlFieldValueMax != '') {
                                        field.max = urlFieldValueMax;
                                    }
                                    if (urlFieldValueMin != null && urlFieldValueMin != '') {
                                        field.min = urlFieldValueMin;
                                    }


                                } else if (field.type === 'slider') {
                                    var urlFieldValue = $scope.urlObject[field.id];
                                    if (urlFieldValue != null && urlFieldValue != '') {
                                        indexValue = field.options.stepsArray.indexOf(parseFloat(urlFieldValue));
                                        field.value = indexValue;
                                    }
                                } else {

                                    var urlFieldValue = $scope.urlObject[field.id];
                                    if (urlFieldValue != null && urlFieldValue != '') {
                                        field.value = urlFieldValue;
                                    }
                                }

                            }
                        );
                    });
                };

                // parse query and if found config field has url param set the value
                $scope.parseGetQuery();


                $scope.$watch(
                    function () {
                        var tQuery = null;
                        var checker = $scope.config[0].fields[1]; //struktura

                        tQuery = [];


                        $scope.config.forEach(function (currentSection) {
                            currentSection.fields.forEach(function (field) {

                                if (field.isDisabled === false) {

                                    if (field.type === 'slider' && field.options.stepsArray != null) {

                                        var defValue = field.options.stepsArray[field.default];
                                        var tValue = field.options.stepsArray[field.value];

                                        if (tValue && tValue != defValue) {
                                            tQuery[field.id] = tValue;
                                        }

                                    } else if (field.type === 'range') {

                                        if (field.min != field.defaultmin) {
                                            tQuery[field.id + '-min'] = field.min;
                                        }
                                        if (field.max != field.defaultmax) {
                                            tQuery[field.id + '-max'] = field.max;
                                        }

                                    } else {
                                        if (field.value) {
                                            if (field.value instanceof Array) {
                                                tQuery[field.id + '[]'] = field.value;
                                            } else {
                                                tQuery[field.id] = field.value;
                                            }
                                        }
                                    }
                                }


                                // check disable lock

                                if (field.disabled.length > 0) {
                                    field.disabled.forEach(function (driver) {
                                        if (driver.id === checker.id) {

                                            // tohle je jen hodně na oko
                                            var a = driver.data.indexOf(checker.value);
                                            if (a >= 0) {
                                                field.isDisabled = true;
                                            } else {
                                                field.isDisabled = false;
                                            }
                                        }
                                    });
                                } else {
                                    field.isDisabled = false;
                                }


                            });
                        });

                        // pass location and sort to query
                        if ($scope.sort) {
                            tQuery['sort'] = $scope.sort;
                        }
                        if ($scope.displaytype) {
                            tQuery['displaytype'] = $scope.displaytype;
                        }


                        var newQuery = $httpParamSerializer(tQuery);

                        if (newQuery != $scope.query && $scope.loading === false && newQuery.length > 0) {
                            $scope.query = newQuery;

                            if (timer) {
                                $timeout.cancel(timer);
                            }
                            timer = $timeout(function () {
                                //console.log(timer.$$timeoutId);
                                $timeout.cancel(timer);
                                $scope.testResult();
                            }, 500);

                        }

                        // reset informace o poctu prvku
                        if (newQuery.length === 0) {
                            $scope.queryItemsLabeled = '';
                            $scope.queryItems = 0;
                        }

                    }
                );

                $scope.testResult = function () {
                    var queryurl = 'http://' + window.location.host + '/api/filter-results.json?' + $scope.query;
                    $scope.loading = true;
                    $http({
                        method: 'GET',
                        url: queryurl
                    }).then(function successCallback(response) {
                        $scope.queryItems = response.data.items;
                        $scope.queryItemsLabeled = response.data.labeled;
                        console.log('affected[' + $scope.queryItems + ']: ' + queryurl);
                        $scope.loading = false;
                    }, function errorCallback(response) {
                        $scope.loading = false;
                        return 0;
                    });
                };

                $scope.resetFilter = function () {
                    $scope.config.forEach(function (currentSection) {
                        currentSection.fields.forEach(function (field) {

                            if ('value' in field) {
                                field.value = field.default;
                            }
                            if ('min' in field) {
                                field.min = field.defaultmin;
                            }
                            if ('max' in field) {
                                field.max = field.defaultmax;
                            }

                        })
                    })
                };

                $scope.isFieldDisabled = function (field) {

                };


                $scope.toggleCloudItem = function toggleSelection(cloud, index) {
                    var idx = cloud.indexOf(index);
                    // is currently selected
                    if (idx > -1) {
                        cloud.splice(idx, 1);
                    }
                    // is newly selected
                    else {
                        cloud.push(index);
                    }
                };

                $scope.sectionToggle = function (section) {
                    if (section.closable === true) {
                        section.opened = !section.opened;
                    }
                };

                $scope.toggleSelection = function (value, selection) {
                    var idx = selection.indexOf(value);
                    // is currently selected
                    if (idx > -1) {
                        selection.splice(idx, 1);
                    }
                    // is newly selected
                    else {
                        selection.push(value);
                    }
                };


            }],

        link: function (scope, element, attrs) {
            console.log('kof-link');
        },

        templateUrl: '/template/app/scripts/filterDirective.html'

    }
});
