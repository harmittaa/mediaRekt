// handles navbar

mediaRekt.controller("NavController", function ($scope, $rootScope, ShareDataService, $http, AjaxFactory) {
    $scope.title = "MediaRekt";
    $scope.showNavbar = true;
    $scope.loggedIn = localStorage.getItem("logged");
    console.log(ShareDataService.getVariable("checkedLogin"));

    // checks whether or not it's necessary to hide navbar items based on if the user has logged in or notö
    if (!ShareDataService.getVariable("checkedLogin")) {
        console.log("Checking checkedLogin " + ShareDataService.getVariable("checkedLogin"));
        console.log(localStorage.getItem("logged"));
        if (localStorage.getItem("logged") == "false" || localStorage.getItem("logged") === null) {
            console.log("User has not logged in");
            $("#myfavourites").hide();
            $("#myprofile").hide();
            $("#logout").hide();
            $scope.checkedLogin = true;
            ShareDataService.setVariable("checkedLogin", true);
        } else {
            console.log("User has logged in");
            $("#login").hide();
            $("#signup").hide();
            $("#uploadbutton").toggleClass("disabled");
            ShareDataService.setVariable("checkedLogin", true);
        }
    } else {
        console.log("Login has been cheched, nothing to show or hide!");
    }

    // show the signup modal
    $scope.showSignup = function () {
        console.log("showSignup called");
        $('#signUpMod').modal('show');
    };

    // show the upload modal
    $scope.showUpload = function () {
        $('#descriptioninput').val('');
        $('#titleinput').val('');
        $('#imgInp').val('');
        
        if (localStorage.getItem("logged") == "true") {
            $('#uploadUpMod').modal('show');
        } else {
            $("#uploadFailureNotification").toggleClass('hide-alert');
        }
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

    // removes the user info from ShareDataService
    $scope.logout = function () {
        console.log("log out");
        localStorage.setItem("user", "");
        localStorage.setItem("logged", "false");
        $('#signup').show();
        $('#login').show();
        $("#myfavourites").hide();
        $("#myprofile").hide();
        $("#logout").hide();
        $('#loggedOut').toggleClass('hide-alert');
        $("#uploadbutton").toggleClass("disabled");
        $scope.$broadcast("userLoggedIn");
    };

    // gets the user uploads
    $scope.userUploads = function () {
        AjaxFactory.getUserUploads(localStorage.getItem("user")).then(function successCallback(response) {
            console.log(response);
            ShareDataService.setVariable("contentData", response);
            ShareDataService.setVariable("contentType", "");
            $rootScope.$broadcast("contentChanged");
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    // gets the user favourites
    $scope.userFavourites = function () {
        console.log(ShareDataService.getVariable("user"));
        AjaxFactory.getUserFavourites(localStorage.getItem("user")).then(function successCallback(response) {
            console.log(response);
            response.data = response.data.reverse();
            ShareDataService.setVariable("contentData", response);
            ShareDataService.setVariable("contentType", "");
            $rootScope.$broadcast("contentChanged");
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    // refreshes the content, bringin up 
    $scope.refreshContent = function () {
        AjaxFactory.getAllFiles().then(function successCallback(response) {
            console.log(response);
            ShareDataService.setVariable("loadAmount", 5);
            ShareDataService.setVariable("searched", "false");
            ShareDataService.setVariable("contentData", response);
            $rootScope.$broadcast("loadAmount reset");
            $rootScope.$broadcast("contentDataChanged");
            ShareDataService.setVariable("contentType", "");
            $rootScope.$broadcast("contentChanged");
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});