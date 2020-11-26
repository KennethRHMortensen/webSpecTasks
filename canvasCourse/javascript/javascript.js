const $ = function (nml) { 
    return document.getElementById(nml); 
};

let intro = $('intro');
let olympic = $('olympic');
let greenland = $('greenland');
let denmark = $('denmark');
let danishTest = $('denmarkTest');

 // INTRO TO CANVAS
const threeShapes = function () {
    let canvas = $('myCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#088";         // fill color to 088
        ctx.fillRect(20, 10, 120, 40);  // fill rectangle
                    //x , y coordinate + width, height

        ctx.beginPath();                // begin new path
        ctx.arc(150, 150, 50, 0, Math.PI * 2, true);
                                        // describe arc
        ctx.strokeStyle = 'red';        // stroke color
        ctx.fillStyle = '#cc0';         // set fill color
        ctx.fill();                     // fill the path
        ctx.stroke();                   // draw circumference


        ctx.lineWidth = 3;              // stroke weight
        ctx.strokeStyle = 'blue';       // stroke color
        ctx.strokeRect(250, 250, 40, 40); // draw rectangle
    }
}
intro.addEventListener('click', threeShapes);


// OLYMPIC FLAG
const olympicFlag = function () {
    let canvas = $('olympicFlag');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();                // begin new path
        ctx.arc(70, 100, 35, 0, Math.PI * 2, true); //x-cord of center, y-cord of center, radius, starting angle, ending angle, true = start drawing counter-clockwise / false = start drawing clockwise
        //Math.PI * 2 = a complete circle is defined by 2
        ctx.strokeStyle = 'blue';       // stroke color
        ctx.fillStyle = '';             // set fill color
        ctx.lineWidth = 6;        
        ctx.stroke();                   // draw circumference

        ctx.beginPath();
        ctx.arc(110, 140, 35, 0, Math.PI * 2, true);
        //x-cord of center, y-cord of center, radius, starting angle, ending angle, true = start drawing counter-clockwise / false = start drawing clockwise
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(150, 100, 35, 0, Math.PI * 2, true);
        //x of center, y of center, radius, starting angle, ending angle, true = start drawing counter-clockwise / false = start drawing clockwise
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(190, 140, 35, 0, Math.PI * 2, true);
        //x-cord of center, y-cord of center, radius, starting angle, ending angle, true = start drawing counter-clockwise / false = start drawing clockwise
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(230, 100, 35, 0, Math.PI * 2, true);
        //x-cord of center, y-cord of center, radius, starting angle, ending angle, true = start drawing counter-clockwise / false = start drawing clockwise
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 6;
        ctx.stroke();
        
    }
}
olympic.addEventListener('click', olympicFlag);


// GREENLANDISH FLAG
const greenlandFlag = function () {
    let canvas = $('greenlandFlag');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        ctx.fillStyle ="red";
        ctx.fillRect(0, 150, 300, 150);

        ctx.beginPath();
        ctx.arc(100, 150, 50, 0, Math.PI * 1, false);
        ctx.fillStyle = "white";
        ctx.fill();
        
        ctx.fillStyle ="white";
        ctx.fillRect(0, 0, 300, 150);

        ctx.beginPath();
        ctx.arc(100, 150, 50, 0, Math.PI * 1, true);
        ctx.fillStyle = "red";
        ctx.fill();

    }
}
greenland.addEventListener('click', greenlandFlag);


// DANISH FLAG
const danishFlag = function () {
    let canvas = $('danishFlag');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        ctx.fillStyle ="red";
        ctx.fillRect(0, 0, 300, 300);

        ctx.fillStyle ="white";
        ctx.fillRect(100, 0, 25, 300);

        ctx.fillStyle ="white";
        ctx.fillRect(0, 125, 300, 25);
    }
}
denmark.addEventListener('click', danishFlag);


// TESTING DANISH FLAG WITH VARIABLES FOR PROPER PROPORTIONS
const danishFlagTest = function () {
    let canvas = $('danishFlagTest');
    let redSquare = (canvas.height/7)*3;
    let whiteHorizontal = (canvas.height/7)*1;
    let whiteVertical = (canvas.width+canvas.height);
    let redRectangle = (canvas.height/7)*3;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        //Background color of flag
        ctx.fillStyle ="red";
        ctx.fillRect(redSquare);

        ctx.fillStyle ="white";
        ctx.fillRect(whiteHorizontal);

        ctx.fillStyle ="white";
        ctx.fillRect(whiteVertical);
    }
}
danishTest.addEventListener('click', danishFlagTest);