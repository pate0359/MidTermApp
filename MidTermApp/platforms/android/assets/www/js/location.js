var errorDiv;
function getLocation() {

	//if browser does not support geolocation API
	if (!navigator.geolocation) {
		//Error message pop up
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "Sorry, but your browser does not support location based awesomeness.";
		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs

		return;
	}

	//got the location
	function success(position) {
		//alert("sucess");
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		document.querySelector("#locating").innerHTML = "";

		//Draw Image
		canvas = document.querySelector(".canvas");
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("class", "canvas");			
			canvas.width="400";
			canvas.height="400";
			document.querySelector('.mapDiv').appendChild(canvas);
		}
		var ctx = canvas.getContext('2d');
		var img = new Image();
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};

		img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=10&size=400x400&sensor=false&markers=color:orange%7Clabel:N%7C" + latitude + "," + longitude + "";

	};

	//Error while getting location
	function error(err) {
		//alert('ERROR(' + err.code + '): ' + err.message);
		document.querySelector("#locating").innerHTML = "";
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "Unable to retrieve your location. Error code : "+err.code;

		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs

	};
	var params = {
			enableHighAccuracy: true,
			timeout: 5000,
			}
		//get current position
	navigator.geolocation.getCurrentPosition(success, error, params);
}