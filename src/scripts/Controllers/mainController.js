// main controller of app.html, used for creating trustURL and changing .html files when user clicks on content

mediaRekt.controller("MainController", function ($scope, $sce) {
    
    $scope.selectedType = {type: "image"};
    $scope.contentData = {data: []};
    

    // open image in new window
    $scope.openImageView = function (element) {
        console.log(element.file.fileId);
        window.location.assign("test.html?id=" + element.file.fileId);
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
    
    $scope.trustURL = function(url) {
        return $sce.trustAsResourceUrl(url);
    };
    $scope.closeSuccess = function () {
       $('#loginSuccess').toggleClass('hide-alert');
    };
    $scope.closeFailure = function () {
       $('#loginFailure').toggleClass('hide-alert');
    };
});