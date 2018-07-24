//Shuffles grid each time the page is refreshed or replay is hit
let deck = document.querySelector('.deck');
function shuffleGrid() {
  let gameCards = Array.from(document.querySelectorAll('.deck li'));
  let cardsShuffled = shuffle(gameCards);
  for (card of cardsShuffled) {
    deck.appendChild(card);
  }
}
shuffleGrid();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Counts number of moves and displays it on page
let moves = 0;
let moveNumber = document.querySelector('.moves');
function increaseMove() {
  moves++;
  moveNumber.innerHTML = moves;
};

//Displays stars based on number of moves
const stars= document.querySelectorAll('.stars li');
function hideStar() {
  for (star of stars) {
    if (star.style.display !== 'none') {
    star.style.display = 'none';
    break;
  }
}
}
let starCount;
function changeStars () {
  if (moves == 24) {
    hideStar();
  } else if (moves == 36) {
    hideStar();
  };
  if (moves < 24){
    starCount = 3;
  } else if (moves >=24 && moves <36) {
    starCount = 2;
  } else {
    starCount = 1;
  };
}

//Adds timer functionality
let clock = document.querySelector('.clock');
let sec = 0;
let min = 0;
let time;
let clockTime;
let clockRunning = false;

function clockRun() {
  if (clockRunning == false) {
    time = setInterval (showTime, 1000);
    timeRunning = true;
  }
}
function clockStop() {
  clearInterval(time);
  sec = 0;
  min = 0;
  clockRunning = false;
}
function showTime() {
  sec ++;
  if (sec <10) {
    sec = `0${sec}`;
  }
  if (sec >=60) {
    min++;
    sec = "00";
  }
  clockTime = min + ":" + sec;
  clock.innerHTML = clockTime;
}

function clockSequence(){
  if (moves<=1) {
    clockRun();
    showTime();
    clockRunning = true;
  };
}
// adding replay functionality

function resetClock() {
  clockStop();
  clockRunning = false;
  showTime();
  time = 0;
}

function resetMoves() {
  moves = 0;
  moveNumber.innerHTML = moves;
}
function resetStars() {
  for (star of stars) {
    star.style.display = 'inline';
  };
}
function resetCards() {
  cards.forEach(function(card) {
    card.classList.remove('open');
    card.classList.remove('show');
    card.classList.remove('match');
  })
}

function restartGame() {
  shownCards = [];
  resetCards();
  resetClock();
  resetMoves();
  resetStars();
  shuffleGrid();
}
function replayGame() {
  restartGame();
  toggleModal();
}
document.querySelector('.restart').addEventListener('click', () => {
  restartGame();
});
document.querySelector('.replay').addEventListener('click', () => {
  replayGame();
})

//sets up modal box
 const modal = document.getElementById('win-box');

//toggles modal on and off
function toggleModal() {
  modal.classList.toggle('hide');
}
//makes modal off the default
toggleModal();

//gets stats for the modal
 function writeModalStats() {
   const timeStat = document.querySelector('.win-time');
   const finalMoves = document.querySelector('.win-moves');
   const finalStars = document.querySelector ('.win-stars')
   timeStat.innerHTML = `Time: ${clockTime}`;
   finalStars.innerHTML = `Stars: ${starCount}`;
   finalMoves.innerHTML = `Moves: ${moves}`;

 }
 //closes modal if user clicks cancel or close
 document.querySelector('.cancel').addEventListener('click', () => {
   toggleModal();
 });
 document.querySelector('#modal-close-button').addEventListener('click', () => {
   toggleModal();
 });

 //function to run when the game is won
 function gameWon() {
   clockStop();
   writeModalStats();
   toggleModal();
 }

//sets up card matching scenarios
const cards = document.querySelectorAll('.card');
let shownCards = [];
let matched = 0;
const TOTAL_PAIRS = 8;
function checkCards() {
  if (
    shownCards[0].firstElementChild.className=== shownCards[1].firstElementChild.className
  )
  {
    shownCards[0].classList.toggle('match');
    shownCards[1].classList.toggle('match');
    shownCards=[];
    matched++;
  } else {
    setTimeout (function() {
    shownCards[0].classList.toggle('open');
    shownCards[0].classList.toggle('show');
    shownCards[0].classList.toggle('no-click');
    shownCards[1].classList.toggle('open');
    shownCards[1].classList.toggle('show');
    shownCards[1].classList.toggle('no-click');
    shownCards = [];
  }, 1000);
  }
  //determines if game has been won
  if (matched ===TOTAL_PAIRS) {
    gameWon();
  }
}
//sets up flipping and runs matching check if two cards have been flipped
cards.forEach(function(card) {
  card.addEventListener('click', function(openingCards) {
    card.classList.toggle('no-click');
    clockSequence();
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && shownCards.length < 2){
    shownCards.push(card);
    card.classList.toggle('open');
    card.classList.toggle('show');
    };
    if (shownCards.length === 2) {
      increaseMove();
      changeStars();
      checkCards();
    };
  });
  });
