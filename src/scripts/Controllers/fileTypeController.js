mediaRekt.controller("FileTypeController", function ($scope, $http, ShareDataFactory, AjaxFactory) {

    $scope.getImages = function () {
        $scope.datas = ShareDataFactory.getData();

        AjaxFactory.getFilesByType("image").then(function successCallback(response) {
            console.log(response);
            ShareDataFactory.setData(response);
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data;
            
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    
    $scope.getVideo = function () {
        $scope.datas = ShareDataFactory.getData();

        AjaxFactory.getFilesByType("video").then(function successCallback(response) {
            console.log(response);
            ShareDataFactory.setData(response);
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data;
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });
        
        /*$("#contents").load("views/video.html");*/
    };

    $scope.getAudio = function () {
        $scope.datas = ShareDataFactory.getData();

        AjaxFactory.getFilesByType("audio").then(function successCallback(response) {
            console.log(response);
            ShareDataFactory.setData(response);
            $scope.contentData.data = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    
    
});