// gets the data from the fileService and sets it to $scope.files

mediaRekt.controller("GetFileController", function($scope, fileService) {
    console.log("boos");
   fileService.success(function (data) {
      $scope.files = data; 
   });
});