// ==UserScript==
// @name         Add Additional Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add an additional button to the RMS - Ensure that pop-up blockers are disabled for the site to allow multiple tabs to open.
// @author       You
// @match        *://rms.pason.com/pages/Components/ComponentEditMultiple.aspx*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create a new button element
    let newButton = document.createElement('a');
    newButton.id = "newButton";
    newButton.className = "formLinkButton"; // Use the same class as the other buttons for styling
    newButton.href = "#"; // Set href to "#" or to the desired URL
    newButton.innerText = "Edit in Tab"; // Button label

    // Functionality to get the textbox values and open new tabs
    newButton.onclick = function(event) {
        event.preventDefault();

        let textbox = document.getElementById('ctl00_PageBodyContent_ManualBarcodeEntry_CustomBarcodesTextBox');
        let values = textbox.value.split('\n');

        for (let i = 0; i < values.length; i++) {
            if (values[i].trim() !== "") { // Check for non-empty values
                window.open('https://rms.pason.com/pages/Components/ComponentEdit.aspx?id=' + values[i].trim(), '_blank');
            }
        }
    };

    // Add a margin to the right side of the new button
    newButton.style.marginRight = "10px";

    // Insert the new button next to the "Continue" button
    let referenceButton = document.getElementById('ctl00_PageBodyContent_ChooseBarcodesButton');
    referenceButton.parentNode.insertBefore(newButton, referenceButton.nextSibling);
})();
