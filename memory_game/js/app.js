// set array of cards

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

 // shuffle the array of cards
 Array.prototype.shuffle = function() {
   var i = this.length, j, temp;
   while(--i > 0) {
     j = Math.floor(Math.random() * (i + 1));
     temp = this[j];
     this[j] = this[i];
     this[i] = temp;
   }
   return this;
 }
 const shuffledCards = cards.shuffle();

 // display the cards on the page

function displayCards() {
    for (card of shuffledCards) {
    deck.appendChild(card);
  }
}

//add listeners to cards, flip them; match and add to arrays


deck.addEventListener('click', event => {
const clickTarget = event.target;

if (clickTarget.classList.contains('card') &&
  !clickTarget.classList.contains('match')) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
  cardsOpened.push(clickTarget);
  }
// clear array of opened cards

function clearCardsOpened() {
  for ( let i = 0; i < cardsOpened.length; i++) {
    cardsOpened[i].classList.toggle('open');
    cardsOpened[i].classList.toggle('show');
    }
  cardsOpened = [];
  // add moves counter
  movesCounter = ++movesCounter;
  document.querySelector('.moves').innerHTML = movesCounter;
  }

if (cardsOpened.length === 2) {
if (cards.indexOf(cardsOpened[0]) !== cards.indexOf(cardsOpened[1])) {
  if (cardsOpened[0].firstElementChild.className === cardsOpened[1].firstElementChild.className) {
    cardsOpened[0].classList.add('match');
    cardsOpened[1].classList.add('match');
    cardsMatched.unshift(cardsOpened[0], cardsOpened[1]);
    clearCardsOpened();
    } else {
        setTimeout(function() {
        clearCardsOpened()
        }, 800);
      }
  }
}
if (cardsOpened.length > 2){
    clearCardsOpened();
}
});

function startClock() {
  clockId = setInterval(() => {
  time++;
  displayTime();
  }, 1000);
  }

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

function displayTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const clock = document.querySelector('.clock');
  if (seconds < 10) {
  clock.innerHTML = minutes + ' : ' + '0' + seconds;
} else {
  clock.innerHTML = minutes + ' : ' + seconds;
}
}

function stopClock() {
  clearInterval(clockId);
}

// add score
const starOne = document.getElementById('star_one');
const starTwo = document.getElementById('star_two');
const starThree = document.getElementById('star_three');
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
          movesToMatchedRatio < 0.2) {
          displayOneStar();
        } else if (movesToMatchedRatio >= 0.22 &&
                  movesToMatchedRatio < 0.4) {
                  displayTwoStars();
        } else if (movesToMatchedRatio >= 0.4) {
                  displayThreeStars();
        }
    }
  }, 1000);
}
starScore();

// reset game
// 
// function resetGame() {
//   resetCardsClass();
//   displayCards();
//   stopClock()
//   resetTimer();
//   resetStarScore();
//   resetMoves();
// }
//
// function resetTimer() {
//   time = 0;
//   displayTime();
// }
//
// function resetStarScore() {
//   clearInterval(starId);
//   displayThreeStars();
// }
//
// function resetMoves() {
// moves = 0;
// document.querySelector('.moves').innerHTML = moves;
// }
//
// function resetCardsClass() {
//   const cards= document.querySelectorAll('.card');
//   for (let card of cards) {
//     card.className = 'card';
//   }
// }
//
// const restart = document.querySelector('.restart');
// restart.addEventListener('click' ,  function event() {
//   const clickTarget = event.target;
//   resetGame();
// });
