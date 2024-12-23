<!--HTML>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sahar's Meme Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="onInit()">
    <section class="top-nav">
        <nav>
            <h2>Meme Generator</h2>
            <ul class="nav-buttons">
                <button onclick="showGallery()">Gallery</button>
                <button>Upload</button>
            </ul>
        </nav>
    </section>
    <section class="meme-container">
        <div class="image-container">
            <label class="upload-label">Upload</label>
            <img onclick="onImageClick()" >
        </div>
    </section>
    <section class="editor-screen">
        <canvas width="500" height="500"></canvas>
        <br>
        <input class="text-input" type="text" placeholder="Enter text here">
        <br>
        
        <button onclick="addText()">Add Text</button>
    </section>
    <script src="memesjs.js"></script>
</body>
</html>

//JS
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

    /*CSS*/
    *{
    box-sizing: border-box;
}

.top-nav{
    justify-content: space-between;
    align-items: right;
    padding: 0 20px;
    background-color: #f4f4f4;
    border-bottom: solid 1px #000;
}

.nav-buttons{
    /* display: flex; */
    justify-content: end;
}

.meme-container{
    display: flex;
    background-color: grey;
    border-spacing: 0caps;
}

img{
    width: 250px;
    height: auto;
    margin: 0%;
    border-radius: 200px;
    cursor: pointer;
}
.image-container label{
    display: block;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    background-size: contain;
    padding: 10px;
    cursor: pointer;
}

.hidden{
    display: none;
}
