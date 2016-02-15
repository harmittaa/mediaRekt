// getting the data when user selects front page

mediaRekt.controller("ContentController", function ($scope, AjaxFactory, ShareDataFactory) {
    $scope.loadAmount = 5;

    AjaxFactory.getFilesByType("image").then(function successCallback(response) {
        console.log(response);
        console.log("setting data to contentdata.data");
        $scope.contentData.data = response.data;
        console.log($scope.contentData.data);
    }, function errorCallback(response) {
        console.log(response);
    });

    // splits the fileType from mimeType and returns to html
    $scope.getType = function (type) {
        return type.substr(0, 5);
    };

    // load more content to show on gallery
    $scope.loadContent = function () {
        console.log("loading content!");
        $scope.loadAmount += 5;
    };
});