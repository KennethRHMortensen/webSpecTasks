//Random number as innerHTML to display a natural number on a die
//Target and declare variables
let button = document.getElementById("roll");
let die = document.getElementsByClassName("dice");

//Create array of numbers for global usage
let numbers = [];

//Loop 5 dices and display values, while pushing values into an array
let rollDice = function(){
    numbers = [];
    for (i = 0; i < die.length; i++){
        let number = generateNumber();
        die[i].innerHTML = number;
        numbers.push(number);
    }
    console.log(numbers);
}

//Generate a random integers between 1 and 6 on each die
let generateNumber = function(){
    let number = Math.floor((Math.random() * 6) + 1);
    return number;
}

button.addEventListener('click', rollDice);