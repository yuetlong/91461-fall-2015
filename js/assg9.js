/*
    Name    : js/assg9.js
    Author  : Yuet Long Leung
    Email   : YuetLong_Leung@student.uml.edu
    Date    : Dec 8, 2015
    Copyright (c) 2015 by Yuet Long Leung.  All rights reserved.

    This document validates the form in assg7.html, using JQuery, and generates table using JavaScript.
 */

$(document).ready(function() {
}); // end $(document).ready(function()

$(function() {
  $( "#draggable" ).draggable();

  $( "#droppable" ).droppable({
    drop: function( event, ui ) {
      // this adjusts the position of the draggable right at the center of the drop zone
      ui.draggable.position({ of: $(this), my: 'center', at: 'center' });
      console.log(ui.draggable.attr("letter"));
    }
  });
});
