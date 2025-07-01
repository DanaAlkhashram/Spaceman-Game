/*-------------- Constants -------------*/
const Words = ['space','planet','rocket','galaxy','Aliens']

/*---------- Variables (state) ---------*/
let word;
let win;

/*----- Cached Element References  -----*/
const wordDisplayEL = document.querySelector(".word-display");
const dashEl = document.querySelectorAll(".dash") 

const remiaingLivesEl = document.querySelector("#lives");
const msgEl = document.querySelector("#message");

const KybContainerEl = document.querySelector("#keyboard-container");
const outputInput = document.querySelector("#output");

/*-------------- Functions -------------*/

// Spaceman / Wordle
// Use Array.from() or split('') to break words into letters
// Display underscores for unguessed letters
// Store guesses in an array


for(let i=65 ; i<= 90 ; i++){
    const char = String.fromCharCode(i);
    const button = document.createElement("button");

    button.classList.add("key-button");
    button.textContent = char;

    button.addEventListener('click',()=>{
        outputInput.valuse +=char;
    });

    KybContainerEl.appendChild(button);
}


function init() {
    word = ['','','','','',''];
    win = false;


    render();
}

function render() {


}

function updatetDisplay() {
    word.forEach((value,index) => {
        let dash = dashEl[index];

        if( value === ''){
            word.textContent = value;
        }
    });
}
updatetDisplay()



/*----------- Event Listeners ----------*/
outputInput.addEventListener('click',init)

const handleMove = (event)=>{


    render();
}

