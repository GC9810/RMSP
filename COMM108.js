// ==UserScript==
// @name         API Request and MAC Address Extraction
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Extract MAC addresses from an API response and populate input boxes
// @author       ChatGPT
// @match        https://rms.pason.com/pages/Components/ComponentEdit.aspx?id=*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    function extractMacAddresses(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        const ethernetMacNode = xmlDoc.evaluate("//parameter_group[name='Cisco Information']//parameter[name='Ethernet MAC']/value", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const baseRadioMacNode = xmlDoc.evaluate("//parameter_group[name='Cisco Information']//parameter[name='Base Radio MAC']/value", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const backhaulRadioMacNode = xmlDoc.evaluate("//parameter_group[name='Cisco Information']//parameter[name='Backhaul Radio MAC']/value", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        return {
            ethernetMac: ethernetMacNode ? ethernetMacNode.textContent : 'Not Found',
            baseRadioMac: baseRadioMacNode ? baseRadioMacNode.textContent : 'Not Found',
            backhaulRadioMac: backhaulRadioMacNode ? backhaulRadioMacNode.textContent : 'Not Found'
        };
    }

    function doPostBack() {
        WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ProgessIndicationPageBodyContent$ctl13", "", true, "", "", false, true));
    }

    // Check if the input box with the given ID is present
    const inputBox = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedBarcodeTextBox");

    if (inputBox) {
        let lotNumber = inputBox.value;

        // Add a leading zero if not present
        if (lotNumber[0] !== '0') {
            lotNumber = '0' + lotNumber;
        }

        const url = "https://secure.maintainabletest.com/api/v1/searches/perform.xml?page=1";
        const headers = {
            "X-Maintainable-Relay-Key": "fMqh3sFVM8PenkcW4vWWnvYA9xBTRrVqXwzznbM67ita5S1m2emwMAzCqpWA",
            "Accept": "application/xml",
            "Content-Type": "application/xml",
            "User-Agent": "MaintainableTestLabViewSdk/1.17.2 (Windows NT 10.0; LabVIEW 17.0.1f4 32-bit RunTimeSystem; TestReportPropertiesTool.exe)"
        };
        const xmlPayload = `<?xml version="1.0" encoding="utf-8"?><search><query_string>lot_number is "${lotNumber}"</query_string></search>`;

        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            headers: headers,
            data: xmlPayload,
            onload: function(response) {
                const macAddresses = extractMacAddresses(response.responseText);
                console.log(macAddresses);

                // Populate the input boxes with the extracted MAC addresses
                const backhaulMacInput = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentProperties_PropertyRepeater_ctl00_TextProperty");
                const baseRadioMacInput = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentProperties_PropertyRepeater_ctl01_TextProperty");
                const ethernetMacInput = document.getElementById("ctl00_ProgessIndicationPageBodyContent_UpdatedComponentProperties_PropertyRepeater_ctl02_TextProperty");

                if (backhaulMacInput) backhaulMacInput.value = macAddresses.backhaulRadioMac;
                if (baseRadioMacInput) baseRadioMacInput.value = macAddresses.baseRadioMac;
                if (ethernetMacInput) ethernetMacInput.value = macAddresses.ethernetMac;
                // If all MAC addresses are found, execute the doPostBack function
                if (macAddresses.ethernetMac !== 'Not Found' && macAddresses.baseRadioMac !== 'Not Found' && macAddresses.backhaulRadioMac !== 'Not Found') {
                    doPostBack();
                }
            }
        });
    } else {
        // If the page has navigated to the next step, focus on the element with the provided ID
        const confirmButton = document.getElementById("ctl00_ProgessIndicationPageBodyContent_ConfirmChangesButton");
        if (confirmButton) {
            confirmButton.focus();
        }
    }
})();
