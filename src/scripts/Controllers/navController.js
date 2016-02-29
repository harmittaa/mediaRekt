// handles navbar

mediaRekt.controller("NavController", function ($scope, $rootScope, ShareDataService, $http, AjaxFactory) {
    $scope.title = "MediaRekt";
    $scope.showNavbar = true;
    $scope.loggedIn = ShareDataService.getVariable("logged");
    

    if ($scope.loggedIn == "false") {
        $("#myfavourites").hide();
        $("#myprofile").hide();
        $("#logout").hide();
    }


    // show the signup modal
    $scope.showSignup = function () {
        console.log("showSignup called");
        $('#signUpMod').modal('show');
    };

    // show the upload modal
    $scope.showUpload = function () {
        if (ShareDataService.getVariable("logged") === true) {
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
        ShareDataService.setVariable("user", "");
        ShareDataService.setVariable("logged", "false");
        $('#signup').show();
        $('#login').show();
        $("#myfavourites").hide();
        $("#myprofile").hide();
        $("#logout").hide();
        $('#loggedOut').toggleClass('hide-alert');
        $("#uploadbutton").toggleClass("disabled");
        $scope.$broadcast("userLoggedIn");
    };


    $scope.userUploads = function () {
        $("#myfavourites").show();
        $("#myprofile").show();
        $("#logout").show();
        console.log(ShareDataService.getVariable("user"));
        AjaxFactory.getUserUploads(ShareDataService.getVariable("user")).then(function successCallback(response) {
            console.log(response);
            $("#myfavourites").show();
            $("#myprofile").show();
            $("#logout").show();
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data;
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.userFavourites = function () {
        console.log(ShareDataService.getVariable("user"));
        AjaxFactory.getUserFavourites(ShareDataService.getVariable("user")).then(function successCallback(response) {
            console.log(response);
            $("#myfavourites").show();
            $("#myprofile").show();
            $("#logout").show();
            console.log("setting data to contentdata.data");
            $scope.contentData.data = response.data.reverse();
            console.log($scope.contentData.data);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});