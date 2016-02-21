// for getting the like status when entering test.html and toggling the like status when user clicks like button

mediaRekt.controller("LikeController", function ($scope, $http, AjaxFactory, ShareDataService) {
    $scope.liked = false;
    $scope.currentUser = ShareDataService.getVariable("user");

    $scope.getLikeStatus = function () {
        console.log("getting likes");
        console.log("getting likes");
        if (ShareDataService.getVariable("logged") === true) {
            AjaxFactory.getUserLikes(ShareDataService.getVariable("user")).then(function successCallback(response) {
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

    $scope.checkLoginStatus = function () {
        if (ShareDataService.getVariable("logged") === true) {
            $("#likeButton").toggleClass("disabled");
        }
    };

    $scope.$on("userLoggedIn", function () {
        $scope.checkLoginStatus();
    });

    $scope.checkLoginStatus();

    $scope.toggleLike = function () {
        console.log("TOGGLE LIKE " + ShareDataService.getVariable("logged"));
        if (ShareDataService.getVariable("logged") === true) {
            if ($scope.liked === false) {
                $scope.likeImage();
            } else {
                $scope.dislikeImage();
            }
        }
    };

    $scope.likeImage = function () {
        AjaxFactory.likeImage($scope.contentId, ShareDataService.getVariable("user")).then(function successCallback(response) {
            console.log(response);
            $scope.liked = true;
            $("#likeSpan").toggleClass("likeSpanColor");
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.dislikeImage = function () {
        AjaxFactory.dislikeImage($scope.contentId, ShareDataService.getVariable("user")).then(function successCallback(response) {
            console.log(response);
            $scope.liked = false;
            $("#likeSpan").toggleClass("likeSpanColor");
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});