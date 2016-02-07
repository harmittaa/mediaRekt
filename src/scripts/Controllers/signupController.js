// handle sign up

mediaRekt.controller("SignupController", function ($scope, $http, AjaxFactory) {
    console.log("Singup controller");
    $scope.regUsername = "";
    $scope.regPassword = "";
    $scope.regEmail = "";

    $scope.signup = function () {
        console.log("signup function");
        $scope.signupData = {
            "username": $scope.regUsername,
            "password": $scope.regPassword,
            "email": $scope.regEmail
        };
        console.log($scope.signupData);

        AjaxFactory.register($scope.signupData).then(function successCallback(response) {
            console.log(response);
            $scope.closeSignup();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.closeSignup = function () {
        console.log("showSignup called");
        $('#signup').click(function () {
            $('#signUpMod').modal('hide');
        });
    };
});