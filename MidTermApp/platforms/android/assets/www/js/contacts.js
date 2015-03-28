function getContacts() {

	var options = new ContactFindOptions();
	//	options.filter = "";
	//	var fields = ["displayName", "name"];
	options.multiple = true;
	var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
	//	alert(contacts);
	document.querySelector("#contactLoading").innerHTML = "";
	if (contacts.length == 0) {
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "No contacts available.";

		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs
	}

	document.querySelector("#MyContacts").innerHTML = "";
	for (var i = 0; i < contacts.length; i++) {

		if (contacts[i].displayName) {
			var li = document.createElement("li");
			li.innerHTML = contacts[i].displayName;
			li.setAttribute("data-ref", i);
			document.querySelector('#MyContacts').appendChild(li);

			addTapGestures(li);
		}
	}
}

// Hammer
function addTapGestures(element) {
	// Add Hammer double tap event
	var mc = new Hammer.Manager(element);
	// Tap recognizer with minimal 2 taps
	mc.add(new Hammer.Tap({
		event: 'doubletap',
		taps: 2
	}));
	// Single tap recognizer
	mc.add(new Hammer.Tap({
		event: 'singletap'
	}));
	// we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
	mc.get('doubletap').recognizeWith('singletap');
	// we only want to trigger a tap, when we don't have detected a doubletap
	mc.get('singletap').requireFailure('doubletap');

	mc.on("singletap doubletap", function (ev) {

		if (ev.type == "singletap") {
			app.edit(ev.target);
			//					alert(ev.type);
			//					li.addEventListener("click", app.edit);

		} else if (ev.type == "doubletap") {

			alert(ev.target.innerHTML);
		}
	});
}

// onError: Failed to get the contacts
function onError(contactError) {
	alert('Error while fetching contact!');

	document.querySelector("#contactLoading").innerHTML = "";

	errorDiv = document.querySelector("#err_dialog");
	if (!errorDiv) {
		errorDiv = document.createElement("div");
		errorDiv.setAttribute("id", "err_dialog");
		document.body.appendChild(errorDiv);
	}
	errorDiv.style.display = 'block';
	errorDiv.innerHTML = "Error while fetching contacts.";

	//set timeout for error msg
	setTimeout(function () {
		errorDiv.style.display = 'none';
	}, 3000); //3secs
}