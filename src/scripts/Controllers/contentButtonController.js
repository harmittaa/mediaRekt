// handles the next, previous & random button calls from ContentView.html

mediaRekt.controller("ContentButtonController", function ($scope, $http, $state, $location, AjaxFactory, ShareDataService) {
    var urlParam = $location.path().split("=");
    $scope.contentId = parseInt(urlParam[1]);

    // get the next content, contentId + 1
    $scope.nextContent = function () {
        var request = AjaxFactory.getFileById($scope.contentId + 1);
        request.then($scope.changeToNext, $scope.errorChanging);
    };

    // if the next content is available, then changes
    $scope.changeToNext = function (response) {
        console.log("Next found!");
        $state.go('contentView', {
            contentId: $scope.contentId + 1
        });
    };

    // if no content is found
    $scope.errorChanging = function (response) {
        alert("Content not found!");
    };

    // checks for previous comment
    $scope.previousContent = function () {
        var request = AjaxFactory.getFileById($scope.contentId - 1);
        request.then($scope.changeToPrevious, $scope.errorChanging);
    };
    
    // change to the previous comment
    $scope.changeToPrevious = function (response) {
        console.log("Previous found!");
        $state.go('contentView', {
            contentId: $scope.contentId - 1
        });
    };

    // gets random content
    $scope.randomContent = function () {
        var request = AjaxFactory.getRandomContent();
        request.then($scope.changeToRandom, ShareDataService.error);

    };

    // changes to the random content
    $scope.changeToRandom = function (response) {
        $state.go('contentView', {
            contentId: response.data.fileId
        });
    };
});