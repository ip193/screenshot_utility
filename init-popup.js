
if(window.screenshot_popup_initialized){
    console.log("init-popup.js has already been initialized");
} else{

    window.screenshot_popup_initialized = true;
    console.log("init-popup.js starting");

    let set_screenshot_button_text = function(text){
        let b = document.getElementById("snip-button");
        b.textContent = text;
    }
    const server_screenshot_button_text = "Make and Send screenshot";
    const local_screenshot_button_text = "Download Screenshot";


    chrome.storage.sync.get("save_screenshot_locally", function(response){
        console.log("Saving screenshot locally: "+response.save_screenshot_locally);
        if(typeof response.save_screenshot_locally == "boolean"){
            if(response.save_screenshot_locally){
                document.getElementById('save_locally_option').checked = true;
                set_screenshot_button_text(local_screenshot_button_text);
            } else {
                document.getElementById('send_to_server_option').checked = true;
                set_screenshot_button_text(server_screenshot_button_text);
            }
        } else {
            console.warn("Didn't get boolean save value for 'save locally'. Has the user never entered anything?");
        }
    });


    chrome.storage.sync.get("post_url", function(response){
        console.log("Remote url: "+response.post_url);
        document.getElementById('post-url-input').value=response.post_url;
    });


    $('input[name="persistence_option"]').each(function (index, element) {
        element.addEventListener('change', function(){
            console.log("init-popup.js change listener called for persistence mode radio button group. Value: "+element.value);
            let value = element.value;
            if(value === "local"){
                chrome.storage.sync.set({save_screenshot_locally:true}, function(){
                    console.log("Set save_screenshot_locally to: "+true)
                });
                set_screenshot_button_text(local_screenshot_button_text);
            } else if(value === "server"){
                chrome.storage.sync.set({save_screenshot_locally:false}, function(){
                    console.log("Set save_screenshot_locally to: "+false)
                });
                set_screenshot_button_text(server_screenshot_button_text);
            } else {
                console.error("Got unknown persistence mode: "+value);
            }
        }
    );
    });

    document.getElementById("change-url-button").onclick = function(element){
        let val = document.getElementById('post-url-input').value;
        console.log("change-url-button pressed. Setting post-url value to: "+val);
        chrome.storage.sync.set({"post_url":val}, function(){
            console.log("Post url set: "+val);
        });
    }

    document.getElementById("snip-button").onclick = function(element){
        console.log("snip-button pressed");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "start-screenshot"}, function(response) {
                console.log((response!=undefined)?response.info:"Response failed! "+chrome.runtime.lastError.message);
            });
        });

    }
}