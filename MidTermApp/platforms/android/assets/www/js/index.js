var app = {
	init: function () {

		document.querySelector("[data-role=modal]").style.display = "none";
		document.querySelector("[data-role=overlay]").style.display = "none";
		document.getElementById("btnOk").addEventListener("click", app.Ok);
		getContacts();

	},
	Ok: function (ev) {
		document.querySelector("[data-role=modal]").style.display = "none";
		document.querySelector("[data-role=overlay]").style.display = "none";
	},
	edit: function (ev) {

		//alert(ev.innerHTML);
		//		ev.stopPropagation();
		//    var item = ev.target.getAttribute("data-ref");
		//    var itemVal = ev.target.innerHTML;
		//    document.getElementById("list").value = item;
		//	  alert(item);
		//	  alert(itemVal);

		document.querySelector("[data-role=modal]").style.display = "block";
		document.querySelector("[data-role=overlay]").style.display = "block";
		document.querySelector(".contactName").innerHTML = ev.innerHTML;

		/**************
    Or the really long labourious difficult confusing annoying wasting time way....
    for(var i=0; i< document.querySelectorAll("#list option").length; i++){
      if(document.querySelectorAll("#list option")[i].value == item){
        document.querySelectorAll("#list option")[i].setAttribute("selected", "selected");
      }else{
        document.querySelectorAll("#list option")[i].removeAttribute("selected");
      }
    }
    ****************/

		document.querySelector("[data-role=modal] h3").innerHTML = "Editing " + itemVal;
	},
	addContactListElement: function (contacts) {
		document.querySelector("#MyContacts").innerHTML = "";
		for (var i = 0; i < contacts.length; i++) {

			if (contacts[i].displayName) {
				var li = document.createElement("li");
				li.innerHTML = contacts[i].displayName;
				li.setAttribute("data-ref", i);
				document.querySelector('#MyContacts').appendChild(li);

				app.addHammerGestures(li);
			}
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

			if (ev.type == "singletap") {
				app.edit(ev.target);
				//					alert(ev.type);
				//					li.addEventListener("click", app.edit);

			} else if (ev.type == "doubletap") {

				alert(ev.target.innerHTML);
			}
		});
	}
}

//document.addEventListener("DOMContentLoaded", app.init);
document.addEventListener("deviceready", app.init);