// handles searching

mediaRekt.controller("SearchController", function ($scope, $http, AjaxFactory) {
    $scope.titleSearch = "";
    $scope.descSearch = "";

    $scope.search = function () {
        console.log("user clicked search");
        if ($scope.titleSearch !== "") {

            $scope.searchInfo = {
                "title": $scope.titleSearch
            };

            AjaxFactory.searchByTitle($scope.searchInfo).then(function successCallback(response) {
                console.log(response);
                $scope.contentData.data = response.data;
                console.log($scope.contentData.data);
            }, function errorCallback(response) {
                console.log(response);
            });

        } else if ($scope.descSearch !== "") {
            $scope.searchInfo = {
                "desc": $scope.descSearch
            };
            AjaxFactory.searchByDescription($scope.searchInfo).then(function successCallback(response) {
                console.log(response);
                $scope.contentData.data = response.data;
                console.log($scope.contentData.data);
            }, function errorCallback(response) {
                console.log(response);
            });
        } else {
            alert("CHOOSE SOMETHING!");
        }
    };
});