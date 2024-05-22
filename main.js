let dice = document.querySelector('.dice');
let playerName = document.querySelector('.playerName');
let gridDivs = document.querySelectorAll('.grid div');
let numbers = [];
let turn = 0;
let redTurn = false;
let greenTurn = false;
let redToken = document.querySelector('.redToken');
let greenToken = document.querySelector('.greenToken');
let redPosition = 0;
let greenPosition = 0;
let startingPage = document.querySelector('.starting');
let startingPageBtn = document.querySelector('.starting button');
let redStarted = false;
let greenStarted = false;

const snakes = {
    22: 3,
    35: 13,
    56: 32,
    93: 55,
    99: 24
};

const ladders = {
    15: 37,
    30: 51,
    40: 95
};

for (let i = 1; i <= 100; i++) {
    numbers.push(i);
}

function generateDiceNumber() {
    let num = Math.floor(Math.random() * 6) + 1;
    dice.innerText = num;
    return num;
}

function checkTurn() {
    if (turn === 0) {
        redTurn = true;
        greenTurn = false;
        playerName.innerText = 'Red Turn';
        playerName.style.backgroundColor = 'red';
    } else {
        greenTurn = true;
        redTurn = false;
        playerName.innerText = 'Green Turn';
        playerName.style.backgroundColor = 'green';
    }
    turn = 1 - turn;
}

function moveToken(token, position, diceNumber) {
    let newPosition = position + diceNumber;
    if (newPosition <= 100) {
        if (snakes[newPosition]) {
            newPosition = snakes[newPosition];
        }
        else if (ladders[newPosition]) {
            newPosition = ladders[newPosition];
        }
        gridDivs.forEach(gridDiv => {
            if (parseInt(gridDiv.innerText) === newPosition) {
                gridDiv.append(token);
            }
        });


        return newPosition;
    }
    return position;
}

function gameOver(winner) {
    const dialog = document.getElementById('winnerDialog');
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.innerText = `${winner} wins! Game Over.`;
    dialog.showModal();

    dice.removeEventListener('click', handleDiceClick);
}


function handleDiceClick() {
    dice.style.animationName = 'animate';
    let diceNumber = generateDiceNumber();

    if (redTurn) {
        if (!redStarted) {
            if (diceNumber === 1) {  // Change 1 to 6 if your rule is to start with 6
                redStarted = true;
            } else {
                checkTurn();
                setTimeout(() => {
                    dice.style.animationName = '';
                }, 2000);

                return;
            }
        }

        redPosition = moveToken(redToken, redPosition, diceNumber);
        if (redPosition === 100) {
            gameOver('Red');
            return;
        }

    } else if (greenTurn) {
        if (!greenStarted) {
            if (diceNumber === 1) {  // Change 1 to 6 if your rule is to start with 6
                greenStarted = true;
            } else {
                checkTurn();
                setTimeout(() => {
                    dice.style.animationName = '';
                }, 2000);
                return;
            }
        }

        greenPosition = moveToken(greenToken, greenPosition, diceNumber);
        if (greenPosition === 100) {
            gameOver('Green');
            return;
        }
    }

    checkTurn();

    setTimeout(() => {
        dice.style.animationName = '';
    }, 2000);

}

dice.addEventListener('click', handleDiceClick);

startingPageBtn.addEventListener('click', () => {
    startingPage.style.display = 'none';
})

document.getElementById('closeDialog').addEventListener('click', function () {
    window.location.reload();
});

checkTurn();