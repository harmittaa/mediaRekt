// used for sharing data with different controllers

mediaRekt.service("ShareDataService", function () {
    var sharedVariables = {
        contentId: "",
        user: "",
        logged: "false",
        loadAmount: 5,
        contentType: "",
        contentData: [],
        selectedId: {},
        searched: false
    };

    sharedVariables.setVariable = function (key, value) {
        sharedVariables[key] = value;
    };

    sharedVariables.getVariable = function (key) {
        return sharedVariables[key];
    };

    sharedVariables.error = function (error) {
        console.log("Something went wrong, sharedata + ");
        console.log(error);
    };

    return sharedVariables;
});