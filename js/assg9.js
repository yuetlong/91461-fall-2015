/*
    Name    : js/assg9.js
    Author  : Yuet Long Leung
    Email   : YuetLong_Leung@student.uml.edu
    Date    : Dec 8, 2015
    Copyright (c) 2015 by Yuet Long Leung.  All rights reserved.

    Learn how to do drag and drop in place in here:
    http://www.elated.com/articles/drag-and-drop-with-jquery-your-essential-guide/

    Used Ramon's JSON file (parsed it to array with regex). Thank you Ramon!

    Used an unbiased shuffle algorithm from stackoverflow
    http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

 */

// pieces[?][1] is the count , pieces[?][2] is the value.

  var pieces = [
  ["A",1,9],
 	["B",3,2],
 	["C",3,2],
 	["D",2,4],
 	["E",1,12],
 	["F",4,2],
 	["G",2,3],
 	["H",4,2],
 	["I",1,9],
 	["J",8,1],
 	["K",5,1],
 	["L",1,4],
 	["M",3,2],
 	["N",1,5],
 	["O",1,8],
 	["P",3,2],
 	["Q",10,1],
 	["R",1,6],
 	["S",1,4],
 	["T",1,6],
 	["U",1,4],
 	["V",4,2],
 	["W",4,2],
 	["X",8,1],
 	["Y",4,2],
 	["Z",10,1],
  ["blank",2,0]
];

// I am going to sequentially insert all the pieces into the array then shuffle it.

var p_gen = new Array();

for (i = 0; i < pieces.length ; i++){
  for (j = 0; j < pieces[i][1]; j++){
    p_gen.push(pieces[i][0]);
  }
}

// this is the de facto shuffle function from stackoverflow

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


shuffle(p_gen);


for (i = 0; i < 7; i++){
  $('<div><img src=img/st/'+ p_gen[i][0] +'.jpg height =\'87\' width =\'81\'></div>')
  .data('letter',p_gen[i][0])
  .attr('id',"draggable")
  .appendTo('#rack')
  .draggable();
}


//$(document).ready(function() {}); // end $(document).ready(function()

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
