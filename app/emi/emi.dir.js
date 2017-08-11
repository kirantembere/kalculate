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

                scope.generateAmortizationTable = function () {
                    if (scope.emiForm.$valid) {
                        principalAmount = scope.principalAmount;
                        noOfMonths = scope.noOfMonths;
                        rateOfInterest = scope.rateOfInterest;

                        var emiSvcResp = emiCalculateService.generateAmortizationTable(principalAmount, rateOfInterest, noOfMonths);
                        scope.emiTable = emiSvcResp.emiTable;

                        scope.totalInterest = emiSvcResp.totalInterest;
                        scope.totalPayment = emiSvcResp.totalPayment;
                        scope.monthlyEmi = emiSvcResp.monthlyEmi;

                        var principalLoanAmountInPercentage = emiCalculateService.getPrinicipalAndInterestValuesForPieChart(principalAmount, scope.monthlyEmi, noOfMonths);
                           
                        scope.labels = ["Principal Loan", "Total Interest"];
                        scope.data = [principalLoanAmountInPercentage, 100 - principalLoanAmountInPercentage];
                    }
                }
            }
        }
    };

    angular.module('kalculator')
        .directive('emiKalculator', ['emiCalculateService', emiKalFunc])
        .controller('emiCtrl', function () { });
})();
