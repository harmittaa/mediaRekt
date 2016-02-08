mediaRekt.controller("ContentController", function ($scope, AjaxFactory, ShareDataFactory) {
    $scope.loadAmount = 5;

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