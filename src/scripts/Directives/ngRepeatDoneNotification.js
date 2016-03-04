mediaRekt.directive('ngRepeatDoneNotification', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            console.log("LAST");
            Gifffer();
        }
    };
});