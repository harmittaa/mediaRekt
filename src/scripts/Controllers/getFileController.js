// gets the data from the fileService and sets it to $scope.files

mediaRekt.controller("GetFileController", function ($scope, AjaxFactory, fileService, ShareDataFactory) {
    $scope.loadAmount = 5;

    $scope.getContent = function () {
        $scope.files = ShareDataFactory.getData();
        console.log($scope.files);
            fileService.success(function (data) {
            console.log("getting files");
            $scope.files = data;
            ShareDataFactory.setData($scope.files);
        });

    };

    /*    fileService.success(function (data) {
            console.log("getting files");
            $scope.files = data;
            ShareDataFactory.setData($scope.files);
        });*/

    /*    AjaxFactory.getAllFiles().then(function successCallback(response) {
            console.log("success");
            $scope.files = response;
            console.log(response);
            console.log($scope.files);
        }, function errorCallback(response) {
            console.log(response);
        });*/

    // load more content to show on gallery
    $scope.loadContent = function () {
        console.log("loading content!");
        $scope.loadAmount += 5;
    };

    // loads all images
    $scope.getImages = function () {
        console.log("User wants to see images");
        AjaxFactory.getFilesByType("image").then(function successCallback(response) {
            console.log("Files fetched succesfully!");
            console.log(response);
            $scope.files = response;
        }, function errorCallback(response) {
            console.log("Something went wrong!");
            console.log(response);
        });
    };
});