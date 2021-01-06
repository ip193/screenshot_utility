console.log("init-content-script.js starting");
var SCRSH_css_loaded = false;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Got the extension click event");
        if(!SCRSH_css_loaded){
            SCRSH_css_loaded = true;
            {
                let css = function (url, callback) {

                    var head = document.getElementsByTagName('head')[0];
                    var cssnode = document.createElement('link');

                    cssnode.type = 'text/css';
                    cssnode.rel = 'stylesheet';
                    cssnode.href = url;

                    cssnode.onreadystatechange = callback;
                    cssnode.onload = callback;

                    head.appendChild(cssnode);
                }
                css(chrome.runtime.getURL("css/feedback.css"), function(){
                    console.log("init-content-script.js finished loading css for feedback button");
                    let api = Feedback({
                        h2cPath:'libs/html2canvas.js',
                        url: "https://www.google.com",
                        appendTo: null, // don't add feedback button to page
                    });
                    api.open();});
            }
        } else {
            console.log("init-content-script.js button css already loaded");
            var api = Feedback({
                h2cPath:'libs/html2canvas.js',
                appendTo: null, // don't add feedback button to page
            });
            api.open();
        }
        if (request.greeting == "hello") sendResponse({farewell: "goodbye"});
    }
);