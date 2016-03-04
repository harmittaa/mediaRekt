var mediaRekt = angular.module('mediaRekt', ["ui.router"]);

window.onload = function() {    
    // try to create a WebGL canvas (will fail if WebGL isn't supported)
    try {
        var canvas = fx.canvas();
    } catch (e) {
        alert(e);
        // Here is where you want to take some other action
        // For example, redirecting to another page with window.location.href = ...
        return;
    }
};