console.log("Application Starting");


//***********************Begin Global Variables***********************//
var theCurrentWord;
var theCurrentWordsRemainingLetters = [];
var lettersInWord
var letterChosen
var guessedLetters = []
var guessedLettersDisplay = ""
var currentWordDisplay = ""
var wins = 0
var losses = 0
var remainingGuesses = 15
var buzzer = new Audio('./assets/sounds/buzzer.mp3');
var wordnikAPIKey = "api_key=832a8a63c3f665444c64e1e43b801485eec232b9ad910af7b";
var wordnikURL = "http://api.wordnik.com:80/v4/words.json/randomWord?";


//*************************End Global Variables***********************//


//***********************Begin Functions***********************//

function getTheWord() {
	console.log("Open getTheWord")
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
        	myObj = JSON.parse(this.responseText);
        	theCurrentWord = myObj.word;
          	document.getElementById("startGame").disabled = false;
        	console.log("Close getTheWord: theCurrentWord=" + theCurrentWord)
       	}
	};
	var getWordFromWordnik = wordnikURL + wordnikAPIKey;
	xmlhttp.open("GET", getWordFromWordnik, true);
	xmlhttp.send();
}















function drawTheLetterSpaces() {
	console.log("Enter drawTheLetterSpaces");
	currentWordDisplay = ""
	for (var i=0; i < lettersInWord; i++) {
		if (theCurrentWordsRemainingLetters[i] == "") {
			currentWordDisplay = currentWordDisplay + theCurrentWord.charAt(i) + " ";
		}
		else {
			currentWordDisplay = currentWordDisplay + "__ ";
		}
	}
	document.getElementById("currentWordDisplay").innerHTML = currentWordDisplay; 
	console.log("Close drawTheLetterSpaces: currentWordDisplay=" + currentWordDisplay)
}





function updatetheCurrentWordsRemainingLetters() {
	console.log("Enter updatetheCurrentWordsRemainingLetters");
	for (var i=0; i < lettersInWord; i++) {
		if (theCurrentWordsRemainingLetters[i] == letterChosen) {
		 	theCurrentWordsRemainingLetters[i] = "";
		}
	console.log("Close updatetheCurrentWordsRemainingLetters: theCurrentWordsRemainingLetters=" + theCurrentWordsRemainingLetters);
		// // else if ()
		// else {
		// 	currentWordDisplay = currentWordDisplay + theCurrentWordsRemainingLetters[i];
		// }			
	}
}



















function isCharacterChosenALetter(c) {
    return c.length === 1 && c.toLowerCase() != c.toUpperCase();
}

function addLetterToGuessedLetters(letter) {
	if (guessedLetters.indexOf(letter) >= 0) {
		buzzer.play();
		return false;
	}

	else {
		guessedLetters.push(letter);
		console.log("Adding letter '" + letter + "' to list of letters chosen")
		guessedLettersDisplay = guessedLettersDisplay + "  " + letter;
		document.getElementById("guessedLetters").innerHTML = guessedLettersDisplay;
		remainingGuesses = remainingGuesses - 1;
		document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
		return true;
	}
}

function checkIfTheLetterIsInTheWord(letter) {
	console.log("Open countTheLettersInTheWord: Letter=" + letter);
	if (theCurrentWord.indexOf(letter) >= 0||(theCurrentWord.indexOf(letter.toUpperCase())) >= 0) {
		console.log("Close checkIfTheLetterIsInTheWord: checkIfTheLetterIsInTheWord=true");
		return true;
	}
	else {
		console.log("Close checkIfTheLetterIsInTheWord: checkIfTheLetterIsInTheWord=true");
		return false;
	}
}

function beginGame() {
	drawTheLetterSpaces();
}


function countTheLettersInTheWord() {
	console.log("Open countTheLettersInTheWord")
	lettersInWord = theCurrentWord.length;
	console.log("Close countTheLettersInTheWord: lettersInWord=" + lettersInWord)
}

function setTheCurrentWordsRemainingLettersInitialState() {
	console.log("Open setTheCurrentWordsRemainingLettersInitialState");
	countTheLettersInTheWord();
	for (var i = 0; i < lettersInWord; i++) {
		theCurrentWordsRemainingLetters.push(theCurrentWord.charAt(i));
	}	
	console.log("Close setTheCurrentWordsRemainingLettersInitialState: theCurrentWordsRemainingLetters="  + theCurrentWordsRemainingLetters);
	
}
		
function setWordGuessCurrentState() {
	console.log("Open setWordGuessCurrentState: Letter=" + letter);
	countTheLettersInTheWord()
	setTheCurrentWordsRemainingLetters()
	console.log("Close setWordGuessCurrentState")
}

function recordCorrectLetters(letter) {
	console.log("Open recordCorrectLetters")
	for (var i = 0; i < lettersInWord; i++) {
		console.log(theCurrentWordsRemainingLetters[i] + "=" + letter);
		if (theCurrentWordsRemainingLetters[i] == letter) {
			theCurrentWordsRemainingLetters[i] = "__ ";
		}
	}
	console.log("Close recordCorrectLetters theCurrentWordsRemainingLetters=" + theCurrentWordsRemainingLetters)
}
//*************************End Functions***********************//


console.log("Open Main Thread")  //This is the beginning of the program;
window.onload = function(){

console.log("Call getTheWord") //Need to get a word that people will be guessing.
getTheWord();

document.getElementById("startGame").onclick = function(event) { //Waits for someone to "Click to Start"		
	console.log("Call setTheCurrentWordsRemainingLettersInitialState") //Puts all the letters in the word into an array.
	setTheCurrentWordsRemainingLettersInitialState();

	console.log("Call drawTheLetterSpaces"); //This draws the letters - draws __ if a letter has not been guessed
	drawTheLetterSpaces();

	//Below is when someone guesses a letter by pressing the keyboard
	console.log("Listening for onkeydown")
	document.onkeydown = function(event) {
		letterChosen = event.key.toLowerCase();

		if (isCharacterChosenALetter(letterChosen)) {
			console.log("it's a letter!");
			console.log("Call recordCorrectLetters: letterChosen=" + letterChosen); //This draws the letters - draws __ if a letter has not been guessed
			//recordCorrectLetters(letterChosen);
			updatetheCurrentWordsRemainingLetters();
			drawTheLetterSpaces();
			// IF THERE ARE NO MORE LETTERS TO POP WINNER
			if (addLetterToGuessedLetters(letterChosen)) {
				checkIfTheLetterIsInTheWord(letterChosen);
			}
		}
		else {
			console.log("it's not a letter!");
			buzzer.play();
		}	
	}
}
};