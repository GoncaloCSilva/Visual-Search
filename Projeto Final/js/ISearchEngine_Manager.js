let app = null;
let count = 1;
let rowCount = 1;
const moreButton = document.getElementById('more');
const canvasGrid = document.getElementById('canvas-grid');

let doc = null;
let sounds = false;
let audio;
let buttons;
let color = null;

function main() {
    //let canvas = document.querySelector("canvas");
    app = new ISearchEngine("db/My_database.xml");
    //app.init(canvas);
    audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    buttons = document.querySelectorAll("button");
    app.init();
}

function search(){
    if(color == null) keywords();
    else colors();
}

function playAudio() {
    audio.play();
}

function sound(){
    sounds = !sounds;
    console.log(sounds);

    if(sounds) buttons.forEach(button => {
        document.getElementById("sound").style.background = "#dc3545";
        button.addEventListener("click", playAudio);
    });
    else buttons.forEach(button => {
        document.getElementById("sound").style.background = "white";
        button.removeEventListener("click", playAudio);

    });

}
function red(){
    let button = document.getElementById("colors red").value;
    console.log(button);
    color = button;
}
function orange(){
    let button = document.getElementById("colors orange").value;
    color = button;
}
function yellow(){
    let button = document.getElementById("colors yellow").value;
    color = button;
}   
function green(){
    let button = document.getElementById("colors green").value;
    color = button;
}
function aqua(){
    let button = document.getElementById("colors aqua").value;
    color = button;
}
function blue(){
    let button = document.getElementById("colors blue").value;
    color = button;
}
function blueviolet(){
    let button = document.getElementById("colors blueviolet").value;
    color = button;
}
function deeppink(){
    let button = document.getElementById("colors deeppink").value;
    color = button;
}
function white(){
    let button = document.getElementById("colors white").value;
    color = button;
}
function grey(){
    let button = document.getElementById("colors grey").value;
    color = button;
}
function black(){
    let button = document.getElementById("colors black").value;
    color = button;
}   
function brown(){
    let button = document.getElementById("colors brown").value;
    color = button;
}
function keywords(){
    let text = document.getElementById("searchbar").value;
    app.searchKeywords(text);
}

function colors(){
    let text = document.getElementById("searchbar").value;
    app.searchColor(text,color);
    color = null;
}

function addNewGrid() {
    const cols = 4;
    const rows = 3;
    if(count < 301)
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className="row"
        row.id=`row${rowCount}`;
        document.getElementById('canvas-grid').appendChild(row);
      for (let j = 0; j < cols; j++) {
        const canvas = document.createElement('canvas');
        canvas.id= `canvas${count}`;
        canvas.width=320;
        canvas.height=320;
        console.log(`row${rowCount}`)
        document.getElementById(`row${rowCount}`).appendChild(canvas);  
        count++
      }
      rowCount++;
    }
}

function more(){
    addNewGrid();
    app.databaseProcessing();
}

function Generate_Image(canvas) {
    var ctx = canvas.getContext("2d");
    var imgData = ctx.createImageData(100, 100);

    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 204;
        imgData.data[i + 1] = 0;
        imgData.data[i + 2] = 0;
        imgData.data[i + 3] = 255;
        if ((i >= 8000 && i < 8400) || (i >= 16000 && i < 16400) || (i >= 24000 && i < 24400) || (i >= 32000 && i < 32400))
            imgData.data[i + 1] = 200;
    }
    ctx.putImageData(imgData, 150, 0);
    return imgData;
}

function search_queries() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('queries');
      
    for (i = 0; i < x.length; i++) { 
        
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}