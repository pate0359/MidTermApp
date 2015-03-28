

var warpper;
function getlocation() 
{
    warpper = document.createElement("div");
    warpper.id = "warpper";
    document.body.appendChild(warpper);
   
    if (navigator.geolocation) {
        //code goes here to find position
        var params = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(reportPosition, gpsError, params);
//        alert("Hi");  



    } else {
        //what if browser does not support geolocation api
        var div = document.createElement("div");
        div.setAttribute("id", "Error");
        div.querySelector("Error").innerHTML = "Browser does not support location based service"
        warpper.appendChild(div);

    }
}

function reportPosition(position) {
    //create output div for logitude and latitude
   alert("report");
//    var output1 = document.createElement("div");
//    output1.id = "output";
//    warpper.appendChild(output1);
//    var output = document.querySelector("#output");
//    output.innerHTML += "Latitude: " + position.coords.latitude + "&deg;<br/>" + "Longitude: " + position.coords.longitude + "&deg;<br/>";

    //create variable for latitude and longitude    
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    drawimage(lat, lon);
}

function drawimage(lat, lon) {


        //create canvas element
        var createcanvas = document.createElement("canvas");
        createcanvas.id = "myCanvas";
        createcanvas.width = "400";
        createcanvas.height = "400";
        warpper.appendChild(createcanvas);


        //append image tag to canvas
        var canvas = document.querySelector("#myCanvas");
        var context = canvas.getContext('2d');
        var img = document.createElement("img");

        img.onload = function () {
            context.drawImage(img, 0, 0);

        };

        img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lon + '&zoom=10&markers=' + lat + ',' + lon + '&size=400x400&sensor=TRUE_OR_FALSE;'






    }
    //what  if gps shows error


function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}