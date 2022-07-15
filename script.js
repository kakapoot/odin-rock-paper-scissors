const choices = ["fire", "water", "grass"];
const rounds = 5;

function computerPlay() {
    let randIndex = Math.floor(Math.random()*choices.length);
    return choices[randIndex];
}

function updateChoiceImg(playerSelection, computerSelection) {
    let choicesImg = {
        "fire" : "./assets/fire.png",
        "water" : "./assets/water.png ",
        "grass" : "./assets/grass.png",
        "none" : ""
    }
    playerSelectImg.setAttribute('src', choicesImg[playerSelection]);
    computerSelectImg.setAttribute('src', choicesImg[computerSelection]);
}

function playRound(playerSelection, computerSelection) {
    updateChoiceImg(playerSelection, computerSelection);
    let winner = document.querySelector('.winner');
    if (winner) {
        winner.classList.remove('winner');
    }

    let playerIndex = choices.indexOf(playerSelection);
    let computerIndex = choices.indexOf(computerSelection);

    if (playerIndex == computerIndex) {
        message.textContent = `draw! a tumbleweed rolls in the distance...`;
        return 0;
    }
    else if ((playerIndex+1) % 3 == computerIndex) {
        message.textContent = `ouch! looks like this won't be an easy fight!`;
        computerSelectImg.classList.add('winner');
        return -1;
    }
    else {
        message.textContent = `you whoop that robo-butt!`;
        playerSelectImg.classList.add('winner');
        return 1;
    }
}

function updateImg(scores) {
    let playerSize = 10 + scores["player"]*2;
    let computerSize = 10 + scores["computer"]*2;

    playerImg.setAttribute('style', "width:"+playerSize+"vw;");
    computerImg.setAttribute('style', "width:"+computerSize+"vw;");
}

function updateScores(result, scores) {
    if (result == -1)
        scores["computer"]++;
        
    else if (result == 1)
        scores["player"]++;

    updateImg(scores);
    computerScore.textContent = scores["computer"];
    playerScore.textContent = scores["player"];
    return scores;
}

function bonk() {
    screen.appendChild(bat);

    if (scores["player"] == 5) {
        bat.classList.add('bat-player');
        setTimeout(() => {
            computerImg.style.height = "50px"}, 1000);
    }
    else {
        bat.classList.add('bat-computer');
        setTimeout(() => {
            playerImg.style.height = "50px"}, 1000);
    }

    setTimeout(() => {
        overlay.setAttribute('style', 'display: flex;')}, 3000);
}

function checkGameEnd(scores) {
    if (scores["player"] != rounds && scores["computer"] != rounds)
        return false;
    else {
        if (scores["computer"] > scores["player"])
            message.textContent = `oh no... the robots have won :-(`;
    
        else
            message.textContent = `you win! humanity is saved and you are rewarded with lots of pats and belly rubs :-)`;
        
        updateChoiceImg("none", "none");
        bonk();
        return true;
    }
}

function resetGame() {
    scores["player"] = scores["computer"] = 0;
    gameEnd = false;
    updateScores(0, scores);
    updateChoiceImg("none", "none");
    message.textContent = "choose your element below!";
    overlay.setAttribute('style', 'display: none;');
    bat.remove();
}

const playerScore = document.querySelector('.player-score')
const computerScore = document.querySelector('.computer-score')
const playerSelectImg = document.querySelector('.player-selection');
const computerSelectImg = document.querySelector('.computer-selection');
const playerImg = document.querySelector('.player-img');
const computerImg = document.querySelector('.computer-img');
const overlay = document.querySelector('.overlay');

const title = document.querySelector('.title');
const content = document.querySelector('.content');
const message = document.querySelector('.message');
const scoreboard = document.querySelector('.scoreboard');
const buttons = document.querySelectorAll('.choices button');
const restart = document.querySelector('.restart');
const screen = document.querySelector('.screen');

const bat = document.createElement('img');
bat.setAttribute('src', './assets/bat.png');

let gameEnd = false;
let scores = {
    player: 0,
    computer: 0
};

title.style.opacity = "100%";
setTimeout(() => {
    content.style.opacity = "100%"}, 2000);

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!gameEnd) {
            let result = playRound(button.className, computerPlay());
            scores = updateScores(result, scores);
            gameEnd = checkGameEnd(scores);
        }
    });
});

restart.addEventListener('click', () => {
    resetGame();
});