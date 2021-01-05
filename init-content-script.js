console.log("init-content-script.js starting");
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Got the extension click event");

        var api = Feedback({
            h2cPath:'libs/html2canvas.js',
            appendTo: null, // don't add feedback button to page
        });
        api.open();
        if (request.greeting == "hello") sendResponse({farewell: "goodbye"});
    }
);