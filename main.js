/*John Plank
VFW Project 3
term 06
Apocalypse Checklist*/

window.addEventListener("DOMContentLoaded", function(){
		var $ = function(x) {
	    var theElement = document.getElementById(x);
		return theElement;
	};

	var makeCats = function () {
		var formTags = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "groups");
		for (var i = 0, j = fearGroups.length; i<j; i++) {
			var makeOption = document.createElement('option');
			var optText = fearGroups[i];
			makeOption.setAttribute('value', fearGroups[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
	}
		selectLi.appendChild(makeSelect);
	};

	var fearGroups = ["--Fear level--", "In denial still", "Oops I crapped my pants", "Psalm 144:1"];
	
	var getRadio = function () {
		var radio = document.forms[0].apocalypse;
		for (var i = 0; i < radio.length; i++) {
			if (radio[i].checked) {
				apocalypseValue = radio[i].value;
			}

		}
	};

	var toggleControls = function (n) {
		switch(n) {
			case "on":
				$("contactForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
		   case "off":		
		   		$("contactForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
		   		break;
		   	  default:
		   	  	return false;
		}
	}

	var storeData = function (key) {
		if (!key) {
			var id    		= Math.floor(Math.random()* 1000001);

		} else {
			id = key;
		}
		getRadio();
		var item 			= {};
		    item.apocalypse = ["Apocalypse:", apocalypseValue];
			item.fear       = ["Fear level:", $("groups").value];
			item.firearm	= ["Firearm:", $("firearm").value];
			item.ammo		= ["Ammo:", $("ammo").value];
			item.melee 		= ["Melee weapon:", $("meleeWeapon").value];
			item.canned		= ["Canned:", $("cannedFood").value];
			item.water		= ["Water:", $("water").value];
			item.chain		= ["Chain mesh suit:", $("chainMeshSuit").value];
			item.map 		= ["Topographical Map:", $("topographicalMap").value];
			item.leatherman = ["Leatherman:", $("leatherman").value];
			item.rucksack	= ["Rucksack:", $("rucksack").value];
			item.boots		= ["Boots:", $("boots").value];
			item.matches	= ["Matches:", $("matches").value];
			item.p38		= ["P38:", $("p38").value];
			item.intestinal = ["Intestinal Fortitude:", $("intestinalFortitude").value];
			item.item		= ["Item:", $("item").value];			
			item.date       = ["World Ended:", $("date").value];
			item.email		= ["Email:", $("email").value];
			item.comments	= ["Comments:", $("comments").value];
			item.readiness  = ["Readiness:", $("readiness").value];

		localStorage.setItem(id, JSON.stringify(item));
		alert("Contact Saved!");
	};

	var getData = function () {
		toggleControls("on");
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "display";
		for (var i = 0, len = localStorage.length; i < len; i++) {
			 var makeli = document.createElement("li");
			 var linksLi = document.createElement("li");
			 makeList.appendChild(makeli);
			 var key = localStorage.key(i);
			 var value = localStorage.getItem(key);
			 var obj = JSON.parse(value);
			 var makeSubList = document.createElement("ul");
			 makeli.appendChild(makeSubList);
			 for (var t in obj) {
			 	var makeSubLi = document.createElement("li");
			 	makeSubList.appendChild(makeSubLi);
			 	var optSubText = obj[t][0]+" "+obj[t][1];
			 	makeSubLi.innerHTML = optSubText;
			 	makeSubList.appendChild(linksLi);
			 }
			makeItemLinks(localStorage.key(i),  linksLi);
		}
	};

	var makeItemLinks = function (key, linksLi) {
		var editLink = document.createElement("a");
	    editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Checklist";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Checklist";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};

	var editItem = function () {
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		toggleControls("off");

		var radio = document.forms[0].apocalypse;
		for (var i = 0; i<radio.length; i++) {
			if (radio[i].value == "Natural" && item.apocalypse[1] == "Natural") {
				radio[i].setAttribute("checked", "checked");
			} else if (radio[i].value == "Nuclear" && item.apocalypse[1] == "Nuclear") {
				radio[i].setAttribute("checked", "checked");
			} else if (radio[i].value == "Zombie" && item.apocalypse[1] == "Zombie") {
				radio[i].setAttribute("checked", "checked");
			}
		}
		$("readiness").value = item.readiness[1];
		$("date").value = item.date[1];
		$("comments").value = item.comments[1];
		$("groups").value = item.fear[1];     
		$("firearm").value = item.firearm[1];
		$("ammo").value = item.ammo[1];
		$("meleeWeapon").value = item.melee[1];
		$("cannedFood").value = item.canned[1];
		$("water").value = item.water[1];
		$("chainMeshSuit").value = item.chain[1];
		$("topographicalMap").value = item.map[1];
		$("leatherman").value = item.leatherman[1];
		$("rucksack").value = item.rucksack[1];
		$("boots").value = item.boots[1];
		$("matches").value = item.matches[1];
		$("p38").value = item.p38[1];
		$("intestinalFortitude").value = item.intestinal[1];
		$("item").value = item.item[1];
		$("email").value = item.email[1];

		save.removeEventListener("click", storeData);
		$("submit").value = "Edit Checklist";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	};

	var deleteItem =function () {
		var ask = confirm("Are you sure you want to erase this Checklist? Has a cure been found?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Thank God for the cure, your checklist has been deleted!!");
			window.location.reload();
		} else {
			alert("Checklist not erased")
		}
	}

	var clearLocal = function () {
		if (localStorage.length === 0) {
			alert("All clear.")
			}else{
				localStorage.clear();
				window.location.reload();
				return false;
		}
	};

	var validate = function (e) {
		var getEmail = $("email");
		var getComments = $("comments");
		var getDate = $("date");

		errMsg.innerHTML = ""; 
		getComments.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";

		var messagesArray = [];
		
		if (getComments.value == "" ) {
			var commentsError = "Please write a death letter.";
			getComments.style.border = "2px solid red";
			messagesArray.push(commentsError);
		}

		if (getDate.value == "" ) {
			var dateError = "Please mark when the world ended.";
			getDate.style.border = "2px solid red";
			messagesArray.push(dateError);
		}		

		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))) {
			var emailError = "Please use a valid emaill address.";
			getEmail.style.border = "2px solid red";
			messagesArray.push(emailError);
		}
	
		if(messagesArray.length >= 1) {
			for (var i = 0, j = messagesArray.length; i < j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messagesArray[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else{
			storeData(this.key);
		}
			
		
		
	};

	//makeCats();
	var apocalypseValue;
	var errMsg = $("error"); 

	var displayLink = $("displayLink");
		displayLink.addEventListener("click", getData);
	 	var clearLink = $("clear");
		clearLink.addEventListener("click", clearLocal);
		var save = $("submit");
		save.addEventListener("click", validate);

	makeCats();	

});
