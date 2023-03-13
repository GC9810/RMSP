// ==UserScript==
// @name         RMS Mod (DIS137)
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
        let input = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentProperties_PropertyRepeater_ctl00_TextProperty");
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

    });
})();
