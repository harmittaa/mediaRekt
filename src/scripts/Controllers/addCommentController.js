// for adding new comment on the test.html page

mediaRekt.controller("AddCommentController", function ($scope, $rootScope, $http, AjaxFactory, ShareDataService) {
    $scope.user = localStorage.getItem("user");
    $scope.comment = "";

    $scope.addComment = function () {
        $scope.newComment = {
            "user": localStorage.getItem("user"),
            "comment": $scope.comment
        };
        console.log($scope.comment);
        localStorage.getItem("user");
        AjaxFactory.comment($scope.contentId, $scope.newComment).then(function successCallback(response) {
            console.log(response);
            console.log("comment made succcesfully!");
            $rootScope.$broadcast("updateComments");
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});