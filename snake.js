const board = document.querySelector('#game-board')
const instructionText = document.querySelector('#instructions')
const logo = document.querySelector('#logo')
const score = document.querySelector('#score')
const highScoreElement = document.querySelector('#highScore')

const gridSize = 20
let snake = [{ x: 10, y: 10 }]
let food = generateFood()
let direction = 'right'
let gameInterval;
let gameSpeed = 200
let gameStarted = false
let highScore = Number(localStorage.getItem('gameHighScore')) || 0;
highScoreElement.textContent = highScore.toString().padStart(3, '0');


function draw() {
    board.innerHTML = '';
    drawSnake();
    drawfood();
    updateScore();
}


function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement)
    })

}

function createGameElement(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function setPosition(element, position) {
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

function drawfood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1
    const y = Math.floor(Math.random() * gridSize) + 1
    return { x, y }
}

function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move()
            checkCollision()
            draw()
        }, gameSpeed);
    } else {
        snake.pop();
    }
}

function startGame() {
    gameStarted = true;
    instructionText.style.display = 'none'
    logo.style.display = 'none'
    gameInterval = setInterval(() => {
        move()
        checkCollision();
        draw();
    }, gameSpeed);
}

function keyPressListener(event) {
    if ((!gameStarted && event.code === 'Space') || (gameStarted && event.key === ' ')) {
        startGame();
    } else {
        const key = event.key.toLowerCase()
        switch (key) {
            case 'arrowup':
            case 'w':
                if (direction !== 'down') direction = 'up';
                break
            case 'arrowdown':
            case 's':
                if (direction !== 'up') direction = 'down';
                break
            case 'arrowleft':
            case 'a':
                if (direction !== 'right') direction = 'left';
                break
            case 'arrowright':
            case 'd':
                if (direction !== 'left') direction = 'right';
                break

        }
    }
}

document.addEventListener('keydown', keyPressListener)

function increaseSpeed() {
    console.log(gameSpeed)
    if (gameSpeed > 150) {
        gameSpeed -= 5;
    } else if (gameSpeed > 100) {
        gameSpeed -= 3;
    } else if (gameSpeed > 50) {
        gameSpeed -= 2;
    } else if (gameSpeed > 25) {
        gameSpeed -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore()
    stopGame()
    snake = [{ x: 10, y: 10 }];
    food = generateFood()
    direction = 'right'
    gameSpeed = 200
    updateScore()
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0')
}

function stopGame() {
    clearInterval(gameInterval)
    gameStarted = false
    instructionText.style.display = 'block'
    logo.style.display = 'block'
}

function updateHighScore() {
    const currentScore = snake.length - 1
    if (currentScore > highScore) {
        highScore = currentScore
        localStorage.setItem('gameHighScore', highScore)
        highScoreElement.textContent = highScore.toString().padStart(3, '0')
    }
}