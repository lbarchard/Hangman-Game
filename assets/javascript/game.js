//***********************Begin Global Variables***********************//
//***Variables about the current word
var strTheWord
var numLettersInWord

//***The current guess
var letterChosen

//***Variables tracking guessed and missed letters
var arrLettersInWord
var arrRemainingLettersInWord
var guessedLetters
var arrAllGuessedLetters
var arrWronglyGuessedLetters
var arrCorrectlyGuessedLetters
var arrCharactersToDraw

//***Stats on the current game
var numMissedLetters
var numRemainingGuesses

//***Stats on the current session
var numWins = 0
var numLosses = 0


var guessedLettersDisplay
var currentWordDisplay

//***API connection information
var wordnikAPIKey = "api_key=832a8a63c3f665444c64e1e43b801485eec232b9ad910af7b";
var wordnikURL = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=family-name,given-name,proper-noun,proper-noun-plural,proper-noun-posessive&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=3&maxDictionaryCount=-1&minLength=5&maxLength=-1&";

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
function setVariables() {
	setNumLettersInWord();
	setLettersInWord();
	//setRemainingLettersInWord();
}

function setNumLettersInWord() {
	console.log("Open setNumLettersInWord")
	numLettersInWord = strTheWord.length;
	console.log("Close setNumLettersInWord: numLettersInWord=" + numLettersInWord)
}



function getTheWord() {
	console.log("Enter getTheWord")
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	myObj = JSON.parse(this.responseText);
        	strTheWord = myObj.word;
        	strTheWord = strTheWord.toLowerCase()
          	document.getElementById("startGame").disabled = false;
        	console.log("Exit getTheWord: strTheWord=" + strTheWord)
       	}
	};
	var getWordFromWordnik = wordnikURL + wordnikAPIKey;
	xmlhttp.open("GET", getWordFromWordnik, true);
	xmlhttp.send();
}

function addWronglyGuessedLetters() {
	console.log("Enter addWronglyGuessedLetters");
	if (arrWronglyGuessedLetters.indexOf(letterChosen) === -1) {
		arrWronglyGuessedLetters.push(letterChosen);
	}
	console.log("Exit addWronglyGuessedLetters: arrWronglyGuessedLetters=" + arrWronglyGuessedLetters);	
}

function addCorrectlyGuessedLetters() {
	console.log("Enter addCorrectlyGuessedLetters");
	if (arrCorrectlyGuessedLetters.indexOf(letterChosen) === -1) {
		arrCorrectlyGuessedLetters.push(letterChosen);
	}
	console.log("Exit addCorrectlyGuessedLetters: arrCorrectlyGuessedLetters=" + arrCorrectlyGuessedLetters);	
}

function toCharacterArrayFromString(string) {
	console.log("Enter toCharacterArrayFromString: string=" + string);
	var arrCharacters = [];
	for (var i = 0; i < string.length; i++) {
		arrCharacters.push(string.charAt(i));
	}
	console.log("Exit toCharacterArrayFromString: myCharacterArray=" + arrCharacters);
	return arrCharacters;		
}

function setLettersInWord() {
	console.log("Enter setLettersInWord");
	arrLettersInWord = toCharacterArrayFromString(strTheWord);
	console.log("Exit setLettersInWord: arrLettersInWord=" + arrLettersInWord);
}

function setRemainingLettersInWord() { //This function can be made more readable
	console.log("Enter setRemainingLettersInWord");
	arrRemainingLettersInWord = arrLettersInWord
	for (var i = 0; i < arrCorrectlyGuessedLetters.length; i++) {
		while (arrRemainingLettersInWord.indexOf(arrCorrectlyGuessedLetters[i]) != -1) {
			arrRemainingLettersInWord.splice((arrRemainingLettersInWord.indexOf(arrCorrectlyGuessedLetters[i])),1);
		}
	}
	console.log("Exit setRemainingLettersInWord: arrRemainingLettersInWord=" + arrRemainingLettersInWord);
}

function playTryAgainSound() {
	console.log("Enter playTryAgainSound");
	buzzer.play();
	console.log("Exit playTryAgainSound");
}

function isLetterInRemainingLettersInWord() {
	console.log("Enter isLetterInRemainingLettersInWord");
	var result = isStringFoundInArray(letterChosen,arrRemainingLettersInWord);
	console.log("Exit isLetterInRemainingLettersInWord: isLetterInRemainingLettersInWord=" + result);
	return result;

}

function isLetterInAllGuessedLetters() {
	return isStringFoundInArray(letterChosen,arrAllGuessedLetters);
}

function isLetterInWord() {
	return isStringFoundInArray(letterChosen,arrLettersInWord);
}

function isStringFoundInArray(string, array) {
	console.log("Enter isStringFoundInArray: string=" + string + " array=" + array);
	var notFound = -1
	if (array.indexOf(string) == notFound) {
		return false;
	}
	else {
		return true;
	}
}

function isCharacterChosenALetter(c) {
    return c.length === 1 && c.toLowerCase() != c.toUpperCase();
}

function setGuessedLetters() {
	if (isCharacterChosenALetter(letterChosen)) {
		if (arrCorrectlyGuessedLetters.indexOf(letterChosen)>=0) {
			//do nothing - no need to add letter to anything, no need to buzz
		}
		else if (isLetterInRemainingLettersInWord()) {
			addCorrectlyGuessedLetters();			
		}
		else {
			if (arrWronglyGuessedLetters.indexOf(letterChosen) === -1 ) {
				addWronglyGuessedLetters();
				guessedLetters = guessedLetters + " " + letterChosen;
				playTryAgainSound();
			}
		}
	}
	document.getElementById('guessedLetters').innerHTML = guessedLetters	
}


function setArrCharactersToDraw() {
	console.log("Enter setArrCharactersToDraw");
	
	for (var i = 0; i < strTheWord.length; i++) {
		 if (arrCorrectlyGuessedLetters.indexOf(arrLettersInWord[i]) === -1) {
		 	arrCharactersToDraw[i] = " __ "
		 }
		 else {
		 	arrCharactersToDraw[i] = " " + arrLettersInWord[i] + " ";
		 }
	}
	console.log("Exit setArrCharactersToDraw: arrCharactersToDraw=" + arrCharactersToDraw)
}


function drawCharacters() {
	console.log("Enter drawCharacters");
	setArrCharactersToDraw();
	var strCharactersToDraw = "";
	for (var i = 0; i < arrCharactersToDraw.length; i++) {
		strCharactersToDraw = strCharactersToDraw + arrCharactersToDraw[i];
		document.getElementById('currentWordDisplay').innerHTML = strCharactersToDraw;
	}
	console.log("Exit drawCharacters: strCharactersToDraw=" + strCharactersToDraw);

}


function setNumRmainingGuesses() {
	console.log("Enter setNumRmainingGuesses");
	numRemainingGuesses = 15 - arrWronglyGuessedLetters.length;	
	document.getElementById("remainingGuesses").innerHTML = numRemainingGuesses;
	console.log("Exit setNumRmainingGuesses: numRemainingGuesses="  + numRemainingGuesses);
}

function isLoss() {
	setNumRmainingGuesses();
	if (numRemainingGuesses === 0) {
		document.getElementById('currentWordDisplay').innerHTML = "You Lose";
		numLosses = numLosses + 1
		document.onkeydown = null;
		initialize()
	}
}

function  isWin() {
	setRemainingLettersInWord();
	if (arrRemainingLettersInWord.length === 0) {
		document.getElementById('currentWordDisplay').innerHTML = "You Win";
		numWins = numWins + 1
		document.getElementById('wins').innerHTML = "Wins  = " + numWins;
		document.onkeydown = null;	
		initialize()	
	}
}

//*************************End Functions***********************//

//*******************Main Program*********************//
console.log("Enter Main Thread")  //This is the beginning of the program;
window.onload = function(){
	initialize();
};



function initialize() {

	//***Variables about the current word
	strTheWord = ""
	numLettersInWord = 0

	//***The current guess
	letterChosen = ""

	//***Variables tracking guessed and missed letters
	arrLettersInWord = []
	arrRemainingLettersInWord = []
	guessedLetters = ""
	arrAllGuessedLetters = []
	arrWronglyGuessedLetters = []
	arrCorrectlyGuessedLetters = ["-"," ","'"]
	arrCharactersToDraw = []

	//***Stats on the current game
	numMissedLetters = 0
	numRemainingGuesses = 15

	guessedLettersDisplay = ""
	currentWordDisplay = ""

	getTheWord(); //Need to get a word that people will be guessing.
	main();
}


function main() {
	
	document.getElementById("startGame").onclick = function(event) {
		document.getElementById("startGame").onclick = null;	
		setVariables(); //Initializes some arrays now that we have a word needed to perform future functions
		drawCharacters(); //This draws the letters - draws __ if a letter has not been guessed
		document.onkeydown = function(event) { //Wait for someone to press a letter for their guess
			letterChosen = event.key.toLowerCase();
			setRemainingLettersInWord();
			setVariables();
			setGuessedLetters();
			drawCharacters();
			isWin();
			isLoss();
		}
	}
}
