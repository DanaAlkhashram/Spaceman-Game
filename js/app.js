/*-------------- Constants -------------*/
// list of 6 letters words
const Words = ['plasma', 'planet', 'rocket', 'galaxy', 'Aliens']

/*---------- Variables (state) ---------*/
let word;
let randomWord;
let hiddenWord;
let guessedLetters;
let remainingLives;
let win;

/*----- Cached Element References  -----*/
const wordDisplayEL = document.querySelector(".word-display");
const dashEls = document.querySelectorAll(".dash")

const remainingLivesEl = document.querySelector("#lives");
const msgEl = document.querySelector("#message");

const KybContainerEl = document.querySelector("#keyboard-container");
const outputEl = document.querySelector(".output");

const resetBtnEl = document.querySelector("#resetButton");

/*-------------- Functions -------------*/

// Generate alphabet keyboard buttons 
// For each letter A-Z
    // Create button 
    // set its value 
    // add event listener to handle letter click 
    // disable button after click
for (let i = 65; i <= 90; i++) {
    const char = String.fromCharCode(i);
    const button = document.createElement("button");

    button.classList.add("key-button");
    button.textContent = char;

    button.addEventListener('click', () => {
        handleMove(char);
        outputEl.value += char;
        button.disabled = true;


    });

    KybContainerEl.appendChild(button);
}

// Initialize the game  
// - Choose random word from the array
// - Convert the word to Uppercase and into array of letters
// - Fill guessed letters with empty strings
// - Reveal on erandom letter to start 
// - Set remaining lives to 6
// - Clear message 
function init() {
    randomWord = Words[Math.floor(Math.random() * Words.length)].toUpperCase();
    hiddenWord = Array.from(randomWord);
    guessedLetters = Array(hiddenWord.length).fill('');

    const randomIndex = Math.floor(Math.random() * hiddenWord.length);
    guessedLetters[randomIndex] = hiddenWord[randomIndex];

    remainingLives = 6;
    win = false;
    word = hiddenWord.join((''));

    remainingLivesEl.textContent = remainingLives;
    msgEl.textContent = '';

    render();
}

// - When the letter clicked, handle the guess and update guessed letters
// - Check the gussed letter is in the word:
    // If correct, fill it in the correct positions
    // If false, reduce life
// - Disable the clicked button
// - Update the screen
// - Check win or lose 
function handleMove(letter) {
    checkGuessedLetters(letter);
    render();
    gameStatus();
}

// Check if the clicked letter is in the word and update guessed letters
function checkGuessedLetters(letter) {
    let correctGuess = false;

    hiddenWord.forEach((char, index) => {
        if (char === letter) {
            guessedLetters[index] = letter;
            correctGuess = true;
        }
    });

    if (!correctGuess) {
        remainingLives--;
    }
    updateDisplay();

}

// render the current state of the guessed word and remaining lives
function render() {
    updateDisplay();

}


// update the display with guessed letters and remaining lives
function updateDisplay() {

    guessedLetters.forEach((value, index) => {
        if (value) {
            dashEl[index].textContent = value;
        } else {
            dashEl[index].textContent = " ";
        }
    });
    if (remainingLives >= 0) {
        remainingLivesEl.textContent = remainingLives;
    } else {
        return;
    }


}

// check if the player guessed the right word or not
// Display the appropriate message
function gameStatus() {
    if (guessedLetters.join('') === hiddenWord.join('')) {
        win = true;
        msgEl.textContent = `you win 🚀, the word is ${word}`;


    } else if (remainingLives <= 0) {
        msgEl.textContent = `Game over, the word is ${word}`

    }

}

// reset the game to start over and play again when the button clicked
function resetGame() {
    const buttons = document.querySelectorAll('.key-button');
    buttons.forEach(btn => {
        btn.disabled = false;
    })
    msgEl.textContent = '';

    init();
}

init();

/*----------- Event Listeners ----------*/
resetBtnEl.addEventListener('click', resetGame);

