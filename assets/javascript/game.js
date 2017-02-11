console.log("Application Starting");

var webTechnologies = [["s","e","r","v","i","c","e","s"], ["B","o","o","t","s","t","r","a","p"]];
var currentWord
var lettersInWord
var letterChosen
var guessedLetters = []
var guessedLettersDisplay = ""
var currentWordDisplay = ""
var wins = 0
var losses = 0
var remainingGuesses = 15
var buzzer = new Audio('./assets/sounds/buzzer.mp3');



function getNewWord(words) {
    currentWord = words[Math.floor(Math.random() * words.length)];
    console.log("The current word is: " + currentWord);
    drawLetterSpaces(currentWord);
}


function drawLetterSpaces(Word) {
	lettersInWord = currentWord.length;
	console.log("There are " + lettersInWord + " letters in " + currentWord);
	for (var i = lettersInWord - 1; i >= 0; i--) {
		currentWordDisplay = currentWordDisplay + "__ "
	document.getElementById("currentWordDisplay").innerHTML = currentWordDisplay;
	} 
}

function isLetter(c) {
    return c.length === 1 && c.toLowerCase() != c.toUpperCase();
}

function addLetterToGuessedLetters(letter) {
	if (guessedLetters.indexOf(letter) >= 0) {
		console.log("Letter has been chosen before");
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

function checkIfAGoodLetter(letter) {
	if (currentWord.indexOf(letter) >= 0||(currentWord.indexOf(letter.toUpperCase())) >= 0) {
		console.log("The letter " + letter + " is in the word " + currentWord);

	}
	else {
		console.log("The letter " + letter + " is NOT in the word " + currentWord);
	}
}

document.onkeydown = function(event) {
	//initialize game
	console.log("Start Game Key Pressed");
	getNewWord(webTechnologies);
	//handle guesses
	document.onkeydown = function(event) {
		letterChosen = event.key.toLowerCase()
		console.log("Key pressed is: " + letterChosen);
		if (isLetter(event.key)) {
			console.log("it's a letter!");
			if (addLetterToGuessedLetters(letterChosen)) {
				console.log("Check if a good letter");
				checkIfAGoodLetter(letterChosen);
			}	;

		}
		else {
			console.log("it's not a letter!");
			buzzer.play();
		}
		
	}

}

// }




