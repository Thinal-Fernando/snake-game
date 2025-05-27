const board = document.querySelector('#game-board')

let snake = [{ x: 10, y: 10 }]


function draw() {
    board.innerHTML = '';
    drawSnake();
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


