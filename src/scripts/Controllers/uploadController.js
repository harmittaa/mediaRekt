// handling the uploading of the picture

mediaRekt.controller("UploadController", function ($scope, $http, AjaxFactory) {

    $scope.setMediaFile = function (element) {
        console.log(element.files[0]);
        $scope.mimeType = element.files[0].type;
        var filetype = element.files[0].type.split("/");
        $scope.fileType = filetype[0];
        console.log($scope.fileType + " . " + filetype);

        $scope.image = new Image();
        $scope.canvas = angular.element("#previewCanvas")[0];
        $scope.ctx = $scope.canvas.getContext("webGl");

        var reader = new FileReader();

        reader.onload = function (e) {
            $scope.image.src = e.target.result;
        };

        reader.readAsDataURL(element.files[0]);
        $scope.image.onload = $scope.resetImage;
    };

    $scope.resetImage = function () {
        $scope.canvas.width = $scope.image.width;
        $scope.canvas.height = $scope.image.height;
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