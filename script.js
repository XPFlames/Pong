const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

// Player paddles and ball positions
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
let player1Score = 0;
let player2Score = 0;

// Paddle speed
let paddleSpeed = 7;
let upArrowPressed = false;
let downArrowPressed = false;
let wKeyPressed = false;
let sKeyPressed = false;

// Draw the paddles, ball, and score
function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(canvas.width / 2 - 1, i, 2, 10);
    }
}

function drawScore() {
    ctx.font = '32px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
}

// Reset ball position after scoring
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Handle ball movement and collision
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with left paddle (Player 1)
    if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    // Ball collision with right paddle (Player 2)
    else if (ballX + ballRadius > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Scoring
    if (ballX - ballRadius < 0) {
        player2Score++;
        resetBall();
    } else if (ballX + ballRadius > canvas.width) {
        player1Score++;
        resetBall();
    }
}

// Handle paddle movement
function movePaddles() {
    if (wKeyPressed && player1Y > 0) {
        player1Y -= paddleSpeed;
    } else if (sKeyPressed && player1Y + paddleHeight < canvas.height) {
        player1Y += paddleSpeed;
    }

    if (upArrowPressed && player2Y > 0) {
        player2Y -= paddleSpeed;
    } else if (downArrowPressed && player2Y + paddleHeight < canvas.height) {
        player2Y += paddleSpeed;
    }
}

// Keydown event listeners
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            upArrowPressed = true;
            break;
        case 'ArrowDown':
            downArrowPressed = true;
            break;
        case 'w':
            wKeyPressed = true;
            break;
        case 's':
            sKeyPressed = true;
            break;
    }
});

// Keyup event listeners
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            upArrowPressed = false;
            break;
        case 'ArrowDown':
            downArrowPressed = false;
            break;
        case 'w':
            wKeyPressed = false;
            break;
        case 's':
            sKeyPressed = false;
            break;
    }
});

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawNet();
    drawScore();
    drawPaddle(0, player1Y); // Player 1
    drawPaddle(canvas.width - paddleWidth, player2Y); // Player 2
    drawBall();

    moveBall();
    movePaddles();

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
