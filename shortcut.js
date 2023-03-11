// ==UserScript==
// @name         RMS Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Keyboard shortcuts for RMS Asset Detail page
// @author       Your name
// @match        https://rms.pason.com/Pages/Components/ComponentDetails.aspx?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        let updateBtn = document.getElementById("ctl00_PageHeaderNavigationContent_UpdateHyperlink");
        let createBtn = document.getElementById("ctl00_PageHeaderNavigationContent_CreateSimilarButton");
        let barcodeInput = document.getElementById("ctl00_BarcodeNumericTextBox");

        document.addEventListener('keydown', function(event) {
            if (event.key.toLowerCase() === "e") {
                updateBtn.click();
            } else if (event.key.toLowerCase() === "c") {
                createBtn.click();
            } else if (event.key.toLowerCase() === "d") {
                barcodeInput.focus();
                event.preventDefault();
            }
        });
    });
})();
