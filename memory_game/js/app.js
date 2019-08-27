// shuffle  cards deck

Array.prototype.shuffle = function() {
  let i = this.length, j, temp;
  while(--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
  return this;
}

//  create arrays for inital deck, opened cards and matched cards

const iconDeck = ['images/icons/book.png', 'images/icons/bus.png', 'images/icons/cake.png', 'images/icons/coffee.png', 'images/icons/gift.png', 'images/icons/money.png', 'images/icons/plane.png', 'images/icons/shop.png', 'images/icons/book.png', 'images/icons/bus.png', 'images/icons/cake.png', 'images/icons/coffee.png', 'images/icons/gift.png', 'images/icons/money.png', 'images/icons/plane.png', 'images/icons/shop.png'];
const result = iconDeck.shuffle();
let iconsOpened = [];
let iconsMatched = [];

// add 16 shuffled images to the grid, assign .card class to them, assign ID's to the cells

let icon = document.createElement('img');

  for (let i = 0; i < 16; i++) {
  function addIcon() {
    const icon = document.createElement('img');
    icon.src = iconDeck[i];
    icon.classList.add('icon', 'back_side');
    document.getElementById('cell_' + i).appendChild(icon);
  }
  addIcon(icon);
  }

// add click listeners, class name and flip cards

const gameBoard = document.querySelector('.game_board');

gameBoard.addEventListener('click', click => {
  const clickIcon = click.target;
  if (clickIcon.classList.contains('icon') && iconsOpened.length < 2 && !clickIcon.classList.contains('front_side')) {
    clickIcon.classList.toggle('front_side');
    iconsOpened.push(clickIcon);
    if (iconsOpened[0].outerHTML === iconsOpened[1].outerHTML) {
      iconsMatched.unshift(iconsOpened[0], iconsOpened[1]);
      iconsMatched[0].classList.add('matched');
      iconsMatched[1].classList.add('matched');
      iconsOpened=[];
    } else {
        setTimeout(() => {
          iconsOpened[0].classList.toggle('front_side');
          iconsOpened[1].classList.toggle('front_side');
          iconsOpened=[];
        }, 1000);
      }
  }
});

//display elapsed time and stop when cards are matched

let s = -1;
let m = 0;
let h = 0;
let timeSeconds;
let timeTotal = 0; //total time of the game in seconds
let gameTime = 0;

function startTimer() {
  gameTime = setInterval(timer, 1000);
}

function timer() {

  timeTotal++
  if (s === 59) {
    s = 0;
  }
    s++;

if (s < 10 && m < 10  ) {
   timeSeconds = document.querySelector('#game-menu_time').innerHTML = 'Time: ' + h + 'h ' + '0' + m + 'm ' + '0' + s + 's';
} else if (s >= 10 && m < 10) {
    timeSeconds = document.querySelector('#game-menu_time').innerHTML = 'Time: ' + h +'h ' + '0' + m + 'm ' + s + 's';
  } else {
    timeSeconds = document.querySelector('#game-menu_time').innerHTML = 'Time: ' + h +'h ' + m + 'm ' + s + 's';
  }

if ( s === 59 ) {
  m++;
}
if ( m === 59) {
  m = 0;
  h++;
}
}

game_board.addEventListener('click', function() {
  if (!gameTime) {
    startTimer();
  }
})

setTimeout(function() {if (iconsMatched.length === 16) {
  clearInterval(gameTime);
}}, 20000);

// // if (iconsMatched.length === 16) {
// //   clearInterval(gameTime);
// }
