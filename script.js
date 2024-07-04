const keyboard = document.querySelector(".keyboard");
const h4 = document.querySelector("h4");
const wordDisplay = document.querySelector(".word-display");
const chance = document.querySelector(".chance");
const img = document.querySelector(".img");

const gameover = document.querySelector(".GameOver");
const gameoverimg = document.querySelector(".gameoverImg");
const answer = document.querySelector(".answer");
const h3 = document.querySelector("h3");
const h6 = document.querySelector("h6");

let count = 0;

// Randomly select a word and hint from the word list
const randomIndex = Math.floor(Math.random() * wordList.length);
const { word, hint } = wordList[randomIndex];

for (var i = 97; i <= 122; i++) {
  let button = document.createElement("button");
  button.classList.add("btn");
  button.innerHTML = String.fromCharCode(i);
  keyboard.appendChild(button);
}

const gameOver = (won) => {
  gameover.classList.add("show");
  document.querySelector(".game").style.opacity = 0.8;
  answer.innerText = word.toUpperCase(); // Display the correct word

  if (won) {
    gameoverimg.src = "images/victory.gif";
    h3.innerText = "Congrats!";
    h6.innerText = "You Guessed The Correct Answer!";
  } else {
    gameoverimg.src = "images/lost.gif";
    h3.innerText = "Game Over!";
  }
};

const gameOverwin = () => {
  const letterElems = document.querySelectorAll(".letter");
  let matchedWord = "";

  letterElems.forEach((v) => {
    matchedWord += v.innerText.toLowerCase();
  });

  if (matchedWord === word) {
    gameOver(true);
  }
};

const matchWord = (val) => {
  const matches = [];
  word.split("").forEach((el, index) => {
    if (el === val.toLowerCase()) {
      matches.push(index);
    }
  });

  if (matches.length === 0) {
    count++;
    chance.innerText = `${count}/6`;
  } else {
    matches.forEach((v) => {
      const letterElems = document.querySelectorAll(".letter");
      letterElems[v].innerText = val;
      letterElems[v].classList.add("guess");
    });
  }
};

const loadQuestion = () => {
  h4.innerText = `Hint: ${hint}`;

  for (let i = 0; i < word.length; i++) {
    let liTag = document.createElement("li");
    liTag.classList.add("letter");
    wordDisplay.appendChild(liTag);
  }

  const buttonTags = document.querySelectorAll(".btn");

  buttonTags.forEach((v) => {
    v.addEventListener("click", (e) => {
      matchWord(e.target.innerText);

      if (count >= 1 && count < 2) {
        img.src = "images/hangman-1.svg";
      } else if (count >= 2 && count < 3) {
        img.src = "images/hangman-2.svg";
      } else if (count >= 3 && count < 4) {
        img.src = "images/hangman-3.svg";
      } else if (count >= 4 && count < 5) {
        img.src = "images/hangman-4.svg";
      } else if (count >= 5 && count < 6) {
        img.src = "images/hangman-5.svg";
      } else if (count >= 6 && count < 7) {
        img.src = "images/hangman-6.svg";
        setTimeout(() => {
          gameOver(false);
        }, 200);
      }
      gameOverwin();
    });
  });
};

loadQuestion();
