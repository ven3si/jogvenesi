//Classe estrelas
class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 2);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}
//Final da Classe estrelas. 

//Classe munição
class Bullet {
  constructor(posX, posY, sizeX, sizeY) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  draw() {
    strokeWeight(2);
    stroke(red(0, 256), blue(0, 256), green(0, 256)); 
    fill(red(0, 256), red(0, 256), red(0, 256)); 
    rect(this.posX-15, this.posY-5, this.sizeX, this.sizeY);
    this.posY = this.posY - 20;
    rect(this.posX, this.posY+5, this.sizeX, this.sizeY);
    this.posY = this.posY - 20;
    rect(this.posX+15, this.posY-15, this.sizeX, this.sizeY);
    this.posY = this.posY - 20;
  }
}
//Fim da classe munição




//Classe nave
class Player {
  constructor(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
  }

  draw() {
    strokeWeight(5);
    stroke(0); 
    fill(red(0, 256), red(0, 256), red(0, 256));
    circle(this.posX+15, this.posY-2    , this.size/2);
    fill("white");
    triangle(this.posX, this.posY, this.posX+30, this.posY, this.posX+15, this.posY-20);
  
  
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.posX >= 5) {
      this.posX -= 15;
    }

    if (keyIsDown(RIGHT_ARROW) && this.posX <= width - player.size) {
      console.log(this.posX);
      this.posX += 15;
    }

    if (keyIsDown(UP_ARROW) && this.posY >= 5 + player.size) {
      this.posY -= 15;
    }

    if (keyIsDown(DOWN_ARROW) && this.posY <= height - player.size) {
      this.posY += 15;
    }
  }
}
//Fim da Classe nave

//Classe inimigo
class Enemy {
  constructor(posX, posY, size) {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
  }
  draw() {
    strokeWeight(3);
    stroke(255);
    line(this.posX+20, this.posY+random(20), this.posX+40, this.posY+10);
    strokeWeight(3); 
    stroke(255);
    line(this.posX+20, this.posY+random(20), this.posX, this.posY+10);
    this.posY++;
    strokeWeight(1); 
    fill(red(0, 256), red(0, 256), red(0, 256))
    circle(this.posX+20, this.posY+2, this.size);
    this.posY++;
    fill("red");
    rect(this.posX, this.posY, 2*this.size, this.size/2);
    this.posY++;
    
    
  }
}
//Fim da classe inimigo





//Declaração das variáveis
let enemies = [];
let timer = 1;
let points = 0;
var stars = [];


function setup() {
  
  
  createCanvas(displayWidth, 0.5*displayHeight);
  bullets = [];
  player = new Player(width/2, 0.98*height, 30);
  generateRandomEnemies();
  
  for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
}
  
}
function draw() {
  background("#051933");
  fill(random(0,256), random(0,256), random(0,256))
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
  player.draw();
  player.move();

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
  checkHit();

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
    if (timer == 0) {
      generateEnemy();
      timer = 1;
    }
  }

  noStroke();
  fill("orange");
  textSize(25);
  textFont('Audiowide, sans-serif');
  text("Score: " + points, 10, 30);
    
  
}

function keyReleased(event) {
  console.log();
  if (event.code === "Space") {
    shoot();
  }
  return false;
}


//Função gera inimigos aleátoriamente
function generateRandomEnemies() {
  for (let i = 0; i < 1; i++) {
    enemies.push(
      new Enemy(
        floor(random(0.3*width, 0.6*width)),
        floor(random(0.1*height, 0.2*height)),
        20
      )
    );
  }
}

function shoot() {
  let bullet = new Bullet(player.posX + 12, player.posY - 20, 5, 20);
  this.bullets.push(bullet);
  for (let i = 0; i < bullets.length; i++) {
    if (this.bullets[i].posY < 0) {
      bullets.splice(i, 1);
    }
  }
  console.log(bullets);
}

//Função pontuação
function checkHit() {
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      let d = dist(
        bullets[i].posX,
        bullets[i].posY,
        enemies[j].posX,
        enemies[j].posY
      );
      if (d < enemies[j].size) {
        enemies.splice(j, 1);
        points +=5;
      }
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    let d = dist(enemies[i].posX, enemies[i].posY, player.posX, player.posY);
    if (d < player.size) {
      points = 0;
      player.posX = width/2;
      player.posY = 0.9*height;
      enemies = [];
      generateRandomEnemies();
    }
  }
}

function generateEnemy() {
  enemies.push(
    new Enemy(
      floor(random(0.3*width, 0.6*width)),
      floor(random(0.1*height, 0.2*height)),
      20
    )
  );
}


function mousePressed() {
  if (mouseX > 0 && mouseX < displayWidth && mouseY > 0 && mouseY < displayHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
}
}