let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')

let boxes = Array.from( document.getElementsByClassName('box'))

let winner = getComputedStyle(document.body).getPropertyValue('--winning-blocks')


const O_TEXT = 'O'
const X_TEXT = 'X'

let currentPlayer = X_TEXT

let spaces = Array(9).fill(null)

let count_plays = 0

const startGame = () =>{
    boxes.forEach(box =>  box.addEventListener('click', boxClick))
}

function boxClick(e){
    const id = e.target.id

    if(!spaces[id] && count_plays <9){
        spaces[id] = currentPlayer

        e.target.innerText = currentPlayer

        if (playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.background=winner)
            winning_blocks.map(box => boxes[box].style.color="green")
            count_plays =10
            return
        }
        count_plays++
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
    if(count_plays === 9){
        playerText.innerHTML = 'No Winners'

        boxes.forEach(box => box.style.color = "red")
    }
}

const winning =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function playerHasWon(){
    for (const iterator of winning) {
        let [a, b, c] = iterator

        if(spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces [c ])){
            return [a,b,c]
        }
    }
    return false
}
restartBtn.addEventListener('click', restart)

function restart (){
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.background=""
        box.style.color=""
    })

    playerText.innerHTML = 'Tic Tac Toe'
    count_plays = 0
    currentPlayer = X_TEXT
}

startGame()



