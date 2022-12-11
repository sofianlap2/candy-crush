const rows = 9
const cols = 9
let board = []

let turnLeft = 20

const colors = ['Blue', 'Green', 'Orange', 'Purple', 'Red', 'Yellow']
let score = 0

let currentCandy = null
let otherCandy = null

window.onload = function() {
    startGame()

    setInterval(() => {
        crushCandy()
        slideCandy()
        generateCandy()
    }, 100)
}

function randomCandy() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function startGame() {
    for(let r = 0; r < rows; r++) {
        let row = []
        for(let c = 0; c < cols; c++) {
            let currImg = randomCandy()

            const tile = document.createElement('img')
            tile.id = r.toString() + '-' + c.toString()
            tile.src = './images/' + currImg + '.png'

            tile.addEventListener('dragstart', dragStart)
            tile.addEventListener('dragenter', dragEnter)
            tile.addEventListener('dragleave', dragLeave)
            tile.addEventListener('dragover', dragOver)
            tile.addEventListener('drop', dragDrop)
            tile.addEventListener('dragend', dragEnd)

            row.push(tile)
            document.getElementById('board').append(tile)
        }
        board.push(row)
    }
}

function dragStart() {
    currentCandy = this
}
function dragEnter(e) {
    e.preventDefault()
}
function dragLeave(e) {
    e.preventDefault()
}
function dragOver(e) {
    e.preventDefault()
}
function dragDrop() {
    otherCandy = this
}
function dragEnd() {
    if(currentCandy.src.includes('blank') || otherCandy.src.includes('blank')) return
    let currCoords = currentCandy.id.split('-')
    let r1 = parseInt(currCoords[0])
    let c1 = parseInt(currCoords[1])

    let otherCoords = otherCandy.id.split('-')
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])

    let isLeft = c2 == c1 - 1 && r1 == r2
    let isRight = c2 == c1 + 1 && r1 == r2
    let isUp = r2 == r1 - 1 && c1 == c2
    let idDown = r2 == r1 + 1 && c1 == c2

    let isAdjacent = isLeft || isRight || isUp || idDown

    if(isAdjacent) {
        let currImg = currentCandy.src
        let otherImg = otherCandy.src
        currentCandy.src = otherImg
        otherCandy.src = currImg

        if(!checkValid()) {
            let currImg = currentCandy.src
            let otherImg = otherCandy.src
            currentCandy.src = otherImg
            otherCandy.src = currImg
        } else {
            turnLeft--
            document.getElementById('turn').innerText = turnLeft
        }
    }
}

function checkValid() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 2; c++) {
            if(board[r][c].src == board[r][c+1].src && board[r][c+1].src == board[r][c+2].src && !board[r][c].src.includes('blank')) {
                return true
            }
        }
    }

    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows - 2; r++) {
            if(board[r][c].src == board[r+1][c].src && board[r+1][c].src == board[r+2][c].src && !board[r][c].src.includes('blank')) {
                return true
            }
        }
    }
    return false
}

function crushCandy() {
    crushFive()
    crushFour()
    crushThree()
    document.getElementById('score').innerText = score
}

function crushThree() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 2; c++) {
            if(board[r][c].src == board[r][c+1].src && board[r][c+1].src == board[r][c+2].src && !board[r][c].src.includes('blank')) {
                board[r][c].src = './images/blank.png'
                board[r][c+1].src = './images/blank.png'
                board[r][c+2].src = './images/blank.png'
                score += 30
            }
        }
    }

    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows - 2; r++) {
            if(board[r][c].src == board[r+1][c].src && board[r+1][c].src == board[r+2][c].src && !board[r][c].src.includes('blank')) {
                board[r][c].src = './images/blank.png'
                board[r+1][c].src = './images/blank.png'
                board[r+2][c].src = './images/blank.png'
                score += 30
            }
        }
    }

}

function crushFour() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 3; c++) {
            if(board[r][c].src == board[r][c+1].src && board[r][c+1].src == board[r][c+2].src && board[r][c+2].src == board[r][c+3].src && !board[r][c].src.includes('blank')) {
                board[r][c].src = './images/blank.png'
                board[r][c+1].src = './images/blank.png'
                board[r][c+2].src = './images/blank.png'
                board[r][c+3].src = './images/blank.png'
                score += 40
            }
        }
    }

    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows - 3; r++) {
            if(board[r][c].src == board[r+1][c].src && board[r+1][c].src == board[r+2][c].src && board[r+2][c].src == board[r+3][c].src && !board[r][c].src.includes('blank')) {
                board[r][c].src = './images/blank.png'
                board[r+1][c].src = './images/blank.png'
                board[r+2][c].src = './images/blank.png'
                board[r+3][c].src = './images/blank.png'
                score += 40
            }
        }
    }
}

function crushFive() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 4; c++) {
            if(board[r][c].src == board[r][c+1].src && board[r][c+1].src == board[r][c+2].src && board[r][c+2].src == board[r][c+3].src && board[r][c+3].src == board[r][c+4].src && !board[r][c].src.includes('blank')) {
                board[r][c].src = './images/blank.png'
                board[r][c+1].src = './images/blank.png'
                board[r][c+2].src = './images/blank.png'
                board[r][c+3].src = './images/blank.png'
                board[r][c+4].src = './images/blank.png'
                score += 50
            }
        }
    }

    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows - 4; r++) {
            if(board[r][c].src == board[r+1][c].src && board[r+1][c].src == board[r+2][c].src && board[r+2][c].src == board[r+3][c].src && board[r][c+3].src == board[r][c+4].src && !board[r][c].src.includes('blank')) {
                board[r][c].src = './images/blank.png'
                board[r+1][c].src = './images/blank.png'
                board[r+2][c].src = './images/blank.png'
                board[r+3][c].src = './images/blank.png'
                board[r+4][c].src = './images/blank.png'
                score += 50
            }
        }
    }
}

function slideCandy() {
    for(let c = 0; c < cols; c++) {
        let ind = rows - 1
        for(let r = rows - 1; r >= 0; r--) {
            if(!board[r][c].src.includes('blank')) {
                board[ind][c].src = board[r][c].src
                ind--
            }
        }

        for(let r = ind; r >= 0; r--) {
            board[r][c].src = './images/blank.png'
        }
    }
}

function generateCandy() {
    for(let c = 0; c < cols; c++) {
        if(board[0][c].src.includes('blank')) {
            board[0][c].src = './images/' + randomCandy() + '.png'
        }
    }
}