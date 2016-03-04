// getting the data when user selects front page

mediaRekt.controller("ContentController", function ($scope, $rootScope, AjaxFactory, ShareDataService) {
    $scope.loadAmount = ShareDataService.getVariable("loadAmount");
    console.log("LOAD AMOUNT IN SDS " + ShareDataService.getVariable("loadAmount"));
    $scope.contentToShow = ShareDataService.getVariable("contentType");
    console.log($scope.contentToShow);
    
  /*  Gifffer();
    console.log("Gifffer in ContentController");
    window.onload = function () {
        Gifffer();
    };
*/
    $scope.contentData = ShareDataService.getVariable("contentData");

    $("#refreshButton").show();
    if (ShareDataService.getVariable("contentData").length < 1) {
        AjaxFactory.getAllFiles().then(function successCallback(response) {
            console.log(response);
            ShareDataService.setVariable("contentData", response);
            $scope.contentData = ShareDataService.getVariable("contentData");
            $rootScope.$broadcast("contentDataChanged");
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    // shows the search notification if the user has searched and returns
    // to the mainView
    if (ShareDataService.getVariable("searched") === true) {
        $('#searchNotification').toggleClass('hide-alert');
    }

    // splits the fileType from mimeType and returns to html
    $scope.getType = function (type) {
        return type.substr(0, 5);
    };
    
    $scope.getImageType = function (type) {
        return type.substr(6, 8);
    };

    // load more content to show on gallery
    $scope.loadContent = function () {
        console.log("loading content!");
        $scope.loadAmount = ShareDataService.getVariable("loadAmount") + 5;
        ShareDataService.setVariable("loadAmount", $scope.loadAmount);
    };

    // contentChanged is broadcasted when either the contentType to show is changed
    // when user has searched and the actual content data is changed
    // or when first entering the website/refreshing
    $scope.$on("contentChanged", function () {
        $scope.contentToShow = ShareDataService.getVariable("contentType");
        console.log("Content changed to " + ShareDataService.getVariable("contentType"));
        $scope.contentData = ShareDataService.getVariable("contentData");
    });

    $scope.$on("loadAmount reset", function () {
        $scope.loadAmount = ShareDataService.getVariable("loadAmount");
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