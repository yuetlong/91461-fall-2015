/* 
    Author  : Yuet Long Leung
    Email   : YuetLong_Leung@student.uml.edu
    Date    : Oct 5, 2015
    Copyright (c) 2015 by Yuet Long Leung.  All rights reserved.
 */

var story;

//     load the JSON file
jQuery.ajax({
    async: false,
    dataType: "json",
    url: "why-clojure.json",
    success: function (data) {
        story = data;
    }
});

jQuery(document).ready(function () {
    placeContent();
});

//  script to determine browser type and set first paragraph class appropriately
var strFirstParaClass = "";
var strNavString = navigator.userAgent;
// console.log( navigator.userAgent ) ;
// console.log( strNavString ) ;
if (strNavString.indexOf("Firefox") !== -1) {
    strFirstParaClass = "Firefox";
} else if (strNavString.indexOf("Chrome") !== -1) {
    strFirstParaClass = "Chrome";
} else if (strNavString.indexOf("Safari") !== -1) {
    strFirstParaClass = "Safari";
}

//  N.B.  This version *does* apply the CSS.
//  script to place JSON text in the placeholder on this page
function placeContent() {
    var strContent = "";

    // create dynamic content from JSON
    strContent += "<h1 class='title'>" + story.title + "</h1>";
    strContent += "<h5 class='author'>by " + story.author + "</h5>";
    strContent += "<h5 class='date'>" + story.date + "</h5>";

    // loop through all the paragraphs and sentences
    for (var para = 0; para < story.text.paragraphs.length; para++) {
        strContent += "<p class=\"" + strFirstParaClass + "\">";
        for (var sent = 0; sent < story.text.paragraphs[para].length; sent++) {
            strContent += story.text.paragraphs[para][sent] + "&nbsp; ";
        }
        strContent += "</p>";
    }
    
    
    // a button that links to the source
    strContent += "<a class=\"btn btn-default\" href=\"" + story.source +
            "\">View Source <span class=\"glyphicon glyphicon-chevron-right\"></a>";

    // place dynamic content on page
    jQuery("#content").html(strContent);
}