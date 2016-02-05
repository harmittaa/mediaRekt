// gets the data from the fileService and sets it to $scope.files

mediaRekt.controller("GetFileController", function ($scope, fileService) {
    $scope.loadAmount = 5;

    fileService.success(function (data) {
        console.log("controller");
        $scope.files = data;
    });

    $scope.loadContent = function () {
        console.log("loading content!");
        $scope.loadAmount += 5;
    }

/*    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $scope.loadContent();
            console.log("bottom");
        }
    });*/
});