function getContacts() {

	var options = new ContactFindOptions();
	//	options.filter = "";
	//	var fields = ["displayName", "name"];
	options.multiple = true;
	var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name,navigator.contacts.fieldType.phoneNumber];
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

	app.addContactListElement(contacts);
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