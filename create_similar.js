// ==UserScript==
// @name         Autofocus on Pason RMS ComponentDetails page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Autofocus create similar button on Pason RMS ComponentDetails page
// @match        https://rms.pason.com/Pages/Components/ComponentDetails.aspx?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     window.addEventListener('load', function() {
            var btn1 = document.getElementById('ctl00_PageHeaderNavigationContent_CreateSimilarButton');
            if (btn1) {
                btn1.focus();
            }
        });
})();
