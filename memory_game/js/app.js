// shuffles cards array/ cards deck

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

var cardDeck = ['images/icons/book.png', 'images/icons/bus.png', 'images/icons/cake.png', 'images/icons/coffee.png', 'images/icons/gift.png', 'images/icons/money.png', 'images/icons/money.png', 'images/icons/money.png'];
var result = cardDeck.shuffle();

// document.write(cardDeck);

// // this code works and inserts a picture in the grid. Don't touch it!
// const icon = document.createElement('img');
// icon.src = "images/icons/plane.png";
// function addIcon() {
//   document.querySelector('.card').appendChild(icon);
// }
// addIcon(icon);

const icon = document.createElement('img');
icon.src = cardDeck[0];
function addIcon() {
  document.querySelector('.card').appendChild(icon);
}
addIcon(icon);
