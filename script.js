// VARIABLES
let player1         = document.querySelector('#player-0');
let player2         = document.querySelector('#player-1');
let newGame         = document.querySelector('#form');
let btnRollTheDice  = document.querySelector('#rollTheDice');
let btnHold         = document.querySelector('#hold');
let panelActive     = 0;
let globalScore;
let roundScore;
let gameStart;


// Function player change
function switchPlayer () {
    if (panelActive === 0) {
        panelActive = 1;
      } else {
        panelActive = 0;
      }
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Function spinning the dice
function rotate () {
    document.querySelector('#dice').className = "#dice";
    window.requestAnimationFrame( (time) => {
        window.requestAnimationFrame( (time) => {
        document.querySelector("#dice").className = "rotate";
        });
      });
};

// BUTTON NEW GAME
newGame.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ask for the names of the players
    player1.textContent = document.querySelector('#name-1').value;
    player2.textContent = document.querySelector('#name-2').value;

    // Close the modal if the names of the players are indicated
    if(player1.value != "" && player2.value != "") {
        $('#modal-new-game').modal('hide');
    }
    
    // Initialize the game
    gameStart = true;

    //Reset all points
    globalScore = [0, 0];
    roundScore = 0;
    document.getElementById('scoreGlobal-0').textContent = '0';
    document.getElementById('scoreGlobal-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
});


// BUTTON ROLL DICE
btnRollTheDice.addEventListener('click', () => {
    if(gameStart) {
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
            switchPlayer();
        }  
    } else {
        $('#modal-new-game').modal('show');
    }
});


// BUTTON HOLD 
btnHold.addEventListener('click', () => {
    // if the game is initialised
    if(gameStart) {
        // Hold the roundScore in scoreGlobal
        globalScore[panelActive] += roundScore;
        roundScore = 0;
        document.querySelector('#current-' + panelActive).textContent = 0;
        document.querySelector('#scoreGlobal-' + panelActive).textContent = globalScore[panelActive];

        // If the scoreGlobal's player = 100 >> WINNER
        if(globalScore[panelActive] >= 100) {
            document.querySelector('#scoreGlobal-' + panelActive).textContent = 100;
            document.querySelector('.text-win').textContent = `The player has won the game with ${globalScore[panelActive]} points !`;
            $('#winner').modal('show');
            gameStart = false;
        } else {
            switchPlayer();
        };
    }
});




