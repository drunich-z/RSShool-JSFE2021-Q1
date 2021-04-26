const filters = document.querySelector(".filters");
const outputs = document.querySelectorAll(".filters output");
const btnFullScreen = document.querySelector(".fullscreen");
const buttons = document.querySelector(".btn-container");
const currentImage = document.querySelector(".current-picture");
const fileInput = document.querySelector('input[type="file"]');
let currentImageIndex = 0;
let pathToImages =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/";

const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

const inputsHandle = (event) => {
  const suffix = event.target.dataset.sizing || "";
  event.target.parentNode.lastElementChild.value = event.target.value;
  document.documentElement.style.setProperty(
    `--${event.target.name}`,
    event.target.value + suffix
  );
};

filters.addEventListener("input", inputsHandle);

function changeActiveButton(elem) {
  elem.classList.add("btn-active");
  for (let i = 0; i < buttons.children.length; i++) {
    if (buttons.children.item(i) !== elem)
      buttons.children.item(i).classList.remove("btn-active");
  }
}

//переписать при случае, например ч/з установку значений или ещё как то, а то ужос
function resetFilters() {
  for (let i = 0; i < filters.children.length; i++) {
    const suffix =
      filters.children.item(i).children.item(0).dataset.sizing || "";
    if (filters.children.item(i).children.item(0).name == "saturate") {
      filters.children.item(i).children.item(0).value = 100;
      filters.children.item(i).children.item(1).value = 100;
      document.documentElement.style.setProperty("--saturate", "100%");
    } else {
      filters.children.item(i).children.item(0).value = 0;
      filters.children.item(i).children.item(1).value = 0;
      document.documentElement.style.setProperty(
        `--${filters.children.item(i).children.item(0).name}`,
        0 + suffix
      );
    }
  }
}
function getPathToImages() {
  let date = new Date();
  const hours = date.getHours();
  let pathEnding = "";
  if (hours < 6) pathEnding = "night/";
  if (hours >= 6 && hours < 12) pathEnding = "morning/";
  if (hours >= 12 && hours < 18) pathEnding = "day/";
  if (hours >= 18 && hours < 24) pathEnding = "evening/";
  return (
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    pathEnding
  );
}

function viewBgImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    currentImage.src = src;
  };
}

//как бы красивую смену картинок сделать, когда имг не бэкграунд
function getImage(event) {
  pathToImages = getPathToImages();
  const index = currentImageIndex % images.length;
  const imageSrc = pathToImages + images[index];
  viewBgImage(imageSrc);
  currentImageIndex++;
  event.target.disabled = true;
  setTimeout(function () {
    event.target.disabled = false;
  }, 1000);
}

const buttonsHandle = (event) => {
  if (!(event.target === buttons)) changeActiveButton(event.target);
  if (event.target.textContent === "Reset") resetFilters();
  if (event.target.textContent === "Next picture") getImage(event);

  console.log(event.target.name);
};

buttons.addEventListener("click", buttonsHandle);

//************************************************************/
function activateFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen(); // W3C spec
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
}
function deactivateFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

btnFullScreen.addEventListener("click", () => {
  document.fullscreen
    ? deactivateFullscreen()
    : activateFullscreen(document.documentElement);
});
/************************************************************** */
console.log(outputs);
