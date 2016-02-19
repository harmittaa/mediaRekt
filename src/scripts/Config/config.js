mediaRekt.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/mainView");
    $stateProvider
        .state("mainView", {
            url: "/mainView",
            templateUrl: "views/mainView.html",
        });
});