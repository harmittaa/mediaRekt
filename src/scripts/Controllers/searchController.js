mediaRekt.controller("SearchController", function ($scope, $http, AjaxFactory) {
    $scope.titleSearch = "";
    $scope.userSearch = "";
    $scope.descSearch = "";
    $scope.searchUserId = "";

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

/*        } else if ($scope.userSearch !== "") {

            AjaxFactory.findUserById($scope.userSearch).then(function successCallback(response) {
                console.log(response);
                $scope.searchUserId = response.data.userId;

                
            }, function errorCallback(response) {
                console.log(response);
            });*/
                
/*              .then(function continueNext() {
                AjaxFactory.getUserUploads($scope.userSearch).then(function successCallback(response) {
                    console.log("getting uploads");
                    console.log(response);
                    $scope.contentData.data = response.data;
                    console.log($scope.contentData.data);
                    $scope.titleSearched = true;
                }, function errorCallback(response) {
                    console.log(response);
                });
            });*/

        } else {
            alert("CHOOSE SOMETHING!");
        }
    };
});