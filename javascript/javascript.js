const gameboard = (function () { // Module for the gameboard
    const _board = ['','','','','','','','','']; // Empty board array

    /* Adds moves to the gameboard using an array for moves and a symbol to indicate the player */
    function _addToBoard(player, moves) {
        for (let index = 0; index < moves.length; index++) {
            let move = moves[index];
            _board[move] = player
        }
    }
})();