var app = angular.module('komaApp', ['rzModule']);


app.controller('FormController', [

    '$scope', '$httpParamSerializer',
    function ($scope, $httpParamSerializer) {

        $scope.query = null;

        $scope.config = FilterConfig;

        $scope.$watch(
            function () {
                var tQuery = null;
                tQuery = [];

                $scope.config.forEach(function (currentSection) {
                    currentSection.fields.forEach(function (field) {


                        if (field.type === 'slider' && field.options.stepsArray != null) {
                            var tValue = field.options.stepsArray[field.value];
                            if (tValue) {
                                tQuery[field.id] = tValue;
                            }

                        } else if (field.type === 'range') {

                            if (field.min != field.defaultmin) {
                                tQuery[field.id + '-min'] = field.min;
                            }
                            if (field.max != field.defaultmax) {
                                tQuery[field.id + '-max'] = field.max;
                            }
                            // kontrola
                            //tQuery[field.id] = [field.min, field.max];

                        } else {
                            if (field.value) {
                                if (field.value instanceof Array) {
                                    tQuery[field.id + '[]'] = field.value;
                                } else {
                                    tQuery[field.id] = field.value;
                                }
                            }
                        }


                    });
                });

                $scope.query = $httpParamSerializer(tQuery);
                console.log($scope.query);

                //$scope.query = tQuery;
            }
        );

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

        // $scope.add = function () {
        //     $scope.contacts.push($scope.newcontact);
        //     $scope.newcontact = "";
        // };

        $scope.toggleSelection = function (value, selection) {

            console.dir(selection);

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
