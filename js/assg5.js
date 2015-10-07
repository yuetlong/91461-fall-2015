/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var story;

// Note to advanced students:
//   Do *NOT* use the jQuery getJSON function here, because in this 
// application the AJAX call has to be synchronous (that is, we need to 
// wait for it to be done before continuing), and the getJSON function 
// is always asynchronous.  Reference:
// http://stackoverflow.com/questions/2765411/is-it-possible-to-set-asyncfalse-to-getjson-call
//   The other approach is to change the global jQuery ajaxSetup option, 
// but this is controversial, as discussed on the referenced page.


//     load the JSON file containing the text of Lincoln's Gettysburg address 
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
    strContent += "<h2 class='author'>by " + story.author + "</h2>";
    strContent += "<h3 class='date'>" + story.date + "</h3>";

    // loop through all the paragraphs and sentences
    for (var para = 0; para < story.text.paragraphs.length; para++) {
        strContent += "<p class=\"" + strFirstParaClass + "\">";
        for (var sent = 0; sent < story.text.paragraphs[para].length; sent++) {
            strContent += story.text.paragraphs[para][sent] + "&nbsp; ";
        }
        strContent += "</p>";
    }

    // place dynamic content on page
    // document.getElementById( "content" ).innerHTML = strContent ;
    jQuery("#content").html(strContent);
}