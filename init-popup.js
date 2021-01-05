console.log("init-popup.js starting");

document.getElementById("snip-button").onclick = function(element){
    console.log("snip-button pressed");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            console.log(response.farewell);
        });
    });

}