mediaRekt.factory("AjaxFactory", function ($http, $httpParamSerializer) {
    var ajaxMethods = {};

    // upload file
    ajaxMethods.uploadFile = function (formData) {
        var uploadInfo = {
            method: "POST",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/upload",
            data: formData,
            transformRequest: angular.identity,
            headers: {
                "Content-Type": undefined
            }
        };
        return $http(uploadInfo);
    };
    
    // log in
    ajaxMethods.login = function (formData) {
        console.log("Login service");
        var loginInfo = {
            method: "POST",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/login",
            data: $httpParamSerializer(formData),
            /*transformRequest: angular.identity,*/
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        return $http(loginInfo);
    };
    
    // register user
    ajaxMethods.register = function (formData) {
        console.log("Register service");
/*        var data = {
            "username": "sdasadsad",
            "password": "asdkljalsdkjkjdlsa",
            "email": "perkele"
        }*/
        var registerInfo = {
            method: "POST",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/register",
            data: $httpParamSerializer(formData),
            transformRequest: angular.identity,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        return $http(registerInfo);
    };
    
    
    return ajaxMethods;
});