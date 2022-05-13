let isDirty = function() { 
    return false; 
}

window.onload = function() {
    window.addEventListener("beforeunload", function (e) {
        if (!isDirty()) {
            return undefined;
        }
        
        let confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
};