/*-------------- Constants -------------*/

const Words = ['plasma','planet','rocket','galaxy','Aliens']

/*---------- Variables (state) ---------*/

let word;
let randomWord;
let gussedLetter;
let remainingLives;
let win;

/*----- Cached Element References  -----*/

const wordDisplayEL = document.querySelector(".word-display");
const dashEl = document.querySelectorAll(".dash") 

const remiaingLivesEl = document.querySelector("#lives");
const msgEl = document.querySelector("#message");

const KybContainerEl = document.querySelector("#keyboard-container");
const outputInput = document.querySelector(".output");

const resetBtnEl = document.querySelector('#resetButton');

/*-------------- Functions -------------*/

for(let i=65 ; i<= 90 ; i++){
    const char = String.fromCharCode(i);
    const button = document.createElement("button");
    
    button.classList.add("key-button");
    button.textContent = char;

    button.addEventListener('click',()=>{
        handleMove(char);
        outputInput.value +=char;
        button.disabled = true;
    });

    KybContainerEl.appendChild(button);
}


function init() {
    const randomWord = Words[Math.floor(Math.random()*Words.length)].toUpperCase();
    HiddenWord = Array.from(randomWord);
    gussedLetters = Array(HiddenWord.length).fill('');
    remainingLives = 6;
    win = false;
    word = HiddenWord.join((''));

    remiaingLivesEl.textContent = remainingLives;
    msgEl.textContent = '';
    
    render();
}

function render() {

   
}


function updateDisplay() {
    HiddenWord.forEach((value,index) => {
        let dash = dashEl[index];

        if( value === ''){
            dash.textContent = '__';
        } else{
            dash.textContent = value;
        }

    });
    checkGussedLetters();
}


function checkGussedLetters(letter) {
    let correctGuss = false;

   HiddenWord.forEach((char,index) => {
        if ( char === letter){
            gussedLetters[index]= letter;
            correctGuss = true;

        } else {
            remainingLives-- ;
        }

})
}

function resetGame() {
    const buttons =document.querySelectorAll('.key-button');
    buttons.forEach(btn =>{
        btn.disabled =false;
    })
}
   

function gameStatus() {
    if (gussedLetters.join('') === HiddenWord.join('') ){
        win = true;
        msgEl.textContent = "you win!";

    } else {
        msgEl.textContent = `Game over, the word is ${word}`
    }

}

init();

/*----------- Event Listeners ----------*/

function handleMove(letter){
    checkGussedLetters(letter);
    render();
    gameStatus();
}


resetBtnEl.addEventListener('click', resetGame);
