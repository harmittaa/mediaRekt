mediaRekt.controller("AddCommentController", function ($scope, $http, AjaxFactory) {
    console.log("AddCommentController");
    $scope.user = localStorage.getItem("user");
    $scope.comment = "";

    $scope.addComment = function () {
        /*$scope.commentForm = new FormData(document.querySelector("#commentForm"));*/
        
        $scope.commentForm = new FormData();
        $scope.commentForm.append("user", $scope.user);
        $scope.commentForm.append("comment", $scope.comment);
        console.log($scope.comment);
        localStorage.getItem("user");
        AjaxFactory.comment($scope.contentId, $scope.commentForm).then(function successCallback(response) {
            console.log(response);
            console.log("comment made succcesfully!");
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});