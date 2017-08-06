(function () {
    function emiTablePaginateFunc() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                notifyParent: '&filterTable',
                noOfPages: '@',
                currentPage: '=currentPage'
            },
            controller: 'emiTablePaginateCtrl',
            templateUrl: '/emi/emi.table.paginate.html',
            link: function (scope, ele, attrs, ctrl) {
                var nop;
                scope.$watch('noOfPages', function (dt) {
                    scope.paginationNumbers = [];
                    nop = Number(scope.noOfPages);
                    scope.cp = Number(scope.currentPage);

                    scope.totalPages = Number(scope.noOfPages);

                    if (scope.noOfPages) {
                        for (var i = 1; i <= nop; i++) {
                            scope.paginationNumbers.push({
                                id : i
                            })
                        }
                        scope.paginateTable = function (currPage) {
                            scope.cp = Number(currPage);
                            scope.notifyParent({ currPage: scope.cp});
                        }
                    }
                });
                scope.pageNum = { id : 1 };
            }
        }
    };

    angular.module('kalculator')
        .directive('emiTablePagination', emiTablePaginateFunc)
        .controller('emiTablePaginateCtrl', function () {
        })
})();

