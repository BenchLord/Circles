var Enemy = Class.extend({
  init: function(canvas, r, colors) {
    this.r = Math.floor(Math.random() * (r + 10)) + (r - 5);
    this.color = colors[Math.floor(Math.random() * (colors.length - 1))];
    
    var self = this;
    switch (Math.floor(Math.random() * 4) + 1) {
      case 1: // Top
        self.x = Math.floor(Math.random() * canvas.width);
        if (self.r < 80) {
          self.y = 0 - self.r;
        } else {
          self.y = 0;
        }
        self.yVel = 2 - ((1/5) * Math.sqrt(self.r));
        var theta = (Math.random() * Math.PI);
        self.xVel = Math.cos(theta) * self.yVel;
      break;
      case 2: // Bottom
        self.x = Math.floor(Math.random() * canvas.width);
        if (self.r < 80) {
          self.y = canvas.height + self.r;
        }
        self.yVel = -2 + ((1/5) * Math.sqrt(self.r));
        var theta = (Math.random() * (2 * Math.PI)) + Math.PI;
        self.xVel = Math.sin(theta) * self.yVel;
      break;
      case 3: // Right
        self.y = Math.floor(Math.random() * canvas.height);
        if (self.r < 80) {
          self.x = canvas.width + self.r;
        } else {
          self.x = canvas.width;        
        }     
        self.xVel = -2 + ((1/5) * Math.sqrt(self.r));
        var theta = (Math.random() * (2 * Math.PI)) + Math.PI;
        self.yVel = Math.sin(theta) * self.xVel;
      break;
      case 4: // Left
        self.y = Math.floor(Math.random() * canvas.height); 
        if (self.r < 80) {
          self.x = 0 - self.r;
        } else {
          self.x = 0;
        }
        self.xVel = 2 - ((1/5) * Math.sqrt(self.r));
        var theta = (Math.random() * Math.PI);
        self.yVel = Math.cos(theta) * self.xVel;
      break;
    }
  },

  draw: function(ctx) {
    ctx.save()
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    ctx.restore()
  },

  update: function(enemies, canvas) {
    this.x += this.xVel;
    this.y += this.yVel;

    var self = this;
    if (((self.x + self.r) < 0  && self.xVel < 0) || ((self.x - self.r) > canvas.width && self.xVel > 0) || ((self.y + self.r) < 0 && self.yVel < 0) || ((self.y - self.r) > self.height && self.yVel > 0)) {
      var index = enemies.indexOf(self);
      enemies.splice(index, 1);
    }
  }
})
