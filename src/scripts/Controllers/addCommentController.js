// for adding new comment on the test.html page

mediaRekt.controller("AddCommentController", function ($scope, $rootScope, $http, AjaxFactory, ShareDataService) {
    $scope.user = localStorage.getItem("user");
    $scope.comment = "";

    $scope.checkLoginStatus = function () {
        console.log("checking log in status! " + localStorage.getItem("logged") + " user " + localStorage.getItem("user"));
        /*if (ShareDataService.getVariable("logged") === true) {*/
        if (localStorage.getItem("logged") == "true") {
            $("#commentingBox").attr("placeholder", "Write your comment");
            $("#commentingBox").removeAttr("disabled");
            $("#addCommentButton").toggleClass("disabled");
        }
    };

    $scope.checkLoginStatus();

    $scope.addComment = function () {
        if (localStorage.getItem("logged") == "true") {
            $scope.newComment = {
                /*"user": ShareDataService.getVariable("user"),*/
                "user": localStorage.getItem("user"),
                "comment": $scope.comment
            };
            AjaxFactory.comment($scope.contentId, $scope.newComment).then(function successCallback(response) {
                console.log("comment made succcesfully!");
                $rootScope.$broadcast("updateComments");
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    };

    // receives a broadcast when user logs in to allow commenting
    $scope.$on("userLoggedIn", function () {
        $scope.checkLoginStatus();
    });
});