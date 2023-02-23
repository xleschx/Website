"use strict";

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    snowflakes = [],
    maxSnowflakes = 200,
    lightningX,
    lightningY;

// Random function to generate a random number between two values
function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }

    if (min > max) {
        let hold = max;
        max = min;
        min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Snowflake() {
    this.x = random(0, w);
    this.y = random(0, h);
    this.radius = random(2, 4);
    this.speed = random(1, 3);
    this.opacity = random(0.5, 1);
    this.angle = random(0, 360);
}

Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.closePath();
}

Snowflake.prototype.update = function () {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.speed;
    this.angle += 0.1;

    if (this.y > h) {
        this.y = -10;
    }
    if (this.x > w) {
        this.x = 0;
    } else if (this.x < 0) {
        this.x = w;
    }
}

for (let i = 0; i < maxSnowflakes; i++) {
    snowflakes.push(new Snowflake());
}

// Create the lightning function
function createLightning() {
    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Draw the snowflakes
    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes[i].draw();
        snowflakes[i].update();
    }

    // Draw the lightning
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.moveTo(lightningX, 0);
    ctx.lineTo(lightningX, lightningY);
    ctx.stroke();
    ctx.closePath();
}

// Handle the click event to get the x position of the lightning
canvas.addEventListener("click", function (event) {
    console.log("lightning")
    lightningX = event.clientX;
    lightningY = 20;
    createLightning();
});

// Start the animation    

function animation() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes[i].draw();
        snowflakes[i].update();
    }

    window.requestAnimationFrame(animation);
}


animation();

