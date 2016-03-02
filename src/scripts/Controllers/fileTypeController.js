// gets new data based on what content user wants to see

mediaRekt.controller("FileTypeController", function ($scope, $rootScope, $http, ShareDataService, AjaxFactory) {
    $scope.contentToShow = "";

    $scope.getImages = function () {
/*        AjaxFactory.getFilesByType("image").then(function successCallback(response) {
            console.log(response);
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data;

            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });*/
        ShareDataService.setVariable("contentType", "image");
        $rootScope.$broadcast("contentChanged");
    };

    $scope.getVideo = function () {
        /*AjaxFactory.getFilesByType("video").then(function successCallback(response) {
            console.log(response);
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data;
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });*/
        ShareDataService.setVariable("contentType", "video");
        $rootScope.$broadcast("contentChanged");
    };

    $scope.getAudio = function () {
        /*AjaxFactory.getFilesByType("audio").then(function successCallback(response) {
            console.log(response);
            $scope.contentData.data = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });*/
        ShareDataService.setVariable("contentType", "audio");
        $rootScope.$broadcast("contentChanged");
    };
    
    $scope.getAll = function () {
        /*AjaxFactory.getFilesByType("audio").then(function successCallback(response) {
            console.log(response);
            $scope.contentData.data = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });*/
        ShareDataService.setVariable("contentType", "");
        $rootScope.$broadcast("contentChanged");
        console.log(ShareDataService.getVariable("contentType"));
    };
});