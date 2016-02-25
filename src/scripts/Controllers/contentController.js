// getting the data when user selects front page

mediaRekt.controller("ContentController", function ($scope, $rootScope, AjaxFactory, ShareDataService) {
    $scope.loadAmount = ShareDataService.getVariable("loadAmount");
    console.log("LOAD AMOUNT IN SDS " + ShareDataService.getVariable("loadAmount"));
    $scope.contentToShow = ShareDataService.getVariable("contentType");

    if (ShareDataService.getVariable("contentData").length < 1) {
        AjaxFactory.getAllFiles().then(function successCallback(response) {
            console.log(response);
            console.log("setting data to contentdata.data");
            /*$scope.contentData.data = response.data;*/
            ShareDataService.setVariable("contentData", response);
            $rootScope.$broadcast("contentDataChanged");
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    
    if (ShareDataService.getVariable("searched") === true) {
        $('#searchNotification').toggleClass('hide-alert');
    }



    // splits the fileType from mimeType and returns to html
    $scope.getType = function (type) {
        return type.substr(0, 5);
    };

    // load more content to show on gallery
    $scope.loadContent = function () {
        console.log("loading content!");
        $scope.loadAmount = ShareDataService.getVariable("loadAmount") + 5;
        ShareDataService.setVariable("loadAmount", $scope.loadAmount);
        console.log("LOAD AMOUNT IN SDS increased to " + ShareDataService.getVariable("loadAmount"));
    };

    // contentChanged is broadcasted when either the contentType to show is changed (audio, image etc)
    // when user has searched and the actual content data is changed
    // or when first entering the website/refreshing
    $scope.$on("contentChanged", function () {
        $scope.contentToShow = ShareDataService.getVariable("contentType");
        console.log("Content changed to " + ShareDataService.getVariable("contentType"));
        $scope.contentData = ShareDataService.getVariable("contentData");
    });

    $scope.$on("getAllDataAgain", function () {
        AjaxFactory.getAllFiles().then(function successCallback(response) {
            console.log(response);
            console.log("setting data to contentdata.data");
            /*$scope.contentData.data = response.data;*/
            ShareDataService.setVariable("contentData", response);
            $rootScope.$broadcast("contentDataChanged");
        }, function errorCallback(response) {
            console.log(response);
        });
    });
});