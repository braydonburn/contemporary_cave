// JavaScript
//Game Variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var continueAnimating = false;
var startingScore = 0;
var health = 3;
var click = false;
    
//Paddle Variables
var paddleHeight = 30;
var paddleWidth = 55;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddle = {
    x: paddleX,
    y: canvas.height - 70,
    width: paddleWidth,
    height: paddleHeight
};
var rightPressed = false;
var leftPressed = false;
var movement = 0;
// Math.max(1, Math.min(x, 0));

//Rubbish Variables
var rubbishSpeedMultiply = 0.2;
var rubbishWidth = 15;
var rubbishHeight = 15;
var totalRubbish = 5;
var rubbishList = [];
for (var i = 0; i < totalRubbish; i++) {
    addRubbish();
}

//Food Variables
var foodWidth = 15;
var foodHeight = 15;
var totalFood = 3;
var foodList = [];
for (var i = 0; i < totalFood; i++) {
    addFood();
}

//Sounds
var sound = new Howl({
    src: ['Resources/sounds.wav'],
    sprite: {
        food: [0, 130],
        rubbish: [145, 200]
    }
});

//Images
var turtleLeft = new Image();
turtleLeft.src = 'Resources/turtleLeft.png';
var turtleRight = new Image();
turtleRight.src = 'Resources/turtleRight.png';
var foodImage = new Image();
foodImage.src = 'Resources/Jellyfish.png';

var rubbishArray = new Array();
    rubbishArray[0] = "Resources/rubbishBottle.png";
    rubbishArray[1] = "Resources/rubbishCan.png";
    rubbishArray[2] = "Resources/rubbishApple.png";

var rubbishRandom = 1;
var rubbishImage = new Image();
rubbishImage.src = rubbishArray[rubbishRandom];

var startScreen = new Image();
startScreen.src = 'Resources/startScreen.png';
var endScreen = new Image();
endScreen.src = 'Resources/endScreen.png';

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
        if (movement == 0) {
            movement ++;
        };
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        if (movement == 1) {
            movement --;
        };
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

document.onclick = function(event) {
    if (event===undefined) event= window.event;
    var target= 'target' in event? event.target : event.srcElement;
    if (target.tagName == "CANVAS") {
        click = true;
    }
};

function checkClick() {
    if(health < 0) {
        clearInterval(check);
        gameOver();
    }

    if (click === true) {
        draw();
        if (!continueAnimating) {
            continueAnimating = true;
            animate();
        };
    }
}

function drawStartScreen() {
    startScreen.onload = function()  {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(startScreen, 0, 0);
    }
}

function gameOver() {
    ctx.drawImage(endScreen, 0, 0);
    ctx.font = "40px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(""+startingScore, 200, 370);

    document.onclick = function(event) {
        if (event===undefined) event= window.event;
        var target= 'target' in event? event.target : event.srcElement;
        if (target.tagName == "CANVAS") {
            window.location.reload();
        }
    };
}

function drawPaddle() {
    ctx.beginPath();
    ctx.imageSmoothingEnabled = false;
    if (movement == 1) {
        ctx.drawImage(turtleRight, paddleX, canvas.height-70);
    } else if (movement == 0) {
        ctx.drawImage(turtleLeft, paddleX, canvas.height-70);
    }
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+startingScore, 8, 20);
    ctx.fillText("Health: "+health, 380, 20);
}
    
function addRubbish() {
    var rubbish = {
        width: rubbishWidth,
        height: rubbishHeight
    }
    resetRubbish(rubbish);
    rubbishList.push(rubbish);
}

function addFood() {
    var food = {
        width: foodWidth,
        height: foodHeight
    }
    resetFood(food);
    foodList.push(food);
}
    
// Move rubbish to top of screen and assign randomised speed
function resetRubbish(rubbish) {
    var randomSpeed = rubbishSpeedMultiply + Math.random() * 0.5;
    rubbish.x = Math.random() * (canvas.width - rubbishWidth);
    rubbish.y = 15 + Math.random() * 30;
    if(randomSpeed < 10) {
        rubbish.speed = randomSpeed;
    }
}

// Move food to top of screen, not randomised speed
function resetFood(food) {
    food.x = Math.random() * (canvas.width - rubbishWidth);
    food.y = 15 + Math.random() * 30;
    food.speed = 3;
}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}
    
function animate() {
    if (health > -1) {
        // request another animation frame
        if (continueAnimating) {
            requestAnimationFrame(animate);
        }

        // for each rubbish
        // (1) check for collisions
        // (2) advance the rubbish
        // (3) if the rubbish falls below the canvas, reset that rubbish

        for (var i = 0; i < rubbishList.length; i++) {

            var rubbish = rubbishList[i];

            // test for rubbish and paddle collision
            if (isColliding(rubbish, paddle)) {
                health -= 1;
                sound.play('rubbish');
                resetRubbish(rubbish);
            }

            // advance the rubbish
            rubbish.y += rubbish.speed;

            // if the rubbish is below the canvas,
            if (rubbish.y > canvas.height) {
                rubbishSpeedMultiply += 0.1;
                resetRubbish(rubbish);
            }

        }

        // for each food
        // (1) check for collisions
        // (2) advance the food
        // (3) if the food falls below the canvas, reset that food

        for (var i = 0; i < foodList.length; i++) {

            var food = foodList[i];

            //test for rubbish and paddle collision
            if (isColliding(food, paddle)) {
                startingScore += 10;
                sound.play('food');
                resetFood(food);
            }

            // advance the rubbish
            food.y += food.speed;

            // if the rubbish is below the canvas,
            if (food.y > canvas.height) {
                resetFood(food);
            }
        }
    }
}

function draw() {
    if (health > -1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle();
        drawScore();

        // draw rubbish
        for (var i = 0; i < rubbishList.length; i++) {
            var rubbish = rubbishList[i];
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(rubbishImage, rubbish.x, rubbish.y);
        }

        // draw food
        for (var i = 0; i < foodList.length; i++) {
            var food = foodList[i];
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(foodImage, food.x, food.y);
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 5;
            paddle.x += 5;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 5;
            paddle.x -= 5;
        }

        x += dx;
        y += dy;
    }
}

drawStartScreen();
var check = setInterval(checkClick,15);
check;