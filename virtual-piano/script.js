const pianoKeys = document.querySelectorAll(".piano-key");
const piano = document.querySelector(".piano");
const bodyPage = document.getElementsByTagName("body")[0];
const btnNotes = document.querySelector(".btn-notes");
const btnLetters = document.querySelector(".btn-letters");

//const BTN = document.getElementById("btn.container");

const startSound = (event) => {
  event.target.classList.add("piano-key-active");
};

const stopSound = (event) => {
  event.target.classList.remove("piano-key-active");
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");
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
    pianoKeys[0].classList.remove("piano-key-letter");
    pianoKeys[0].classList.add("letter");
    pianoKeys.forEach((elem) => {
      elem.classList.remove("letter");
    });
    return;
  }
  event.target.classList.add("btn-active");
  btnNotes.classList.remove("btn-active");
  pianoKeys.forEach((elem) => elem.classList.add("letter"));
  pianoKeys[0].classList.remove("letter");
  pianoKeys[0].classList.add("piano-key-letter");
};

piano.addEventListener("mousedown", startCorrespondOver, false);
bodyPage.addEventListener("mouseup", stopCorrespondOver);

btnNotes.addEventListener("click", changePianoView, false);
btnLetters.addEventListener("click", changePianoView, false);
