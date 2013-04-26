/*

 <!--James Jackson-->
 <!--MIU 1304-->
 <!--Project 3-->

*/
// Wait until the DOM has loaded
window.addEventListener("DOMContentLoaded", function () {




// getting element by ID
function main(i) {
	var theElement = document.getElementById(i);
	return theElement;
}

// create select field element and populate it with options on the fly
function makeCats() {
	var formTag = document.getElementsByTagName("form");
		makeSelect = document.createElement("select");
	var	selectLi = main("select");
		makeSelect.setAttribute("id", "groups");
	for (var i = 0; i < printArtists.length; i++) {
		var makeOption = document.createElement("option");
		var optText = printArtists[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}			
	selectLi.appendChild(makeSelect);
}

// find value of selected radio button
function getSelectedRadio() {
	var radios = document.forms[0].school;
	for (var i=0; i < radios.length; i++){
		if (radios[i].checked) {
			schoolValue = radios[i].value;
		}
	}
}

// turn links on and off
function toggleControls(n) {
	switch(n) {
		case "on":
			main("printForm").style.display = "none";
			main("clear").style.display = "inline";
			main("displayLink").style.display = "none";
			main("addNew").style.display = "inline";
			break;
		case "off":
			main("printForm").style.display = "block";
			main("clear").style.display = "inline";
			main("displayLink").style.display = "inline";
			main("addNew").style.display = "none";
			main("items").style.display = "none";
			break;
		default:
			return false;
	}
}
/*    function retrieveToggle(){
        if(main('recordComplete').checked) {
            recordComplete = 'Yes';
        }else{
            recordComplete = 'No'
        }
    }


    function retrieveCheckbox(){
        if(main('personalCollection').checked) {
            personalCollection  = 'Yes';
        }else{
            personalCollection  = 'No'
        }
    }
*/

// function for storing input data from form
function storeData(key) {
	if(!key) {
		var id = Math.floor(Math.random() * 19761001);
	} else {
		id = key;
	}
	getSelectedRadio();

	var item             = {};
		item.group       = ["Group:", main("groups").value];
		item.printName    = ["Print Name:", main("printName").value];
		item.approxDateOfPrint    = ["Approximate Date of Print:", main("approxDateOfPrint").value];
		item.school     = ["School:", schoolValue];
		item.value        = ["Value:", main("value").value];
		item.datePrinted   = ["Date Printed:", main("datePrinted").value];
		item.dateAdded     = ["Date Acquired:", main("dateAdded").value];

		item.additionalComments = ["Comments:", main("additionalComments").value];
	localStorage.setItem(id, JSON.stringify(item));
	alert("Print saved");
}

function getData() {
	toggleControls("on");
	if (localStorage.length === 0) {
		alert("There were nor records, so I automagically added some!.");
		autoFillData();
	}
	// local storage to the browser
	var makeDiv  = document.createElement("div");
	makeDiv.setAttribute("data-role","page");
	makeDiv.setAttribute("id","items");
	// element.setAttribute("data-role","page");
	// 	element.setAttribute("data-add-back-btn","true");	   
	var makeList = document.createElement("ul"); 
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	main("items").style.display = "block";
	for (var i = 0; i < localStorage.length; i++) {
		var makeli      = document.createElement("li");
		var linksLi     = document.createElement("li");
		makeList.appendChild(makeli);
		var key         = localStorage.key(i);
		var value       = localStorage.getItem(key);
		var obj         = JSON.parse(value);
		var makeSublist = document.createElement("ul");
		makeli.appendChild(makeSublist);
		getImage(obj.group[1], makeSublist);
		for (var n in obj) {
			var makeSubli       = document.createElement("li");
			makeSublist.appendChild(makeSubli);
			var optSubText      = obj[n][0] + " " + obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSublist.appendChild(linksLi);
		}	
	    makeItemLinks(localStorage.key(i), linksLi);
	}
}

function getImage(imgName, makeSublist) {
	var imageLi = document.createElement("li");
	makeSublist.appendChild(imageLi);
	var newImg = document.createElement("img");
	var setSrc = newImg.setAttribute("src", "Images/" + imgName + ".png");
	imageLi.appendChild(newImg);
}



function makeItemLinks(key, linksLi) {
	var editLink       = document.createElement("a");
    editLink.href      = "#";
	editLink.key       = key;
	var editText       = "Edit Record";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	var breakTag = document.createElement("br");
	linksLi.appendChild(breakTag);
		
	var deleteLink       = document.createElement("a");
	deleteLink.href      = "#";
	deleteLink.key       = key;
	var deleteText       = "Delete Record";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}


function editItem() {
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	toggleControls("off"); // show the form
	
	main("groups").value   = item.group[1];
	main("printName").value = item.printName[1];
    main("approxDateOfPrint").value = item.approxDateOfPrint[1];


	
	
	var radios = document.forms[0].school;
	for (i = 0; i < radios.length; i++){
		if (radios[i].value == "Kaigetsudo" && item.school[1] == "Kaigetsudo") {
			radios[i].setAttribute("checked", "checked");
		} 
		if (radios[i].value == "Torii" && item.school[1] == "Torii") {
			radios[i].setAttribute("checked", "checked");
		}
		if (radios[i].value == "Katsukawa" && item.school[1] == "Katsukawa") {
			radios[i].setAttribute("checked", "checked");
		}
		if (radios[i].value == "Utagawa" && item.school[1] == "Utagawa") {
			radios[i].setAttribute("checked", "checked");
		}
		if (radios[i].value == "Sosaku" && item.school[1] == "Sosaku") {
			radios[i].setAttribute("checked", "checked");
		}
	 }
	 main("value").value        = item.value[1];
	 main("datePrinted").value   = item.datePrinted[1];
	 main("dateAdded").value     = item.dateAdded[1];
	 main("additionalComments").value = item.additionalComments[1];
	 
	 save.removeEventListener("click", storeData);
	 // change Submit button value to say edit 
	 main("submit").value = "Edit Record";
	 var editSubmit    = main("submit");
	 // save the key value established in this function as a property
	 editSubmit.addEventListener("click", validate);
	 editSubmit.key    = this.key;
}

function deleteItem () {
	var ask = confirm("Are you sure you want to delete this record?");
	if (ask) {
		localStorage.removeItem(this.key);
		alert("Print was deleted.");
		window.local.reload();
	} else {
		alert("Print was not deleted.");
	}
}


function clearLocal() {
	if(localStorage.length === 0) {
		alert("There are no records to clear.")
	} else {
		localStorage.clear();
		alert("All records are deleted.");
		window.location.reload();
		return false;	
	}
}

function validate(e) {
	var getGroup     = main("groups");
	var getprintName  = main("printName");
    var getapproxDateOfPrint  = main("approxDateOfPrint");
    var getschool   = main("school");
	var getvalue      = main("value");
	var getdatePrinted = main("datePrinted");

	var getdateAdded   = main("dateAdded");


	var messageAry = [];
	if (getGroup.value === "--Choose One--") {
		var groupError = "Please select an Artist.";
		getGroup.style.border = "1px solid red";
		messageAry.push(groupError);
	}
	
	if (getprintName.value === "") {
		var printNameError = "Please Enter A Print Name";
		getprintName.style.border = "1px solid red";
		messageAry.push(printNameError);
	}

    if (getapproxDateOfPrint.value === "") {
        var approxDateOfPrintError = "Please Pick A Date";
        getapproxDateOfPrint.style.border = "1px solid red";
        messageAry.push(approxDateOfPrintError);
    }

    if (getschool.value === "") {
        var schoolError = "Please Pick A Date";
        getschool.style.border = "1px solid red";
        messageAry.push(schoolError);
    }

	if (getdatePrinted.value === "") {
		var datePrintedError = "Please A Date";
		getdatePrinted.style.border = "1px solid red";
		messageAry.push(datePrintedError);
	}

	if (getdateAdded.value === "") {
		var dateAddedError = "Please Enter A Date";
		getdateAdded.style.border = "1px solid red";
		messageAry.push(dateAddedError);
	}
	
	if(messageAry.length >= 1) {
		for(i = 0; i < messageAry.length; i++) {
			var txt = document.createElement("li");
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
	} else {
		storeData(this.key);
	}
}


// variable for drop down
    var printArtists = ["*Select Artist*", "Hokusai", "Kuniyoshi", "Yoshitoshi"],
	schoolValue,
	errMsg    = main("errors");
makeCats();

// events
var displayLink = main("displayLink");
displayLink.addEventListener("click", getData);
var clearLink = main("clear");
clearLink.addEventListener("click", clearLocal);
var save = main("submit");
save.addEventListener("click", validate);



});




















