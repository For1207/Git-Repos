# Memory Game

This project is an electronic version of well known card game "Concentration"

[Wikipedia](https://en.wikipedia.org/wiki/Concentration_(card_game)) gives the following definition:

>"Concentration, also known as Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs, is a card game in which all of the cards are laid face down... and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards. ... The game ends when the last pair has been picked up."

The rules are straightforward enough and do not require further explanation.

The main idea was to emulate the logic of this game using instruments of HTML, CSS and JavaScript and meet all criteria described in Udacity's:
  - [Memory Game Project Specification](https://review.udacity.com/#!/rubrics/591/view);
  - Style Guides ([HTML](http://udacity.github.io/frontend-nanodegree-styleguide/index.html), [CSS](http://udacity.github.io/frontend-nanodegree-styleguide/css.html), [JavaScript](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html), [Git Commit Message](https://udacity.github.io/git-styleguide/))

A some starter code was provided.

## Implementation

At the beginning we have a static image with no interactivity. 'Cards' are [Font Awesome](https://fontawesome.com/icons?from=io) icons with unique class names "fa fa-****" for each pair, located as unorder list items with a common class name 'card'.

So developing strategy was as follow:

    * Display shuffled cards on the page;
    * Flip cards;
    * Match cards;
    * Describe a winning condition;
    * Provide statistics:
      * Time;
      * Score;
      * Moves counter;
    * Develop a 'reset' button;
    * Develop a modal with some information and an offer to play again;
    * Animation.


###  Display Shuffled Cards On The Page

At first an empty array `const cards = [...card];` was created in order to keep and shuffle cards.

Then a provided [Fisher-Yates](https://www.youtube.com/watch?v=tLxBwSL3lPQ) function () was used to shuffle the initial array.

After that using  `function displayCards()` we loop through aforementioned array an display cards on the page.


### Flip Cards

In app.css there are several rules for classes 'open', 'show' and 'match'. When used, they allow to open and hide cards icons. The idea was using click listeners switch 'open' and 'show' classes and in this way flip them. Then an event listener was added to the whole deck of cards with and additional condition witch make impossible toggling for cards class of 'match'. If two cards are opened - `cardsOpened.push(clickTarget);` add them to an array of opened cards `cardsOpened` witch will be used in the next step.

### Match Cards

Because every pair has a unique class name we can use it as a condition to compare cards in `cardsOpened`. Here (lines 66 - 83) we compare two cards. If they match we assign them a new class name 'match', add to the array of matched cards `cardsMatched` and clear `cardsOpened` with `clearCardsOpened()`. If not - toggle their class names to 'cards' only and clear `cardsOpened`. At this step `setTimeout` method added in order to delay switching them back.

### Describe a Winning Condition;

When we match a pair of cards, we add them to `cardsMatched`, so when all 8 pairs are matched, the length of this array is equal 16. And this is a winning condition: `cardsMatched.length === 16`. After that the game stops, all counter stop and a modal window appears.

### Provide Statistics

#### Time
Timer starts when the first card was clicked and stop when all cards are matched.
In order to do so click even listener was added in line 92 with Boolean condition `clockOff = true`. If so, it invokes function `startClock()` and assign `clockOff = false;`. If condition `cardsMatched.length === 16` is met, it calls stopClock() and stops the clock.

Lines 105 - 116 convert milliseconds to seconds and minutes, add to seconds 0, if they less than 10 and display time to the page with `displayTime()`.

#### Score

There are three main points here. According project specification:

>"The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1)."

Because I want more functional here, I choose move# 2 when the score falls to 2 stars, and move# 4 when it falls to 1. After that, with `movesToMatchedRatio` it evaluates ratio of matched cards and moves (`movesCounter`). Then it compare this ratio coefficients and assign 1, 2 of 3 stars and display them.
This functional is in lines 119 - 169. Functions `starScore()`, `display(OneOrTwoOrThree)Star()` do that.

#### Moves Counter

In the logic of this game one move - when two cards are compared, not just clicked. So when function `clearCardsOpened()`, in lines 54 - 61, clears the array in invokes `moves()`, wich in its turn increases `movesCounter` by 1 and display in on the page.

### Develop a 'Reset' Button

Lines 171 - 233.
A click event listener added in line 222 assigned to the `<div class="restart">`. When it is clicked it invokes function `resetGame()` which triggers other functions: `stopClock()`, `resetClock()`, `resetScore()`, `starScore()`, `movesReset ()`, `resetDeck ()`

### Develop a Modal

In `index.html`  was added `<div class = "modal">`  with classes `modal`, `checkmark`, `modal-header`, `modal-stats`, `modal-exclamation`, `modal-play-again` and a content for the modal. Then, in app.css I added rules for that classes. A click even listener in line 244 app.js listens for a condition when after that click `cardsMatched.length === 16` and the modal window pops up. Then in display game's congratulation message, moves, score, time and offers to play again.

### Animation

Is used in three places: the modal window, cards deck and the reset button.

Animation in the modal uses [Animate.css](https://github.com/daneden/animate.css)

The deck of cards and the reset button are animated with `@keyframes` from app.css.

## References

1. [Wikipedia](https://en.wikipedia.org/wiki/Concentration_(card_game));
2. [Udacity website](http://udacity.github.io/frontend-nanodegree-styleguide/index.html);
3. [Font Awesome](https://fontawesome.com/icons?from=io);
4. [Fisher-Yates method explanation](https://www.youtube.com/watch?v=tLxBwSL3lPQ);
5. [Animate.css](https://github.com/daneden/animate.css)

#### Final Note

I want to apologize before readers for my English. It is not my native language, but I am still learning.

:flushed:
