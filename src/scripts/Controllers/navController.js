// handles navbar

mediaRekt.controller("NavController", function ($scope, $rootScope, ShareDataService, $http, AjaxFactory) {
    $scope.title = "MediaRekt";
    $scope.showNavbar = true;
    $scope.loggedIn = ShareDataService.getVariable("logged");

    $scope.hideButtons = function () {
       $('#logout').hide();
           
    };

    $scope.hideButtons();

    $scope.$on("userLoggedIn", function () {
        console.log("RECEIVED BROADCAST AND HIDING BUTTONS");
        $scope.hideButtons();
    });

    // show the signup modal
    $scope.showSignup = function () {
        console.log("showSignup called");
        $('#signUpMod').modal('show');
    };

    // show the upload modal
    $scope.showUpload = function () {
        console.log("showUpload called");
        $('#uploadUpMod').modal('show');
    };

    // show the search modal
    $scope.showSearch = function () {
        console.log("showSearch called");
        $('#searchMod').modal('show');
    };

    // show the login modal
    $scope.showLogin = function () {
        console.log("logInMod called");
        $('#logInMod').modal('show');
    };

    // removes the user info from localStorage & ShareDataService
    $scope.logout = function () {
        console.log("log out");

        localStorage.removeItem("user");
        localStorage.setItem("logged", "false");
        ShareDataService.setVariable("user", "");
        ShareDataService.setVariable("logged", "false");
        $('#signup').show();
        $('#login').show();
        $('#loggedOut').toggleClass('hide-alert');
        $scope.$broadcast("userLoggedIn");
    };


    $scope.userUploads = function () {
        console.log(localStorage.getItem("user"));
        AjaxFactory.getUserUploads(localStorage.getItem("user")).then(function successCallback(response) {
            console.log(response);
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data;
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.userFavourites = function () {
        console.log(localStorage.getItem("user"));
        AjaxFactory.getUserFavourites(localStorage.getItem("user")).then(function successCallback(response) {
            console.log(response);
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data.reverse();
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});