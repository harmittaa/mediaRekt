// handles navbar

mediaRekt.controller("NavController", function ($scope, $http, AjaxFactory) {
    $scope.title = "MediaRekt";
    $scope.hideSignup = true;
    $scope.showNavbar = true;

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

    // removes the user info from localStorage
    $scope.logout = function () {
        console.log("log out");
        localStorage.removeItem("user");
        localStorage.setItem("logged", "false");
        $('#loggedOut').toggleClass('hide-alert');
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