// handling the uploading of the picture, also set image to canvas (not implemented)

mediaRekt.controller("UploadController", function ($scope, $http, $state, AjaxFactory, ShareDataService) {
    $scope.imageEdited = false;

    //set the image to be uploaded into a canvas
    $scope.setMediaFile = function (element) {

        // getting image data for uploading
        $scope.mimeType = element.files[0].type;
        var filetype = element.files[0].type.split("/");
        $scope.fileType = filetype[0];

        $scope.image = new Image();
        $scope.canvas = angular.element("#previewCanvas")[0];
        $scope.ctx = $scope.canvas.getContext('2d');
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.image.src = e.target.result;
        };

        reader.readAsDataURL(element.files[0]);
        $scope.image.onload = $scope.resetImage;
        $scope.resetImage();
    };

    $scope.resetImage = function () {
        $scope.canvas.height = $scope.image.height;
        $scope.canvas.width = $scope.image.width;
        $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);
        $scope.imgAsDataUrl = $scope.canvas.toDataURL("image/png");

        // try to create a WebGL canvas (will fail if WebGL isn't supported)
        /*try {
            var canvas = fx.canvas();
        } catch (e) {
            alert(e);
            return;
        }*/

        // convert the image to a texture    
        /*var image = document.getElementById('imagesss');*/
        /*        var image = new Image,
                    src = "http://util.mw.metropolia.fi/uploads/thumbs/tn640_qmzokvokhx41.jpg"; // insert image url here

                image.crossOrigin = "Anonymous";*/

        /*        var texture = canvas.texture(image);

                canvas.draw(texture).ink(0.25).update();
                canvas.sepia(1);
                canvas.update();

                image.parentNode.insertBefore(canvas, image);
                image.parentNode.removeChild(image);
                console.log("jeps");*/
    };

    // try to create a WebGL canvas (will fail if WebGL isn't supported)
    /*    try {
            $scope.canvass = fx.canvas();
        } catch (e) {
            alert(e);
            return;
        }

        var image = document.createElement('img');
        image.crossOrigin = '';
        image.src = 'http://util.mw.metropolia.fi/uploads/thumbs/tn640_qmzokvokhx41.jpg';
        image.onload = function (e) {
            console.log("jawohl");

            var texture = $scope.canvass.texture(image);

            // apply the ink filter
            $scope.canvass.draw(texture).ink(0.25).update();

            // replace the image with the canvas
            image.parentNode.insertBefore($scope.canvass, image);
            image.parentNode.removeChild(image);
        };
    };*/



    /*    $scope.brightenCanvas = function () {
            console.log($scope.canvas.toDataURL("image/png"));
            $scope.imageEdited = true;
            Caman("#previewCanvas", function () {
                this.brightness(50);
                this.render(function () {
                    var newImage = this.toBase64();
                    $scope.newImageBlob = $scope.dataURItoBlob(newImage);
                    console.log($scope.newImageBlob);
                });
            });
        };*/



    /*    $scope.brightenCanvas = function () {
            $scope.imageEdited = true;
            Caman("#previewCanvas", function () {
                this.brightness(10);
                this.render();
            });
        };

        $scope.saveCamanImage = function () {
            $scope.imageEdited = true;
            console.log($scope.canvas.toDataURL("image/png"));
            Caman("#previewCanvas", function () {
                this.render(function () {
                    var newImage = this.toBase64("png");
                    console.log(newImage);
                    var newImageBlob = $scope.dataURItoBlob(newImage);
                    return newImageBlob;
                });
            });
        };

*/
        $scope.createUpload = function () {
            AjaxFactory.uploadFile($scope.formData).then(function successCallback(response) {
                console.log(response);
                console.log("success");
                $state.go('contentView', {
                    contentId: response.data.fileId
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        };

    // uploading
    $scope.uploadFile = function () {
        /*if ($scope.imageEdited === true) {
            console.log("Edited image being uploaded");
            $scope.formData = new FormData(document.querySelector("#uploadform"));
            $scope.formData.append("file", $scope.saveCamanImage(), "edited_image.png");
            $scope.formData.append("type", "image");
            $scope.formData.append("mime-type", "image/png");
            $scope.formData.append("user", ShareDataService.getVariable("user"));
            $scope.createUpload();*/
        /*} else {*/
        console.log("Normal image being uploaded");
        $scope.formData = new FormData(document.querySelector("#uploadform"));
        $scope.formData.append("user", ShareDataService.getVariable("user"));
        $scope.formData.append("type", $scope.fileType);
        $scope.formData.append("mime-type", $scope.mimeType);
        $scope.createUpload();

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

});