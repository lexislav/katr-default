var app = angular.module('komaApp', ['rzModule']);

app.controller('FormController', [

    '$scope', '$httpParamSerializer',
    function ($scope, $httpParamSerializer) {

        $scope.queryUrl = 'http://' + window.location.host + '/polozky?';
        $scope.query = null;
        $scope.config = FilterConfig;

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

                $scope.query = $scope.queryUrl + $httpParamSerializer(tQuery);


                //console.log($scope.query);
            }
        );

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
            console.log('xx');
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


    }]);
