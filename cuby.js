class Cuby {
	constructor(x,y, side){
		this.side = side;
		this.x = x;
		this.y = y;
		// Jump accumulator
		this.vy = 0;
		this.gravity = 0.8;
        // Variable that tells me if I have dj
        this.doublejump = false;
        // Accumulator for double jumps
        this.accdj = 0;

		// For stroke values
		this.r = 0;
		this.g = 0;
		this.b = 255;
      
        // Trail history
        this.history = [];

	}
	randomColor(){

		this.r = int (random(0, 255));
		this.g = int (random(0, 255));
		this.b = int (random(0, 255));
	}
  
	jump(){

		if(this.y == height-this.side){
            jump_sfx.play();
			this.vy = -20;
		    this.randomColor();
        
        } else if(this.doublejump === true){
            jump_sfx.play();
            this.vy = -20;
		    this.randomColor();
            this.accdj -= 1;
            
            if(this.accdj <= 0){
              this.doublejump = false;
            }
        }

	}

	move(){
		this.y += this.vy;
		this.vy += this.gravity;
		// constrain(n, min, max) Constrains a value between a minimum and maximum value.
		// So this.y can't go less then 0 neither height - size of the cube
		this.y = constrain(this.y, 0, height - this.side);
      
        // Color trail
        let v = createVector(this.x, this.y);
        this.history.push(v);
        
        // If trail is bigger than 10 start to splice it
        if (this.history.length > 20) {
          this.history.splice(0, 1);
        }
	}

	show() {
		rect(this.x,this.y,this.side,this.side);
		fill(0);
		stroke(this.r, this.g, this.b);
      
        // Show Trail
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
          let pos = this.history[i];
          vertex(pos.x, pos.y);
          endShape();
        }
        
        beginShape();
        for (let i = 0; i < this.history.length; i++) {
          let pos = this.history[i];
          vertex(pos.x+this.side, pos.y+this.side);
          endShape();
        }
	}
}