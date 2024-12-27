"use strict";

const gImageList = [];
const elCanvas = document.querySelector("canvas");
const elEditorScreen = document.querySelector(".editor-screen");
const elImageContainer = document.querySelector(".image-container");
const elTextInput = document.querySelector(".text-input");
const elFontSize = document.querySelector(".font-size-input");
const elColorPicker = document.querySelector(".color-input");
let textObj = {
  text: "",
  x: 50,
  y: 50,
  fontSize: 40,
  color: "white",
};

let gTexts = [];
let gctx;
let selectedImageSrc = null;

function onInit() {
  gctx = elCanvas.getContext("2d");
  elEditorScreen.style.display = "none";
  setImageList();
  addEventListeners();
}

function setImageList() {
  if (!elImageContainer) return;

  for (let i = 1; i <= 18; i++) {
    gImageList.push({ src: `meme-imgs (square)/${i}.jpg`, alt: `photo ${i}` });
  }

  gImageList.forEach((image, idx) => {
    const imgElement = document.createElement("img");
    imgElement.onclick = () => onImageClick(idx);
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.classList.add("meme-image");
    elImageContainer.appendChild(imgElement);
  });
}

function onImageClick(idx) {
  selectedImageSrc = gImageList[idx].src;
  elEditorScreen.style.display = "block";
  elImageContainer.style.display = "none";
  const img = new Image();
  img.src = selectedImageSrc;
  img.onload = () => {
    gctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
  };
}

function showGallery() {
  elEditorScreen.style.display = "none";
  elImageContainer.style.display = "block";
  gctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
}

function addText() {
  const text = elTextInput.value;
  const fontSize = 40;
  const color = elColorPicker.value || "white";

  const textObj = {
    text,
    x: 50,
    y: 50,
    fontSize,
    color,
  };

  gTexts.push(textObj);
  renderMeme();
}

function redrawCanvas() {
  gctx.clearRect(0, 0, elCanvas.width, elCanvas.height);

  if (!selectedImageSrc) return;
  const img = new Image();
  img.src = selectedImageSrc;
  img.onload = () => {
    gctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
  };
}
function renderMeme() {
  redrawCanvas();
  setTimeout(() => {
    drawTexts();
  }, 30);
}

function drawTexts() {
  gTexts.forEach((textObj) => {
    gctx.font = `${textObj.fontSize}px Arial`;
    gctx.fillStyle = textObj.color;
    gctx.fillText(textObj.text, textObj.x, textObj.y);
  });
}

function downloadMeme(elLink) {
  const data = elCanvas.toDataURL();
  elLink.href = data;
  elLink.download = "my-meme.jpg";
}

function onUploadImage(ev) {
  const file = ev.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      selectedImageSrc = img.src;
      gctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
      gctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height);
    };
  };
  reader.readAsDataURL(file);
}

function addEventListeners() {
  elTextInput.addEventListener("input", () => redrawCanvas());
  elFontSize.addEventListener("input", () => redrawCanvas());
  elColorPicker.addEventListener("input", () => redrawCanvas());
}

function onDeleteCanvasText() {
  gctx.fillStyle = "white";
  gctx.fillRect(0, 0, elCanvas.width, elCanvas.height);
  gTexts = [];
  redrawCanvas();
}

function colorChange() {
  const color = elColorPicker.value || "white";
  gTexts[0].color = color;
  renderMeme();
}

function fontSizeChange(num) {
  gTexts[0].fontSize += num;
  renderMeme();
}
