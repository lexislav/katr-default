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


                $scope.getParameterByName = function(name, url) {
                    if (!url) url = window.location.href;

                    name = name.replace(/[\[\]]/g, "\\$&");
                    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                        results = regex.exec(url);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, " "));
                };

                $scope.displaytype = $scope.getParameterByName('displaytype');
                $scope.sort = $scope.getParameterByName('sort');

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
                        if($scope.sort) {
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
