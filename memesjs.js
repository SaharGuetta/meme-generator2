'use strict';
const gImageList = [];
const elEditorScreen = document.querySelector('.editor-screen');
var gctx;

function onInit() {
    const canvas = document.querySelector("canvas");
    gctx = canvas.getContext("2d");
    elEditorScreen.style.display = "none";

    setImageList();
}

function setImageList() {
    const imageContainer = document.querySelector(".image-container");
    if (!imageContainer) return;

    for (let i = 1; i <= 18; i++) {
        gImageList.push({ src: `meme-imgs (square)/${i}.jpg`, alt: `photo ${i}` });
    }

    gImageList.forEach((image, idx) => {
        const imgElement = document.createElement("img");
        imgElement.onclick = () => {
            onImageClick(idx);
        };
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.classList.add("meme-image");
        
        imageContainer.appendChild(imgElement);
    });
}

function onImageClick(idx) {
    elEditorScreen.style.display = "block";
    const elImageContainer = document.querySelector(".image-container");
    elImageContainer.style.display = "none";
    const img = new Image();
    img.src = gImageList[idx].src;
    img.onload = () => {
        gctx.drawImage(img, 0, 0, gctx.canvas.width, gctx.canvas.height);
    };
}

function showGallery() {
        elEditorScreen.style.display = "none";
        const elImageContainer = document.querySelector(".image-container");
        elImageContainer.style.display = "block";
        elImageContainer.innerHTML = ""; 
        setImageList(); 
    }

    function addText() {
        const elTextInput = document.querySelector(".text-input");
        const text = elTextInput.value;
        gctx.font = "30px Arial";
        gctx.fillStyle = "white";
        gctx.fillText(text, 50, 50);
    }