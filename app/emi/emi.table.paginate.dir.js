(function () {
    function emiTablePaginateFunc() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                notifyParent: '&filterTable',
                noOfPages: '@'
            },
            controller: 'emiTablePaginateCtrl',
            templateUrl: '/emi/emi.table.paginate.html',
            link: function (scope, ele, attrs, ctrl) {
                var nop;
                scope.$watch('noOfPages', function (dt) {
                    scope.paginationNumbers = [];
                    nop = Number(scope.noOfPages);

                    if (scope.noOfPages) {
                        for (var i = 1; i <= nop; i++) {
                            scope.paginationNumbers.push(i)
                        }

                        scope.paginateTable = function (currPage) {
                            scope.notifyParent({ currPage: currPage });
                        }
                    }
                });

            }
        }
    };

    angular.module('kalculator')
        .directive('emiTablePagination', emiTablePaginateFunc)
        .controller('emiTablePaginateCtrl', function () {
        })
})();