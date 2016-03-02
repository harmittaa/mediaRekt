// test.html main controller, for image editing and setting the image file for user to see

mediaRekt.controller("ImageController", function ($scope, $sce, $http, AjaxFactory, $location, $rootScope, ShareDataService) {
    $scope.contentId = ShareDataService.getVariable("contentId");
    var urlParam = $location.path().split("=");
    $scope.contentId = urlParam[1];

    AjaxFactory.getFileById($scope.contentId).then(function successCallback(response) {
        $("#refreshButton").hide();
        $scope.currentContent = response;
        console.log("Data fetched");
        console.log($scope.currentContent);
        $rootScope.$broadcast("updateComments");
        $scope.getUploaderUsername();
    }, function errorCallback(response) {
        console.log(response);
    });


    //gets the exif data from image
    var handleFile = function () {
        var reader;
        var files = [$scope.newImageblob];
        reader = new FileReader();
        reader.onload = function (event) {
            var exif, tags, tableBody, name, row;
            try {
                exif = new ExifReader();

                // Parse the Exif tags.
                exif.load(event.target.result);
                // Or, with jDataView you would use this:
                //exif.loadView(new jDataView(event.target.result));

                // The MakerNote tag can be really large. Remove it to lower memory usage.
                exif.deleteTag('MakerNote');

                // Output the tags on the page.
                tags = exif.getAllTags();

                tableBody = document.getElementById('exif-table-body');
                for (name in tags) {
                    if (tags.hasOwnProperty(name)) {
                        row = document.createElement('tr');
                        row.innerHTML = '<td id="exifDataFromImage">' + name + '</td><td id="exifDataFromImage">' + tags[name].description + '</td>';
                        tableBody.appendChild(row);
                    }
                }
            } catch (error) {
                alert(error);
            }
        };
        // We only need the start of the file for the Exif info.
        reader.readAsArrayBuffer(files[0].slice(0, 128 * 1024));
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

    //creates a XMLHttpRequest to get image from server, then calls the handleFile which gets exif data
    $scope.getExifData = function () {
        var x = new XMLHttpRequest();
        x.open('GET', "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path);
        x.responseType = 'blob';
        x.onload = function () {
            $scope.newImageblob = x.response;
            handleFile();
        };
        x.send();
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