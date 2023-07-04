"use strict";

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    snowflakes = [],
    maxSnowflakes = 200,
    snakeSize = 10, // Width and height of each segment
    snakeSpeed = 10, // Space between each segment
    initialSegments = 10, // Number of initial segments
    snakeSegments = [],
    snakeDirection = 'right';

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

function createSnake() {
  let initialX = 0;
  let initialY = 0;

  for (let i = 0; i < initialSegments; i++) {
    snakeSegments.push({ x: initialX, y: initialY });
    initialX -= snakeSpeed;
  }
}

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = 'green';

  for (let i = 0; i < snakeSegments.length; i++) {
    let segment = snakeSegments[i];
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  }

  ctx.closePath();
}

function updateSnake() {
  let head = { x: snakeSegments[0].x, y: snakeSegments[0].y };

  switch (snakeDirection) {
    case 'up':
      head.y -= snakeSpeed;
      break;
    case 'down':
      head.y += snakeSpeed;
      break;
    case 'left':
      head.x -= snakeSpeed;
      break;
    case 'right':
      head.x += snakeSpeed;
      break;
  }

  if (head.x < 0) {
    head.x = w - snakeSpeed;
  } else if (head.x >= w) {
    head.x = 0;
  }

  if (head.y < 0) {
    head.y = h - snakeSpeed;
  } else if (head.y >= h) {
    head.y = 0;
  }

  snakeSegments.unshift(head);

  if (snakeSegments.length > initialSegments) {
    snakeSegments.pop();
  }
}

function handleKeyPress(event) {
  let key = event.key.toLowerCase();

  if (key === 'w' && snakeDirection !== 'down') {
    snakeDirection = 'up';
  } else if (key === 's' && snakeDirection !== 'up') {
    snakeDirection = 'down';
  } else if (key === 'a' && snakeDirection !== 'right') {
    snakeDirection = 'left';
  } else if (key === 'd' && snakeDirection !== 'left') {
    snakeDirection = 'right';
  }
}

window.addEventListener('keydown', handleKeyPress);

createSnake();

function animation() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < maxSnowflakes; i++) {
    snowflakes[i].draw();
    snowflakes[i].update();
  }

  updateSnake();
  drawSnake();

  window.requestAnimationFrame(animation);
}

animation();
