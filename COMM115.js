// ==UserScript==
// @name         COMM115
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Automate form actions, data extraction, and validation on a web page
// @author       ChatGPT
// @match        https://rms.pason.com/pages/Components/ComponentAdd.aspx?componentTemplate=*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract data from the XML response
    function extractData(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const macAddressNode = xmlDoc.evaluate("//parameter_group[name='UUT Information']//parameter[name='MAC Address']/value", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const ciscoSerialNumberNode = xmlDoc.evaluate("//parameter_group[name='UUT Information']//parameter[name='Cisco Serial Number']/value", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const serialNode = xmlDoc.evaluate("//serial_number", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const resultStatusNode = xmlDoc.evaluate("//status", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        const macAddress = macAddressNode ? macAddressNode.textContent : 'Not Found';
        const ciscoSerialNumber = ciscoSerialNumberNode ? ciscoSerialNumberNode.textContent : 'Not Found';
        const serial = serialNode ? serialNode.textContent : 'Not Found';
        const resultStatus = resultStatusNode ? resultStatusNode.textContent : 'Not Found';

        return { macAddress, ciscoSerialNumber, serial, resultStatus };
    }

    // Function to perform the API request and data extraction
    function fetchData(lotNumber) {
        const url = "https://secure.maintainabletest.com/api/v1/searches/perform.xml?page=1";
        const headers = {
            "X-Maintainable-Relay-Key": "fMqh3sFVM8PenkcW4vWWnvYA9xBTRrVqXwzznbM67ita5S1m2emwMAzCqpWA",
            "Accept": "application/xml",
            "Content-Type": "application/xml",
            "User-Agent": "MaintainableTestLabViewSdk/1.17.2 (Windows NT 10.0; LabVIEW 17.0.1f4 32-bit RunTimeSystem; TestReportPropertiesTool.exe)"
        };
        const xmlPayload = `<?xml version="1.0" encoding="utf-8"?><search><query_string>lot_number is "${lotNumber}"</query_string></search>`;

        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "POST",
                url: url,
                headers: headers,
                data: xmlPayload,
                onload: function(response) {
                    const { macAddress, ciscoSerialNumber, serial, resultStatus } = extractData(response.responseText);
                    resolve({ macAddress, ciscoSerialNumber, serial, resultStatus });
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    // Function to automate form actions
    function automateFormActions() {
        // Step 0: Autofocus on the input box
        const inputBox = document.getElementById("ctl00_ProgessIndicationPageBodyContent_BarcodeTextBox");
        if (inputBox) {
            inputBox.focus();
        }

        // Step 1: Listen for Enter key press in the input box and trigger validation and data extraction
        inputBox.addEventListener("keydown", async function(event) {
            if (event.key === "Enter") {
                const inputValue = inputBox.value;
                // Validate the input (8-digit number starting with zero)
                if (/^0\d{7}$/.test(inputValue)) {
                    try {
                        const { macAddress, ciscoSerialNumber, serial, resultStatus } = await fetchData(inputValue);
                        console.log('MAC Address:', macAddress);
                        console.log('Cisco Serial Number:', ciscoSerialNumber);
                        console.log('Serial:', serial);
                        console.log('Status:', resultStatus);

                        // If all values are found, continue to Step 2
                        if (macAddress !== 'Not Found' && ciscoSerialNumber !== 'Not Found' && serial !== 'Not Found') {
                            // Step 2: Check the checkbox
                            const checkbox = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Revisions_RevisionDataList_ctl01_RevisionCheckBox");
                            if (checkbox) {
                                checkbox.checked = true;
                            }

                            // Step 3: Select 'Canada' from dropdown menus
                            const countryDropdown = document.getElementById("ctl00_ProgessIndicationPageBodyContent_CountryDropDownList");
                            const originCountryDropdown = document.getElementById("ctl00_ProgessIndicationPageBodyContent_OriginCountryDropDownList");
                            if (countryDropdown && originCountryDropdown) {
                                const canadaOption = Array.from(countryDropdown.options).find(option => option.textContent === 'Canada');
                                const canadaOriginOption = Array.from(originCountryDropdown.options).find(option => option.textContent === 'Canada');
                                if (canadaOption && canadaOriginOption) {
                                    canadaOption.selected = true;
                                    canadaOriginOption.selected = true;
                                }
                            }

                            // Step 4: Fill values in textboxes
                            const serialTextbox = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl00_TextProperty");
                            const macAddressTextbox = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl01_TextProperty");
                            const ciscoSerialNumberTextbox = document.getElementById("ctl00_ProgessIndicationPageBodyContent_Properties_PropertyRepeater_ctl02_TextProperty");
                            if (macAddressTextbox && ciscoSerialNumberTextbox && serialTextbox) {
                                macAddressTextbox.value = macAddress;
                                ciscoSerialNumberTextbox.value = ciscoSerialNumber;
                                serialTextbox.value = serial;
                            }

                            // Step 5: Focus on the button
                            const addButton = document.getElementById("ctl00_ProgessIndicationPageBodyContent_TopAddItemButton");
                            if (addButton) {
                                addButton.focus();
                            }
                        } else {
                            console.log('Error: Not all values found.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                } else {
                    console.log('Invalid input. Please enter an 8-digit number starting with zero.');
                }
            }
        });
    }

    // Call the automateFormActions function to start the automation
    automateFormActions();
})();
