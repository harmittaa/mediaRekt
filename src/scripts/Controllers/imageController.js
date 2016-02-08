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
                $scope.ctx.drawImage($scope.image, 0, 0, 300, 300);
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

    $scope.glfxTest = function () {
        console.log("glfx test function");
        var image = new Image();
        image.crossOrigin = "anonymous";
        /*      try {
                  $scope.glCanvas = fx.canvas();
              }  catch (e) {
                  console.log("canvas creation failed");
                  console.log(e);
              }
                console.log("Still works");
                
                $scope.glImage = document.getElementById("#imageToEdit");
                console.log("Still works");
                $scope.texture = $scope.glCanvas.texture($scope.glImage);
                console.log("Still works");
                
                $scope.glCanvas.draw($scope.texture).ink(0.25).update();
                
                $scope.glImage.parentNode.insertBefore($scope.glCanvas, $scope.glImage);
                $scope.glImage.parentNode.removeChild($scope.glImage);*/

        // try to create a WebGL canvas (will fail if WebGL isn't supported)
        try {
            var canvas = fx.canvas();
        } catch (e) {
            alert(e);
            return;
        }
        console.log(canvas);
        // convert the image to a texture
        /*image.src = document.getElementById('imageToEdit');*/
        image = "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path;
        console.log("Still works");
        var texture = canvas.texture(image);
        console.log("Still works");

        // apply the ink filter
        canvas.draw(texture).ink(0.25).update();

        // replace the image with the canvas
        image.parentNode.insertBefore(canvas, image);
        image.parentNode.removeChild(image);
    };
});