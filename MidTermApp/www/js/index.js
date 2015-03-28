var contactList;
var app = {
	init: function () {

		document.querySelector("[data-role=modal]").style.display = "none";
		document.querySelector("[data-role=overlay]").style.display = "none";
		document.getElementById("btnOk").addEventListener("click", app.Ok);

		var jsonObject = localStorage.getItem('contactListPate0359');
		contactList = JSON.parse(jsonObject);

		if (!contactList) {
			contactJS.getContacts();
		} else {
//			console.log(contactList);
			document.querySelector("#contactLoading").innerHTML = "";
			app.addContactListElement(contactList);
		}
	},
	Ok: function (ev) {
		document.querySelector("[data-role=modal]").style.display = "none";
		document.querySelector("[data-role=overlay]").style.display = "none";
	},
	edit: function (contact) {

		document.querySelector("[data-role=modal]").style.display = "block";
		document.querySelector("[data-role=overlay]").style.display = "block";
		document.querySelector(".contactName").innerHTML = contact.name;
		
		document.querySelector("#phonenumbers").innerHTML="";
		console.log(contact);
		for(var i=0;i<contact.phonenumber.length;i++)
		{
			console.log(contact.phonenumber[i].type);
			console.log(contact.phonenumber[i].value);
			var li = document.createElement("li");
			li.innerHTML = contact.phonenumber[i].type + " : " + contact.phonenumber[i].value;
			document.querySelector("#phonenumbers").appendChild(li);
		}
	},
	addContactListElement: function (contacts) {
		document.querySelector("#MyContacts").innerHTML = "";

		for (var i = 0; i < contacts.length; i++) 
		{
			var li = document.createElement("li");
			li.innerHTML = contacts[i].name;
			li.setAttribute("id", contacts[i].id);
			app.addHammerGestures(li);
			document.querySelector('#MyContacts').appendChild(li);
		}
	},
	addHammerGestures: function (element) {
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

			if (ev.type == "singletap") 
			{
				app.edit(contactList[ev.target.id]);
				
			} else if (ev.type == "doubletap") {

				alert(ev.target.innerHTML);
			}
		});
	}
}

//document.addEventListener("DOMContentLoaded", app.init);
document.addEventListener("deviceready", app.init);