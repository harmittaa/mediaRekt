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
        }, function errorCallback(response) {
            console.log(response);
        })
        .then(function testtest() {

            $scope.canvas = document.getElementById("testCanvas");
            $scope.ctx = $scope.canvas.getContext("2d");

            $scope.image = new Image();
            $scope.image.onload = function () {
                $scope.ctx.drawImage($scope.image, 0, 0, $scope.image.width, $scope.image.height, 0, 0, $scope.canvas.width, $scope.canvas.height);
                // desaturation colors
            };

            $scope.image.crossOrigin = "anonymous";
            console.log("seeing if path is available");
            console.log($scope.currentContent.data.path);
            $scope.image.src = "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path;
        });

    $scope.blackAndWhite = function () {
        $scope.imgData = $scope.ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
        $scope.data = $scope.imgData.data;

        for (var i = 0; i < $scope.data.length; i += 4) {
            $scope.grayscale = 0.33 * $scope.data[i] + 0.5 * $scope.data[i + 1] + 0.15 * $scope.data[i + 2];
            $scope.data[i] = $scope.grayscale;
            $scope.data[i + 1] = $scope.grayscale;
            $scope.data[i + 2] = $scope.grayscale;
        }

        // write the modified image data
        $scope.ctx.putImageData($scope.imgData, 0, 0);
    };

    //add text to image
    $scope.addText = function () {
        console.log("adding text");
        $scope.ctx.font = "30px Arial";
        $scope.ctx.fillStyle = "red";
        $scope.ctx.fillText("Hello World", 10, 50);
    };

    $scope.saveImage = function () {
        var imgAsDataUrl = $scope.canvas.toDataURL("image/png");
        var newImg = document.createElement("img");
        newImg.src = imgAsDataUrl;
        $scope.uploadFormData = new FormData();
        $scope.uploadFormData.append("file", $scope.dataURItoBlob(imgAsDataUrl), "pic.png");
        $scope.uploadFormData.append("type", "image");
        $scope.uploadFormData.append("mime-type", "image/png");
        $scope.uploadFormData.append("user", "20");
        $scope.uploadFormData.append("title", "test");
        $scope.uploadFormData.append("description", "too short???");
        AjaxFactory.uploadFile($scope.uploadFormData).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.dataURItoBlob = function (dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {
            type: mimeString
        });
    };
    
    $(document).ready(function ($) {
        $('.rrssb-buttons').rrssb({
            // required:
    title: 'ASDASD',
    url: "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path,

    // optional:
    description: $scope.currentContent.data.title,
    emailBody: 'BODY'

        });
    });
});