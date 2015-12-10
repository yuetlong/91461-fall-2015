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

function get_count(letter){
  for (i = 0 ; i < 27; i++){
    if (pieces[i][0] == letter){
      return pieces[i][1];
    }
  }
}

function get_value(letter){
  for (i = 0 ; i < 27; i++){
    if (pieces[i][0] == letter){
      return pieces[i][2];
    }
  }
}

var letters_on_board = new Array(15);
for (i = 0; i < 15 ; i ++){
  letters_on_board[i] = new Array(15);
}

// I am going to sequentially insert all the pieces into the array then shuffle it.

var p_gen = new Array();

for (i = 0; i < pieces.length ; i++){
  for (j = 0; j < pieces[i][2]; j++){
    p_gen.push(pieces[i][0]);
  }
}

var total_score = 0;

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

  /******************************************************************************************
                                    Generate HTML for the pieces
  *******************************************************************************************/

  for (i = 0; i < 7; i++){
    new_piece = document.createElement('span');
    new_piece.setAttribute('class','piece');
    new_piece.setAttribute('letter',p_gen[i][0]);
    new_piece.setAttribute('id',"piece" + i);
    new_piece.setAttribute('is_on_board',false);

    new_pic = document.createElement('img');
    new_pic.setAttribute('src','img/st/' + p_gen[i][0] + '.jpg');
    new_pic.setAttribute('height','50');
    new_pic.setAttribute('width','50');

    new_piece.appendChild(new_pic);
    document.getElementById('rack').appendChild(new_piece);
  }

  /******************************************************************************************
                               Generate HTML for the board tiles
  *******************************************************************************************/

  new_table = document.createElement('table');

  for (i = 0; i < 15 ; i++){

    new_board_row = document.createElement('tr');

    for (j = 0; j < 15; j++){

      new_tile = document.createElement('td');
      new_tile.setAttribute('class','tile');
      new_tile.setAttribute('row',i);
      new_tile.setAttribute('column',j);

      var text_node = document.createTextNode("");

      if (i == 7 && j == 7){
        new_tile.setAttribute('multiplier','STAR');
        text_node = document.createTextNode("STAR");
      }
      else if ((i == 0 || i == 7 || i == 14) && (j == 0 || j == 7 || j == 14)){
        new_tile.setAttribute('multiplier','3W');
        text_node = document.createTextNode("3W");
      }
      else if (((i == 0 || i == 7 || i == 14) && (j == 3 || j == 11))
            || ((i == 2 || i == 12)           && (j == 6 || j == 8 ))
            || ((i == 3 || i == 11)           && (j == 0 || j == 7 || j == 14))
            || ((i == 6 || i == 8 )           && (j == 2 || j == 6 || j == 8 || j == 12))){
        new_tile.setAttribute('multiplier','2L');
        text_node = document.createTextNode("2L");
      }
      else if (((i == 1 || i == 13) && (j == 5 || j == 9))
            || ((i == 5 || i == 9) &&  (j == 1 || j == 5 || j == 9 || j == 13))){
        new_tile.setAttribute('multiplier','3L');
        text_node = document.createTextNode("3L");
      }
      else if (((i == 1 || i == 13) && (j == 1 || j == 13))
           ||  ((i == 2 || i == 12) && (j == 2 || j == 12))
           ||  ((i == 3 || i == 11) && (j == 3 || j == 11))
           ||  ((i == 4 || i == 10) && (j == 4 || j == 10))){
        new_tile.setAttribute('multiplier','2W');
        text_node = document.createTextNode("2W");
      }
      else{
        new_tile.setAttribute('multiplier','1L');
      }

      new_tile.appendChild(text_node);

      new_board_row.appendChild(new_tile);
    }
    new_table.appendChild(new_board_row);
  }

  document.getElementById('board').appendChild(new_table);


  /******************************************************************************************
                               Configure the pieces by JQuery UI
  *******************************************************************************************/


  $(".piece").draggable({

    // this prevents pieces being moved to arbitary places
    revert : true,

    // this will make sure it's always on top
    stack  : ".piece",

    start  : function(event,ui){
       $(this).draggable('option','revert',true);
     }
  });// end $(".pieces").draggable


  /******************************************************************************************
                               Configure the tiles by JQuery UI
  *******************************************************************************************/

  $(".tile").droppable({

    // always gets hovered above
    hoverClass:'hovered',

    // default accepts all kinds of pieces
    accept : '.piece',

    drop: function(e, ui ) {

      // this adjusts the position of the draggable right at the center of the drop zone
      ui.draggable.position({ of: $(this), my: 'bottom', at: 'bottom' });

      // makes the piece stop going back to the rack
      ui.draggable.draggable('option','revert',false);

      // only accepts the target id when it's dropped
      $(this).droppable('option','accept',"#" + ui.draggable.attr('id'));

      // store the letter into the array
      letters_on_board[$(this).attr('row')][$(this).attr('column')] = ui.draggable.attr('letter');
    },


    /******************************************************************************************
               Because of the design of JQuery, this out function runs whenever an
               acceptable draggable moves out of the tile, Proceed with care.
    *******************************************************************************************/

    out: function (e, ui){
      if ($(this).droppable('option','accept') != ".piece"){

        // accepts all pieces when accepted piece moves out
        $(this).droppable('option','accept',".piece");

        // clear the array element
        letters_on_board[$(this).attr('row')][$(this).attr('column')] = undefined;
      }
    }
  }); // end  $(".tile").droppable({


      /******************************************************************************************
                                   Configure the rack by JQuery UI
      *******************************************************************************************/

  $("#rack").droppable({
    drop: function(e,ui){
      // makes the piece stop going back to the tile
      ui.draggable.draggable('option','revert',false);
    }
  }) // end $("rack").droppable({
}); // end $(document).ready(function() {
