// handles login and shows necessary alerts
mediaRekt.controller("LoginController", function ($scope, $rootScope, $http, ShareDataService, AjaxFactory) {
    $scope.login = function () {
        console.log("login function");
        $scope.loginData = {
            "username": $scope.logUsername,
            "password": $scope.logPassword
        };

        // checks the login
        var request = AjaxFactory.login($scope.loginData);
        request.then($scope.saveLogin, ShareDataService.error);
    };
    
    // does all the changes to the navbar that are necessary
    $scope.saveLogin = function (response) {
        if (response.data.status == "login ok") {
            console.log(response.data.userId);
            $("#navi").collapse('hide');
            $("#uploadbutton").toggleClass("disabled");
            $('#loginSuccess').toggleClass('hide-alert');
            $("#myprofile").show();
            $("#myfavourites").show();
            $('#signup').hide();
            $('#login').hide();
            $('#logout').show();

            $('#usernameLogIn').val('');
            $('#passwordLogIn').val('');

            localStorage.setItem("user", response.data.userId);
            localStorage.setItem("logged", "true");
            //sends a broadcast that user has logged in
            $rootScope.$broadcast("userLoggedIn");
        } else {
            $('#loginFailure').toggleClass('hide-alert');
        }
    };
});