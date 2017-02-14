console.log("Application Starting");

//***********************Begin Global Variables***********************//
//***Variables about the current word
var strTheWord
var numLettersInWord

//***The current guess
var letterChosen

//***Variables tracking guessed and missed letters
var arrLettersInWord = []
var theCurrentWordsRemainingLetters = []
var guessedLetters = []
var arrWronglyGuessedLetters = []
var arrCorrectlyGuessedLetters = []


//***Stats on the current game
var numMissedLetters = 0
var remainingGuesses = 15

//***Stats on the current session
var numWins = 0
var numLosses = 0


var guessedLettersDisplay = ""
var currentWordDisplay = ""

//***API connection information
var wordnikAPIKey = "api_key=832a8a63c3f665444c64e1e43b801485eec232b9ad910af7b";
var wordnikURL = "http://api.wordnik.com:80/v4/words.json/randomWord?";

//***Sounds to play
var buzzer = new Audio('./assets/sounds/buzzer.mp3');

//*************************End Global Variables***********************//


//***********************Begin Functions***********************//
//**************CLEAN FUNCTIONS//
//***add - will add a value to an object
//***get - returns the requested objects
//***is - returns TRUE or FALSE for the requested check
//***to - converts an object or data type to a different object or data type
//***set - updates the value of an object or variable



function getTheWord() {
	console.log("Open getTheWord")
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	myObj = JSON.parse(this.responseText);
        	strTheWord = myObj.word;
        	strTheWord = strTheWord.toLowerCase()
          	document.getElementById("startGame").disabled = false;
        	console.log("Close getTheWord: strTheWord=" + strTheWord)
       	}
	};
	var getWordFromWordnik = wordnikURL + wordnikAPIKey;
	xmlhttp.open("GET", getWordFromWordnik, true);
	xmlhttp.send();
}

function isLetterInWord(letter) {
	if (arrLettersInWord.indexOf(letter) >= 0) {
		return true;
	}
	else {
		return false;
	}
}

function addWronglyGuessedLetters(letter) {
	arrWronglyGuessedLetters = arrWronglyGuessedLetters.push(letter);
}

function addCorrectlyGuessedLetters(letter) {
	arrCorrectlyGuessedLetters = arrCorrectlyGuessedLetters.push(letter);
}

function toCharacterArrayFromString(string) {
	console.log("Enter toCharacterArrayFromString - string=" + string);
	var arrCharacters = [];
	for (var i = 0; i < string.length; i++) {
		arrCharacters.push(string.charAt(i));
	}
	console.log("Exit toCharacterArrayFromString - myCharacterArray=" + arrCharacters);
	return arrCharacters;		
}

function setLettersInWord(word) {
	console.log("Enter setLettersInWord - word=" + word);
	arrLettersInWord = toCharacterArrayFromString(word);
	console.log("Exit setLettersInWord - arrLettersInWord=" + arrLettersInWord);
}

function setRemainingLettersInWord() { //This function can be made more readable
	for (var i = 0; i <= arrCorrectlyGuessedLetters.length; i++) {
		while (arrRemainingLettersInWord.indexOf(arrCorrectlyGuessedLetters[i]) != -1) {
			arrRemainingLettersInWord.splice((arrRemainingLettersInWord.indexOf(arrCorrectlyGuessedLetters[i])),1);
		}
	}
}








//**************************Need to fix function below as it breaks check for Win call.  Should really keep letters in word in array and then cycle through them to see if they should be drawn or not
function drawTheLetterSpaces() {
	console.log("Enter drawTheLetterSpaces");
	currentWordDisplay = ""
	for (var i=0; i < numLettersInWord; i++) {
		if (theCurrentWordsRemainingLetters[i] == "") {
			currentWordDisplay = currentWordDisplay + strTheWord.charAt(i) + " ";
		}
		else {
			currentWordDisplay = currentWordDisplay + "__ ";
		}
	}
	document.getElementById("currentWordDisplay").innerHTML = currentWordDisplay; 
	console.log("Close drawTheLetterSpaces: currentWordDisplay=" + currentWordDisplay)
}

function 	updatetheCurrentWordsRemainingLetters() {
	console.log("Enter updatetheCurrentWordsRemainingLetters");
	var found = false;
	for (var i=0; i < numLettersInWord; i++) {
		if (theCurrentWordsRemainingLetters[i] == letterChosen) {
		 	theCurrentWordsRemainingLetters[i] = "";
		 	found = true;
		}		
	}
	console.log("Close updatetheCurrentWordsRemainingLetters: theCurrentWordsRemainingLetters=" + theCurrentWordsRemainingLetters);
	if (found == false) {
		numMissedLetters = numMissedLetters + 1;	
		updateRemainingGuesses();
		buzzer.play();
		//*******************************************************************
	}
}

function isCharacterChosenALetter(c) {
    return c.length === 1 && c.toLowerCase() != c.toUpperCase();
}

function addLetterToGuessedLetters(letter) {
	if (guessedLetters.indexOf(letter) >= 0) {
		return false;
	}
	else {
		guessedLetters.push(letter);
		console.log("Adding letter '" + letter + "' to list of letters chosen")
		guessedLettersDisplay = guessedLettersDisplay + "  " + letter;
		document.getElementById("guessedLetters").innerHTML = guessedLettersDisplay;
		return true;
	}
}

function checkIfTheLetterIsInTheWord(letter) {
	console.log("Open checkIfTheLetterIsInTheWord: Letter=" + letter);
	if (strTheWord.indexOf(letter) >= 0||(strTheWord.indexOf(letter.toUpperCase())) >= 0) {
		console.log("Close checkIfTheLetterIsInTheWord: checkIfTheLetterIsInTheWord=true");
		return true;
	}
	else {
		console.log("Close checkIfTheLetterIsInTheWord: checkIfTheLetterIsInTheWord=true");
		return false;
	}
}

function countTheLettersInTheWord() {
	console.log("Open countTheLettersInTheWord")
	numLettersInWord = strTheWord.length;
	console.log("Close countTheLettersInTheWord: numLettersInWord=" + numLettersInWord)
}

function initializeTheCurrentWordsRemainingLetters() {
	console.log("Open initializeTheCurrentWordsRemainingLetters");
	setLettersInWord(strTheWord);	
	theCurrentWordsRemainingLetters = arrLettersInWord
	console.log("Close initializeTheCurrentWordsRemainingLetters: theCurrentWordsRemainingLetters="  + theCurrentWordsRemainingLetters);
	
}

function updateRemainingGuesses() {
	console.log("Open updateRemainingGuesses");

	remainingGuesses = 15 - numMissedLetters;	
	document.getElementById("remainingGuesses").innerHTML = remainingGuesses;

	console.log("Close updateRemainingGuesses: remainingGuesses="  + remainingGuesses);
}


//*************************End Functions***********************//


console.log("Open Main Thread")  //This is the beginning of the program;
window.onload = function(){

	console.log("Call getTheWord") //Need to get a word that people will be guessing.
	getTheWord();

	document.getElementById("startGame").onclick = function(event) { //Waits for someone to "Click to Start"		
		console.log("Call initializeTheCurrentWordsRemainingLetters") //Puts all the letters in the word into an array.
		initializeTheCurrentWordsRemainingLetters();

		console.log("Call drawTheLetterSpaces"); //This draws the letters - draws __ if a letter has not been guessed
		drawTheLetterSpaces();

		//Below is when someone guesses a letter by pressing the keyboard
		console.log("Listening for onkeydown")
		document.onkeydown = function(event) {
			letterChosen = event.key.toLowerCase();

			if (isCharacterChosenALetter(letterChosen)) {
				console.log("it's a letter!");
				updatetheCurrentWordsRemainingLetters();
				drawTheLetterSpaces();
				addLetterToGuessedLetters(letterChosen)
			}
			else {
				console.log("it's not a letter!");
			}
			if (remainingGuesses == 0) {
				document.getElementById("currentWordDisplay").innerHTML = "You Lose";
			}

			if (theCurrentWordsRemainingLetters.length == 0) {
				document.getElementById("currentWordDisplay").innerHTML = "You Win";
			}
				
		}
	}
};