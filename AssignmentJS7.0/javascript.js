let numOne = Number(prompt('add number'));
let numTwo = Number(prompt('add number'));
let numThree = Number(prompt('add number'));

let btn = document.getElementById('btn');
const detect = function(){
    if (numOne > numTwo && numOne > numThree){
        console.log('the first input, number ' + ' ' + numOne + ' ' + 'is the biggest number');
    }else if(numTwo > numOne && numTwo > numThree){
        console.log('the second input, number' + ' ' + numTwo + ' ' + 'is the biggest number');
    }else{
        console.log('the third input, number' + ' ' + numThree + ' ' + 'is the biggest number');
        }
    }

btn.addEventListener('click', detect);

