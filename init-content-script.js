console.log("init-content-script.js starting");
var SCRSH_css_loaded = false;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Got extension message type: "+request.type);
        if(request.type=="start-screenshot"){
            let start_feedback = function(){
                function getData(sKey) {
                    return new Promise(function(resolve, reject) {
                        chrome.storage.sync.get(sKey, function(items) {
                            if (chrome.runtime.lastError) {
                                console.error(chrome.runtime.lastError.message);
                                reject(chrome.runtime.lastError.message);
                            } else {
                                let ret = items[sKey];
                                if(ret === undefined){
                                    reject("Got undefined value from storage");
                                } else {
                                    resolve(ret);
                                }
                            }
                        });
                    });
                }
                function onError(msg){
                    console.error("Error while retrieving options from storage: "+msg);
                }
                let options = {
                    h2cPath: 'libs/html2canvas.js',
                    appendTo: null, // don't add feedback button to page,
                    send_server: false
                }

                getData("save_screenshot_locally").then(function(result){
                    console.log("Saving locally: "+result);
                    options.send_server = !result;
                    if(!result){
                        console.log("Not saving locally, getting URL from storage...")
                        getData("post_url").then(function(url_result){
                            console.log("post_url: "+url_result);
                            options.url = url_result;
                            Feedback(options).open();
                        }, onError)
                    } else {
                        Feedback(options).open();
                    }
                }, onError);
            };
            let was_loaded = !SCRSH_css_loaded;
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
                        start_feedback();
                    });
                }
            } else {
                console.log("init-content-script.js button css already loaded");
                start_feedback();
            }
            sendResponse({info: (was_loaded?"Screenshotting CSS was already loaded":"Loaded Screenshotting CSS")});
        } /*else if (request.type == "get_url"){
            chrome.storage.sync.get("['post_url']", function(response){
                console.log("Got post_url from storage: "+response.post_url);
                sendResponse({info:"Successfully retrieved from storage", post_url: response.post_url});
            });
        } else if(request.type == "get_local"){
            chrome.storage.sync.get("['save_screenshot_locally']", function(response){
                console.log("Saving screenshot locally: "+response.save_screenshot_locally);
                sendResponse({info:"Saving screenshot locally: "+response.save_screenshot_locally, save_screenshot_locally:response.save_screenshot_locally});
            });
        }*/
    }
);