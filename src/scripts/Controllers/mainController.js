mediaRekt.controller("MainController", function ($scope) {

    // open image in new window
    $scope.openImageView = function (element) {
        console.log(element.file.fileId);
        // open the desired html file with fileId in url
        window.location.assign("test.html?id=" + element.file.fileId);
    };
});