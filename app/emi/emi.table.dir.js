(function () {
    function emiTableFunc() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                datasource: '@',
                pageSize: '@'
            },
            controller: 'emiTableCtrl',
            templateUrl: '/emi/emi.table.html',
            link: function (scope, ele, attrs, ctrl) {
                var pageStart,
                    pageEnd,
                    currentPage = 1;

                function filterTable(tbl, cp) {
                    scope.noOfPages = Math.ceil(tbl.length / scope.pageSize);
                    pageEnd = cp * scope.pageSize;
                    pageStart = pageEnd - scope.pageSize;
                    scope.tableData = tbl.slice(pageStart, pageEnd);

                }
                scope.$watch('datasource', function (dt) {
                    if (scope.datasource) {  
                       // scope.tableData = JSON.parse(scope.datasource);
                        filterTable(JSON.parse(scope.datasource), currentPage);
                    }
                });

                scope.filterTableByCurrentPage = function (currPage) {
                    filterTable(JSON.parse(scope.datasource), currPage);
                }
            }
        }
    };

    angular.module('kalculator')
        .directive('emiTable', emiTableFunc)
        .controller('emiTableCtrl', function () {
        })
        //.filter('myfilter', function () {
        //    return function (items) {
        //        console.log(items)
        //    };
        //});
})();