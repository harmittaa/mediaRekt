// main controller of app.html, used for creating trustURL and changing .html files when user clicks on content

mediaRekt.controller("MainController", function ($scope, $sce, $state, ShareDataService) {

    $scope.selectedType = {
        type: "image"
    };
    $scope.contentData = {
        data: []
    };


    // open image in new window
    $scope.openImageView = function (element) {
        ShareDataService.setVariable("contentId", element.file.fileId);
        $scope.currentContentId = ShareDataService.getVariable("contentId");
        $state.go('contentView', {contentId : $scope.currentContentId});
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
    $scope.closeRegisterFailure = function () {
        $('#registerFailure').toggleClass('hide-alert');
    };
});