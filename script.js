// ==UserScript==
// @name         RMS Mod
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Mod for RMS entry
// @author       You
// @match        https://rms.pason.com/Pages/Components/ComponentAdd.aspx?componentTemplate=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        let backhaul = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl00_TextProperty")
        let baseradio = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl01_TextProperty")
        let ethernet = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl02_TextProperty")
        let origin = document.getElementById("ctl00_ProgessIndicationPageBodyContent_OriginCountryDropDownList")
        let country = document.getElementById("ctl00_ProgessIndicationPageBodyContent_CountryDropDownList")
        let barcode = document.getElementById("ctl00_ProgessIndicationPageBodyContent_BarcodeTextBox")
        let sn = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl03_TextProperty")

        //check the revision checkbox (1-4)
        for (let x = 0; x < 4; x++) {
            document.getElementById("ctl00_ProgessIndicationPageBodyContent_Revisions_RevisionDataList_ctl0"+x+"_RevisionCheckBox").checked = true
        }

        country.value = 18 //select USA
        origin.value = 157 //mexico

        ethernet.onblur = function copyMac(){
        backhaul.value = ethernet.value
        baseradio.value = ethernet.value
        }

        //change tabIndex sequence
        barcode.tabIndex = 1
        ethernet.tabIndex = 2
        sn.tabIndex = 3
        barcode.focus();
    });
})();
