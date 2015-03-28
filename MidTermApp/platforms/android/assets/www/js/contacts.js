var contactJS = {
	getContacts: function () {
		var options = new ContactFindOptions();
		//	options.filter = "";
		//	var fields = ["displayName", "name"];
		options.multiple = true;
		var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumber];
		navigator.contacts.find(fields, contactJS.onSuccess, contactJS.onError, options);
	},
	onSuccess: function (contacts) {
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

		var array=[];
		//Add to local storage
		for (var i = 0; i < contacts.length; i++) {
			var name = contacts[i].displayName;
			var number = contacts[i].phoneNumbers;
			var contact = {
				'id': i,
				'name': name,
				'phonenumber': number,
				'latitude': 0,
				'lognitude': 0
			};

			array.push(contact);
		}
		// add contact to local storage
		localStorage.setItem('contactListPate0359', JSON.stringify(array));
		
		//Get contacts from storage
		var jsonObject = localStorage.getItem('contactListPate0359');	
		contactList=JSON.parse(jsonObject);
		app.addContactListElement(contactList);
	},
	onError: function (contactError) {
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
}