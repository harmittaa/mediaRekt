// getting the data when user selects front page

mediaRekt.controller("ContentController", function ($scope, $rootScope, AjaxFactory, ShareDataService) {
    $scope.loadAmount = 5;
    $scope.contentToShow = "all";

    AjaxFactory.getAllFiles().then(function successCallback(response) {
        console.log(response);
        console.log("setting data to contentdata.data");
        $scope.contentData.data = response.data;
        console.log($scope.contentData.data);
    }, function errorCallback(response) {
        console.log(response);
    });

    // splits the fileType from mimeType and returns to html
    $scope.getType = function (type) {
        return type.substr(0, 5);
    };

    // load more content to show on gallery
    $scope.loadContent = function () {
        console.log("loading content!");
        $scope.loadAmount += 5;
    };
    
    $scope.$on("contentChanged", function(event, args) {
        $scope.contentToShow = args.contentType;
        console.log("Conten type changed to " + args.contentType);
    });
});