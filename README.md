# Chrome Browser Extension - Screenshots and DOM Extraction

This utility allows you to take screenshots of your browser's contents and download them or send them to a server.
The tool also allows you to: 

1. Attach a comment to the screenshot

2. Capture the site DOM

3. Capture all site styles

4. Highlight or blackout important information

5. Optionally send all of the above to a server

If you choose to highlight or blackout information, the HTML attribute *screenshot-was-highlighted = \<highlight\>* will be set, with \<highlight\> taking on a true/false value for highlights and blackouts, respectively.

This tool was built using Niklas Von Hertzen's [feedback.js](https://experiments.hertzen.com/jsfeedback/) script.

Note: The extension currently does not support images as part of the page screenshot. 

## Architecture

![Alt text](readme/browser_screenshot_sequence_diagram.png?raw=true "Sequence diagram for the application")

The  browser plugin consists of three important parts:

1. The **popup panel** (marked in red, *popup.html* in the above diagram) is the interface component between the user and the browser extension. From here, the user can configure the behavior of the extension and trigger the screenshotting process
2. The **page script** (yellow, comprising both the *page script* entity as well as the two libraries *html2canvas* and *feedback.js* in the diagram) is the totality of javascript methods that the extension injects into the running webpage. This includes the methods needed to run feedback.js and actually construct the screenshot.
3. The **background script** (blue) is the script portion of the extension that runs outside of the webpage. This is necessary because the extension is supposed to be able to send network requests containing the collected data, but the [Same-Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) prevents network requests being made from within the content script. Therefore, the content script first has to send the packaged data to the background script, which is then able to send the request without the same-origin restriction.

## Future Work

Currently, images are not supported, due to a limitation imposed by the browser's Same-Origin Policy - the webpage, into which feedback.js is injected, is not allowed to make requests to re-download the images in order to incorporate them into the screenshot. 

In order to enable screenshots containing images, the page script should send all necessary DOM and style information to the background script, which uses this information to call html2canvas and create the screenshot. Currently, feedback.js, which is running in the page script, internally calls html2canvas with the DOM information from the webpage. 

## Installation

1. Download this repository as a ZIP file (or clone the repository) and unpack it
![Alt text](readme/download_zip.png?raw=true "Download as ZIP")

2. In Chrome, navigate to: **chrome://extensions/** to enter Extension Settings

3. At the top-right portion of the screen, activate "Developer Mode"

![Alt text](readme/extensions_menu_devmode.png?raw=true "Developer Mode")

4. Select "Load unpacked" and load the unpacked directory from step 1

5. After restarting the browser, the extension should be ready to use
