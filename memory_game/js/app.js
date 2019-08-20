// shuffle  cards deck

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

var cardDeck = ['images/icons/book.png', 'images/icons/bus.png', 'images/icons/cake.png', 'images/icons/coffee.png', 'images/icons/gift.png', 'images/icons/money.png', 'images/icons/plane.png', 'images/icons/shop.png'];
var result = cardDeck.shuffle();


// add 16 shuffled images to the grid and assign .card class to them

let icon = document.createElement('img');

let e=0;
for (e=0; e<2; e++) {
  let i = 0;
  for (i = 0; i < 8; i++) {
  function addIcon() {
    icon = document.createElement('img');
    icon.src = cardDeck[i];
    icon.classList.add('card');
    document.querySelector('#game_board').appendChild(icon);
  }
  addIcon(icon);
  }
}
