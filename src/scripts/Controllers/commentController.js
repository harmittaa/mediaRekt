// when ever the xView is called, controller downloads new comments
// when a new comment is added the controller gets a notification from broadcast and updates 
// the comments

mediaRekt.controller("CommentController", function ($scope, $http, AjaxFactory) {
    var urlParam = window.location.href.split("=");
    $scope.contentId = urlParam[1];

    // gets the comments
    $scope.getComments = function () {
        console.log("getting comments");
        AjaxFactory.getFileComments($scope.contentId).then(function successCallback(response) {
            console.log("Finished fetching comments");
            console.log(response);
            $scope.commentData = response.data.reverse();
        }, function errorCallback(response) {
            console.log("Error getting comments");
            console.log(response);
        });
    };
    $scope.getComments();

    // receives broadcast of new comment and updates comments
    $scope.$on("updateComments", function () {
        console.log("hoooooo");
        $scope.getComments();
    });
});