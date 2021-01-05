console.log("runpicker.js");
var myExampleClickHandler = function (elem) { console.log('Clicked element:', elem); }
var myDomOutline = DomOutline({ onClick: myExampleClickHandler, filter: 'div' });

// Start outline:
myDomOutline.start();  // end with esc key