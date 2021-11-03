const zoomStepInPercents = 20;
const zoomInKoef = (100 + zoomStepInPercents) / 100;
const zoomOutKoef = 100 / (100 + zoomStepInPercents);

const mapImage = document.getElementById("item-map-svg");
const mapWrapper = document.getElementById("map-frame-wrapper");
const centerX = mapWrapper.offsetWidth / 2;
const centerY = mapWrapper.offsetHeight / 2;

const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

const mapItems = Array.from(
  document.querySelector(".map-frame-wrapper").children
).slice(0, -1);

let deltaX = 0;
let deltaY = 0;
let startX;
let startY;

function getNewCoordinateOfLeftAfterZoom(x, koef) {
  return (x - centerX) * koef + centerX;
}

function getNewCoordinateOfTopAfterZoom(y, koef) {
  return centerY - (centerY - y) * koef;
}

function zoomAbsoluteDivElement(elem, koef) {
  if (elem.style.position !== "absolute") {
    elem.style.position = "absolute";
  }

  const newWidth = elem.clientWidth * koef;
  const newHeight = elem.clientHeight * koef;
  elem.style.width = `${newWidth}px`;
  elem.style.height = `${newHeight}px`;
 // elem.clientWidth = newWidth;
 // elem.clientHeight = newHeight;

  const topPos = elem.offsetTop || 0;
  const leftPos = elem.offsetLeft || 0;
  elem.style.left = `${getNewCoordinateOfLeftAfterZoom(leftPos, koef)}px`;
  elem.style.top = `${getNewCoordinateOfTopAfterZoom(topPos, koef)}px`;
}

zoomInButton.addEventListener("click", () => {
  if (mapImage.width <= mapWrapper.offsetWidth * 3) {
    for (let i = 0; i < mapItems.length; i++) {
      zoomAbsoluteDivElement(mapItems[i], zoomInKoef);
    }
  }
});

zoomOutButton.addEventListener("click", () => {
  let newZoomOutKoef = zoomOutKoef;
  if (
    mapImage.width >= mapWrapper.offsetWidth ||
    mapImage.height >= mapWrapper.offsetHeight
  ) {
    if (
      !(
        mapImage.width * newZoomOutKoef >= mapWrapper.offsetWidth ||
        mapImage.height * newZoomOutKoef >= mapWrapper.offsetHeight
      )
    ) {
      newZoomOutKoef =
        mapWrapper.offsetWidth / mapImage.width <
        mapWrapper.offsetHeight / mapImage.height
          ? mapWrapper.offsetWidth / mapImage.width
          : mapWrapper.offsetHeight / mapImage.height;
    }
    for (let i = 0; i < mapItems.length; i++) {
      zoomAbsoluteDivElement(mapItems[i], newZoomOutKoef);
    }
  }
});

const stopMove = () => {
  mapWrapper.removeEventListener("mousemove", moveBlock);
  mapWrapper.removeEventListener("mouseup", stopMove);
  mapWrapper.removeEventListener("mouseout", stopMove);
};

const moveBlock = (e) => {
  deltaX = startX - e.pageX;
  deltaY = startY - e.pageY;
  for (let i = 0; i < mapItems.length; i++) {
    mapItems[i].style.left = `${mapItems[i].offsetLeft - deltaX}px`;
    mapItems[i].style.top = `${mapItems[i].offsetTop - deltaY}px`;
  }
  startX = e.pageX;
  startY = e.pageY;
};

mapWrapper.addEventListener("mousedown", (e) => {
  
  startX = e.pageX;
  startY = e.pageY;

  mapWrapper.addEventListener("mousemove", moveBlock);
  mapWrapper.addEventListener("mouseup", stopMove);
  mapWrapper.addEventListener("mouseout", stopMove);
});
