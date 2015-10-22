/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function submitForm(){
    var inputs = document.getElementById("inputs").elements;
    
    if(inputs[0].value === "")
        return window.alert("Row min is empty.");
    
    if(inputs[1].value === "")
        return window.alert("Row max is empty.");
    
    if(inputs[2].value === "")
        return window.alert("Column min is empty.");
    
    if(inputs[3].value === "")
        return window.alert("Column max is empty.");
    
    var rmin = parseInt(inputs[0].value);
    var rmax = parseInt(inputs[1].value);
    var cmin = parseInt(inputs[2].value);
    var cmax = parseInt(inputs[3].value);
    
    if(rmin >= rmax)
        return window.alert("Row min is bigger or equal to row max.");
    
    if(cmin >= cmax)
        return window.alert("Column min is bigger or equal to column max.");
    
    builtATable(rmin,rmax,cmin,cmax);
}

function builtATable(rmin, rmax, cmin, cmax){
    var str = "<tr><td></td>";
    for (i = cmin; i <= cmax; i++){
        str += "<td>" + i + "</td>";
    }
    str += "</tr>";
    for (i = rmin; i <= rmax; i++){
        str += "<tr><td>" + i + "</td>";
        for (j = cmin; j <= cmax; j++){
            str += "<td> " + (i*j) + "</td>";
        }
        str += "</tr>";
    }
    
    document.getElementById("mytable").innerHTML = str;
    //document.getElementById("inputs").reset();
}