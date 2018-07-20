function shuffleGrid() {
  let gameCards = Array.from(document.querySelectorAll(.deck li));
  let cardsShuffled = shuffle(gameCards);
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
const cards = document.querySelectorAll('.card');
let shownCards = [];
function checkCards() {
  if (
    shownCards[0].firstElementChild.className=== shownCards[1].firstElementChild.className
  )
  {
    shownCards[0].classList.toggle('match');
    shownCards[1].classList.toggle('match');
    shownCards=[];
  } else {
    setTimeout (function() {
    shownCards[0].classList.toggle('open');
    shownCards[0].classList.toggle('show');
    shownCards[1].classList.toggle('open');
    shownCards[1].classList.toggle('show');
    shownCards = [];
    }, 1000);
  }
}

cards.forEach(function(card) {
  card.addEventListener('click', function(openingCards) {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && shownCards.length < 2){
    shownCards.push(card);
    card.classList.toggle('open');
    card.classList.toggle('show');
/*  if (shownCards.length == 2) {
      setTimeout(function() {
        shownCards.forEach(function(card) {
          card.classList.toggle('open');
          card.classList.toggle('show');
        });
         shownCards = [];
      }, 1000);
    }*/
    };
    if (shownCards.length === 2) {
      checkCards();
    }
  });
  });
