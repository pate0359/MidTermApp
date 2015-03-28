var el;
function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

var retrievedObject = localStorage.getItem('testObject');
var data= JSON.parse(retrievedObject);
    
 var display=document.getElementById("model_display");
    for(var i=0;i<12;i++);
        {
    display.innerHTML=data.one;
    display.innerHTML=data.number[i].value;
    }
}

