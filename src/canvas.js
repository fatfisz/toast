const backgroundCanvas = document.getElementById('background');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const ratio = 16 / 9;
let width;
let height;
let resized = true;

function coords(x, y) {
  return [width * x, height * y];
}

function coordX(x) {
  return width * x;
}

function coordY(y) {
  return height * y;
}

function setSizeFromWindow() {
  width = window.innerWidth;
  height = window.innerHeight;
  width = Math.min(width, Math.floor(window.innerHeight * ratio));
  height = Math.min(height, Math.floor(width / ratio));
  backgroundCanvas.style.width = width + 'px';
  backgroundCanvas.style.height = height + 'px';
  canvas.width = width;
  canvas.height = height;
}

const midX = 0.2;
const midY = 10;

function draw(now) {
  requestAnimationFrame(draw);
  if (resized) {
    resized = false;
    setSizeFromWindow();
  }

  context.clearRect(0, 0, ...coords(1, 1));

  context.beginPath();
  context.fillStyle = 'rgba(232, 228, 109, 0.6)';
  context.moveTo(...coords(midX, midY));
  context.lineTo(coordX(midX - 0.03), 0);
  context.lineTo(coordX(midX + 0.03), 0);
  context.fill();
}

window.onresize = () => {
  resized = true;
};

requestAnimationFrame(draw);
