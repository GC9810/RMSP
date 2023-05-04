// ==UserScript==
// @name         RMS Mod (For VSP015)(enter version)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Mod for RMS entry (enter version)
// @author       You
// @match        https://rms.pason.com/Pages/Components/ComponentAdd.aspx?componentTemplate=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

        let mac = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl00_TextProperty")
        let rev = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl01_TextProperty")
        let sn = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl02_TextProperty")
        let origin = document.getElementById("ctl00_ProgessIndicationPageBodyContent_OriginCountryDropDownList")
        let country = document.getElementById("ctl00_ProgessIndicationPageBodyContent_CountryDropDownList")
        let barcode = document.getElementById("ctl00_ProgessIndicationPageBodyContent_BarcodeTextBox")
        let add_btn = document.getElementById("ctl00_ProgessIndicationPageBodyContent_TopAddItemButton")

        document.getElementById("ctl00_ProgessIndicationPageBodyContent_Revisions_RevisionDataList_ctl03_RevisionCheckBox").checked = true

        country.value = 18 //select USA
        origin.value = 48 //china
        rev.value = "04" //fillup 04 in rev field

        //change tabIndex sequence
        barcode.tabIndex = 1
        mac.tabIndex = 2
        sn.tabIndex = 3
        add_btn.tabIndex = 4

        barcode.addEventListener('keydown', function(e){
            if (e.keyCode === 13) { //treat enter key as tab key
                e.preventDefault();
                mac.focus();
            }
        });

        mac.addEventListener('keydown', function(e){
            if (e.keyCode === 13) { //treat enter key as tab key
                e.preventDefault();
                sn.focus();
            }
        });

        sn.addEventListener('keydown', function(e){
            if (e.keyCode === 13) { //treat enter key as tab key
                e.preventDefault();
                add_btn.focus();
            }
        });

        barcode.focus();
})();
