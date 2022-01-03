
let player1 = document.querySelector('#player-1');
let player2 = document.querySelector('#player-2');
let form = document.querySelector('#form');
let btnRollTheDice = document.querySelector('#rollTheDice');
let scoresGlobal;
let roundScore;
let gameStart;
let panelActive = 1;


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
    
    //Reset all points
    scoresGlobal = [0, 0];
    roundScore = 0;

    document.getElementById('scoreGlobal-1').textContent = '0';
    document.getElementById('scoreGlobal-2').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';
    // Removing the 'active status' from the winning player 
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-2-panel').classList.remove('active');

    // Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'  
    document.querySelector('.player-2-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');

});


btnRollTheDice.addEventListener('click', () => {
        // Generate a random number between 1 and 6
        let numberDice = Math.floor(Math.random() * 6) + 1;

        // Modifies the face of the die according to the number generated
        document.querySelector("#dice img").setAttribute("src",
                    "img/dices-faces/dice-" + numberDice + ".svg");

        // Adds the generated number to the active player's score
        if(numberDice !== 1) {
            roundScore += numberDice;
            document.querySelector('#current-' + panelActive).textContent = roundScore;
        } else {
        // if the player falls on 1, reinitializes the score and it is the second player's turn
            roundScore = 0;
            nextPlayer();
        }  
});