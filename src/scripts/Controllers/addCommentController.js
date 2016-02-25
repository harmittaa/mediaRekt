// for adding new comment on the test.html page

mediaRekt.controller("AddCommentController", function ($scope, $rootScope, $http, AjaxFactory, ShareDataService) {
    /*$scope.user = localStorage.getItem("user");*/
    $scope.user = ShareDataService.getVariable("user");
    $scope.comment = "";

    $scope.checkLoginStatus = function () {
        console.log("checking log in status! " + ShareDataService.getVariable("logged") + " user " + ShareDataService.getVariable("user"));
        if (ShareDataService.getVariable("logged") === true) {
            $("#commentingBox").attr("placeholder", "Write your comment");
            $("#commentingBox").removeAttr("disabled");
            $("#addCommentButton").toggleClass("disabled");
        }
    };
    
    $scope.checkLoginStatus();

    $scope.addComment = function () {
        $scope.newComment = {
            "user": ShareDataService.getVariable("user"),
            "comment": $scope.comment
        };
        AjaxFactory.comment($scope.contentId, $scope.newComment).then(function successCallback(response) {
            console.log("comment made succcesfully!");
            $rootScope.$broadcast("updateComments");
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    
    // receives a broadcast when user logs in to allow commenting
    $scope.$on("userLoggedIn", function () {
       $scope.checkLoginStatus(); 
    });
});