// ==UserScript==
// @name         Open Tabs and Fill Barcodes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Open multiple tabs and fill barcodes
// @author       You
// @match        https://rms.pason.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add button next to ChooseBarcodesButton
    const chooseBarcodesButton = document.getElementById('ctl00_PageBodyContent_ChooseBarcodesButton');
    if (chooseBarcodesButton) {
        const newButton = document.createElement('button');
        newButton.innerText = 'Add Multiple in Tab';
        newButton.style.marginLeft = '10px'; // Add some spacing

        // Event listener for the new button
        newButton.addEventListener('click', function() {
            const barcodeTextBox = document.getElementById('ctl00_PageBodyContent_ManualBarcodeEntry_CustomBarcodesTextBox');
            if (barcodeTextBox) {
                const barcodes = barcodeTextBox.value.trim().split(/\n+/);
                barcodes.forEach((barcode, index) => {
                    // Open a new tab with barcode as a query parameter
                    // Change the URL to the actual page you want to open
                    const newTabUrl = `https://rms.pason.com/pages/Components/ComponentAdd.aspx?componentTemplate=1545825&barcode=${encodeURIComponent(barcode.trim())}`;
                    window.open(newTabUrl, `_blank${index}`);
                });
            }
        });

        chooseBarcodesButton.after(newButton);
    }

    // Script for the child tabs
    if (window.location.href.includes('ComponentAdd.aspx')) {
        // Parse the barcode from URL
        const urlParams = new URLSearchParams(window.location.search);
        const barcode = urlParams.get('barcode');
        const barcodeInputBox = document.getElementById('ctl00_ProgessIndicationPageBodyContent_BarcodeTextBox');

        if (barcodeInputBox && barcode) {
            barcodeInputBox.value = barcode; // Set the barcode value
            // Add any additional actions here if needed, like submitting the form
        }
    }
})();
