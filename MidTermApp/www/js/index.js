// JavaScript Document
var pages = [],
	links = [];
var numLinks = 0;
var numPages = 0;
var pageTime = 800; //same as CSS transition
var preTabUrl;

//create the pageShow type event.
var pageshow = document.createEvent("CustomEvent");
pageshow.initEvent("pageShow", false, true);

document.addEventListener("DOMContentLoaded", function () { //deviceready,DOMContentLoaded
	//device ready listener
	document.addEventListener("scroll", handleScrolling, false);

	pages = document.querySelectorAll('[data-role="page"]');
	numPages = pages.length;
	links = document.querySelectorAll('[data-role="pagelink"]');
	numLinks = links.length;
	for (var i = 0; i < numLinks; i++) {
		links[i].addEventListener("click", handleNav, false);
	}
	//add the listener for pageshow to each page
	for (var p = 0; p < numPages; p++) {
		pages[p].addEventListener("pageShow", handlePageShow, false);
	}
	loadPage(null);
	
	//for default selection
//	preTabUrl="home";
//	selecteTab("home");
	
	var svgEmbed = document.querySelector("#homeSVG");
	svgEmbed.addEventListener("load", function(){
		preTabUrl="home";
		selecteTab("home");
	});
	
});

function handleNav(ev) {
	ev.preventDefault();
	var href = ev.target.href;
	console.log(href);
	var parts = href.split("#");
	loadPage(parts[1]);
	return false;
}

function handlePageShow(ev) {
	ev.target.className = "active";
}

function loadPage(url) {
	if (url == null) {
		//home page first call
		pages[0].className = 'active';
		history.replaceState(null, null, "#home");		
		
	} else {
		for (var i = 0; i < numPages; i++) {
			pages[i].className = "hidden";
			//get rid of all the hidden classes
			//but make them display block to enable anim.
			if (pages[i].id == url) {
				pages[i].className = "show";
				//add active to the proper page
				history.pushState(null, null, "#" + url);
				setTimeout(addDispatch, 50, i);
			}
		}
		//set the activetab class on the nav menu
		for (var t = 0; t < numLinks; t++) {
			links[t].className = "";
			if (links[t].href == location.href) {
				links[t].className = "activetab";
			}
		}
		
		//If same tab clicked, do nothing
		if(preTabUrl != url)
		{
			//Change selection
			selecteTab(url);
			preTabUrl=url;
		}
	}
}

function addDispatch(num) {
	pages[num].dispatchEvent(pageshow);
	//num is the value i from the setTimeout call
	//using the value here is creating a closure
}


//For footer
function handleScrolling(ev) {
	var height = window.innerHeight;
	var offset = window.pageYOffset;
	var footHeight = 60;
	var footer = document.querySelector("#sticky");
	footer.style.position = "absolute";
	var total = height + offset - footHeight;
	footer.style.top = total + "px";
}

//For tab change selection
function selecteTab(tabName) {
	if (tabName == "home") {
		//Home tab
		var a = document.getElementById("homeSVG");
		var b = a.contentDocument;
		var contact = b.querySelector("#Capa_home");
		contact.setAttribute("fill", "#009FD4"); //009FD4,3498db

		//Location Tab
		var a1 = document.getElementById("locationSVG");
		var b1 = a1.contentDocument;
		var contact1 = b1.querySelector("#Capa_location");
		contact1.setAttribute("fill", "black");

		//ContactTab
		var a2 = document.getElementById("contactsSVG");
		var b2 = a2.contentDocument;
		var contact2 = b2.querySelector("#Capa_contact");
		contact2.setAttribute("fill", "black");

	} else if (tabName == "location") {
		
		//Home tab
		var a = document.getElementById("homeSVG");
		var b = a.contentDocument;
		var contact = b.querySelector("#Capa_home");
		contact.setAttribute("fill", "black");

		//Location Tab
		var a1 = document.getElementById("locationSVG");
		var b1 = a1.contentDocument;
		var contact1 = b1.querySelector("#Capa_location");
		contact1.setAttribute("fill", "#009FD4");

		//ContactTab
		var a2 = document.getElementById("contactsSVG");
		var b2 = a2.contentDocument;
		var contact2 = b2.querySelector("#Capa_contact");
		contact2.setAttribute("fill", "black");
		
		//Get location
		getLocation();
		
	} else if (tabName == "contacts") {
		
		//Home tab
		var a = document.getElementById("homeSVG");
		var b = a.contentDocument;
		var contact = b.querySelector("#Capa_home");
		contact.setAttribute("fill", "black");

		//Location Tab
		var a1 = document.getElementById("locationSVG");
		var b1 = a1.contentDocument;
		var contact1 = b1.querySelector("#Capa_location");
		contact1.setAttribute("fill", "black");

		//ContactTab
		var a2 = document.getElementById("contactsSVG");
		var b2 = a2.contentDocument;
		var contact2 = b2.querySelector("#Capa_contact");
		contact2.setAttribute("fill", "#009FD4");
		
		//Get contacts
		getContacts();
	}
}

//handle 300ms delay
function touchHandler(ev){
  //this function will run when the touch events happen
  if( ev.type == "touchend"){
    ev.preventDefault();
    var touch = evt.changedTouches[0];        //this is the first object touched
    
    var newEvt = document.createEvent("MouseEvent");	//old method works across browsers, though it is deprecated.
    /**
    event.initMouseEvent(type, canBubble, cancelable, view,
                     detail, screenX, screenY, clientX, clientY,
                     ctrlKey, altKey, shiftKey, metaKey,
                     button, relatedTarget); **/
    newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
    //var newEvt = new MouseEvent("click");				//new method
    //REF: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.MouseEvent
    ev.currentTarget.dispatchEvent(newEvt);
    //change the touchend event into a click event and dispatch it immediately
    //this will skip the built-in 300ms delay before the click is fired by the browser
  }
}