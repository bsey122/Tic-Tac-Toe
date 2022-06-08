const gameboard = (function () { // Module for the gameboard
    const board = ['','','','','','','','','']; // Empty board array

    /* Adds moves to the gameboard using an array for moves and a symbol to indicate the player */
    function addToBoard(player, moves) {
        for (let index = 0; index < moves.length; index++) {
            let move = moves[index];
            board[move] = player;
        }
    }

    function clearBoard(board) {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        return board;
    }
    return {board, addToBoard, clearBoard}
})();

const Player = function (name, symbol) { // Factory function to create player objects
    let _player = {
        name,
        symbol
    };
    const getName = () => _player.name;
    const getSymbol = () => _player.symbol;
    const setName = (name) => _player.name = name;
    const setSymbol = (symbol) => _player.symbol = symbol;
    return {getName, getSymbol, setName, setSymbol};
}

const displayController = (function () { // Module to display gameboard
    const _gameboardContainer = document.querySelector('.gameboard');

    function _removeNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function displayBoard() {
        let boardSize = 3;
        _gameboardContainer.setAttribute('style', `grid-template-columns: repeat( ${boardSize}, 1fr)`);
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const sqaure = document.createElement('div');
                sqaure.setAttribute('data-index', `${(3*(i) + j)}`);
                sqaure.classList.add('cell');
                _gameboardContainer.appendChild(sqaure);
            }        
        }    
    }

    function clearBoard() {
        _removeNodes(_gameboardContainer);
    }

    function __displayMove(e, currentPlayer) {
        if (e.target.dataset.index) {
            const move = e.target;
            move.textContent = currentPlayer;
        }
    }

    function __getMove(e, moveObj) {
        if (e.target.dataset.index) {
            moveObj.move = e.target.dataset.index;
            return moveObj;
        }
    }
    
    function switchColour(e, currentPlayer) {
        if (e.target.classList.contains('cell')) {
            if (currentPlayer === 'x') {
                e.target.style.color = '#d53a9d';
            } else if (currentPlayer === 'o') {
                e.target.style.color = '#743ad5';
            } else {
                return;
            }
        }
    }
return {displayBoard, clearBoard, __displayMove, __getMove, switchColour};
})();

const game = (function () { // Module to control the flow of the game
    const _player1 = Player('Player 1', 'x');
    const _player2 = Player('Player 2', 'o');
    let currentPlayer;

    let _board = gameboard.board;

    const _restartButton = document.querySelector('.restart-button');
    _restartButton.addEventListener('click', __restart);
    
    function _switchTurn(playerTurn) {
        if (playerTurn === 'x') {
            return _player2;
        } else if (playerTurn === 'o') {
            return _player1;
        } else {
            return
        }
    }

    function _isWin(board, symbol) {
        const n = 3; // size of rows and columns
        
        // Checking rows
        for (let i = 0; i < n; i++) {
            let win = true;
            for (let j = 0; j < n; j++) {
                const element = (n*i) + j;
                if (board[element] !== symbol) {
                    win = false;
                    break;
                }
            } 
            if (win) {
                return win;
            }
        }

        // Checking columns
        for (let i = 0; i < n; i++) {
            let win = true;
            for (let j = 0; j < n; j++) {
                const element = (n*j) + i;
                if (board[element] !== symbol) {
                    win = false;
                    break;
                }  
            }
            if (win) {
                return win;
            }
        }

        // Checking diagonals
        let win = true;
        for (let i = 0; i < n; i++) {
            const element = (n + 1)*(i);
            if (board[element] !== symbol) {
                win = false;
                break;
            }
        }
        if (win) {
            return win;
        }

        win = true;
        for (let i = 0; i < n; i++) {
            const element = (n - 1)*(1 + i);
            if (board[element] !== symbol) {
                win = false;
                break;
            }
        }
        if (win) {
            return win;
        }
        return win;
    }
    
    function _isTie(board) {
        let tie = true;
        for (let i = 0; i < board.length; i++) {
            const element = board[i];
            if (element === '') {
                tie = false;
            }
        }
        return tie;
    }
    
    function _gameRound() {
        let moveObj = {};

        const _gameboardContainer = document.querySelector('.gameboard');
        const result = document.querySelector('.results');

        result.textContent = `${currentPlayer.getName()}'s Turn`;
        
        _gameboardContainer.addEventListener('click', function (e) {
            displayController.__getMove(e, moveObj);
            if (_board[moveObj.move] === '') {
                displayController.__displayMove(e, currentPlayer.getSymbol());
                gameboard.addToBoard(currentPlayer.getSymbol(), moveObj.move); 
                console.log(moveObj);
                if (_isWin(_board, currentPlayer.getSymbol())) {
                    result.textContent = `${currentPlayer.getName()} has won!`;
                    currentPlayer = _switchTurn(currentPlayer.getSymbol());
                    displayController.switchColour(e, currentPlayer.getSymbol());
                } else if (_isTie(_board)) {
                    result.textContent = `It's a draw!`;
                    currentPlayer = _switchTurn(currentPlayer.getSymbol());
                    displayController.switchColour(e, currentPlayer.getSymbol());
                } else {
                    currentPlayer = _switchTurn(currentPlayer.getSymbol());
                    result.textContent = `${currentPlayer.getName()}'s Turn`;
                    displayController.switchColour(e, currentPlayer.getSymbol());
                }
            }
        });
    }

    function __restart() {
        displayController.clearBoard();
        gameboard.clearBoard(_board);
        init();
    }

    function init() {
        currentPlayer = _player1;
        displayController.displayBoard();
        _gameRound();
    }

    return {init};
 })();