// Try again button
let button = null;
let cuby_sz;
let cuby;
let vel;
let obs;
let x1, x2;

function preload(){
  // Import our background
  bg = loadImage('assets/back.png'); 
  
  // Sounds
  
  jump_sfx = loadSound('assets/jump.mp3');
  jump_sfx.setVolume(0.4);
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Cuby object
  cuby_sz = 40;
  cuby = new Cuby(30,height-cuby_sz, cuby_sz);

  
  // Draw Sound button
  buttonSound = createButton("Mute");
  buttonSound.style("background-color", color(186,47,47));
  buttonSound.style("color", color(0,0,0));
  buttonSound.position(width / 2,  25);

  // Score
  score = 0;
  
  // Velocity
  vel = 7;

  // Array of obstacles
  obs = [];

  // position of the first and second image
  x1 = 0;
  x2 = width;
}


function touchStarted(){
  cuby.jump();
}

function keyPressed(){
  
  // When SPACE is pressed cuby jumps
  if(key == ' '){
    cuby.jump();
  }

}

function scoreFunc(){
    score += 1;
    vel += 0.2;
  
    for(let i = 0; i < obs.length; i++) {
      obs[i].vel = vel;
    }
  
    // Enable double jump
    if(score%10 == 0 && score !== 0){
      cuby.doublejump = true;
      cuby.accdj += 1;
    }

}

function spawnObstacle(){
    // Spawn an obstacle passing the cuby side
    if(obs.length != 0){
      // If exists more obs pass the last to calculate the spawn
      // preventing the overlap spawning
	  obstacle = new Entity(cuby_sz, obs[obs.length-1].x, vel);
    } else {
      obstacle = new Entity(cuby_sz, 0, vel);
    }
    obs.push(obstacle);
}

function obstaclesState(){
 
  // Draw and move the obstacles
  for(let i = 0;i < obs.length;i++){

  	obs[i].show();
  	obs[i].move();
    
    // Verify if cuby hit an obstacle
    obs[i].collide(cuby.x, cuby.y, cuby.side, cuby.side, obs[i].x, obs[i].y, obs[i].w, obs[i].h);
    
  	// If the obstacles are out of screen remove them
  	if(obs[i].x < -cuby_sz/2){
  		// array.splice(index,many_items_to_rm)
  		obs.splice( i, 1);
        scoreFunc();
  	}
  }
}

function parallax(){
    // Doing the parallax background
	x1 -= 1;
	x2 -= 1;

	if(x1 < -width){
		x1 = width;
	}

	if(x2 < -width){
		x2 = width;
	}
}

function reset(btn){
  // Reset the game when pressed Try Again
  button.remove();
  buttonSound.remove();
  setup();
  draw();
  loop();
}

function draw() {
  // image(image, topleft-x, topleft-y, width, height)
  image(bg, x1,0,width,height);
  image(bg, x2,0,width,height);
  parallax();
  
  // Draw and move cuby
  cuby.show();
  cuby.move();
  
  // Draw Score
  textSize(24);
  text("Score: "+score, 100,50);
  
  // Draw double jumps
  if(cuby.doublejump){
    textSize(24);
    text(cuby.accdj+"\nDouble Jumps", width-300, 50);
  }
  
  // Spawn a new object when pass 50 frames on the screen
  if(frameCount % 15 == 0){
    spawnObstacle();
  }
  
  // Check if cuby hit obstacle and draw them
  obstaclesState();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
