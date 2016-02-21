mediaRekt.controller("ContentButtonController", function ($scope, $http, $state, $location, AjaxFactory, ShareDataService) {
    var urlParam = $location.path().split("=");
    $scope.contentId = parseInt(urlParam[1]);

    $scope.nextContent = function () {
        var request = AjaxFactory.getFileById($scope.contentId + 1);
        request.then($scope.changeToNext, $scope.errorChanging);
    };

    $scope.changeToNext = function (response) {
        console.log("Next found!");
        $state.go('contentView', {
            contentId: $scope.contentId + 1
        });
    };

    $scope.errorChanging = function (response) {
        alert("Content not found!");
    };



    $scope.previousContent = function () {
        var request = AjaxFactory.getFileById($scope.contentId - 1);
        request.then($scope.changeToPrevious, $scope.errorChanging);
    };

    $scope.changeToPrevious = function (response) {
        console.log("Previous found!");
        $state.go('contentView', {
            contentId: $scope.contentId - 1
        });
    };

    $scope.randomContent = function () {
        var request = AjaxFactory.getRandomContent();
        request.then($scope.changeToRandom, ShareDataService.error);

    };

    $scope.changeToRandom = function (response) {
        $state.go('contentView', {
            contentId: response.data.fileId
        });
    };
});