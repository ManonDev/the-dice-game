
let player1 = document.querySelector('#player-1');
let player2 = document.querySelector('#player-2');
let form = document.querySelector('#form');
let scoresGlobal;
let roundScore;
let gameStart;

// Function NEW GAME
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ask for the names of the players
    player1.textContent = document.querySelector('#name-1').value;
    player2.textContent = document.querySelector('#name-2').value;

    // Close the modal if the names of the players are indicated
    if(player2.value != "" && player2.value != "") {
        $('#modal-new-game').modal('hide');
    }
 

});

