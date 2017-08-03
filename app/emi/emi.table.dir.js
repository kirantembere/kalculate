(function () {
    function emiTableFunc() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                datasource: '@'
            },
            controller: 'emiTableCtrl',
            templateUrl: '/emi/emi.table.html',
            link: function (scope, ele, attrs, ctrl) {

                scope.$watch('datasource', function (dt) {
                    if (scope.datasource) {
                        scope.tableData = JSON.parse(scope.datasource);
                    } 
                });
            }
        }
    };

    angular.module('kalculator')
        .directive('emiTable', emiTableFunc)
        .controller('emiTableCtrl', function () {
        });
})();