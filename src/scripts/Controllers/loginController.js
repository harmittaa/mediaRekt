mediaRekt.controller("LoginController", function ($scope, $http, AjaxFactory) {
    $scope.login = function () {
        console.log("login function");
        $scope.loginData = {
            "username": $scope.logUsername,
            "password": $scope.logPassword
        };

        AjaxFactory.login($scope.loginData).then(function successCallback(response) {
            console.log(response.data.userId);
            localStorage.setItem("user", response.data.userId);
            localStorage.setItem("logged", "true");
            alert("Logged in :))");
            $("#navi").collapse('hide');
            console.log("ASDASDAS");

        }, function errorCallback(response) {
            console.log(response);
        });
    };
});