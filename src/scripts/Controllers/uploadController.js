// handling the uploading of the picture, also set image to canvas (not implemented)

mediaRekt.controller("UploadController", function ($scope, $http, $state, AjaxFactory, ShareDataService) {
    $scope.imageEdited = false;
    $scope.glfx = false;
    $scope.contentEdited = false;
    $scope.editableContent = false;

    //set the image to be uploaded into a canvas
    $scope.setMediaFile = function (element) {

        // getting image data for uploading
        $scope.mimeType = element.files[0].type;
        var filetype = element.files[0].type.split("/");
        $scope.element = element;
        $scope.fileType = filetype[0];
        console.log($scope.mimeType);
        console.log($scope.fileType);
        
        if ($scope.fileType == "image") {
            console.log($scope.editableContent);
            console.log("scope filetype on image");
            $scope.editableContent = true;
            $scope.$apply();
            console.log($scope.editableContent);
        }

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
        console.log("reset image");
        $scope.canvas.height = $scope.image.height;
        $scope.canvas.width = $scope.image.width;
        $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);
        $scope.imgAsDataUrl = $scope.canvas.toDataURL("image/png");


        $scope.glfx = true;
        try {
            $scope.canvass = fx.canvas();
        } catch (e) {
            alert(e);
            return;
        }
        var image = new Image(),
            /*src = "http://util.mw.metropolia.fi/uploads/thumbs/tn640_qmzokvokhx41.jpg";*/
            src = $scope.image.src;
        image.crossOrigin = "Anonymous";
        image.onload = function () {
            console.log("image onload");
            $scope.texture = $scope.canvass.texture(image);
            $scope.ctx.drawImage($scope.canvass, 0, 0, $scope.canvass.width, $scope.canvass.height);
        };
        image.src = src;
    };


    $scope.acceptEdit = function () {
        $scope.contentEdited = true;
        $scope.texture.destroy();
        $scope.texture = $scope.canvass.contents();
    };

    function getMousePos(canvas, evt) {
        console.log("mousepos");
        var rect = $scope.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    $scope.addTiltShift = function () {
        $scope.canvas.addEventListener('mouseup', function (evt) {
            $scope.mousePos = getMousePos($scope.canvas, evt);
            var message = 'Mouse position: ' + $scope.mousePos.x + ',' + $scope.mousePos.y;
            console.log(message);
            $scope.canvass.draw($scope.texture).tiltShift($scope.mousePos.x, $scope.mousePos.y, 480, 287.4, 15, 200).update();
            $scope.ctx.drawImage($scope.canvass, 0, 0, $scope.canvass.width, $scope.canvass.height);
        });
    };

    $scope.addText = function () {
        $scope.ctx.fillText("someMsg", 50, 50);
    };

    $scope.addSepia = function () {
        $scope.canvass.draw($scope.texture).sepia(1).update();
        $scope.ctx.drawImage($scope.canvass, 0, 0, $scope.canvass.width, $scope.canvass.height);
    };

    $scope.glfxAddEffects = function () {
        console.log("something should happen :o");
        $scope.canvass.draw($scope.texture).hueSaturation(-0.43, 0.31).update();
        $scope.ctx.drawImage($scope.canvass, 0, 0, $scope.canvass.width, $scope.canvass.height);
    };

    $scope.glfxAddEffects2 = function () {
        console.log("something should happen :o2");
        $scope.canvass.draw($scope.texture).dotScreen(320, 239.5, 0, 11.78).update();
        $scope.ctx.drawImage($scope.canvass, 0, 0, $scope.canvass.width, $scope.canvass.height);
    };

    $scope.unsharpMask = function () {
        $scope.canvass.draw($scope.texture).unsharpMask(34, 0.22).update();
        $scope.ctx.drawImage($scope.canvass, 0, 0, $scope.canvass.width, $scope.canvass.height);
    };

    $scope.brightenCanvas = function () {
        $scope.imageEdited = true;
        Caman("#previewCanvas", function () {
            this.brightness(10);
            this.render();
        });
    };

    $scope.saveCamanImage = function () {
        $scope.imageEdited = true;
        /*console.log($scope.canvas.toDataURL("image/png"));*/
        Caman("#previewCanvas", function () {
            this.render(function () {
                var newImage = this.toBase64("png");
                /*console.log(newImage);*/
                /*var newImageBlob = $scope.dataURItoBlob(newImage);*/
                $scope.newImageBlob = $scope.dataURItoBlob(newImage);
                /*return newImageBlob;*/
            });
        });
    };

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

    $scope.uploadContent = function () {
        if ($scope.contentEdited === true) {
            console.log($scope.dataURItoBlob($scope.canvas.toDataURL("image/png")));
            $scope.formData = new FormData(document.querySelector("#uploadform"));
            $scope.formData.append("mime-type", "image/png");
            $scope.formData.append("user", ShareDataService.getVariable("user"));
            $scope.formData.append("type", "image");
            $scope.formData.append("file", $scope.dataURItoBlob($scope.canvas.toDataURL("image/png")), "edited_image.png");
        } else {
            $scope.formData = new FormData(document.querySelector("#uploadform"));
            $scope.formData.append("type", $scope.fileType);
            $scope.formData.append("mime-type", $scope.mimeType);
            $scope.formData.append("user", ShareDataService.getVariable("user"));
            $scope.formData.append("file", $scope.element.files[0], "content");
        }
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