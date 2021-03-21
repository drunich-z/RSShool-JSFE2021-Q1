const pianoKeys = document.querySelectorAll(".piano-key");
const piano = document.querySelector(".piano");
const bodyPage = document.getElementsByTagName("body")[0];
const btnNotes = document.querySelector(".btn-notes");
const btnLetters = document.querySelector(".btn-letters");

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const startSound = (event) => {
  event.target.classList.add("piano-key-active");
  const note = event.target.dataset.note;
  playAudio(`./assets/audio/${note}.mp3`);
};

const stopSound = (event) => {
  event.target.classList.remove("piano-key-active");
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");
    const note = event.target.dataset.note;
    playAudio(`./assets/audio/${note}.mp3`);
  }
  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};

const stopCorrespondOver = (event) => {
  pianoKeys.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

const changePianoView = (event) => {
  if (event.target.classList.contains("btn-active")) return;
  if (event.target.classList.contains("btn-notes")) {
    event.target.classList.add("btn-active");
    btnLetters.classList.remove("btn-active");
    pianoKeys.forEach((elem) => {
      elem.classList.remove("letter");
    });
    return;
  }
  event.target.classList.add("btn-active");
  btnNotes.classList.remove("btn-active");
  pianoKeys.forEach((elem) => elem.classList.add("letter"));
};

piano.addEventListener("mousedown", startCorrespondOver, false);
bodyPage.addEventListener("mouseup", stopCorrespondOver);

btnNotes.addEventListener("click", changePianoView, false);
btnLetters.addEventListener("click", changePianoView, false);

const startPlayKey = (event) => {
  if (event.repeat) return;
  if (
    (pressedKey = piano.querySelector(
      `.piano-key[data-letter=${event.key.toUpperCase()}]`
    ))
  ) {
    playAudio(`./assets/audio/${pressedKey.dataset.note}.mp3`);
    pressedKey.classList.add("piano-key-active");
  }
};
const stopPlayKey = (event) => {
  if (
    (pressedKey = piano.querySelector(
      `.piano-key[data-letter=${event.key.toUpperCase()}]`
    ))
  ) {
    pressedKey.classList.remove("piano-key-active");
  }
};

window.addEventListener("keydown", startPlayKey);
window.addEventListener("keyup", stopPlayKey);
