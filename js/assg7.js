/* 
    Name    : js/assg7.js
    Author  : Yuet Long Leung
    Email   : YuetLong_Leung@student.uml.edu
    Date    : Nov 5, 2015
    Copyright (c) 2015 by Yuet Long Leung.  All rights reserved.

    This document validates the form in assg7.html, using JQuery, and generates table using JavaScript.

 */

$(document).ready(function() {
    
    /*
     * Since bootstrap and JQuery has their own form validation scheme,
     * their syntax highlighting are not quite compatiable,
     * but Bootstrap visual cues look super-nice! So ...
     * I used source 1's class alteration and code injection script,
     * with source 2's glyphicon span.
     * 
     * Source 1 : http://stackoverflow.com/questions/18754020/bootstrap-3-with-jquery-validation-plugin
     * Source 2 : http://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_form_horizontal_all&stacked=h
     */
    
    jQuery.validator.setDefaults({
            highlight: function (element, errorClass, validClass) {
                    // highlight the entire form group, with red
                    $(element).closest('.form-group').removeClass('has-success has-feedback').addClass('has-error has-feedback');
                    
                    //remove the previous glyph
                    $(element).closest('.form-group').find('span').remove();
                    
                    //add the new one
                    $(element).closest('.form-group').append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
                
            },
            unhighlight: function (element, errorClass, validClass) {
                    // highlight the entire form group, with green
                    $(element).closest('.form-group').removeClass('has-error has-feedback').addClass('has-success has-feedback');
                    
                    //remove the previous glyph
                    $(element).closest('.form-group').find('span').remove();
                    
                    //add the new one
                    $(element).closest('.form-group').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
                
            }
        });
    $('#frm').validate( {
        rules : {
          xBegin : {
            required: true,
            number: true,
            max : 10,
            min : -10
          } ,
          xEnd : {
            required: true,
            number: true,
            max : 10,
            min : -10
          } ,
          yBegin : {
            required: true,
            number: true,
            max : 10,
            min : -10
          } ,
          yEnd : {
            required: true,
            number: true,
            max : 10,
            min : -10
          }
        },
        
        messages : {
            xBegin : {
                required: "It can't be empty. Insert a number.",
                number: "Only digits are allowed. Delete all letters and symbols.",
                max: "Too big. Lower it to 10 or below.",
                min: "Too small. Raise it to -10 or above."
            } ,
            xEnd : {
                required: "It can't be empty. Insert a number.",
                number: "Only digits are allowed. Delete all letters and symbols.",
                max: "Too big. Lower it to 10 or below.",
                min: "Too small. Raise it to -10 or above."
            } ,
            yBegin : {
                required: "It can't be empty. Insert a number.",
                number: "Only digits are allowed. Delete all letters and symbols.",
                max: "Too big. Lower it to 10 or below.",
                min: "Too small. Raise it to -10 or above."
            } ,
            yEnd : {
                required: "It can't be empty. Insert a number.",
                number: "Only digits are allowed. Delete all letters and symbols.",
                max: "Too big. Lower it to 10 or below.",
                min: "Too small. Raise it to -10 or above."
            }
        },
        
        submitHandler: function(form) {
                        builtATable();
	}
    }); // end $('#frm').validate
    
}); // end $(document).ready(function() 

/* This is the funtion to call when the contents in forms are safe to parse and ready to generate table. */
function builtATable(){
    
    var inputs = document.getElementById("frm").elements;
    var rmin = parseInt(inputs[0].value);
    var rmax = parseInt(inputs[1].value);
    var cmin = parseInt(inputs[2].value);
    var cmax = parseInt(inputs[3].value);
    
    var str = "<tr><td></td>"; /* first block has no use, will take it out of sight using CSS */
    
    /* row multiplicands */
    for (i = cmin; i <= cmax; i++){
        str += "<td>" + i + "</td>";
    }
    
    /* end tag */
    str += "</tr>";
    
    
    for (i = rmin; i <= rmax; i++){
        /* column multipliers */
        str += "<tr><td>" + i + "</td>";
        
        /* contents */
        for (j = cmin; j <= cmax; j++){
            str += "<td> " + i*j + "</td>";
        }
        
        /* end tag */
        str += "</tr>";
    }
    /* update the table (using JQuery this time)*/
    $(mytable).html(str);
}