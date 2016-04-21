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
                $scope.queryItems = 0;
                $scope.loading = false;
                var timer = null;

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


                        var newQuery = $httpParamSerializer(tQuery);
                        if(newQuery != $scope.query && $scope.loading === false) {
                            $scope.query = newQuery;
                            if(timer) {
                                $timeout.cancel(timer);
                            }
                            timer = $timeout(function(){
                                //console.log(timer.$$timeoutId);
                                $timeout.cancel(timer);
                                $scope.testResult();
                            }, 1000);

                        }
                    }
                );

                $scope.testResult = function () {
                    var queryurl = 'http://koma-katalog.dev/api/filter-results.json?' + $scope.query;
                    $scope.loading = true;
                    $http({
                        method: 'GET',
                        url: queryurl
                    }).then(function successCallback(response) {
                        $scope.queryItems = response.data.items;
                        console.log('affected['+ $scope.queryItems + ']: ' + queryurl);
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
                    section.opened = !section.opened;
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
