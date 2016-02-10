mediaRekt.controller("SearchController", function ($scope, $http, AjaxFactory) {
    $scope.titleSearch = "";
    $scope.userSeach = "";
    $scope.descSearch = "";
    $scope.titleSearched = false;
    $scope.descSearched = false;
    $scope.userSearched = false;

    $scope.search = function () {
        $scope.searchInfo = {
            "title": $scope.titleSearch
        };
        console.log("user clicked search");
        if ($scope.titleSearch !== "") {
            AjaxFactory.searchByTitle($scope.searchInfo).then(function successCallback(response) {
                console.log(response);
                $scope.contentData.data = response.data;
                console.log($scope.contentData.data);
                $scope.titleSearched = true;
            }, function errorCallback(response) {
                console.log(response);
            });

        } else if ($scope.descSearch !== "") {
            AjaxFactory.searchByTitle($scope.searchInfo).then(function successCallback(response) {
                console.log(response);
                $scope.contentData.data = response.data;
                console.log($scope.contentData.data);
                $scope.titleSearched = true;
            }, function errorCallback(response) {
                console.log(response);
            });

        } else {

        }
    };
});