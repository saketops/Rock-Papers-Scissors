// const score = {
// wins: 0,
//losses: 0,
//ties: 0
//};

const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (//score === null
  !score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/



let isAutoPlaying = false;
let intervalID;


//const autoplay=()=>{};
//but here we prefer regular syntax for 2 reasons
//1. easy to read
//2. hoisting
function autoPlay() {
  if (!isAutoPlaying) {


    intervalID = setInterval(() => {

      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    //setInterval returns a number and we can 
    //use it to stop the interval
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });


document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
//reset and autoplay are exercises

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
  // console.log(event.key);
});






function playGame(playerMove) {
  const computerMove = pickCompMove();

  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'tie';
    }
    else if (computerMove === 'paper') {
      result = 'u lose';
    }
    else {
      result = 'u win';
    }
    //console.log(result);
  }
  else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'tie';
    }
    else if (computerMove === 'scissors') {
      result = 'u lose';
    }
    else {
      result = 'u win';
    }

  }
  else if (playerMove === 'scissors') {
    if (computerMove === 'paper') {
      result = 'u win';
    }
    else if (computerMove === 'scissors') {
      result = 'tie';
    }
    else {
      result = 'u lose';
    }

  }

  if (result === 'u win') {
    score.wins += 1;
  }
  else if (result === 'u lose') {
    score.losses += 1;
  }
  else {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));


  updateScoreElement();

  document.querySelector('.js-result').
    innerHTML = `${result}`;

  document.querySelector('.js-moves').innerHTML = ` You
      <img src="${playerMove}-emoji.png" class="move-icon">
      <img src="${computerMove}-emoji.png" class="move-icon">Computer`



  //alert(`u picked ${playerMove}. comp picked ${computerMove}. u ${result}
  //wins: ${score.wins}. losses: ${score.losses}. ties: ${score.ties} `);

  return result;
  //console.log(result);
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}. losses: ${score.losses}. ties: ${score.ties}
    `;
}



function pickCompMove() {
  const randomNumber = Math.random();
  //math.random generates number between 0 and 1

  let computerMove = '';
  //to get any vlaue out of the function either make it global variable or use return statement
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';

  }
  return computerMove;//return gets value out of a function

}
