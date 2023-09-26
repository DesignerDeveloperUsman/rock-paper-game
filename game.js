let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
let result = '';
updateScoreElement();
function playGame(playerMove) {
    const computerMove = pickComputerMove();


    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `<span>You</span>
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  <span>computer</span>`;
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}
let isAutoPlay = false;
let intervelId;
let hello = document.getElementById('hello');

const autoPlay = () => {
    if (!isAutoPlay) {
        intervelId = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove)
        }, 1000)
        isAutoPlay = true;
        hello.innerHTML = "stop"
        hello.style.background = "white"
        hello.style.color = "black"
    }
    else {
        clearInterval(intervelId);
        isAutoPlay = false;
        document.getElementsByClassName('auto-play-button').innerHTML = "play"
        hello.innerHTML = "play";
        hello.style.background = "green"
        hello.style.color = "white"
    }
}
document.body.addEventListener('keydown', (e) => {
    if (e.key === 'r') {
        playGame('rock')
    }
    else if (e.key === 'p') {
        playGame('paper')
    }
    else if (e.key === 's') {
        playGame('scissors')
    }
})

