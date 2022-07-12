function computerPlay(choices) {
    let randIndex = Math.floor(Math.random()*choices.length);
    return choices[randIndex];
}

function playRound(playerSelection, computerSelection, choices) {
    
    let playerIndex = choices.indexOf(playerSelection);
    let computerIndex = choices.indexOf(computerSelection);

    if (playerIndex == computerIndex) {
        console.log("Draw! Both chose " + playerSelection);
        return 0;
    }

    else if ((playerI+1) % 3 == computerIndex) {
        console.log("You Lose! " + computerSelection + " beats " + playerSelection);
        return -1;
    }
    
    else {
        console.log("You Win! " + playerSelection + " beats " + computerSelection);
        return 1;
    }
}

function game() {
    const choices = ["ROCK", "PAPER", "SCISSORS"];
    let playerScore = 0;
    let computerScore = 0;

    for (let round = 0; round < 5; round++) {
        let playerSelection;
        
        do {
            playerSelection = prompt("Input Rock, Paper or Scissors").toUpperCase();
        } while (!choices.includes(playerSelection));
    
        let result = playRound(playerSelection, computerPlay(choices), choices);
        if (result == -1)
            computerScore++;
        else if (result == 1)
            playerScore++;
    }

    if (playerScore == computerScore)
        return console.log("Draw!");

    else if (computerScore > playerScore)
        return console.log("You Lose!");
    
    else
        return console.log("You Win!");
}

game();


