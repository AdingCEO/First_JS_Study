const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// canvas background default
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR; // 색 디폴드값 설정
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color)
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event){
    const size = event.target.value
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
        
    }
}

function handleCanvasClick() {
    if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[😙]';
    link.click();
}


if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown); // 마우스 클릭하는 순간 발생하는 event
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}


Array.from(colors).forEach(color=>
    color.addEventListener('click', handleColorClick)
); // object를 array로 만들음

if(range) { // range가 있는지 단순 체크
    range.addEventListener('input', handleRangeChange);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}