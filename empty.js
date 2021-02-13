console.log("empty.js")

// send the JSON string - not allowed from content script


let sendRequest = function (dataString, url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback((xhr.status === 200));
        } else {
            console.error("Bad response: "+xhr.responseText);
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("data=" + encodeURIComponent(dataString));
}
chrome.extension.onMessage.addListener(function(request){
    console.log("Got message from content script: "+request.type);
    if(request.type =="send-data"){
        /*
        console.error(request.sendFunction);
        console.error(request.callback);
        console.error(request.steve);
        console.error(window.JSON.stringify(request));
        request.sendFunction(request.dataString, request.callback);
        */
        let success_ = false;
        sendRequest(request.dataString, request.url,
            function(success){
            success_ = success;
            if(success){
                console.log("HTTP Request sent successfully.")
            } else {
                console.error("Error sending HTTP Request. ");
            }
            });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "screenshot-end", success: success_}, function(response) {
                console.log((response!=undefined)?response.info:"Response failed! "+chrome.runtime.lastError.message);
            });
        });
    }
});


