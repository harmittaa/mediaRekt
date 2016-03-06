// contentView main controller, used for getting the data from the currently viewed content

mediaRekt.controller("ImageController", function ($scope, $sce, $http, AjaxFactory, $location, $rootScope, ShareDataService) {
    $scope.contentId = ShareDataService.getVariable("contentId");
    var urlParam = $location.path().split("=");
    $scope.contentId = urlParam[1];
    $scope.make = "N/A";
    $scope.model = "N/A";
    $scope.time = "N/A";
    $scope.gpsLongitude = "N/A";
    $scope.gpsLatitude = "N/A";
    
    // gets the data for the current content
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

    // gets the exifData from the content & creates the Google Maps iFrame from gps coordinates
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
                

                var locationIframe = document.createElement("IFRAME");
                locationIframe.id = "locationIframe";
                parentElement = document.getElementById("iframeDiv");
                console.log($scope.gpsLatitude + " and " + $scope.gpsLongitude);
                

                if ($scope.gpsLatitude !== undefined || $scope.gpsLongitude !== undefined) {
                    $("#iframeDiv").toggleClass("hide");
                    parentElement.appendChild(locationIframe);
                    $("#locationIframe").attr("src", "https://www.google.com/maps/embed/v1/place?q=" + $scope.gpsLatitude + "%2C%20" + $scope.gpsLongitude + "&key=AIzaSyB-MSqFBTkmnzSc2ph2SqiTx1ffuSZAW08");
                    $("#locationIframe").attr("width", "1200");
                    $("#locationIframe").attr("height", "1200");
                }
            });
        };
        image.src = "http://util.mw.metropolia.fi/uploads/" + $scope.currentContent.data.path;
    };

    // changes the gps cordinates to decimals that can be used with the Google Maps API
    var toDecimal = function (number) {
        return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    };

    // shows / hides the exif data
    $scope.showExifData = function () {
        $("#exifDataRow").toggleClass("hide");
    };

/*    $scope.saveContentData = function (response) {
        console.log("SAve content data");
        $scope.currentContent = response;
        console.log("Data fetched");
        console.log($scope.currentContent);
        $rootScope.$broadcast("updateComments");
        $scope.getUploaderUsername();
    };*/

    // gets the username of the uploader
    $scope.getUploaderUsername = function () {
        console.log("Getting uploader username");
        var request = AjaxFactory.findUserById($scope.currentContent.data.userId);
        request.then($scope.saveUploaderUsername, ShareDataService.error);
    };

    // saves the usersname into the response.data
    $scope.saveUploaderUsername = function (response) {
        console.log(response);
        $scope.uploaderUsername = response.data.username;
    };

    // gets the file type
    $scope.getType = function (type) {
        return type.substr(0, 5); // returns image, video, audio
    };
    
    $scope.trustURL = function (url) {
        return $sce.trustAsResourceUrl(url);
    };
});