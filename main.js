var list = JSON.parse(podaci);
var correctCities = list[0].tacno;
var listCities = document.getElementById('addedCitiesList');
var lastid = 0;
var seconds = 0;
var guessedCities = [];
var allAnswers = [];

//Load JSON
function load() {
	start();
	document.getElementById("area").innerHTML = "Oblast: " + list[0].oblast;
};

//Counting time from 0 - 100
function countTime() {
	document.getElementById("time").innerHTML = "Vreme: " + ++ value;
	if (value == list[0].vreme) {
		console.log("Kraj igre...");
		localStorage.setItem('allAnswersLs', JSON.stringify(allAnswers));
		stop();
		finishGame();
	}
};
function start () {
	stop();
	value = 0;
	seconds = setInterval(countTime, 1000);
};
var stop = function() {
	clearInterval(seconds);
};

//Find city with dropdown list
function findCity() {
    for ( var i = 0; i < list[0].ponudjene.length; i++) {
    	if (list[0].ponudjene[i].indexOf(autocomplete.value) >= 0) {
        	var newOption = document.createElement("option");
        	newOption.value = list[0].ponudjene[i];
        	document.getElementById("guessCity").appendChild(newOption);      
    	}	
    }	
};

//Function for adding cities in the list
function addCity() {
    	var choosenCity = document.getElementById('autocomplete').value;
 		if( choosenCity == "") {
			document.getElementById("messages").innerHTML = "Polje je prazno.";
		} else {
			if (correctCities.indexOf(choosenCity) > -1) {
				document.getElementById("messages").innerHTML = "Pogodili ste grad.";
				guessedCities.push(choosenCity);
			} else {
				document.getElementById("messages").innerHTML = "Niste pogodili grad.";
			}
			var entry = document.createElement('li');
 			var removeButton = document.createElement('button');
			entry.appendChild(document.createTextNode(choosenCity));
			entry.setAttribute('id','item'+lastid);
			removeButton.appendChild(document.createTextNode("x"));
			removeButton.setAttribute('onClick','removeItem("'+'item'+lastid+'")');
			entry.appendChild(removeButton);
			lastid+=1;
			listCities.appendChild(entry);
			allAnswers.push(listCities)
		}
	document.getElementById("autocomplete").value = "";
	localStorage.setItem('list', JSON.stringify(guessedCities));
    
};

//Remove item on click
function removeItem (itemid) {	
	var item = document.getElementById(itemid);
    listCities.removeChild(item);
    allAnswers.splice(0, 1);
};

//Finish game on button click
function finishGame() {
	stop();
	localStorage.setItem('allAnswersLs', JSON.stringify(allAnswers));
	window.location.href = "second.html";
}

//Showing progress on horisontal chart
function progress() {
	var allGuesses =  JSON.parse(localStorage.getItem('allAnswersLs')) || [];
	var guessedItems = JSON.parse(localStorage.getItem('list')) || [];
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext("2d");
	var count = 0;
	var showProcent = 0;
	context.fillStyle = "#696969";

	for (var i = 0, len = guessedItems.length; i < len; i++) {
		count++;
		showProcent += 25;
	}
	//Show how many answers (of 4) are corect
	if(count == 1) {
		context.fillRect(2, 10, 74, 130);
	} else if (count == 2) {
		context.fillRect(2, 10, 148, 130);
	} else if ( count == 3) {
		context.fillRect(2, 10, 222, 130);
	} else if (count == 4) {
		context.fillRect(2, 10, 296, 130);
	} else {
		context.fillRect(2, 10, 0, 130);
		document.getElementById("procents").innerHTML = showProcent + " " + " % ";
	}
	document.getElementById("procents").innerHTML = showProcent + " " + " % " + "<br/>" +
	"Tacnih odgovora: " + count + "; Netacnih odgovora: " + (allGuesses.length - count) + ";";
};
