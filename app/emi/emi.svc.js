(function () {

    angular.module('kalculator')
        .service('emiCalculateService', function () {

            this.convertRateOfInterest = function (roi) {
                return (roi / 100) * (1 / 12);
            };

            this.calculateEMI = function (principalAmount, monthlyInterestRate, numberOfMonths) {
                var monthlyEMI = (principalAmount * monthlyInterestRate) * Math.pow((1 + monthlyInterestRate), numberOfMonths) / (Math.pow((1 + monthlyInterestRate), numberOfMonths) - 1);
                return monthlyEMI;
            };

            this.calculateTotalInterest = function (monthlyEmi, principalAmount, numberOfMonths) {
                var totInterest = ((monthlyEmi * numberOfMonths) - principalAmount).toFixed(2);
                return totInterest;
            };

            this.generateAmortizationTable  = function (principalAmount, rateOfInterest, numberOfMonths) {
                var monthlyEmi, emiSvcResponse = {}, monthlyInterestRate, actualLoanAmount = principalAmount, emiTable = [], emiObj = {};

                monthlyInterestRate = this.convertRateOfInterest(rateOfInterest);

                monthlyEmi = this.calculateEMI(principalAmount, monthlyInterestRate, numberOfMonths);

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
                var totalInterest = this.calculateTotalInterest(monthlyEmi, actualLoanAmount, numberOfMonths);
               


                emiSvcResponse.emiTable = emiTable;
                emiSvcResponse.totalInterest = totalInterest;
                emiSvcResponse.totalPayment = (monthlyEmi * numberOfMonths).toFixed(2);  //Principal and Interest
                emiSvcResponse.monthlyEmi = monthlyEmi.toFixed(2);

                return emiSvcResponse;
            };       

            this.getPrinicipalAndInterestValuesForPieChart = function (principalAmount, monthlyEmi, noOfMonths) {
                return Math.round(100 * (principalAmount / (monthlyEmi * noOfMonths)));
            };
        });

})();