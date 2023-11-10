// ==UserScript==
// @name         Copy Lot/Serial Numbers on Insert Key
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Copy lot numbers on first Insert press, and serial numbers on double press.
// @author       You
// @match        https://secure.maintainabletest.com/searches/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastKeyPressTime = 0;

    document.addEventListener('keydown', function(e) {
        // Check if the Insert key was pressed
        if (e.key === "Insert") {
            // Prevent any default behavior
            e.preventDefault();

            const timeNow = new Date().getTime();
            // Check if Insert was pressed again within 500ms
            if (timeNow - lastKeyPressTime <= 500) {
                // Double press detected, copy serial numbers
                copyColumnData('.serial_number');
            } else {
                // Single press, copy lot numbers
                copyColumnData('.lot_number');
            }
            // Update the last key press time
            lastKeyPressTime = timeNow;
        }
    });

    function copyColumnData(selector) {
        let values = [];
        // Select all the elements that contain the desired data
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            // Skip the first element if it's the header
            if (index > 0) {
                values.push(element.textContent.trim());
            }
        });

        // Join the values into a single string, separated by newlines
        const valuesString = values.join('\n');

        // Use the Clipboard API to copy the string
        navigator.clipboard.writeText(valuesString).then(function() {
            console.log(selector + ' copied to clipboard');
        }, function(err) {
            console.error('Could not copy data: ', err);
        });
    }
})();
