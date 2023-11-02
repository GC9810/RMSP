// ==UserScript==
// @name         Add Additional Buttons
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Add additional buttons to the RMS - Part Updates page
// @author       You
// @match        *://rms.pason.com/pages/Components/ComponentEditMultiple.aspx*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function openTabs(baseURL) {
        let textbox = document.getElementById('ctl00_PageBodyContent_ManualBarcodeEntry_CustomBarcodesTextBox');
        let values = textbox.value.split('\n');

        for (let i = 0; i < values.length; i++) {
            if (values[i].trim() !== "") { // Check for non-empty values
                window.open(baseURL + values[i].trim(), '_blank');
            }
        }
    }

    // Create the "Edit in Tab" button
    let editButton = document.createElement('a');
    editButton.id = "editButton";
    editButton.className = "formLinkButton";
    editButton.href = "#";
    editButton.innerText = "Edit in Tab";
    editButton.style.marginRight = "10px";  // Add a margin to the right side
    editButton.onclick = function(event) {
        event.preventDefault();
        openTabs('https://rms.pason.com/pages/Components/ComponentEdit.aspx?id=');
    };

    // Create the "View in Tab" button
    let viewButton = document.createElement('a');
    viewButton.id = "viewButton";
    viewButton.className = "formLinkButton";
    viewButton.href = "#";
    viewButton.innerText = "View in Tab";
    viewButton.style.marginRight = "10px";  // Add a margin to the right side
    viewButton.onclick = function(event) {
        event.preventDefault();
        openTabs('https://rms.pason.com/pages/Components/ComponentDetails.aspx?id=');
    };

    // Insert the new buttons next to the "Continue" button
    let referenceButton = document.getElementById('ctl00_PageBodyContent_ChooseBarcodesButton');
    referenceButton.parentNode.insertBefore(editButton, referenceButton.nextSibling);
    referenceButton.parentNode.insertBefore(viewButton, editButton.nextSibling);

    // Make the textbox resizable
    let textbox = document.getElementById('ctl00_PageBodyContent_ManualBarcodeEntry_CustomBarcodesTextBox');
    textbox.style.resize = "vertical";
    textbox.style.overflow = "auto";


})();
