/*-------------- Constants -------------*/
const Words = ['plasma', 'planet', 'rocket', 'galaxy', 'Aliens']

/*---------- Variables (state) ---------*/
let word;
let randomWord;
let hiddenWord;
let gussedLetter;
let remainingLives;
let win;

/*----- Cached Element References  -----*/
const wordDisplayEL = document.querySelector(".word-display");
const dashEl = document.querySelectorAll(".dash")

const remiaingLivesEl = document.querySelector("#lives");
const msgEl = document.querySelector("#message");

const KybContainerEl = document.querySelector("#keyboard-container");
const outputEl = document.querySelector(".output");

const resetBtnEl = document.querySelector("#resetButton");

/*-------------- Functions -------------*/

// Generate alphabet keyboard buttons 
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

// initialize the game 
function init() {
    randomWord = Words[Math.floor(Math.random() * Words.length)].toUpperCase();
    hiddenWord = Array.from(randomWord);
    gussedLetters = Array(hiddenWord.length).fill('');

    const randomIndex = Math.floor(Math.random() * hiddenWord.length);
    gussedLetters[randomIndex] = hiddenWord[randomIndex];

    remainingLives = 6;
    win = false;
    word = hiddenWord.join((''));

    remiaingLivesEl.textContent = remainingLives;
    msgEl.textContent = '';

    render();
}

// when the letter clicked, handle the guess and update guessed letters
function handleMove(letter) {
    checkGussedLetters(letter);
    render();
    gameStatus();
}

// wcheck if the clicked letter is in the word and update gussed letters
function checkGussedLetters(letter) {
    let correctGuss = false;

    hiddenWord.forEach((char, index) => {
        if (char === letter) {
            gussedLetters[index] = letter;
            correctGuss = true;
        }
    });

    if (!correctGuss) {
        remainingLives--;
    }
    updateDisplay();

}

// render the current state of the gussed word and remaining lives
function render() {
    updateDisplay();

}


// update the display with gussed letters and remaining lives
function updateDisplay() {

    gussedLetters.forEach((value, index) => {
        if (value) {
            dashEl[index].textContent = value;
        } else {
            dashEl[index].textContent = " ";
        }
    });
    if (remainingLives >= 0) {
        remiaingLivesEl.textContent = remainingLives;
    } else {
        return;
    }


}

// check if the player gussed the right word or not
function gameStatus() {
    if (gussedLetters.join('') === hiddenWord.join('')) {
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

