// handling the uploading of the picture

mediaRekt.controller("UploadController", function ($scope, $http, AjaxFactory) {
//set the image to be uploaded into a canvas
    $scope.setMediaFile = function (element) {
        console.log(element.files[0]);
        $scope.mimeType = element.files[0].type;
        var filetype = element.files[0].type.split("/");
        $scope.fileType = filetype[0];
        console.log($scope.fileType + " . " + filetype);

        $scope.image = new Image();
        $scope.canvas = angular.element("#previewCanvas")[0];
        $scope.ctx = $scope.canvas.getContext('2d');

        var reader = new FileReader();

        reader.onload = function (e) {
            $scope.image.src = e.target.result;
        };

        reader.readAsDataURL(element.files[0]);
        $scope.image.onload = $scope.resetImage;
        // When image data is loaded (after onload)
        // Put the data into canvas element
        $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width = $scope.image.width, $scope.canvas.height = $scope.image.height);
             
      // read pixel data
      $scope.imageData = $scope.ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      $scope.pixels = $scope.imageData.data;
      $scope.numPixels = $scope.imageData.width * $scope.imageData.height;
    };


    // uploading
    $scope.uploadFile = function () {
        console.log("uploadFile");
        $scope.formData = new FormData(document.querySelector("#uploadform"));
        if (localStorage.getItem("user") === null) {
            $scope.formData.append("user", "1");
            alert("not logged in!");
        } else {
            $scope.formData.append("user", localStorage.getItem("user"));
        }
        $scope.formData.append("type", $scope.fileType);
        $scope.formData.append("mime-type", $scope.mimeType);

        AjaxFactory.uploadFile($scope.formData).then(function successCallback(response) {
            console.log(response);
            console.log("success");
            /*            $("#uploadUpMod").hide("slow", function () {
                            alert("Animation complete.");
                        });*/
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});