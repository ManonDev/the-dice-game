
let player1 = document.querySelector('#player-1');
let player2 = document.querySelector('#player-2');
let form = document.querySelector('#form');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    player1.textContent = document.querySelector('#name-1').value;
    player2.textContent = document.querySelector('#name-2').value;

    if(player2.value != "" && player2.value != "") {
        $('#modal-new-game').modal('hide');
    }
});

