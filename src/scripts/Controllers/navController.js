mediaRekt.controller("NavController", ["$scope", function ($scope) {
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
}]);