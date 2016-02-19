// controller listens for "updateComments" broadcast and updates the comments 
// the comments

mediaRekt.controller("CommentController", function ($scope, $http, $location, AjaxFactory, ShareDataService) {

    // gets the comments
    $scope.getComments = function () {
        AjaxFactory.getFileComments(ShareDataService.getVariable("contentId")).then(function successCallback(response) {
            $scope.commentData = response.data.reverse();
        }, function errorCallback(response) {
            console.log("Error getting comments");
            console.log(response);
        });
    };

    // receives broadcast of new comment and updates comments
    $scope.$on("updateComments", function () {
        $scope.getComments();
    });
});