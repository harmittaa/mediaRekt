/*mediaRekt.controller("ScrollController", function($scope) {
   $scope.images = [1,2,3,4,5,6,7,8];
    $scope.loadItems = function() {
      var last = $scope.images[$scope.images.length - 1];
        for (var i; i <= 8; i++) {
            $scope.images.push(last + i);
        }
    };
}); */

mediaRekt.controller('ScrollController', function($scope) {
  $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadImages = function() {
      console.log("Load more!");
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
});
