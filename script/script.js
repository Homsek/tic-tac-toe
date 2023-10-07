let cells = document.querySelectorAll('#field td');
let icons = document.querySelectorAll('.icon');
let playerOne = document.querySelector('#player-one');
let playerTwo = document.querySelector('#player-two');
let iconsOne = document.querySelector('#icons-one');
let iconsTwo = document.querySelector('#icons-two');
let titleWinner = document.querySelector('.content-main__winner-title');
const buttonRestart = document.querySelector('.button-restart');
let iconsActive = false;

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

start(cells);

playerOne.addEventListener('click', function () {
   if (iconsActive == false & iconsTwo.classList.contains('_invisible')) {
      iconsOne.classList.remove('_invisible');
      iconsActive = true;
   } else if (iconsActive == true & iconsTwo.classList.contains('_invisible')) {
      iconsOne.classList.add('_invisible');
      iconsActive = false;
   }
});

playerTwo.addEventListener('click', function () {
   if (iconsActive == false & iconsOne.classList.contains('_invisible')) {
      iconsTwo.classList.remove('_invisible');
      iconsActive = true;
   } else if (iconsActive == true & iconsOne.classList.contains('_invisible')) {
      iconsTwo.classList.add('_invisible');
      iconsActive = false;
   }
});

for (let item of icons) {
   item.addEventListener('click', function () {
      if (iconsActive == true & iconsTwo.classList.contains('_invisible') & playerTwo.textContent != item.textContent) {
         playerOne.textContent = item.textContent;
         iconsActive = false;
         iconsOne.classList.add('_invisible');
      }
      else if (iconsActive == true & iconsOne.classList.contains('_invisible') & playerOne.textContent != item.textContent) {
         playerTwo.textContent = item.textContent;
         iconsActive = false;
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

            if (isVictory(cells)) {
               titleWinner.textContent = 'СОСАТЬ МУРАВЬЕДЫ!!! Победил ' + this.textContent;
               setTimeout(function () {
                  buttonRestart.classList.remove('_invisible')
               }, 1000);
            }
            i++;
         }
      });
   }
}

buttonRestart.addEventListener('click', function restart() {
   location.reload()
})