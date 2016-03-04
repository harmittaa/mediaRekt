// test.html main controller, for image editing and setting the image file for user to see

mediaRekt.controller("ImageController", function ($scope, $sce, $http, AjaxFactory, $location, $rootScope, ShareDataService) {
    $scope.contentId = ShareDataService.getVariable("contentId");
    var urlParam = $location.path().split("=");
    $scope.contentId = urlParam[1];
    $scope.make = "N/A";
    $scope.model = "N/A";
    $scope.time = "N/A";
    $scope.gpsLongitude = "N/A";
    $scope.gpsLatitude = "N/A";

    AjaxFactory.getFileById($scope.contentId).then(function successCallback(response) {
        $("#refreshButton").hide();
        $scope.currentContent = response;
        console.log("Data fetched");
        console.log($scope.currentContent);
        $rootScope.$broadcast("updateComments");
        $scope.getUploaderUsername();
        $scope.exifData();
    }, function errorCallback(response) {
        console.log(response);
    });

    $scope.exifData = function () {
        var image = new Image();
        image.onload = function () {
            EXIF.getData(image, function () {

                $scope.gpsLatitude = EXIF.getTag(this, "GPSLatitude");
                if ($scope.gpsLatitude !== undefined) {
                    $scope.gpsLatitude = toDecimal($scope.gpsLatitude);
                }

                $scope.gpsLongitude = "";
                $scope.gpsLongitude = EXIF.getTag(this, "GPSLongitude");
                if ($scope.gpsLongitude !== undefined) {
                    $scope.gpsLongitude = toDecimal($scope.gpsLongitude);
                }

                $scope.make = EXIF.getTag(this, "Make");
                console.log($scope.make);

                $scope.model = EXIF.getTag(this, "Model");
                console.log($scope.model);

                $scope.time = EXIF.getTag(this, "DateTime");
                console.log($scope.time);
                $scope.$apply();

                /*var locationMap = document.createElement("img");
                locationMap.id = "locationMap";
                locationMap.className = "img-thumbnail";
                var parentElement = document.getElementById("exifDataRow");

                if ($scope.gpsLatitude !== undefined && $scope.gpsLongitude !== undefined) {
                    parentElement.appendChild(locationMap);
                    $("#locationMap").attr("src", 'https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=' + $scope.gpsLatitude + ',' + $scope.gpsLongitude + '&zoom=14&size=640x400&key=AIzaSyB-MSqFBTkmnzSc2ph2SqiTx1ffuSZAW08');
                }*/

                var locationIframe = document.createElement("IFRAME");
                locationIframe.id = "locationIframe";
                parentElement = document.getElementById("iframeDiv");
                console.log($scope.gpsLatitude + " and " + $scope.gpsLongitude);

                if ($scope.gpsLatitude !== undefined || $scope.gpsLongitude !== undefined) {
                    parentElement.appendChild(locationIframe);
                    $("#locationIframe").attr("src", "https://www.google.com/maps/embed/v1/place?q=" + $scope.gpsLatitude + "%2C%20" + $scope.gpsLongitude + "&key=AIzaSyB-MSqFBTkmnzSc2ph2SqiTx1ffuSZAW08");
                    $("#locationIframe").attr("width", "1200");
                    $("#locationIframe").attr("height", "1200");
                }
            });
        };
        image.src = "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path;
    };


    var toDecimal = function (number) {
        return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    };

    $scope.showExifData = function () {
        $("#exifDataRow").toggleClass("hide");
    };

    $scope.saveContentData = function (response) {
        console.log("SAve content data");
        $scope.currentContent = response;
        console.log("Data fetched");
        console.log($scope.currentContent);
        $rootScope.$broadcast("updateComments");
        $scope.getUploaderUsername();
    };

    $scope.getUploaderUsername = function () {
        console.log("Getting uploader username");
        var request = AjaxFactory.findUserById($scope.currentContent.data.userId);
        request.then($scope.saveUploaderUsername, ShareDataService.error);
    };

    $scope.saveUploaderUsername = function (response) {
        console.log(response);
        $scope.uploaderUsername = response.data.username;
    };

    /*        
    $scope.imageToCanvas = function () {
            $scope.canvas = angular.element('#myCanvas')[0];
            console.log($scope.canvas);
            $scope.ctx = $scope.canvas.getContext("2d");
            $scope.image = new Image();
            console.log("setting canvas size");

            $scope.image.onload = function () {
                $scope.canvas.width = $scope.image.width;
                $scope.canvas.height = $scope.image.height;
                $scope.ctx.drawImage($scope.image, 0, 0, $scope.image.width, $scope.image.height, 0, 0, $scope.canvas.width, $scope.canvas.height);
                var imgAsDataUrl = $scope.canvas.toDataURL("image/jpeg");
                $scope.imageDataUrl = imgAsDataUrl;
                $scope.imageBlob = $scope.dataURItoBlob(imgAsDataUrl);
                console.log($scope.imageBlob);
                handleFile();
            };

            $scope.image.crossOrigin = "anonymous";
            console.log("seeing if path is available");
            console.log($scope.currentContent.data.path);
            $scope.image.src = "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path;
        };*/
    /*
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
        };*/

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

    $scope.getType = function (type) {
        return type.substr(0, 5);

    };
    $scope.trustURL = function (url) {
        return $sce.trustAsResourceUrl(url);
    };
});