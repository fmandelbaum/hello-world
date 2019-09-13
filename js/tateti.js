let gameState;

function resetGame() {
    gameState = {
        turn: throwCoin(),
        board: [],
        moves: 0,
        winner: 0,
        theme: document.getElementById("theme").value
    };
    var storedGameState = localStorage.getItem("tatetiGameState");
    if (storedGameState) {
        gameState = JSON.parse(storedGameState);
        document.getElementById("theme").value = gameState.theme;
    } else {
        for (var i = 0; i < 3; i++) {
            gameState.board.push(["", "", ""]);
        }
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                document.getElementById("c" + j + k).classList.remove("p1", "p2", "wc", "animated", "flipInX");
            }
        }
        gameState.theme = document.getElementById("theme").value;
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
            var boardContent = gameState.board[i][j];
            cell.innerHTML = boardContent;
            if (boardContent !== "") {
                if (boardContent === "X") {
                    cell.classList.add("p1");
                } else {
                    cell.classList.add("p2");
                }
            }
        }
    }
    localStorage.setItem("tatetiGameState", JSON.stringify(gameState));
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
    if (checkWinRow(check) || checkWinCol(check) || checkWinDiag(check)) {
        gameState.winner = player;
        gameEnded();
    }
}

function hiliteWinningCombination(cells) {
    cells.forEach(function(cell) { document.getElementById(cell).classList.add("wc"); });
}

function checkWinRow(player) {
    var wonRow1 = gameState.board[0][0] === player && gameState.board[0][1] === player && gameState.board[0][2] === player;
    if (wonRow1) {
        hiliteWinningCombination(["c00", "c01", "c02"]);
        return true;
    }
    var wonRow2 = gameState.board[1][0] === player && gameState.board[1][1] === player && gameState.board[1][2] === player;
    if (wonRow2) {
        hiliteWinningCombination(["c10", "c11", "c12"]);
        return true;
    }
    var wonRow3 = gameState.board[2][0] === player && gameState.board[2][1] === player && gameState.board[2][2] === player;
    if (wonRow3) {
        hiliteWinningCombination(["c20", "c21", "c22"]);
        return true;
    }
    return false;
}

function checkWinCol(player) {
    var wonCol1 = gameState.board[0][0] === player && gameState.board[1][0] === player && gameState.board[2][0] === player;
    if (wonCol1) {
        hiliteWinningCombination(["c00", "c10", "c20"]);
        return true;
    }
    var wonCol2 = gameState.board[0][1] === player && gameState.board[1][1] === player && gameState.board[2][1] === player;
    if (wonCol2) {
        hiliteWinningCombination(["c01", "c11", "c21"]);
        return true;
    }
    var wonCol3 = gameState.board[0][2] === player && gameState.board[1][2] === player && gameState.board[2][2] === player;
    if (wonCol3) {
        hiliteWinningCombination(["c02", "c12", "c22"]);
        return true;
    }
    return false;
}

function checkWinDiag(player) {
    var wonDiag1 = gameState.board[0][0] === player && gameState.board[1][1] === player && gameState.board[2][2] === player;
    if (wonDiag1) {
        hiliteWinningCombination(["c00", "c11", "c22"]);
        return true;
    }
    var wonDiag2 = gameState.board[0][2] === player && gameState.board[1][1] === player && gameState.board[2][0] === player;
    if (wonDiag2) {
        hiliteWinningCombination(["c02", "c11", "c20"]);
        return true;
    }
    return false;
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
    localStorage.removeItem("tatetiGameState");
}

function changeTheme() {
    gameState.theme = document.getElementById("theme").value;
    document.querySelector("body").setAttribute("class", gameState.theme);
    localStorage.setItem("tatetiGameState", JSON.stringify(gameState));
}

function throwCoin() {
    return Math.floor(getRandomInclusive(1.5, 2.5));
}

function getRandomInclusive(min, max) {
    return Math.random() * (max - min) + min;
}
