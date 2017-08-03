(function () {

    angular.module('kalculator')
        .service('emiCalculateService', function () {

            this.convertRateOfInterest = function (roi) {
                return (roi / 100) * (1 / 12);
            };

            this.calculateEMI = function (principalAmount, rateOfInterest, numberOfMonths) {
                var monthlyEmi, monthlyInterestRate, emiTable = [], emiObj = {};

                monthlyInterestRate = this.convertRateOfInterest(rateOfInterest);

                monthlyEmi = (principalAmount * monthlyInterestRate) * Math.pow((1 + monthlyInterestRate), numberOfMonths) / (Math.pow((1 + monthlyInterestRate), numberOfMonths) - 1);

                for (var i = 1; i <= numberOfMonths; i++) {
               
                    var monthlyInterestPaidOnExistingPrincipalAmount = principalAmount * monthlyInterestRate;

                    principalAmountPaid = monthlyEmi - monthlyInterestPaidOnExistingPrincipalAmount;
                    principalAmount = principalAmount - principalAmountPaid;

                    emiObj = {
                        month: i,
                        monthlyEmi: monthlyEmi.toFixed(2),
                        principalAmountPaid: principalAmountPaid.toFixed(2),
                        principalAmountLeft: principalAmount.toFixed(2),
                        monthlyInterestPaidOnExistingPrincipalAmount: monthlyInterestPaidOnExistingPrincipalAmount.toFixed(2)
                    };

                    emiTable.push(emiObj);
                }
               

                return emiTable;
            };       
        });

})();