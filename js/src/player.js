var Player = Class.extend({
  init: function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.score = 0;
  },

  update: function(input) {
    var self = this;
    if (input.isDown("left")) {
      self.x -= 3;
    }
    if (input.isDown("right")) {
      self.x += 3;
    }
    if (input.isDown("up")) {
      self.y -= 3;
    }
    if (input.isDown("down")) {
      self.y += 3;
    }
  },

  draw: function(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }
})

