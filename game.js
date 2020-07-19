const cardsColor = ['red', 'red', 'lightgreen', 'lightgreen', 'violet', 'violet', 'royalblue', 'royalblue', 'brown', 'brown', 'orange', 'orange', 'yellow', 'yellow', 'olive', 'olive', 'pink', 'pink'];

let cards = [...document.querySelectorAll('div')];

const startTime = new Date().getTime();

const gamePairs = cardsColor.length / 2;
let gameResult = 0;

let activeCard = '';
const activeCards = [];

const clickCard = function () {
   activeCard = this;
   if (activeCard === activeCards[0]) return;
   activeCard.classList.remove('hidden');

   // Check if it's first click
   if (activeCards.length === 0) {
      activeCards[0] = activeCard;
      return;
   }
   // Check if it's second click
   else {
      activeCards[1] = activeCard;

      // If second click, block next card click
      cards.forEach(card => card.removeEventListener('click', clickCard));

      setTimeout(() => {

         // Check if pairs are the same 
         if (activeCards[0].className === activeCards[1].className) {
            activeCards.forEach(card => card.classList.add('off'));
            gameResult++;

            // Check if not double click on the same element and element with class hidden
            cards = cards.filter(card => !card.classList.contains('off'));

            // Check if game won, if won check the time of the game and display in alert, restart game
            if (gameResult === gamePairs) {
               const endTime = new Date().getTime();
               const gameTime = (endTime - startTime) / 1000;
               alert(`Congratulation! Your time is ${gameTime} seconds`);
               location.reload();
            }
         } else {
            activeCards.forEach(card => card.classList.add('hidden'));
         }
         activeCard = '';
         activeCards.length = 0;
         cards.forEach(card => card.addEventListener('click', clickCard));
      }, 1000);
   }
}

const init = () => {
   cards.forEach(card => {
      const position = Math.floor(Math.random() * cardsColor.length);
      card.classList.add(cardsColor[position]);
      cardsColor.splice(position, 1);
   })

   // Time to see the colors before they will be covered and add event listener to each card
   setTimeout(() => {
      cards.forEach(card => {
         card.classList.add('hidden');
         card.addEventListener('click', clickCard);
      });
   }, 2000);
}

init();