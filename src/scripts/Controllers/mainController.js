mediaRekt.controller("MainController", function ($scope, $sce) {
    
    $scope.selectedType = {type: "image"};
    $scope.contentData = {data: []};
    

    // open image in new window
    $scope.openImageView = function (element) {
        console.log(element.file.fileId);
        window.location.assign("test.html?id=" + element.file.fileId);
    };

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            console.log("bottom");
        }
    });
    
    $scope.trustURL = function(url) {
        return $sce.trustAsResourceUrl(url);
    }
});