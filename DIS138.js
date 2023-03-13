// ==UserScript==
// @name         RMS Mod (DIS138)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Autofocus and Highlight Input Box in RMS
// @author       You
// @match        https://rms.pason.com/Pages/Components/ComponentEdit.aspx?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        let input = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentProperties_PropertyRepeater_ctl01_TextProperty");
        if (input) {
            input.select();
            input.focus();

            input.addEventListener("keydown", function(event) {
                if (event.key.toLowerCase() === "enter") {
                    event.preventDefault();
                    let link = document.querySelector("a[href*='ctl00$ProgessIndicationPageBodyContent$ctl13']");
                    if (link) {
                        link.click();
                    }
                }
            });
        }

        document.addEventListener('keydown', function(event) {
            if (event.key.toLowerCase() === 'c') {
                let changebtn = document.getElementById('ctl00_ProgessIndicationPageBodyContent_ConfirmChangesButton');
                if (changebtn) {
                    changebtn.focus();
                }
            }
        });

        const table = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentFlags_ComponentFlagDataList");
        if (table) {
            const checkboxes = table.querySelectorAll("input[type=checkbox]");
            //uncheck all the flags
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }

        //Copy barcode to Carrier Serial Number and add a leading zero
        const barcodeInput = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedBarcodeTextBox");
        const targetInput = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentProperties_PropertyRepeater_ctl00_TextProperty");
        if (barcodeInput && targetInput) {
            targetInput.value = 0 + barcodeInput.value;
        }

        //select origin country as Germany
        const countryDropdown = document.querySelector("#ctl00_ProgessIndicationPageBodyContent_OriginCountryDropDownList");
        if (countryDropdown) {
            const germanyOption = Array.from(countryDropdown.options).find(option => option.text.toLowerCase() === "germany");
            if (germanyOption) {
                germanyOption.selected = true;
            }
        }
    });
})();
