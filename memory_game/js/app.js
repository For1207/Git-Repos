// set array of cards

let card = document.getElementsByClassName('card');
const cards = [...card];
let cardsOpened = [];
let cardsMatched = [];
const deck = document.querySelector('.deck');

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

  for (card of shuffledCards) {
    deck.appendChild(card);
  }

//add listeners to cards, flip them; match and add to arrays

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') &&
      !clickTarget.classList.contains('match')) {
      clickTarget.classList.toggle('open');
      clickTarget.classList.toggle('show');
      cardsOpened.push(clickTarget);

      if (cardsOpened.length === 2) {
        if (cardsOpened[0].firstElementChild.className === cardsOpened[1].firstElementChild.className &&
           cardsOpened.length <= 2) {
           cardsOpened[0].classList.add('match');
           cardsOpened[1].classList.add('match');
           cardsMatched.unshift(cardsOpened[0], cardsOpened[1]);
           cardsOpened = [];
         }
            else {
              setTimeout(function() {
                cardsOpened[0].classList.toggle('open');
                cardsOpened[0].classList.toggle('show');
                cardsOpened[1].classList.toggle('open');
                cardsOpened[1].classList.toggle('show')
                cardsOpened = [];
              }, 1000);

         }
    }
  }
});

/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
