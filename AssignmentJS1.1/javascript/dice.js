//Random number as innerHTML to display a natural number on a die
//Target and define aliases for elements from html 
let button = document.getElementById("roll");
let die = document.getElementById("dice");

let rollDice = function(){
    die.innerHTML = generateNumber();
}
//generate random integer between 1 and 6 
let generateNumber = function(){
    let random = Math.floor((Math.random() * 6) +1);
    return random;
}
button.addEventListener('click', rollDice);

