/* 
    Name    : js/assg6.js
    Author  : Yuet Long Leung
    Email   : YuetLong_Leung@student.uml.edu
    Date    : Nov 5, 2015
    Copyright (c) 2015 by Yuet Long Leung.  All rights reserved.
 */

function submitForm(){
    var inputs = document.getElementById("inputs").elements;
    var error_message = "";
    lb = ["Row min", "Row max", "Column min", "Column max"];
    
    for (i = 0; i < 4; i++){
        if(inputs[i].value === ""){
            error_message += "<p>" + lb[i] + " is empty.</p>";
        }
        else if(/[A-Za-z]/.test(inputs[i].value)){
            error_message += "<p>" + lb[i] + " contains letters.</p>";
        }
        else if(/\s/.test(inputs[i].value)){
            error_message += "<p>" + lb[i] + " contains whitespace.</p>";
        }
    }
    
    /* now we know the string value is safe to parse to Integers */
    var rmin = parseInt(inputs[0].value);
    var rmax = parseInt(inputs[1].value);
    var cmin = parseInt(inputs[2].value);
    var cmax = parseInt(inputs[3].value);
    
    if(rmin >= rmax)
        error_message += "<p>Row min is bigger or equal to row max.</p>";
        
    if(cmin >= cmax)
        error_message += "<p>Column min is bigger or equal to column max.</p>";
    
    /* we either output error messages or the table */
    if (error_message !== ""){
        document.getElementById("error_message").innerHTML = error_message;
        document.getElementById("mytable").innerHTML = "";
        return;
    }
    else{
        document.getElementById("error_message").innerHTML = "";
        builtATable(rmin, rmax, cmin, cmax);
    }
}

function builtATable(rmin, rmax, cmin, cmax){
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
            str += "<td> " + (i*j) + "</td>";
        }
        
        /* end tag */
        str += "</tr>";
    }
    
    /* update the table */
    document.getElementById("mytable").innerHTML = str;
}