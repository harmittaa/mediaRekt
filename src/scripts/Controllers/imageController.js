// IMAGE VIEW CONTROLLER

mediaRekt.controller("ImageController", function ($scope, $http, AjaxFactory) {
    console.log(window.location.href);
    var urlParam = window.location.href.split("=");
    $scope.contentId = urlParam[1];
    console.log($scope.contentId);

    AjaxFactory.getFileById($scope.contentId).then(function successCallback(response) {
        $scope.currentContent = response;
        console.log("Data fetched ");
        console.log($scope.currentContent);
        console.log($scope.currentContent.data.title);
    }, function errorCallback(response) {
        console.log(response);
    }).then(function testtest() {
    
    var canvas = document.getElementById("testCanvas");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0);

        // desaturation colors
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;

        for (var i = 0; i < data.length; i += 4) {
            var grayscale = 0.33 * data[i] + 0.5 * data[i + 1] + 0.15 * data[i + 2];
            data[i] = grayscale;
            data[i + 1] = grayscale;
            data[i + 2] = grayscale;
        }

        // write the modified image data
        ctx.putImageData(imgData, 0, 0);

    };
    image.crossOrigin = "anonymous";
    console.log("seeing if path is available");
    console.log($scope.currentContent.data.path);
    image.src = "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path;
    });
});