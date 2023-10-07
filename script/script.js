let cells = document.querySelectorAll('#field td');
let icons = document.querySelectorAll('.icon');
let playerOne = document.querySelector('#player-one');
let playerTwo = document.querySelector('#player-two');
let iconsOne = document.querySelector('#icons-one');
let iconsTwo = document.querySelector('#icons-two');
let titleWinner = document.querySelector('.content-main__winner-title');
const buttonRestart = document.querySelector('.button-restart');
let iconsActive = 0;
let timeActive = 3;

start(cells);
timer();

// TIMER

function timer() {
   let time = 20;
   let timeOne = time;
   let timeTwo = time;
   let timerOne = document.querySelector('#timer-one');
   let timerTwo = document.querySelector('#timer-two');
   setInterval(function () {
      if (timeActive == 0 & titleWinner.textContent == '') {
         timeOne--;
         timerOne.textContent = timeOne;
         if (timeOne <= 0) {
            titleWinner.textContent = 'НЕ СПАТЬ! Победил ' + playerTwo.textContent;
            setTimeout(function () {
               buttonRestart.classList.remove('_invisible')
            }, 1000);
         }
      } else if (timeActive == 1 & titleWinner.textContent == '') {
         timeTwo--;
         timerTwo.textContent = timeTwo;
         if (timeTwo <= 0) {
            titleWinner.textContent = 'НЕ СПАТЬ! Победил ' + playerOne.textContent;
            setTimeout(function () {
               buttonRestart.classList.remove('_invisible')
            }, 1000);
         }
      }

   }, 900);
}

function isVictory(cells) {
   let combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   for (let comb of combs) {
      if (
         cells[comb[0]].textContent == cells[comb[1]].textContent &&
         cells[comb[1]].textContent == cells[comb[2]].textContent &&
         cells[comb[0]].textContent != ''
      ) {
         return true;
      }
   }

   return false;
}

playerOne.addEventListener('click', function () {
   if (iconsActive == 0 & iconsTwo.classList.contains('_invisible')) {
      iconsOne.classList.remove('_invisible');
      iconsActive = 1;
   } else if (iconsActive == true & iconsTwo.classList.contains('_invisible')) {
      iconsOne.classList.add('_invisible');
      iconsActive = 0;
   }
});

playerTwo.addEventListener('click', function () {
   if (iconsActive == 0 & iconsOne.classList.contains('_invisible')) {
      iconsTwo.classList.remove('_invisible');
      iconsActive = 1;
   } else if (iconsActive == true & iconsOne.classList.contains('_invisible')) {
      iconsTwo.classList.add('_invisible');
      iconsActive = 0;
   }
});

for (let item of icons) {
   item.addEventListener('click', function () {
      if (iconsActive == 1 & iconsTwo.classList.contains('_invisible') & playerTwo.textContent != item.textContent) {
         playerOne.textContent = item.textContent;
         iconsActive = 0;
         iconsOne.classList.add('_invisible');
      }
      else if (iconsActive == 1 & iconsOne.classList.contains('_invisible') & playerOne.textContent != item.textContent) {
         playerTwo.textContent = item.textContent;
         iconsActive = 0;
         iconsTwo.classList.add('_invisible');
      }
   });
};

function start(cells) {
   let i = 0;

   for (let cell of cells) {
      cell.addEventListener('click', function () {
         if (this.textContent == '' & titleWinner.textContent == '') {
            this.textContent = [playerOne.textContent, playerTwo.textContent][i % 2];
            if (this.textContent == playerOne.textContent) {
               timeActive = 1;
            } else {
               timeActive = 0;
            }

            if (isVictory(cells)) {
               titleWinner.textContent = 'СОСАТЬ МУРАВЬЕДЫ!!! Победил ' + this.textContent;
               setTimeout(function () {
                  buttonRestart.classList.remove('_invisible')
               }, 1000);
            } else if (i >= 8) {
               titleWinner.textContent = 'ЯСНО, НИЧЬЯ';
               setTimeout(function () {
                  buttonRestart.classList.remove('_invisible')
               }, 1000);
            }
            i++;
            iconsActive = 3;
            iconsOne.classList.add('_invisible');
            iconsTwo.classList.add('_invisible');
         }
      });
   }
}

buttonRestart.addEventListener('click', function restart() {
   location.reload()
})
