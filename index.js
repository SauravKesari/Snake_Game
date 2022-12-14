// // const canvas=document.getElementById('snakeCanvas');
// // const ctx=canvas.getContext('2d');

// // //Fill color in canvas
// // ctx.fillStyle='black';
// // ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
// // ctx.stroke();

// // // function clearScreen(){

// // // }
// // // function drawGame(){
// // //     clearScreen();
// // //     //alert("hello")
// // // }
// // // drawGame()
//         const canvas = document.getElementById('game');
//         const ctx = canvas.getContext('2d');
//         //drawing snake
//         let tileCount=20;
//         let tileSize=18;
//         let headX=10;
//         let headY=10;

//         //initialization of snake speed
//         let xspeed=0;
//         let yspeed=0;

//         function changePosition(){
//             headX=headX*xspeed;
//             headY=headY*yspeed;
//         }



//         document.body.addEventListener('keydown',keyDown);

//         function keyDown(event){
//             console.log(event.keyCode)
//         }
//         // function keyDown(event){
//         //     //left arrow
//         //     if(event.keyCode==37){
//         //         if(xspeed==1)
//         //         return;
//         //         xspeed=-1;
//         //         yspeed=0;
//         //     }
//         //     //top
//         //     if(event.keyCode==38){
//         //         if(yspeed==1)
//         //          return;
//         //         yspeed=1;
//         //         xspeed=0;
//         //     }
//         //     //right
//         //     if(event.keyCode==39){
//         //         if(xspeed==-1)
//         //         return;
//         //         yspeed=0;
//         //         xspeed=1;
//         //     }
//         //     //bottom
//         //     if(event.keyCode==40){
//         //         if(yspeed==1)
//         //         return;
//         //         yspeed=-1;
//         //         xspeed=0;
//         //     }
//         // }

//         //fill the color
//         function clearScreen() {
//             ctx.fillStyle = 'black';
//             ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//         }

//         //snake drawing
//         function snakeDraw(){
//             ctx.fillStyle='orange';
//             ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
//         }
//         //Draw game
//         function drawGame(){
//             //let speed=7; //the interval will be seven seconds
//             //setTimeout(drawGame,1000/speed); //update screen 7times in a second

//             clearScreen();
//             snakeDraw();
//             changePosition();

//         }

//         drawGame();

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
//increase snake size 
class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;

let tileSize = canvas.clientWidth / tileCount - 2;
let headX = 10;
let headY = 10;

// array for snake parts
const snakeParts = [];
let tailLength = 2;

//initialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;

//draw apple
let appleX = 5;
let appleY = 5;

//scores
let score = 0;

// create game loop-to continously update screen
function drawGame() {
    changeSnakePosition();
    // game over logic
    let result = isGameOver();
    if (result) { // if result is true
        return;
    }
    clearScreen();
    drawSnake();
    drawApple();

    checkCollision()
    drawScore();
    setTimeout(drawGame, 1000 / speed); //update screen 7 times a second
}
//Game Over function
function isGameOver() {
    let gameOver = false;
    //check whether game has started
    if (yvelocity === 0 && xvelocity === 0) {
        return false;
    }
    if (headX < 0) { //if snake hits left wall
        gameOver = true;
    } else if (headX === tileCount) { //if snake hits right wall
        gameOver = true;
    } else if (headY < 0) { //if snake hits wall at the top
        gameOver = true;
    } else if (headY === tileCount) { //if snake hits wall at the bottom
        gameOver = true;
    }

    //stop game when snake crush to its own body

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) { //check whether any part of snake is occupying the same space
            gameOver = true;
            break; // to break out of for loop
        }
    }


    //display text Game Over
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "20px verdana";
        ctx.fillText(`Game Over! Your Score is:- ${score}`, canvas.clientWidth / 6.5, canvas.clientHeight / 2); //position our text in center
    }

    return gameOver; // this will stop execution of drawgame method
}

// score function
function drawScore() {
    ctx.fillStyle = "white" // set our text color to white
    ctx.font = "18px verdena" //set font size to 10px of font family verdena
    ctx.fillText("Score: " + score, canvas.clientWidth - 100, 20); // position our score at right hand corner 

}

// clear our screen
function clearScreen() {

    ctx.fillStyle = 'black' // make screen black
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight) // black color start from 0px left, right to canvas width and canvas height

}

function drawSnake() {

    ctx.fillStyle = "green";
    //loop through our snakeparts array
    for (let i = 0; i < snakeParts.length; i++) {
        //draw snake parts
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    //add parts to snake --through push
    snakeParts.push(new snakePart(headX, headY)); //put item at the end of list next to the head
    if (snakeParts.length > tailLength) {
        snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size

    }
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)


}

function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;

}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}
// check for collision and change apple position
function checkCollision() {
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score+=5; //increase our score value

    }
}
//add event listener to our body
document.body.addEventListener('keydown', keyDown);

function keyDown(event)
//up
{
    if (event.keyCode == 38) {
        //prevent snake from moving in opposite direcction
        if (yvelocity == 1)
            return;
        yvelocity = -1;
        xvelocity = 0;

    }
    //down
    if (event.keyCode == 40) {
        if (yvelocity == -1)
            return;
        yvelocity = 1;
        xvelocity = 0;
    }

    //left
    if (event.keyCode == 37) {
        if (xvelocity == 1)
            return;
        yvelocity = 0;
        xvelocity = -1;
    }
    //right
    if (event.keyCode == 39) {
        if (xvelocity == -1)
            return;
        yvelocity = 0;
        xvelocity = 1;
    }
}

drawGame();