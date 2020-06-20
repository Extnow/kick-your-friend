const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const friends = document.querySelectorAll('.friend');
let lastHole;
let timeUp = false;
let score = 0;
const friendsPhoto = ['anton', 'roma', 'nekit'];

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(500, 1000);
  const hole = randomHole(holes);

  const idx = Math.floor(Math.random() * friendsPhoto.length);

  hole.classList.add(friendsPhoto[idx]);
  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove(friendsPhoto[idx]);
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;

  const audio = new Audio();
  audio.preload = 'auto';
  audio.src = 'hit-sound.mp3';
  audio.play();

  score++;
  console.log(score);

  this.classList.remove('up');
  scoreBoard.textContent = score;
}

friends.forEach(friend => friend.addEventListener('click', bonk));
