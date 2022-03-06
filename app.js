const fields = document.querySelectorAll(".field")
const statusGame = document.querySelector(".status")

// Player factory pattern
const Player = (sign) => {
    const getSign = () => {return sign}
    return {getSign}
}

const gameBoard = (() => {
    const board = new Array(9)
    
    const setField = (id, sign) => {
        board[id] = sign
    }

    const getFieldSign = (id) => {
        return board[id]
    }

    const updateBoard = () => {
        fields.forEach((field, id) => {
            field.textContent = board[id]
        })
    }

    return {setField, updateBoard, getFieldSign}
})();


// handle all events of the game
const displayController = (() => {
    fields.forEach((field,id) => {
        field.addEventListener("click", () => {
            if (!field.textContent) {
                // clicked field is not taken
                 gameController.playRound(id)
            }
        })
    })
})();

const gameController = (() => {
    const PlayerX = Player("X")
    const PlayerO = Player("O")
    let round = 1;

    const getCurrentPlayerSign = () => {return (round % 2) == 1 ? PlayerX.getSign() : PlayerO.getSign()}
    
    const increaseRound = () => round++

    const playRound = (id) => {
        gameBoard.setField(id, getCurrentPlayerSign())
        gameBoard.updateBoard()
        if (checkWinner()) {
            console.log("heeeyyyyyyy")
        } else if (checkTie()) {
            console.log("tie")
        }
     
        increaseRound()
        dispalyCurrentPlayer()
    }

    const dispalyCurrentPlayer = () => {
        statusGame.textContent = "Player " + getCurrentPlayerSign() + "'s turn"
    }

    const checkWinner = () => {
        const winningConidtions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < 8; i++) {
            const winningCondition = winningConidtions[i]
            let first = gameBoard.getFieldSign(winningCondition[0])
            let second = gameBoard.getFieldSign(winningCondition[1])
            let third = gameBoard.getFieldSign(winningCondition[2])
            
            if (typeof first === 'undefined' || typeof second === 'undefined' || typeof third === 'undefined') continue

            if (first === second && first === third) return true // found a winner
        } 
        return false   
    }

    const checkTie = () => {
        if (round == 9) return true
        return false
    }


    return {playRound}
})();







