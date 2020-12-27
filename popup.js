// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
bk_cons.log("popup.js starting")

let changeColor = document.getElementById('changeColor');
let snipButton = document.getElementById("snip-button")

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  console.log("popup.js: changeColor::onclick");
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

snipButton.onclick = function(element){
  console.log("popup.js: starting element picker");
  window.element_picker_exec();
}
bk_cons.log("popup.js end")
