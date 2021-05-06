const mapImage = document.getElementById("item-map-svg");
const wrapper = document.getElementById("map-frame-wrapper");

const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");
const zoomKoef = 1.2;
const mapItems = Array.from(
  document.querySelector(".map-frame-wrapper").children
).slice(0, -1);

function zoomInAbsoluteElement(elem, koef) {
  if (elem.style.position !== "absolute") {
    elem.style.position = "absolute";
  }
  const prevWidth = elem.width;
  const prevHeight = elem.height;
  elem.style.width = `${elem.width * koef}px`;
  elem.style.height = "auto";
  const nextWidth = elem.width;
  const nextHeight = elem.height;
  const topPos = elem.offsetTop || 0;
  const leftPos = elem.offsetLeft || 0;
  elem.style.left = `${leftPos - (nextWidth - prevWidth) / 2}px`;
  elem.style.top = `${topPos - (nextHeight - prevHeight) / 2}px`;
}

function zoomOutAbsoluteElement(elem, koef) {
  if (elem.style.position !== "absolute") {
    elem.style.position = "absolute";
  }
  const prevWidth = elem.width;
  const prevHeight = elem.height;
  elem.style.width = `${elem.width / koef}px`;
  elem.style.height = "auto";
  const nextWidth = elem.width;
  const nextHeight = elem.height;
  const topPos = elem.offsetTop || 0;
  const leftPos = elem.offsetLeft || 0;
  elem.style.left = `${leftPos + (prevWidth - nextWidth) / 2}px`;
  elem.style.top = `${topPos + (prevHeight - nextHeight) / 2}px`;
}

zoomInButton.addEventListener("click", () => {
  if (mapImage.width <= wrapper.offsetWidth * 2) {
    for (let i = 0; i < mapItems.length; i++) {
      zoomInAbsoluteElement(mapItems[i], zoomKoef);
    }
  }
});

zoomOutButton.addEventListener("click", () => {
  if (
    mapImage.width >= wrapper.offsetWidth ||
    mapImage.height >= wrapper.offsetHeight
  ) {
    for (let i = 0; i < mapItems.length; i++) {
      zoomOutAbsoluteElement(mapItems[i], zoomKoef);
    }

    if (
      mapImage.width <= wrapper.offsetWidth &&
      mapImage.height <= wrapper.offsetHeight
    ) {
      mapImage.style.width = `${wrapper.offsetWidth}px`;
      mapImage.style.height = "auto";
      mapImage.style.top = `${(wrapper.offsetHeight - mapImage.height) / 2}px`;
      mapImage.style.left = "0px";
      if (mapImage.height >= wrapper.offsetHeight) {
        mapImage.style.height = `${wrapper.offsetHeight}px`;
        mapImage.style.width = "auto";
        mapImage.style.top = "0px";
        mapImage.style.left = `${(wrapper.offsetWidth - mapImage.width) / 2}px`;
      }
    }
  }
});
