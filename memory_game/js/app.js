// set array of cards

 let card = document.getElementsByClassName('card');
 const cards = [...card];
 const cardsOpened = [];
 const Matched = [];

//add listeners to cards and flip them;

const deck = document.querySelector('.deck');
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') &&
      !clickTarget.classList.contains('match')) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
    cardsOpened.push(clickTarget);
  }
});

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

 // match cards

   if (cardsOpened[0] === cardsOpened[2] &&
      cardsOpened.length < 2) {
      clickTarget.classList.add('match');
      clickTarget.classList.add('match');

     // clickTarget.classList.toggle('open');
     // clickTarget.classList.toggle('show');
   }
 //
 // gameBoard.addEventListener('click', click => {
 //   const clickIcon = click.target;
 //   if (clickIcon.classList.contains('icon') && iconsOpened.length < 2 && !clickIcon.classList.contains('front_side')) {
 //     clickIcon.classList.toggle('front_side');
 //     iconsOpened.push(clickIcon);
 //     if (iconsOpened[0].outerHTML === iconsOpened[1].outerHTML) {
 //       iconsMatched.unshift(iconsOpened[0], iconsOpened[1]);
 //       iconsMatched[0].classList.add('matched');
 //       iconsMatched[1].classList.add('matched');
 //       iconsOpened=[];
 //     } else {
 //         setTimeout(() => {
 //           iconsOpened[0].classList.toggle('front_side');
 //           iconsOpened[1].classList.toggle('front_side');
 //           iconsOpened=[];
 //         }, 1000);
 //       }
 //   }
 // });





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
