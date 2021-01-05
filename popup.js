
let snipButton = document.getElementById("snip-button");

snipButton.onclick = function(element){
    console.log("popup.js: starting element picker");
    var myExampleClickHandler = function (elem) { console.log('Clicked element:', elem); }
    var myDomOutline = DomOutline({ onClick: myExampleClickHandler, filter: 'div' });

// Start outline:
    myDomOutline.start();  // end with esc key
}