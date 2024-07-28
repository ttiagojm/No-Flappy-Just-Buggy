class Entity {

  constructor(cuby_sz, last_obs, vel) {
    this.velocity = vel;
    this.spacing = 175;
    this.w = cuby_sz / 2;
    this.h = 200;
    this.x = random(width + last_obs, (width + last_obs * 2) / 2) + this.spacing;
    this.y = height - this.h;

  }

  gameOver() {
    noLoop();
    
    /// Mute sound
    main_sound.stop();

    // Draw Game Over text
    textSize(40);
    //translate(-width / 5.5, 0);
    // text(str, x, y, [x2], [y2])
    text("GAME OVER!", width / 2 - 75, height / 2 - 75);

    // Draw Try again button
    button = createButton("Try Again");
    button.style("background-color", color(186,47,47));
    button.style("color", color(0,0,0));
    button.position(width / 2,  height / 2);
    button.mousePressed(reset);
  }

  collide(cx, cy, cw, ch, ox, oy, ow, oh) {
    const hit = collideRectRect(cx, cy, cw, ch, ox, oy, ow, oh);

    if (hit) {
      this.gameOver();

    }
  }

  move() {
    this.x -= this.velocity;
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }
}