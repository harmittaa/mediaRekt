// for getting the like status when entering contentView and toggling the like status when user clicks like button

mediaRekt.controller("LikeController", function ($scope, $http, AjaxFactory, ShareDataService) {
    $scope.liked = false;
    $scope.currentUser = localStorage.getItem("user");

    // gets the like status
    $scope.getLikeStatus = function () {
        console.log("getting likes");
        if (localStorage.getItem("logged") == "true") {
            AjaxFactory.getUserLikes(localStorage.getItem("user")).then(function successCallback(response) {
                $scope.likes = response;
                console.log($scope.likes.data.length);
                for (var i = 0; i < $scope.likes.data.length; i++) {
                    if ($scope.likes.data[i].fileId == parseInt($scope.contentId)) {
                        console.log("liked the photo!");
                        $("#likeSpan").toggleClass("likeSpanColor");
                        $scope.liked = true;
                    }
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    };

    $scope.getLikeStatus();

    // checks if user has logged in, if yes then shows the likeButton
    $scope.checkLoginStatus = function () {
        if (localStorage.getItem("logged") == "true") {
            $("#likeButton").toggleClass("disabled");
        }
    };

    $scope.$on("userLoggedIn", function () {
        $scope.checkLoginStatus();
    });

    $scope.checkLoginStatus();

    // like/unline the content
    $scope.toggleLike = function () {
        console.log("TOGGLE LIKE " + ShareDataService.getVariable("logged"));
        if (localStorage.getItem("logged") == "true") {
            if ($scope.liked === false) {
                $scope.likeImage();
            } else {
                $scope.dislikeImage();
            }
        }
    };

    // tells the server to like the content
    $scope.likeImage = function () {
        AjaxFactory.likeImage($scope.contentId, localStorage.getItem("user")).then(function successCallback(response) {
            console.log(response);
            $scope.liked = true;
            $("#likeSpan").toggleClass("likeSpanColor");
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    // tells the server to dislike the content
    $scope.dislikeImage = function () {
        AjaxFactory.dislikeImage($scope.contentId, localStorage.getItem("user")).then(function successCallback(response) {
            console.log(response);
            $scope.liked = false;
            $("#likeSpan").toggleClass("likeSpanColor");
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});