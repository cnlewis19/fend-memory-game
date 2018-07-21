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

let moves = 0;
function increaseMove() {
  moves++;
  let moveNumber = document.querySelector('.moves');
  moveNumber.innerHTML = moves;
};


function hideStar() {
  const stars= document.querySelectorAll('.stars li');
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
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 const modal = document.getElementById('win-box');
 const close = document.getElementsByClassName('close')[0];
 const cancel = document.getElementsByClassName('cancel');

function toggleModal() {
  modal.classList.toggle('hide');
}
toggleModal();

 function writeModalStats() {
   const timeStat = document.querySelector('.win-time');
   const finalMoves = document.querySelector('.win-moves');
   const finalStars = document.querySelector ('.win-stars')
   timeStat.innerHTML = `Time: ${clockTime}`;
   finalStars.innerHTML = `Stars: ${starCount}`;
   finalMoves.innerHTML = `Moves: ${moves}`;

 }
 function gameWon() {
   clockStop();
   writeModalStats();
   toggleModal();
 }
 document.querySelector('.cancel').addEventListener('click', () => {
   toggleModal();
 });
 
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
    shownCards[1].classList.toggle('open');
    shownCards[1].classList.toggle('show');
    shownCards = [];
  }, 1000);
  }
  if (matched ===TOTAL_PAIRS) {
    gameWon();
  }
}
cards.forEach(function(card) {
  card.addEventListener('click', function(openingCards) {
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
