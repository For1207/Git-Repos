let card = document.getElementsByClassName('card');
const cards = [...card];
let cardsOpened = [];
let cardsMatched = [];
const deck = document.querySelector('.deck');
const deckCards = deck.getElementsByClassName('card');
let movesCounter = 0;
let clockOff = true;
let time = 0;
let clockId;
let starID;

  // Shuffle the array of cards
Array.prototype.shuffle =function() {
  let i = this.length, j, temp;
  while(--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
  return this;
 }

 // Display the cards on the page
function displayCards() {
  let shuffledCards = cards.shuffle();
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
displayCards();

  // Moves counter


const movesSelector = document.querySelector('.moves');
function moves() {
  movesCounter = ++movesCounter;
  movesSelector.innerHTML = movesCounter;
}

  //Add listeners to cards, flip them, match and add to arrays

deck.addEventListener('click', event => {
  const clickTarget = event.target;

    //Flip cards and add to array of opened cards
    if (clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match')) {
          clickTarget.classList.toggle('open');
          clickTarget.classList.toggle('show');
          clickTarget.classList.toggle('disabled'); //disable multiple clicks on one card, which invokes false increasing of the moves counter
          cardsOpened.push(clickTarget);
    }

    // Clear array of opened cards
  function clearCardsOpened() {
    for ( let i = 0; i < cardsOpened.length; i++) {
      cardsOpened[i].classList.toggle('open');
      cardsOpened[i].classList.toggle('show');
      cardsOpened[i].classList.toggle('disabled');
      }
    if (cardsOpened.length === 2) { //triggers the move counter only if two cards were matched
      moves();
    }
    cardsOpened = [];
  }

    //Match opened cards by using their index names' in the initial array and, if mathced,
    //add them to array of mathched cards, and leave them opened,
    //if not, close them and clear array of opened cards
  if (cardsOpened.length === 2) {
    if (cards.indexOf(cardsOpened[0]) !== cards.indexOf(cardsOpened[1])) {
      if (cardsOpened[0].firstElementChild.className === cardsOpened[1].firstElementChild.className) {
        cardsOpened[0].classList.add('match');
        cardsOpened[1].classList.add('match');
        cardsMatched.unshift(cardsOpened[0], cardsOpened[1]);
        clearCardsOpened();
      } else {
          setTimeout(function() {
          clearCardsOpened();
          }, 650);
        }
      }
  }
  if (cardsOpened.length > 2){
      clearCardsOpened();
  }
});

  // Add clock and display time.
function startClock() {
  clockId = setInterval(() => {
  time++;
  displayTime();
  }, 1000);
}
    //The clock start after the first card was opened and stop when all cards are matched
deck.addEventListener('click', function event() {
  const clickTarget = event.target;
  if(clockOff) {
    startClock();
    clockOff = false;
  }
  if (cardsMatched.length === 16) {
    stopClock();
  }
})

    //Convert milliseconds to seconds and minutes and display them
let minutes = 0;
let seconds = 0;
function displayTime() {
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  const clock = document.querySelector('.clock');
  if (seconds < 10) {
    clock.innerHTML = minutes + ' : ' + '0' + seconds;
  } else {
      clock.innerHTML = minutes + ' : ' + seconds;
    }
}

  // Add  a score
const starOne = document.querySelector('.star-one');
const starTwo = document.querySelector('.star-two');
const starThree = document.querySelector('.star-three');
let movesToMatchedRatio;

function displayOneStar() {
  starOne.style.display = 'inline';
  starTwo.style.display = 'none';
  starThree.style.display = 'none';
}

function displayTwoStars() {
  starOne.style.display = 'inline';
  starTwo.style.display = 'inline';
  starThree.style.display = 'none';
}

function displayThreeStars() {
  starOne.style.display = 'inline';
  starTwo.style.display = 'inline';
  starThree.style.display = 'inline';
}
    //Score logic: the score fall down from 3 to 1 by a star after the second and the fourth moves accordingly.
    // After that use ratio of matched cards and moves. One move - when two cards have been compared.
    //Compare the ratio with coefficients, assign 1, 2 of 3 stars and display them.
let starsNumber = 0;  //Stars number to display on the modal screen
function starScore() {
  starId = setInterval(function() {
    movesToMatchedRatio = cardsMatched.length / (movesCounter + 0.001);
    if (movesCounter === 2) {
      displayTwoStars();
    } else if (movesCounter === 4) {
        displayOneStar();
      }
    if (movesCounter > 4) {
      if (movesToMatchedRatio > 0 &&
          movesToMatchedRatio < 0.3) {
            displayOneStar();
            starsNumber = 1;
      } else if (movesToMatchedRatio >= 0.3 &&
                movesToMatchedRatio < 0.6) {
                displayTwoStars();
                starsNumber = 2;
        } else if (movesToMatchedRatio >= 0.6) {
                displayThreeStars();
                starsNumber = 3;
          }
    }
  }, 1000);
}
starScore();

  //Stop the game
function stopClock() {
  clearInterval(clockId);
  clockOff = true;
};

function stopScore() {
  clearInterval(starId);
}

  // Reset the game
function resetClock() {
  time = 0;
  displayTime();
}

function resetScore() {
  stopScore();
  cardsMatched = [];
  movesToMatchedRatio = 0;
  displayThreeStars();
}

function movesReset () {
  movesCounter = 0;
  movesSelector.innerHTML = movesCounter;
}

    //Close all cards by assigning them class 'card'
function resetDeck () {
  const cards= document.querySelectorAll('.card');
  for (let card of cards) {
    card.className = 'card'
  }
  displayCards();
}
    //Stop and reset clock, reset the score, reset moves, shuffle and 'close' cards
function resetGame() {
  stopClock();
  resetClock();
  resetScore();
  starScore();
  movesReset ();
  resetDeck ();
}

  //The functional and animation of reset icon:
    //Add a click listener to the icon
    //Reset the game after the click
    //Rotate if clicked
const restart = document.querySelector('.restart');
restart.addEventListener('click' ,  function event() {
  const clickTarget = event.target;
  restart.animate([
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(360deg)'},
  ], {
    duration: 1000,
  });
  setTimeout(function(){
    resetGame();
  }, 1000);
});

  // Modal window  and statistics
const modal = document.querySelector('.modal');
function modalOnOff() {
  modal.classList.toggle('visible');
}

    //Add a click listener.
      //If after the click all cards are matched, open the modal and display:
      //an animated checkmark,  a congrtulation message, and counters for moves, stars and time
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (cardsMatched.length === 16) {
    modalOnOff();
    if (seconds < 10) {
      document.querySelector('.modal-stats').innerHTML = 'With ' + movesCounter + ' Moves and ' +
      starsNumber + ' Stars in ' + minutes + ':0' + seconds;
    } else {
        document.querySelector('.modal-stats').innerHTML = 'With ' + movesCounter + ' Moves and ' +
        starsNumber + ' Stars in ' + minutes + ':' + seconds;
      }
  }
});

  // Modal window close and play again 'button'
const playAgain = document.querySelector('.modal-play-again');
playAgain.addEventListener('click', function event() {
  const clickTarget = event.target;
    resetGame();
    modalOnOff();
});
