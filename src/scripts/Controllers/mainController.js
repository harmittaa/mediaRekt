// main controller of app.html, used for creating trustURL and changing .html files when user clicks on content

mediaRekt.controller("MainController", function ($scope, $sce, $state, $rootScope, ShareDataService) {
    console.log("checking log in status! " + ShareDataService.getVariable("logged") + " user " + ShareDataService.getVariable("user"));
    
    fartscroll();

    if (ShareDataService.getVariable("searched")) {
        console.log("Search notification should pop up!");
        $('#searchNotification').toggleClass('hide-alert');
    }


    // open image in new window
    $scope.openImageView = function (element) {
        $state.go('contentView', {
            contentId: element.file.fileId
        });
    };
    // open video in new window
    $scope.openVideoView = function (element) {
        console.log(element.file.fileId);
        window.location.assign("video.html?id=" + element.file.fileId);
    };

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            console.log("bottom");
        }
    });

    $scope.trustURL = function (url) {
        return $sce.trustAsResourceUrl(url);
    };



    $scope.closeSuccess = function () {
        $('#loginSuccess').toggleClass('hide-alert');
    };
    $scope.closeFailure = function () {
        $('#loginFailure').toggleClass('hide-alert');
    };
    $scope.closeLoggedout = function () {
        $('#loggedOut').toggleClass('hide-alert');
    };
    $scope.closeRegistersuccess = function () {
        $('#registerSuccess').toggleClass('hide-alert');
    };
    $scope.closeRegisterfailure = function () {
        $('#registerFailure').toggleClass('hide-alert');
    };
    $scope.closeUploadNotification = function () {
        $('#uploadFailureNotification').toggleClass('hide-alert');
    };
});