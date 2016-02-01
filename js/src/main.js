$(document).ready(function() {

  var colors = [
    '#CB99C9',
    '#AEC6CF',
    '#77DD77',
    '#FFB347',
    '#FF6961'
  ];

  var p, canvas, ctx, counter, input, enemies, gameState;
  function init(state) {
    canvas = $('#GameCanvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    counter = 0;
    gameState = state;
    if (gameState != 'endState') {
      p = new Player(canvas.width / 2, canvas.height / 2, 8);  
    } else if (gameState == 'endState') {
      p = new Player(null, null, p.r);
    }
    if (gameState != 'endState') {
      enemies = [];      
    }

    input = new InputHandeler({
      left:     37,
      up:       38,
      right:    39,
      down:     40,
      space:    32
    });
  }

  function update(input) {
    if (gameState == 'playState') {
      p.update(input);
    } else {
      if (input.isPressed("space")) {
        init('playState');
      }
    }
    counter ++;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (counter % 5 == 0) {
      enemies.push(new Enemy(canvas, p.r, colors));
    }

    for (var i = 0; i < enemies.length; i++) {
      enemies[i].update(enemies, canvas);

      if (gameState == 'playState') {
                
        var dist = Math.sqrt(Math.pow(enemies[i].x - p.x, 2) + Math.pow(enemies[i].y - p.y, 2));
        if (dist<(enemies[i].r + p.r)) {
          if (p.r >= enemies[i].r) {
            var index = enemies.indexOf(enemies[i]);
            enemies.splice(index, 1);
            p.r++;
          } else {
            init('endState');
          }
        }
      }
    } 
  }

  function draw() { 
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw(ctx);
    }

    if (gameState == 'playState') {
      p.draw(ctx);

      ctx.font = "1em sans-serif";
      ctx.fillText("Score: " + (p.r - 8), 10, 30);      
    } else if (gameState == 'menuState') {
      ctx.fillStyle = "#fff"
      ctx.font = "7em sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Circles", canvas.width / 2, (canvas.height / 2) - 50);
      ctx.font = '3em sans-serif';
      ctx.fillText("Collect Circles Smaller Than You", canvas.width / 2, (canvas.height / 2) + 20)

      ctx.font = "2em sans-serif";
      ctx.fillText("Press Spacebar to begin!", canvas.width / 2, (canvas.height / 2) + 100)
    } else if (gameState == 'endState') {
      ctx.fillStyle = "#fff";
      ctx.font = "7em sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", canvas.width / 2, (canvas.height / 2) - 30);
      ctx.font = "2em sans-serif";
      ctx.fillText("Score: " + (p.r - 8), canvas.width / 2, (canvas.height / 2 + 15));
      ctx.fillText("Press Spacebar to play again!", canvas.width / 2, (canvas.height / 2) + 50)
    }
  }

  function loop() {
    update(input);
    draw();
  }

  init('menuState');
  var gameLoop = setInterval(loop, 17);
})