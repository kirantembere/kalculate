(function () {
    function emiKalFunc(emiCalculateService) {
        return {
            restrict: 'E',
            requires: 'ngModel',
            controller: 'emiCtrl',
            templateUrl: '/emi/emi.html',
            link: function (scope, ele, attrs, ctrl) {

                var principalAmount,
                    noOfMonths,
                    rateOfInterest;

                scope.calculatorTitle = 'EMI Calculator';

                scope.calculateEMI = function () {
                    console.log(scope)
                    if (scope.emiForm.$valid) {
                        principalAmount = scope.principalAmount;
                        noOfMonths = scope.noOfMonths;
                        rateOfInterest = scope.rateOfInterest;
                        scope.emiTable = emiCalculateService.calculateEMI(principalAmount, rateOfInterest, noOfMonths);
                        console.log(scope.emiTable)
                        return scope.emiTable;
                    }
                }              
            }
        }
    };

    angular.module('kalculator')
        .directive('emiKalculator', ['emiCalculateService', emiKalFunc])
        .controller('emiCtrl', function () {});
})();