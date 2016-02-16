// handles login and shows necessary alerts

mediaRekt.controller("LoginController", function ($scope, $http, AjaxFactory) {
    $scope.login = function () {
        console.log("login function");
        $scope.loginData = {
            "username": $scope.logUsername,
            "password": $scope.logPassword
        };

        AjaxFactory.login($scope.loginData).then(function successCallback(response) {
            if (response.data.status == "login ok") {
                console.log(response.data.userId);
                localStorage.setItem("user", response.data.userId);
                localStorage.setItem("logged", "true");
                $("#navi").collapse('hide');
                console.log("logged in");
                $('#loginSuccess').toggleClass('hide-alert');
            } else {
                $('#loginFailure').toggleClass('hide-alert');
            }

            function errorCallback(response) {
                console.log(response);
            }
        });
    };
});