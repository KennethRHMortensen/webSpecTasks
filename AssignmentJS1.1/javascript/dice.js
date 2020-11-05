//Random number as innerHTML to display a natural number on a die
//Target and define aliases for elements from html 
let button = document.getElementById("roll");
let number = document.getElementById("number");

//On refresh display ? as number
number.innerHTML = "?";

//Define integers to Math.random
let min = 1;
let max = 7;

//Generate random number between min-max equal to a die
function rollDice(){
    let random = Math.floor((Math.random() * (max-min) + min));
    return random;
}

//Do function on click of button and display number on die
button.addEventListener("click", function(){
    let result = rollDice();
    number.innerHTML = result;
})



//Guided by https://www.youtube.com/watch?v=_jGnrQyvdTQ&t=45s