// IMAGE VIEW CONTROLLER

mediaRekt.controller("ImageController", function ($scope, $http, AjaxFactory) {
    console.log(window.location.href);
    var urlParam = window.location.href.split("=");
    $scope.contentId = urlParam[1];
    console.log($scope.contentId);

    AjaxFactory.getFileById($scope.contentId).then(function successCallback(response) {
            $scope.currentContent = response;
            console.log("Data fetched ");
            console.log($scope.currentContent);
            console.log($scope.currentContent.data.title);
        }, function errorCallback(response) {
            console.log(response);
        }); 
});