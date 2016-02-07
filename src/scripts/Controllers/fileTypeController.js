mediaRekt.controller("FileTypeController", function ($scope, $http, ShareDataFactory, AjaxFactory) {

    $scope.getImages = function () {
        $scope.datas = ShareDataFactory.getData();

        AjaxFactory.getFilesByType("image").then(function successCallback(response) {
            console.log(response);
            ShareDataFactory.setData(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    
    $scope.getVideo = function () {
        $scope.datas = ShareDataFactory.getData();

        AjaxFactory.getFilesByType("video").then(function successCallback(response) {
            console.log(response);
            ShareDataFactory.setData(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.getAudio = function () {
        $scope.datas = ShareDataFactory.getData();

        AjaxFactory.getFilesByType("audio").then(function successCallback(response) {
            console.log(response);
            ShareDataFactory.setData(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});