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

var piece_value = {
  A:1,
  B:3,
  C:3,
  D:2,
  E:1,
  F:4,
  G:2,
  H:4,
  I:1,
  J:8,
  K:5,
  L:1,
  M:3,
  N:1,
  O:1,
  P:3,
  Q:10,
  R:1,
  S:1,
  T:1,
  U:1,
  V:4,
  W:4,
  X:8,
  Y:4,
  Z:10,
  b:0
};

var piece_count = {
  A:9,
  B:2,
  C:2,
  D:4,
  E:12,
  F:2,
  G:3,
  H:2,
  I:9,
  J:1,
  K:1,
  L:4,
  M:2,
  N:5,
  O:8,
  P:2,
  Q:1,
  R:6,
  S:4,
  T:6,
  U:4,
  V:2,
  W:2,
  X:1,
  Y:2,
  Z:1,
  b:2
};

/******************************************************************************************
                      de facto shuffle function from stackoverflow
*******************************************************************************************/

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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

/******************************************************************************************
    I am going to sequentially insert all the pieces into the array then shuffle it.
*******************************************************************************************/

var p_gen = new Array();
for (key in piece_count){
  for(i = 0 ; i < piece_count[key]; i++){
    p_gen.push(key);
  }
}
shuffle(p_gen);

/******************************************************************************************
      Initialize 2D array for recording what tile contains which piece.
*******************************************************************************************/

var letters_on_board = new Array(15);
for (i = 0; i < 15 ; i++){
  letters_on_board[i] = new Array(15);
  for (j = 0 ; j < 15; j++){
    letters_on_board[i][j] = "empty";
  }
}

/******************************************************************************************
      Make a function for calculating the total score.
*******************************************************************************************/


function get_score(){

  total_score = 0;

  score_on_board = new Array(15);
  for(i = 0; i < 15; i++){
    score_on_board[i] = new Array(15);
  }

  /******************************************************************************************
        Make a function for the multipling word score tiles.
  *******************************************************************************************/

  function adjacent_word_score_count(i, j){

    c = 0;

    // go up ... (and itself)
    a = i;

    while(a >= 0 && letters_on_board[a][j] != "empty")
        c += score_on_board[a--][j];

    // go down
    a = i + 1;

    while(a <= 14 && letters_on_board[a][j] != "empty")
        c += score_on_board[a++][j];

    // go left
    b = j - 1;

    while(b >= 0 && letters_on_board[i][b] != "empty")
        c += score_on_board[i][b--];

    // go right
    b = j + 1;

    while(b <= 14 && letters_on_board[i][b] != "empty")
        c += score_on_board[i][b++];

    console.log("c",c);
    return c;
  } // end function multiply_word(i, j, m){


    /******************************************************************************************
          Main loop for calculating the scores of individual tiles.
    *******************************************************************************************/

  for (i = 0; i < 15; i++){
    for (j = 0 ; j < 15 ; j++){
      if (letters_on_board[i][j] != "empty"){
        score_on_board[i][j] = piece_value[letters_on_board[i][j]];

        if      (((i == 0 || i == 7 || i == 14) && (j == 3 || j == 11))
              || ((i == 2 || i == 12)           && (j == 6 || j == 8 ))
              || ((i == 3 || i == 11)           && (j == 0 || j == 7 || j == 14))
              || ((i == 6 || i == 8 )           && (j == 2 || j == 6 || j == 8 || j == 12))
              ||  (i == 7 && j == 7)){
          score_on_board[i][j] *= 2;
        }
        else if (((i == 1 || i == 13) && (j == 5 || j == 9))
              || ((i == 5 || i == 9) &&  (j == 1 || j == 5 || j == 9 || j == 13))){
          score_on_board[i][j] *= 3;
        }
      }
      else{
        score_on_board[i][j] = 0;
      }
    }
  }

    /******************************************************************************************
        Make a function for the multipling word score tiles.
    *******************************************************************************************/

  for(i = 0; i < 15; i++){
    for(j = 0; j < 15; j++){
      if (letters_on_board[i][j] != "empty"){
        if ((i == 0 || i == 7 || i == 14) && (j == 0 || j == 7 || j == 14) && !(i == 7 && j == 7)){
          total_score += 2 * adjacent_word_score_count(i,j);
        }

        else if (((i == 1 || i == 13) && (j == 1 || j == 13))
             ||  ((i == 2 || i == 12) && (j == 2 || j == 12))
             ||  ((i == 3 || i == 11) && (j == 3 || j == 11))
             ||  ((i == 4 || i == 10) && (j == 4 || j == 10))){
          total_score += adjacent_word_score_count(i,j);
        }
        total_score += score_on_board[i][j];
      }
    }
  }

  return total_score;

} // function get_score(){

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
    new_pic.setAttribute('src','img/st/' + p_gen[i] + '.jpg');
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

      console.log(get_score());
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
        letters_on_board[$(this).attr('row')][$(this).attr('column')] = "empty";
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

    /******************************************************************************************
                                 Configure the get score button
    *******************************************************************************************/

}); // end $(document).ready(function() {
