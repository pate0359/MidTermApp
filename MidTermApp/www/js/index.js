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

			  document.querySelector("[data-role=modal]").style.display="block";
		    document.querySelector("[data-role=overlay]").style.display="block";
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
	}
}

//document.addEventListener("DOMContentLoaded", app.init);
document.addEventListener("deviceready", app.init);