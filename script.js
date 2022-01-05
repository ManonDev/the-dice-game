
let player1 = document.querySelector('#player-0');
let player2 = document.querySelector('#player-1');
let form = document.querySelector('#form');
let btnRollTheDice = document.querySelector('#rollTheDice');
let btnHold = document.querySelector('#hold');

let scoresGlobal;
let roundScore;
let gameStart;
let panelActive = 0;


function rotate () {
    document.querySelector('#dice').className = "#dice";
    window.requestAnimationFrame( (time) => {
        window.requestAnimationFrame( (time) => {
        document.querySelector("#dice").className = "rotate";
        });
      });
};

// Function NEW GAME
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ask for the names of the players
    player1.textContent = document.querySelector('#name-1').value;
    player2.textContent = document.querySelector('#name-2').value;

    // Close the modal if the names of the players are indicated
    if(player1.value != "" && player2.value != "") {
        $('#modal-new-game').modal('hide');
    }
    
    gameStart = true;
    //Reset all points
    scoresGlobal = [0, 0];
    roundScore = 0;

    document.getElementById('scoreGlobal-0').textContent = '0';
    document.getElementById('scoreGlobal-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    btnRollTheDice.addEventListener('click', () => {
        // Calls the function rotate()
        rotate();
        // Generate a random number between 1 and 6
        let numberDice = Math.floor(Math.random() * 6) + 1;

        // Modifies the face of the die according to the number generated
        document.querySelector("#dice").setAttribute("src",
                    "img/dices-faces/dice-" + numberDice + ".svg");

        // Adds the generated number to the active player's score
        if(numberDice !== 1) {
            roundScore += numberDice;
            document.querySelector('#current-' + panelActive).textContent = roundScore;
        } else {
        // if the dice face == 1, reinitializes the score and it is the second player's turn
            roundScore = 0;
            document.getElementById('current-' + panelActive).textContent = '0';
            nextPlayer();
        }  
    });
});

hold.addEventListener('click', () => {
    if(gameStart) {
        scoresGlobal[panelActive] += roundScore;
        roundScore = 0;
        document.querySelector('#current-' + panelActive).textContent = 0;
        document.querySelector('#scoreGlobal-' + panelActive).textContent = scoresGlobal[panelActive];

        if(scoresGlobal[panelActive] >= 100) {
            document.querySelector('#scoreGlobal-' + panelActive).textContent = 100;
            $('#winner').modal('show');
            gameStart = false;
        } else {
            nextPlayer();
        }
    }
    
});


