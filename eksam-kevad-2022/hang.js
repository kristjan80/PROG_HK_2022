/**
 * Hangman - Kristjan Leotoots - RIF21
 * 11.06.2022
 */


// Word array from which the guessing word is chosen from
const Words = ["TEERULL","LASKEMOON", "PALLIVISE", "ÜLIKOOL", "MAAILMAVAADE"];

// JS selectors for later use
const D20Selector = "#js-d20";
const DPercentSelector = "#js-dpercent";
const GuessLetterSelector = "#js-guess";

const LetterInputSelector = "#js-word-input";
const D20ResultSelector = ".js-d20-result";
const DPercentResultSelector = ".js-dpercent-result";

const ChosenWordSelector = ".js-word";
const GeneralInfoFieldSelector = ".js-general-info-field";
const LivesSelectorElement = ".js-lives";


// variables for buttons and fields
const DPercentButton = document.querySelector(DPercentSelector);
const GuessLetterButton = document.querySelector(GuessLetterSelector);
const D20Button = document.querySelector(D20Selector);

const LetterInputField = document.querySelector(LetterInputSelector);
const D20ResultFIeld = document.querySelector(D20ResultSelector);
const DPercentField = document.querySelector(DPercentResultSelector);

const ChosenWordField = document.querySelector(ChosenWordSelector);
const GeneralInfoField = document.querySelector(GeneralInfoFieldSelector);
const LivesField = document.querySelector(LivesSelectorElement);

// EventListener setup function for buttons
function setupEventListeners() {
    D20Button.addEventListener("click",rollD20);
    DPercentButton.addEventListener("click", rollDPercent);
    GuessLetterButton.addEventListener("click", guessLetter);

}

// Function wichs simulates the roll of a single D20 die. On 1 you die immideadetly. All buttons disabled.
// On 20 you gain an extra life
function rollD20() {
    const rollResult = Math.floor(Math.random() * 20) + 1;
    if(rollResult == 1) {
        GeneralInfoField.innerHTML = "1.... Kaotasid kahjuks mängu. Värskenda lehte, et uuesti mängida";
        disableAllButtons();
    }else if(rollResult == 20) {
        GeneralInfoField.innerHTML = "20!!! Said ühe elu juurde!";
        lives++;
    }
    else {
        GeneralInfoField.innerHTML = "Veeretasid " + rollResult + " . Midagi ei juhtu";
    }
    // Disables itself and enables the next button
    D20Button.disabled = true;
    DPercentButton.disabled = false;

}

// Roll for percentage die rolling. Rolls on 10 sided die with given values. Result is divided in two
function rollDPercent() {
    const diceResults = [0,10,20,30,40,50,60,70,80,90];

    let rollResult = diceResults[Math.floor(Math.random() * diceResults.length)];
    let rollPercent = 0;
    if(rollResult == 0) {
        rollPercent = 100 / 2;
    } else {
        rollPercent = rollResult / 2;
    }

    // Disable itself and enable the letter guessing button
    DPercentButton.disabled = true;
    GuessLetterButton.disabled = false;
    // Display some random letters based on the percent value
    const displayHowManyLetters = Math.floor(chosenWord.length * (rollPercent / 100))

    // Reveal letters some letters based on the previous equation
    GeneralInfoField.innerHTML = "Veeretustulemuse tõttu avalikustame " + displayHowManyLetters + " tähte: ";
    revealLetters(displayHowManyLetters);
}

function revealLetters(revealCount) {
    
    let htmlResult = ChosenWordField.innerHTML;
    let uniqueIndeArray = [];
    
    // helper variable
    i = 0
    // Generate 3 unique numbers in range
    while(i < revealCount) {
        const randNum = Math.floor(Math.random() * revealCount);
        if(!uniqueIndeArray.includes(randNum)) {
            uniqueIndeArray.push(randNum);
            i++;
        }
    }

    // Aaand display what letters are in the word for the player
    i = 0
    while(i < revealCount) {
        GeneralInfoField.innerHTML += chosenWord[uniqueIndeArray.pop()] + " ";
        i++;
    }
    
}

// Deals with letter guessing functionality. 
function guessLetter() {
    // Uppercase the letter because the the word we are trying to guess is uppercased
    const chosenLetter = LetterInputField.value.toUpperCase();
    LetterInputField.value = "";
    // Helper variables. First is used to check if we guessed right or not. Second is used to construt the new HTML element value
    let didLetterExist = false;
    let newOutputWord = "";
    // Main logic. Checks, if our chosen letter is in any position. If yes add the letter to the new string
    for(let i = 0; i < chosenWord.length; i++) {
        if(chosenWord[i] == chosenLetter) {
            newOutputWord += chosenLetter;
            didLetterExist = true;
        // Following two conditionals deal with adding _ or old guessed letter to the new result string
        } else {
            if(ChosenWordField.innerHTML[i] == "_") {
                newOutputWord += "_";
            }
            else {
                newOutputWord += ChosenWordField.innerHTML[i];
            }
        }
    }
    // New string to document
    ChosenWordField.innerHTML = newOutputWord;
    // If we guessed wrong, notify, subtract lives and check if we lost
    if(!didLetterExist) {
        GeneralInfoField.innerHTML = "Tähte " + chosenLetter + " ei ole sõnas.";
        lives--;
        checkForGameOver();
    }
    // IF we have guessed all the letters, we have won. Disable all the buttons
    if(ChosenWordField.innerHTML == chosenWord) {
        GeneralInfoField.innerHTML = "Palju õnne. Sa võitsid!";
        disableAllButtons();
    }

    LivesField.innerHTML = "ELUD: " + lives;
}

// Randomly chooses a word from Words array declared at the beginning. Then pupulates the word field in HTML with corresponding "_" symbols
function chooseWordAndDisplay () {
    let randomWord = Words[Math.floor(Math.random() * Words.length)];

    // Add as many "_" symbols to the document as the word is long
    for(let i = 0; i < randomWord.length; i++) {
        ChosenWordField.innerHTML += "_";
    }

    // Also initialize lives element value
    LivesField.innerHTML = "ELUD: " + lives;

    return randomWord;
}

// Checks the current lives variable. If the values is 0 or below, the game is lost and the correct word is displayed
function checkForGameOver() {
    if(lives <= 0) {
        GeneralInfoField.innerHTML = "Elud otsas. Kaotasid. Õige sõna oli: " + chosenWord;
        GuessLetterButton.disabled = true;
    } 
    
    
}
// Disables all buttons for instant gameover in D20 rolling function
function disableAllButtons() {
    GuessLetterButton.disabled = true;
    DPercentButton.disabled = true;
    D20Button.disabled = true;

}

// Setup the main listeners for all buttons
setupEventListeners();

// Initialize and display lives
let lives = 6;

// Choose the word and generate "_" symbols for every letter in the word
let chosenWord = chooseWordAndDisplay();

console.log(chosenWord); // Only for testing and grading easier

// Hide the buttons to force the main gameplay loop
GuessLetterButton.disabled = true;
DPercentButton.disabled = true;












