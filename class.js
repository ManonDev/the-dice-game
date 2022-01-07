let namePlayer1     = document.querySelector('#player-0');
let namePlayer2     = document.querySelector('#player-1');
let form            = document.querySelector('#form');
let btnRollTheDice  = document.querySelector('#rollTheDice');
let btnHold         = document.querySelector('#hold');
let gameStart;
let player1Play;
let player2Play;


// Function spinning the dice
function rotate () {
    document.querySelector('#dice').className = "#dice";
    window.requestAnimationFrame( (time) => {
        window.requestAnimationFrame( (time) => {
        document.querySelector("#dice").className = "rotate";
        });
      });
};

// Function player change
function switchPlayer () {
    if (player1Play) {
        this.panelActive = 1;
        player1Play = false;
      } else {
        this.panelActive = 0;
        player1Play = true;
      }
    this.roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}



class Player {
    constructor(roundScore, globalScore, panelActive ) {
        this.roundScore     = roundScore;
        this.globalScore    = globalScore;
        this.panelActive    = panelActive;
    }

    rollTheDice() {
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
                this.roundScore += numberDice;
                document.querySelector('#current-' + panelActive).textContent = this.roundScore;
            } else {
            // if the dice face == 1, reinitializes the score and it is the second player's turn
                this.roundScore = 0;
                document.getElementById('current-' + panelActive).textContent = '0';
                switchPlayer();
            }  
        } else {
            $('#modal-new-game').modal('show');
        }
    }


    hold() {
        if(gameStart) {
            if(player1Play) {
                player1.globalScore += this.roundScore;
            } else {
                player2.globalScore += this.roundScore;
            }
            this.roundScore = 0;
            // Hold the roundScore in scoreGlobal
            document.querySelector('#current-' + panelActive).textContent = 0;
            document.querySelector('#scoreGlobal-' + panelActive).textContent = this.globalScore;

            // If the scoreGlobal's player = 100 >> WINNER
            if(this.globalScore >= 100) {
                document.querySelector('#scoreGlobal-' + panelActive).textContent = 100;
                document.querySelector('.text-win').textContent = `The player has won the game with ${this.globalScore} points !`;
                $('#winner').modal('show');
                gameStart = false;
            } else {
                switchPlayer();
            };
        }
    };
};


// BUTTON NEW GAME
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ask for the names of the players
    namePlayer1.textContent = document.querySelector('#name-1').value;
    namePlayer2.textContent = document.querySelector('#name-2').value;

    // Close the modal if the names of the players are indicated
    if(namePlayer1.value != "" && namePlayer2.value != "") {
        $('#modal-new-game').modal('hide');
    }
    
    // Initialize the game
    gameStart = true;
    player1Play = true;
    player2Play = false;
    //Reset all points
    globalScore = 0;
    roundScore  = 0;
    panelActive = 0;
    document.getElementById('scoreGlobal-0').textContent = '0';
    document.getElementById('scoreGlobal-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
});


// BUTTON ROLL THE DICE
btnRollTheDice.addEventListener('click', () => {
    if(player1Play) {
        player1.rollTheDice();
    } else {
        player2.rollTheDice();
    }
});


// BUTTON HOLD
btnHold.addEventListener('click', () => {
    if(player1Play) {
        player1.hold();
    } else {
        player2.hold();
    }
});


let player1 = new Player(0, 0, 0);
let player2 = new Player(0, 0, 1);
