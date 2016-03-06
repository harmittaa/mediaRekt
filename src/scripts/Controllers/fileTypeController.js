// gets new data based on what content user wants to see

mediaRekt.controller("FileTypeController", function ($scope, $rootScope, $http, ShareDataService, AjaxFactory) {
    $scope.contentToShow = "";

    $scope.getImages = function () {
        ShareDataService.setVariable("contentType", "image");
        $rootScope.$broadcast("contentChanged");
    };

    $scope.getVideo = function () {
        ShareDataService.setVariable("contentType", "video");
        $rootScope.$broadcast("contentChanged");
    };

    $scope.getAudio = function () {
        ShareDataService.setVariable("contentType", "audio");
        $rootScope.$broadcast("contentChanged");
    };
    
    $scope.getAll = function () {
        ShareDataService.setVariable("contentType", "");
        $rootScope.$broadcast("contentChanged");
        console.log(ShareDataService.getVariable("contentType"));
    };
});