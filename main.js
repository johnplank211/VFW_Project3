/*John Plank
VFW Project 2
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
		   		$("contactForm").style.display = "blcok";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
		   		break;
		   	  default:
		   	  	return false;
		}
	}

	var storeData = function () {
		var id    			= Math.floor(Math.random()* 1000001);
		getRadio();
		var item 			= {};
		    item.Apocalypse = ["Apocalypse:", apocalypseValue];
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
			 }
		}
	};

	var clearLocal = function () {
		if (localStorage.length === 0) {
			alert("All clear.")
			}else{
				localStorage.clear();
				window.location.reload();
				return false;
		}
	};

		var apocalypseValue;

	var displayLink = $("displayLink");
		displayLink.addEventListener("click", getData);
	 	var clearLink = $("clear");
		clearLink.addEventListener("click", clearLocal);
		var save = $("submit");
		save.addEventListener("click", storeData);

		makeCats();

});
