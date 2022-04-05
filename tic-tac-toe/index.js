// Variables and definition
const circle = '<svg class="figure circle"><circle r="45" cx="60" cy="60" stroke="#205b89" stroke-width="8" fill="transparent" stroke-linecap="round"></circle></svg>'
const cross = '<svg class="figure cross"><line class="firstLine" x1="15" y1="15" x2="100" y2="100" stroke="#205b89" stroke-width="8" stroke-linecap="round"></line><line class="secondLine" x1="100" y1="15" x2="15" y2="100" stroke="#205b89" stroke-width="8" stroke-linecap="round"></line></svg>'
const winLines = document.querySelectorAll('.win_line')
const cell = document.querySelectorAll('.box')
const board = document.querySelector('.board')
const whosMove = document.querySelector('.movesAlert')
const newGameBtn = document.querySelector('.new_game')
const playerCount = document.querySelector('.player_count')
const computerCount = document.querySelector('.computer_count')
const drawCount = document.querySelector('.draw_count') 
const dia = document.querySelector('.diagonal1')
const winningConditions = [
    [0, 1, 2], //rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //colunms
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //diagonals
    [2, 4, 6]
];


// Setting up
let movesCount = 1
let gameActive = true
let crossWins = 0
let circleWins = 0
let draws = 0
let currentPlayer = "cross"
let tempArr = []

scoreCount()
countUpdate()

// Functions
function isItDraw () {
    if (movesCount > 9) {
        gameActive = false
        console.log('gameActive = false')
        draws++
        countUpdate()
        whosMove.innerHTML = `No more empty cells left!!! it's a draw!`
        return
    }
}

function isItWin () {
    winningConditions.forEach( (value, index) => 
    {
        if (cell[value[0]].innerHTML !== '' ||
            cell[value[1]].innerHTML !== '' ||
            cell[value[2]].innerHTML !== '') 
            {
                if (cell[value[0]].innerHTML === cell[value[1]].innerHTML &&
                    cell[value[1]].innerHTML === cell[value[2]].innerHTML) 
                {
                    if (cell[value[0]].innerHTML === cross) 
                    {
                        console.log(`win stroke is ${value[0]}${value[1]}${value[2]}`)
                        changeColorOfCell (value[0], value[1], value[2])
                        gameActive = false
                        console.log('gameActive = false')
                        crossWins++
                        countUpdate()
                        whosMove.innerHTML = `it was for ${movesCount} moves!!! Player wins!`
                        return
                    }   else if (cell[value[0]].innerHTML === circle) 
                    {
                        console.log(`win stroke is ${value[0]}${value[1]}${value[2]}`)
                        changeColorOfCell (value[0], value[1], value[2])
                        gameActive = false
                        console.log('gameActive = false')
                        circleWins++
                        countUpdate()
                        whosMove.innerHTML = `it was for ${movesCount} moves!!! Student1 wins!`
                        return
                    }
                }
            }
    })
}
function changeColorOfCell (cell1, cell2, cell3) {
    cell.forEach( (item) => {
        item.classList.add('blur')
    })
    cell[cell1].classList.add('winStroke')
    cell[cell2].classList.add('winStroke')
    cell[cell3].classList.add('winStroke')

}
function countUpdate() {
    playerCount.innerHTML = crossWins
    computerCount.innerHTML = circleWins
    drawCount.innerHTML = `Draws: ${draws}`

}

function scoreCount () {
    isItDraw()
    if (gameActive === true) {
        if (movesCount % 2 === 1) {
            whosMove.innerHTML = `It's ${movesCount} turn. Turn of ${currentPlayer}`
        } else whosMove.innerHTML = `It's ${movesCount} turn. Turn of ${currentPlayer}`
        return
    }
}

function endGame () {
    if ( tempArr.length < 1 ) {
        whosMove.innerHTML = whosMove.innerHTML + ` <b>It's a draw!</b>`
        gameActive = false
        console.log('gameActive = false')
    }
}

function clearField () {
    let imagesDelete = document.querySelectorAll('.figure')
        for(let i = 0; i < imagesDelete.length; i++) {
            imagesDelete[i].remove();}
    cell.forEach( (value) => {
        value.style.background = 'none'

    })            
    cell.forEach( (item) =>{
        item.classList.remove('winStroke')
        item.classList.remove('blur')
    }) 
}

function greatBelorussianRandom () {
    console.log('start of VBR')
    let tempArr = []
    cell.forEach( (value, index) => {
        if (value.innerHTML === '')  
        {tempArr.push(index)}
    })
    let randomNumber = parseInt(Math.random() * tempArr.length)
    console.log(`random num: ${randomNumber}`)
    let emptyCellIndex = tempArr[randomNumber]
    cell[emptyCellIndex].innerHTML = circle
    console.log(`comp move is cell #${tempArr[randomNumber]}`)
    
    console.log(`index of empty cells = ${tempArr}`)
}

function boardAnalysis () {
    console.log('start of boardAnalysis')
    
    for (winCond of winningConditions) {
        if (((cell[winCond[0]].innerHTML === cross) &&
             (cell[winCond[1]].innerHTML === cross)) &&
             (cell[winCond[2]].innerHTML === '')) 
                {
                cell[winCond[2]].innerHTML = circle 
                console.log(`boardAnalysis: prevent winCondition = ${winCond}`)
                return
                }  
        if (((cell[winCond[1]].innerHTML === cross) &&
            (cell[winCond[2]].innerHTML === cross)) &&
            (cell[winCond[0]].innerHTML === '')) 
                {
                cell[winCond[0]].innerHTML = circle 
                console.log(`boardAnalysis: prevent winCondition = ${winCond}`)
                return
                }  
        if (((cell[winCond[2]].innerHTML === cross) &&
            (cell[winCond[0]].innerHTML === cross)) &&
            (cell[winCond[1]].innerHTML === '')) 
                {
                cell[winCond[1]].innerHTML = circle 
                console.log(`boardAnalysis: prevent winCondition = ${winCond}`)
                return
                }  
        if (((cell[winCond[0]].innerHTML === circle) &&
                (cell[winCond[1]].innerHTML === circle)) &&
                (cell[winCond[2]].innerHTML === '')) 
                {
                cell[winCond[2]].innerHTML = circle 
                console.log(`boardAnalysis: winCondition achieved = ${winCond}`)
                return
                }  
           if (((cell[winCond[1]].innerHTML === circle) &&
               (cell[winCond[2]].innerHTML === circle)) &&
               (cell[winCond[0]].innerHTML === '')) 
                   {
                   cell[winCond[0]].innerHTML = circle 
                   console.log(`boardAnalysis: winCondition achieved = ${winCond}`)
                   return
                   }  
           if (((cell[winCond[2]].innerHTML === circle) &&
               (cell[winCond[0]].innerHTML === circle)) &&
               (cell[winCond[1]].innerHTML === '')) 
                   {
                   cell[winCond[1]].innerHTML = circle 
                   console.log(`boardAnalysis: winCondition achieved = ${winCond}`)
                   return
                   }  
    }
    if (cell[4].innerHTML === '') {
        cell[4].innerHTML = circle
    } else greatBelorussianRandom()
}



// Listeners

board.addEventListener('click', () => {
    if (gameActive === true) {
        if (currentPlayer === 'cross') {
            if (event.target.getElementsByTagName('svg').length !== 0){
                console.log('WRONG!!!')
                console.log(event.target)
                console.log(event.target.getElementsByTagName('svg').length)
                return
            }
            if (event.target.innerHTML === ""){
                event.target.innerHTML = cross
                console.log('player made a move')
                isItWin()
                movesCount++
                currentPlayer = 'circle'
                scoreCount ()
                    if (gameActive === true) {
                        setTimeout(boardAnalysis, 1500)
                        setTimeout(isItWin, 1500)
                        movesCount++
                        currentPlayer = 'cross'
                        setTimeout(scoreCount, 1500)
                    }
                }
            }
        
        }
    })

// board.addEventListener('click', () => {
//     if (gameActive === true) {
//         if (currentPlayer === 'cross') {
//             if (event.target.innerHTML === ""){
//                 event.target.innerHTML = cross
//                 console.log('player made a move')
//                 isItWin()
//                 movesCount++
//                 currentPlayer = 'circle'
//                 scoreCount ()
//                 return
//                 }
//             }
//         if (currentPlayer === 'circle') {
//             setTimeout( () => {
//                 boardAnalysis()
//                 isItWin()
//                 movesCount++
//                 currentPlayer = 'cross'
//                 scoreCount(), 700})
//             return
//         }
//     }     
// })

newGameBtn.addEventListener('click', () => {
    if (gameActive === true) { 
        console.log('Game was not over. Student1 wins')
        circleWins++
        countUpdate()
    }
    clearField()
    movesCount = 1
    gameActive = true
    currentPlayer = 'cross'
    console.log(`new game started`)
    whosMove.innerHTML = `It's ${movesCount} turn. Turn of ${currentPlayer}`
})


// Logging
console.log(`
Task : https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30-7.md
Deploy: missing yet
Самооценка: 50 / 70

1) + Вёрстка +10
        реализован интерфейс игры +5
        в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2) + При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
3) + Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
4) + По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
5) - Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
6) + Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
7) - Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
        высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`)