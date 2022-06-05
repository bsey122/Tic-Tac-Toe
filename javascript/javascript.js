const gameboard = (function () { // Module for the gameboard
    const board = ['','','','','','','','','']; // Empty board array

    /* Adds moves to the gameboard using an array for moves and a symbol to indicate the player */
    function addToBoard(player, moves) {
        for (let index = 0; index < moves.length; index++) {
            let move = moves[index];
            board[move] = player;
        }
    }
    return {board, addToBoard}
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
    
    _gameboardContainer.addEventListener('click', __gameboardListenerFuctions);

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
                _gameboardContainer.appendChild(sqaure);
            }        
        }    
    }

    function clearBoard() {
        _removeNodes(_gameboardContainer);
    }

    function getPlayerObj(playerObj) {
        let player = playerObj;
        return player;
    }

    function __gameboardListenerFuctions(e) {
        __displayMove(e);
        __getMove(e);
    }

    function __displayMove(e) {
        if (e.target.dataset.index) {
            const move = e.target;
        }
    }

    function __getMove(e) {
        if (e.target.dataset.index) {
            const moveValue = e.target.dataset.index;
        }
    }
return {displayBoard, clearBoard, getPlayerObj};
})();

const game = (function () { // Module to control the flow of the game
    const player1 = Player('Player 1', 'x');
    const player2 = Player('Player 2', 'o');
    
    let player1Symbol = player1.getSymbol();
    let player2Symbol = player2.getSymbol();

    let board = gameboard.board;
    
    function switchTurn(playerTurn) {
        if (playerTurn === 'x') {
            return player2Symbol;
        } else if (playerTurn === 'o') {
            return player1Symbol;
        } else {
            return
        }
    }

    function isWin(board, symbol) {
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
    
    function isTie(board) {
        let tie = true;
        for (let i = 0; i < board.length; i++) {
            const element = board[i];
            if (element === '') {
                tie = false;
            }
        }
        return tie;
    }

    return {player1, player2, switchTurn, isWin, isTie, board};
 })();