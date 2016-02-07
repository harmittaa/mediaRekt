// used for sharing the gallery data with different controllers

mediaRekt.factory("ShareDataFactory", function () {
    var data = { Matti: "Patti"};
    
    return {
        getData: function () {
            console.log("Returning data");
            return data;
        },
        setData: function (newData) {
            console.log("Setting new data");
            data = newData;
        }
    };
    
});