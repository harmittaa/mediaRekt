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

    ajaxMethods.getAllFiles = function () {
        console.log("Get all files service");
        var getAllFilesInfo = {
            method: "GET",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/files"
        };
        return $http(getAllFilesInfo);
    };

    ajaxMethods.getFilesByType = function (data) {
        console.log("Get files by type service");
        var getFilesByType = {
            method: "GET",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/" + data
        };
        return $http(getFilesByType);
    };

    ajaxMethods.getFileById = function (data) {
        console.log("getting file by ID");
        var getFileById = {
            method: "GET",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/file/" + data
        };
        return $http(getFileById);
    };

    ajaxMethods.getUserUploads = function (data) {
        console.log("getting user uploads");
        var getUserUploads = {
            method: "GET",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/" + data
        };
        return $http(getUserUploads);
    };

    ajaxMethods.getUserFavourites = function (data) {
        console.log("getting user favourites");
        var getUserFavourites = {
            method: "GET",
            url: "http://util.mw.metropolia.fi/ImageRekt/api/v2/likes/user/" + data
        };
        return $http(getUserFavourites);
    };

    return ajaxMethods;
});