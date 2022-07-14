const choices = ["fire", "water", "grass"];
const rounds = 5;

function computerPlay() {
    let randIndex = Math.floor(Math.random()*choices.length);
    return choices[randIndex];
}

function updateChoiceImg(playerSelection, computerSelection) {
    let choicesImg = {
        "fire" : "🔥",
        "water" : "🌊 ",
        "grass" : "🌿",
        "none" : ""
    }
    console.log(choicesImg[playerSelection]);
    playerSelectImg.textContent = choicesImg[playerSelection];
    computerSelectImg.textContent = choicesImg[computerSelection];
}

function playRound(playerSelection, computerSelection) {
    updateChoiceImg(playerSelection, computerSelection);

    let playerIndex = choices.indexOf(playerSelection);
    let computerIndex = choices.indexOf(computerSelection);

    if (playerIndex == computerIndex) {
        message.textContent = `draw! a tumbleweed rolls in the distance...`;
        return 0;
    }
    else if ((playerIndex+1) % 3 == computerIndex) {
        message.textContent = `ouch! looks like this won't be an easy fight!`;
        return -1;
    }
    else {
        message.textContent = `you whoop that robo-butt!`;
        return 1;
    }
}

function updateImg(scores) {
    let playerSize = 100 + scores["player"]*50;
    let computerSize = 100 + scores["computer"]*50;

    playerImg.setAttribute('style', "width:"+playerSize+"px;");
    computerImg.setAttribute('style', "width:"+computerSize+"px;");
}

function updateScores(result, scores) {
    updateImg(scores);

    if (result == -1)
        scores["computer"]++;
        
    else if (result == 1)
        scores["player"]++;

    computerScore.textContent = scores["computer"];
    playerScore.textContent = scores["player"];
    return scores;
}

function checkGameEnd(scores) {
    if (scores["player"] != rounds && scores["computer"] != rounds)
        return false;
    else {
        if (scores["computer"] > scores["player"])
            message.textContent = `you lose! oh no... the future looks grim :-(`;
    
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
    message.textContent = "";
    overlay.setAttribute('style', 'display: none;');
}
const playerScore = document.querySelector('.player-score')
const computerScore = document.querySelector('.computer-score')
const playerSelectImg = document.querySelector('.player-selection');
const computerSelectImg = document.querySelector('.computer-selection');
const playerImg = document.querySelector('.player-img');
const computerImg = document.querySelector('.computer-img');
const overlay = document.querySelector('.overlay');

const message = document.querySelector('.message');
const scoreboard = document.querySelector('.scoreboard');
const buttons = document.querySelectorAll('.choices button');
const restart = document.querySelector('.restart');

let gameEnd = false;
let scores = {
    player: 0,
    computer: 0
};

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


function bonk() {
    if (scores["player"] == 5) {
        computerImg.style.height = "50px";
    }
    else {
        playerImg.style.height = "50px";
    }

    setTimeout(() => {
        overlay.setAttribute('style', 'display: flex;')}, 2000);
    
}