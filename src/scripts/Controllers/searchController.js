// handles searching

mediaRekt.controller("SearchController", function ($scope, $http, $rootScope, AjaxFactory, ShareDataService) {
    $scope.titleSearch = "";
    $scope.descSearch = "";

    $scope.search = function () {
        console.log("user clicked search");
        $('#searchNotification').toggleClass('hide-alert');
        if ($scope.titleSearch !== "") {

            $scope.searchInfo = {
                "title": $scope.titleSearch
            };

            AjaxFactory.searchByTitle($scope.searchInfo).then(function successCallback(response) {
                console.log(response);
                /*$scope.contentData.data = response.data;*/
                /*console.log($scope.contentData.data);*/
                ShareDataService.setVariable("contentData", response);
                $rootScope.$broadcast("contentDataChanged");
                ShareDataService.setVariable("searched", true);
            }, function errorCallback(response) {
                console.log(response);
            });

        } else if ($scope.descSearch !== "") {
            $scope.searchInfo = {
                "desc": $scope.descSearch
            };
            AjaxFactory.searchByDescription($scope.searchInfo).then(function successCallback(response) {
                console.log(response);
               /* $scope.contentData.data = response.data;
                console.log($scope.contentData.data);*/
                ShareDataService.setVariable("contentData", response);
                $rootScope.$broadcast("contentDataChanged");
                ShareDataService.setVariable("searched", true);
            }, function errorCallback(response) {
                console.log(response);
            });
        } else {
            alert("CHOOSE SOMETHING!");
        }
    };

    $scope.closeSearchResults = function () {
        $('#searchNotification').toggleClass('hide-alert');
        $rootScope.$broadcast("getAllDataAgain");
    };
});