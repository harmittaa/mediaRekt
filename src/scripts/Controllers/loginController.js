// handles login and shows necessary alerts

mediaRekt.controller("LoginController", function ($scope, $rootScope, $http, ShareDataService, AjaxFactory) {
    $scope.login = function () {
        console.log("login function");
        $scope.loginData = {
            "username": $scope.logUsername,
            "password": $scope.logPassword
        };

        var request = AjaxFactory.login($scope.loginData);
        request.then($scope.saveLogin, ShareDataService.error);
    };

    $scope.saveLogin = function (response) {
        if (response.data.status == "login ok") {
            console.log(response.data.userId);
            localStorage.setItem("user", response.data.userId);
            localStorage.setItem("logged", "true");
            $("#navi").collapse('hide');
            $('#loginSuccess').toggleClass('hide-alert');
            $('#signup').hide();
            $('#login').hide();
            e.preventDefault();
            ShareDataService.setVariable("user", response.data.userId);
            ShareDataService.setVariable("logged", true);
            //sends a broadcast that user has logged in
            $rootScope.$broadcast("userLoggedIn");
        } else {
            $('#loginFailure').toggleClass('hide-alert');
        }
    };
});