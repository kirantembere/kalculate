(function () {
    function emiDashboardFunc() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                totalInterest: '@',
                totalPayment: '@',
                monthlyEmi: '@'
            },
            controller: 'emiDashboardCtrl',
            templateUrl: '../../../emi.dashboard.html'
        }
    };

    angular.module('kalculator')
        .directive('emiDashboard', emiDashboardFunc)
        .controller('emiDashboardCtrl', function () {
        });
})();