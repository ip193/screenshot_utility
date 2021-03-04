# Chrome Browser Extension - Screenshots and DOM Extraction



This utility allows you to take screenshots of your browser's contents and download them or send them to a server.

The tool also allows you to: 

1. Attach a comment to the screenshot

2. Capture the site DOM

3. Capture all site styles

4. Highlight or blackout important information

4. Optionally send all of the above to a server

If you choose to highlight or blackout information, the HTML attribute *screenshot-was-highlighted = \<highlight\>* will be set, with \<highlight\> taking on a true/false value for highlights and blackouts, respectively.

Note: The extension currently does not support images as part of the page screenshot. 

## Installation

1. Download this repository as a ZIP file (or clone the repository) and unpack it
![Alt text](readme/download_zip.png?raw=true "Download as ZIP")

2. In Chrome, navigate to: **chrome://extensions/** to enter Extension Settings

3. At the top-right portion of the screen, activate "Developer Mode"

![Alt text](readme/extensions_menu_devmode.png?raw=true "Developer Mode")

4. Select "Load unpacked" and load the unpacked directory from step 1
