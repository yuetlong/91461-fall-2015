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
  ["blank",0,2]
];

// I am going to sequentially insert all the pieces into the array then shuffle it.

var p_gen = new Array();

for (i = 0; i < pieces.length ; i++){
  for (j = 0; j < pieces[i][2]; j++){
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

$(document).ready(function() {
  // generate all the pieces

  for (i = 0; i < 7; i++){
    $('<span><img src=img/st/'+ p_gen[i][0] +'.jpg height =\'87\' width =\'81\'></span>')
    .data('piece_letter',p_gen[i]) // add attribute - piece_letter
    .attr("id",i)
    .appendTo('#rack')
    .draggable({

      //stack: '#rack div', // make sure it always sit on the other cards

      revert : true, // this makes the piece move back to initial position when dropped.

      start: function(event,ui){

        $(this).draggable('option','revert',true);

      }
    });
  }

  // generate all the slots in the board

  for (i = 0; i < 7 ; i++){
    $('<span><img src=img/nt.jpg height =\'87\' width =\'81\'></span>')
    .data('holding_piece_letter', "none") // add attribute - holding_piece_letter
    .appendTo('#board')
    .droppable({

      hoverClass:'hovered',

      drop: function( event, ui ) {

        // if the droppable is not occupied ...
        if($(this).data('holding_piece_letter') === "none"){

          // this adjusts the position of the draggable right at the center of the drop zone
          ui.draggable.position({ of: $(this), my: 'center', at: 'center' });

          // makes the piece stop going back to the rack
          ui.draggable.draggable('option','revert',false);

          // assigns the letter of the draggable to the droppable
          $(this).data('holding_piece_letter', ui.draggable.data('piece_letter'));

          // disable the droppable to prevent overlapping
          $(this).droppable("option","disabled",true);

          console.log($(this).droppable("option","accept"));
        }
      }, // end drop function

      out: function (event, ui){

        // clear the entry
        $(this).data('holding_piece_letter',"none");

        // make the droppable available again
        $(this).droppable("option","disabled",false);

        console.log("Out");
      }
    })
  }
}); // end $(document).ready(function()
