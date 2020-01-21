var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var fly_audio = new Audio();
var score_audio = new Audio();

fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 110;

var pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0
}

var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 1.7;

document.addEventListener("keydown", moveUp);

function moveUp(event) {
  if (event.keyCode == 38) {
  yPos -= 40;
  fly_audio.play();
}
}

function draw() {
  
  window.requestAnimationFrame(draw);
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y +
    pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if (xPos + bird.width >= pipe[i].x &&
    xPos <= pipe[i].x + pipeUp.width &&
    (yPos <= pipe[i].y + pipeUp.height ||
    yPos + bird.height >= pipe[i].y + pipeUp.height + gap) ||
    yPos + bird.height >= canvas.height - fg.height) {
      if (!window.location.hash)
      document.location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = '#f47272';
  ctx.font = "24px Roboto";
  ctx.fillText("Ұпай: " + score, 10, canvas.height - 20);

  
}

pipeBottom.onload = draw;
