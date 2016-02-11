// handling the comments

mediaRekt.controller("CommentController", function ($scope, $http, AjaxFactory) {
    var urlParam = window.location.href.split("=");
    $scope.contentId = urlParam[1];

        AjaxFactory.getFileComments($scope.contentId).then(function successCallback(response) {
            console.log("Finished fetching comments");
            console.log(response);
            $scope.commentData = response.data;
        }, function errorCallback(response) {
            console.log("Error getting comments");
            console.log(response);
        });
});