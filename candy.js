const cols = 9
const rows = 9
let score = 0

let candies = ['Blue', 'Green', 'Orange', 'Purple', 'Red', 'Yellow']
let board = []
let selectedCandy = null
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
    return candies[Math.floor(Math.random() * candies.length)]
}

function startGame() {
    for(let r = 0; r < rows; r++) {
        let row = []
        for(let c = 0; c < cols; c++) {

            const candy = document.createElement('img')
            candy.src = './images/' + randomCandy() + '.png'
            candy.id = r.toString() + '-' + c.toString()

            //DRAG FUNCTIONALITY
            candy.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            candy.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            candy.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            candy.addEventListener("dragleave", dragLeave); //leave candy over another candy
            candy.addEventListener("drop", dragDrop); //dropping a candy over another candy
            candy.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies

            row.push(candy)
            document.getElementById('board').appendChild(candy)
        }
        board.push(row)
    }
}

function dragStart() {
    selectedCandy = this
}
function dragOver(e) {
    e.preventDefault()
}
function dragEnter(e) {
    e.preventDefault()
}
function dragLeave(e) {
    e.preventDefault()
}
function dragDrop() {
    otherCandy = this
}
function dragEnd() {
    if(selectedCandy.src.includes('blank') || otherCandy.src.includes('blank')) return
    let currCoords = selectedCandy.id.split('-')
    let r1 = parseInt(currCoords[0])
    let c1 = parseInt(currCoords[1])

    let otherCoords = otherCandy.id.split('-')
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])

    const isLeft = c2 == c1 - 1 && r1 == r2
    const isRight = c2 == c1 + 1 && r1 == r2
    const isUp = r2 == r1 - 1 && c1 == c2
    const isDown = r2 == r1 + 1 && c1 == c2

    const isAdjacent = isLeft || isRight || isUp || isDown

    if(isAdjacent) {
        let currImg = selectedCandy.src
        let otherImg = otherCandy.src
        otherCandy.src = currImg
        selectedCandy.src = otherImg

        if(!checkValid()) {
            let currImg = selectedCandy.src
            let otherImg = otherCandy.src
            otherCandy.src = currImg
            selectedCandy.src = otherImg
        }
    }
}

function crushCandy() {
    crushThree()
    document.getElementById('score').innerText = score
}

function crushThree() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 2; c++) {
            let curr = board[r][c].src
            let next = board[r][c+1].src
            let last = board[r][c+2].src


            if(curr == next && next == last && !board[r][c].src.includes("blank")) {
                board[r][c].src = "./images/blank.png";
                board[r][c+1].src = "./images/blank.png";
                board[r][c+2].src = "./images/blank.png";
                score += 30
            }
        }
    }

    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows - 2; r++) {
            let curr = board[r][c].src
            let next = board[r+1][c].src
            let last = board[r+2][c].src


            if(curr == next && next == last && !board[r][c].src.includes("blank")) {
                board[r][c].src = "./images/blank.png";
                board[r+1][c].src = "./images/blank.png";
                board[r+2][c].src = "./images/blank.png";
                score += 30
            }
        }
    }
}

function checkValid() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols - 2; c++) {
            let curr = board[r][c].src
            let next = board[r][c+1].src
            let last = board[r][c+2].src


            if(curr == next && next == last && !board[r][c].src.includes("blank")) {
                return true
            }
        }
    }

    for(let c = 0; c < cols; c++) {
        for(let r = 0; r < rows - 2; r++) {
            let curr = board[r][c].src
            let next = board[r+1][c].src
            let last = board[r+2][c].src


            if(curr == next && next == last && !board[r][c].src.includes("blank")) {
                return true
            }
        }
    }
    return false
}

function slideCandy() {
    for(let c = 0; c < cols; c++) {
        let ind = rows - 1
        for(let r = cols - 1; r >= 0; r--) {
            if(!board[r][c].src.includes('blank')) {
                board[ind][c].src = board[r][c].src
                ind--
            }
        }

        for(let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
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