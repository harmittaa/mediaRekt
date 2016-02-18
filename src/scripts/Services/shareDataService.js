// used for sharing the gallery data with different controllers

mediaRekt.service("ShareDataService", function () {
    var sharedVariables = { userData: {},
                            contentData: {}
                          };
    sharedVariables.setVariable = function (key, value) {
      sharedVariables[key] = value;  
    };
    
    sharedVariables.error = function (error) {
      console.log("Something went wrong, sharedata + ");  
      console.log(error);  
    };
    
    return sharedVariables;
});