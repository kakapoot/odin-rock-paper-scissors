const choices = ['fire', 'water', 'grass'];
const rounds = 5;

// randomly returns one of the available choices for computer
function computerPlay() {
    let randIndex = Math.floor(Math.random()*choices.length);
    return choices[randIndex];
}

// displays image for selected choices on screen
function updateChoiceImg(playerSelection, computerSelection) {
    let choicesImg = {
        'fire' : './assets/fire.png',
        'water' : './assets/water.png ',
        'grass' : './assets/grass.png',
        'none' : ''
    }
    playerSelectImg.setAttribute('src', choicesImg[playerSelection]);
    computerSelectImg.setAttribute('src', choicesImg[computerSelection]);
}

// prints outcome message and updates choice on screen
function playRound(playerSelection, computerSelection) {
    updateChoiceImg(playerSelection, computerSelection);
    // clear previous winning choice from screen
    let winner = document.querySelector('.winner');
    if (winner)
        winner.classList.remove('winner');

    // algorithm to determine winner of round
    let playerIndex = choices.indexOf(playerSelection);
    let computerIndex = choices.indexOf(computerSelection);
    if (playerIndex == computerIndex) {
        message.textContent = 'draw! a tumbleweed rolls in the distance...';
        return 0;
    }
    else if ((playerIndex+1) % 3 == computerIndex) {
        message.textContent = 'ouch! looks like this will not be an easy fight!';
        // pulses computer's winnning choice on screen
        computerSelectImg.classList.add('winner');
        return -1;
    }
    else {
        message.textContent = 'you whoop that robo-butt!';
        // pulses player's winnning choice on screen
        playerSelectImg.classList.add('winner');
        return 1;
    }
}

// increases size of character image depending on number of wins
function updateImg(scores) {
    let playerSize = 10 + scores['player'] * 2;
    let computerSize = 10 + scores['computer'] * 2;

    playerImg.setAttribute('style', 'width:' + playerSize + 'vw;');
    computerImg.setAttribute('style', 'width:' + computerSize + 'vw;');
}

// updates scoreboard 
function updateScores(result, scores) {
    if (result == -1)
        scores['computer']++;
    else if (result == 1)
        scores['player']++;

    computerScore.textContent = scores['computer'];
    playerScore.textContent = scores['player'];
    return scores;
}

// animates bonk towards loser
function bonk() {
    screen.appendChild(bat);
    // player bonks computer
    if (scores['player'] == 5) {
        bat.classList.add('bat-player');
        // squishes computer image after bonk animation
        setTimeout(() => {
            computerImg.style.height = '3vw'}, 1000);
    }
    // computer bonks player
    else {
        bat.classList.add('bat-computer');
        // squishes player image after bonk animation
        setTimeout(() => {
            playerImg.style.height = '3vw'}, 1000);
    }
}

// prints end message, plays bonk animation, shows restart screen when maximum score is reached
function endGame(scores) {
    if (scores['player'] != rounds && scores['computer'] != rounds)
        return false;
    else {
        if (scores['computer'] > scores['player'])
            message.textContent = `oh no... the robots have won :-(`;
        else
            message.textContent = `you win! humanity is saved and you are rewarded with lots of pats and belly rubs :-)`;
        
        bonk();
        // clear images for selected choices on screen
        updateChoiceImg('none', 'none');
        // overlays restart screen
        setTimeout(() => {
            overlay.setAttribute('style', 'display: flex;')}, 3000);

        return true;
    }
}

// resets images, scoreboard, messages, restart screen
function resetGame() {
    gameEnded = false;
    scores['player'] = scores['computer'] = 0;

    updateScores(0, scores);
    updateChoiceImg('none', 'none');
    message.textContent = 'choose your element below!';
    overlay.setAttribute('style', 'display: none;');

    bat.removeAttribute('class');
    bat.setAttribute('class', 'bat');
    screen.removeChild(bat);
}

const title = document.querySelector('.title');
const content = document.querySelector('.content');

const screen = document.querySelector('.screen');
const playerSelectImg = document.querySelector('.player-selection');
const computerSelectImg = document.querySelector('.computer-selection');
const playerImg = document.querySelector('.player-img');
const computerImg = document.querySelector('.computer-img');

// load bat image into DOM at start
const bat = document.createElement('img');
bat.setAttribute('src', './assets/bat.png');
bat.classList.add('bat');

const scoreboard = document.querySelector('.scoreboard');
const message = document.querySelector('.message');
const playerScore = document.querySelector('.player-score')
const computerScore = document.querySelector('.computer-score')

const buttons = document.querySelectorAll('.choices button');

const overlay = document.querySelector('.overlay');
const restart = document.querySelector('.restart');

let gameEnded = false;
let scores = {
    player: 0,
    computer: 0
};

// slowly show page to buffer for image load at start
title.style.opacity = '100%';
setTimeout(() => {
    content.style.opacity = '100%'}, 2000);

// play rounds when choice buttons are pressed
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!gameEnded) {
            let result = playRound(button.className, computerPlay());
            scores = updateScores(result, scores);
            updateImg(scores);
            gameEnded = endGame(scores);
        }
    });
});

restart.addEventListener('click', () => {
    resetGame();
});