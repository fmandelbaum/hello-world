let gameState;

function resetGame() {
    gameState = {
        turn: throwCoin(),
        board: [],
        moves: 0,
        winner: 0
    };
    for (var i = 0; i < 3; i++) {
        gameState.board.push(["", "", ""]);
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            document.getElementById("c" + i + j).classList.remove("p1", "p2", "animated", "flipInX");
        }
    }
    drawBoard();
    changeTheme();
}

function drawBoard() {
    var board = document.getElementById("board");
    document.getElementById("reset").setAttribute("disabled", "disabled");
    board.classList.remove("w0", "w1", "w2");
    document.querySelector("#turn .turn").innerHTML = gameState.turn;
    if (gameState.winner === 0) {
        var el = document.querySelector("#turn .turn");
        el.classList.remove("p1", "p2");
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < gameState.board[i].length; j++) {
            var cell = document.getElementById("c" + i + j);
            cell.innerHTML = gameState.board[i][j];
            cell.classList.remove("p1", "p2");
            if (gameState.board[i][j] === "X") {
                cell.classList.add("p1");
            } else if (gameState.board[i][j] === "O") {
                cell.classList.add("p2");
            }
        }
    }
}

function play(cell) {
    var id = cell.getAttribute("id");
    var r = parseInt(id[1]);
    var c = parseInt(id[2]);
    if (gameState.winner === 0 && cell.innerHTML === "") {
        gameState.moves++;
        if (gameState.turn === 1) {
            gameState.board[r][c] = "X";
            gameState.turn = 2;
        } else {
            gameState.board[r][c] = "O";
            gameState.turn = 1;
        }
        document.getElementById("c" + r + c).classList.add("animated", "flipInX");
        drawBoard();
        checkWin(gameState.turn === 1 ? 2 : 1);
        if (gameState.moves === 9) {
            gameEnded();
        }
    }
}

function checkWin(player) {
    var check = player === 1 ? "X" : "O";
    var won = checkWinRow(check) || checkWinCol(check) || checkWinDiag(check);
    if (won) {
        gameState.winner = player;
        gameEnded();
    }
}

function checkWinRow(player) {
    return (gameState.board[0][0] === player && gameState.board[0][1] === player && gameState.board[0][2] === player) || (gameState.board[1][0] === player && gameState.board[1][1] === player && gameState.board[1][2] === player) || (gameState.board[2][0] === player && gameState.board[2][1] === player && gameState.board[2][2] === player);
}

function checkWinCol(player) {
    return (gameState.board[0][0] === player && gameState.board[1][0] === player && gameState.board[2][0] === player) || (gameState.board[0][1] === player && gameState.board[1][1] === player && gameState.board[2][1] === player) || (gameState.board[0][2] === player && gameState.board[1][2] === player && gameState.board[2][2] === player);
}

function checkWinDiag(player) {
    return (gameState.board[0][0] === player && gameState.board[1][1] === player && gameState.board[2][2] === player) || (gameState.board[0][2] === player && gameState.board[1][1] === player && gameState.board[2][0] === player);
}

function gameEnded() {
    var turn = document.querySelector("#turn .turn");
    document.getElementById("reset").removeAttribute("disabled");
    document.getElementById("board").classList.add("w" + gameState.winner);
    if (gameState.winner === 0) {
        turn.innerHTML = "Empate";
    } else {
        turn.innerHTML = gameState.winner;
        turn.classList.add("p" + gameState.winner);
    }
}

function changeTheme() {
    document.querySelector("body").setAttribute("class", document.getElementById("theme").value);
}

function throwCoin() {
    return Math.floor(getRandomInclusive(1.5, 2.5));
}

function getRandomInclusive(min, max) {
    return Math.random() * (max - min) + min;
}
