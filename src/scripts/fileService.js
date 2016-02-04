// for getting all files from the server

mediaRekt.factory("fileService", function($http) {
   return $http.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/files") 
        .success(function (data) {
            return data; 
   })
        .error(function (data) {
            return data;
   });
});