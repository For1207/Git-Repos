// shuffles  cards deck

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


// adds images to the grid

let icon = document.createElement('img');

let z=0;
for (z=0; z<2; z++) {
  let i = 0;
  for (i = 0; i < 8; i++) {
  function addIcon() {
    icon = document.createElement('img');
    icon.src = cardDeck[i];
    document.querySelector('#game_board').appendChild(icon);
  }
  addIcon(icon);
  }
}
