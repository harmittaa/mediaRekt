// used for sharing the gallery data with different controllers

mediaRekt.service("ShareDataService", function () {
    var sharedVariables = {
        contentId: "",
        userData: {},
        contentData: {},
        selectedId: {}
    };
    sharedVariables.setVariable = function (key, value) {
        sharedVariables[key] = value;
        console.log(sharedVariables);
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