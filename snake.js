const board = document.querySelector('#game-board')
const instructionText = document.querySelector('#instructions')
const logo = document.querySelector('#logo')


const gridSize = 20
let snake = [{ x: 10, y: 10 }]
let food = generateFood()
let direction = 'right'
let gameInterval;
let gameSpeed = 200
let gameStarted = false

function draw() {
    board.innerHTML = '';
    drawSnake();
    drawfood();
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
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
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
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break
            case 'ArrowDown':
                direction = 'down';
                break
            case 'ArrowLeft':
                direction = 'left';
                break
            case 'ArrowRight':
                direction = 'right';
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