(function () {
    function emiTableFunc() {
        return {
            restrict: 'E',
            replace : true,
            controller: 'emiTableCtrl',
            templateUrl: '/emi/emi.table.html',
            link: function (scope, ele, attrs, ctrl) {
                console.log(scope)
               
            }
        }
    };

    angular.module('kalculator')
        .directive('emiKalculatorTable', [emiTableFunc])
        .controller('emiTableCtrl', function () { });
})();