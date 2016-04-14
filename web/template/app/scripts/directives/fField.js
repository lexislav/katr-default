/**
 * Created by hotovec on 30.3.2016.
 */
app.directive('komaField', function() {
    return {
        restrict: 'E',
        template: function(elem, attr){
            return 'direktiva test';
        }
    };
});
