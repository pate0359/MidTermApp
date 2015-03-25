function getContacts() {
	
//	document.querySelector("#contactLoading").innerHTML = "";
	
//	alert("contact");
	var options = new ContactFindOptions();
//	options.filter = "";
//	var fields = ["displayName", "name"];
	options.multiple = true;
	var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
//	alert(contacts.length);
	
	document.querySelector("#contactLoading").innerHTML = "";
	
	if(contacts.length==0)
	{
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
	
	document.querySelector("#MyContacts").innerHTML="";
	for (var i = 0; i < contacts.length; i++) {
		
		if(contacts[i].displayName)
		{
			var li = document.createElement("li");
			li.innerHTML=contacts[i].displayName;
			document.querySelector("#MyContacts").appendChild(li);
		}
	}
}

// onError: Failed to get the contacts
function onError(contactError) {
	//alert('Error while fetching contact!');
	
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