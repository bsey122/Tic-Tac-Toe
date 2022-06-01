const gameboard = (function () { // Module for the gameboard
    const _board = ['','','','','','','','','']; // Empty board array

    /* Adds moves to the gameboard using an array for moves and a symbol to indicate the player */
    function _addToBoard(player, moves) {
        for (let index = 0; index < moves.length; index++) {
            let move = moves[index];
            _board[move] = player;
        }
    }
})();

const Player = function (name, symbol) { // Factory function to create player objects
    const getName = () => name;
    const getSymbol = () => symbol;
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
