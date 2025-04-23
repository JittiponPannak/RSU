final PImage[] birdImages = new PImage[3];
final int birdFrameDelay = 1;

ArrayList<Bird> birds = new ArrayList();
Bullet bullet = null;
float shootX = -1, shootY = -1;

void setup() {
  birdImages[0] = loadImage("bird1.png");
  birdImages[1] = loadImage("bird2.png");
  birdImages[2] = loadImage("bird3.png");
  
  size(800, 800);
  
  for (int i = 0; i < 10; i++) {
    birds.add(new Bird());
  }
  
  noLoop();
}
void draw() {
  background(255);
  
  if (bullet != null) {
    bullet.update();
    if (bullet.dead) {
      bullet = null;
    }
  } else if (mousePressed) {
    bullet = new Bullet(mouseX, mouseY);
  }
  
  ArrayList<Bird> birdsToRemove = new ArrayList();
  for (Bird bird : birds) {
    bird.update();
    
    if (bullet != null) {
      if (dist(bullet.posX, bullet.posY - 25, bird.posX, bird.posY) <= 50.0) {
        bird.dead = true;
        bullet = null;
      }
    }
    
    if (bird.dead) {
      birdsToRemove.add(bird);
    }
  }
  
  for (Bird bird : birdsToRemove) {
    birds.remove(bird);
  }
  
  fill(255, 0, 0);
  circle(mouseX, mouseY, 5);
  fill(0, 0, 0, 0);
  stroke(255, 0, 0);
  strokeWeight(5);
  circle(mouseX, mouseY, 50);
  
  if (birds.isEmpty()) {
    background(255);
    fill(0);
    text("The End", 50, 50);
    noLoop();
  }
}
void keyPressed() {
  if (key == 's')// start game
    loop();
}


class Bird {
  int imgPos = 0;
  int imgDel = birdFrameDelay;
  float posX, posY;
  float targetX, targetY;
  float flyWeight;
  boolean dead;
  
  Bird() {
    randomTarget();
  }
  
  void randomTarget() {
    targetX = random(50, width - 50);
    targetY = random(50, height - 50);
    flyWeight = random(0.025, 0.05);
  }
  
  void update() {
    if (dead) { return; }
    
    imgDel--;
    if (imgDel <= 0) {
      imgDel = birdFrameDelay;
      imgPos = (imgPos + 1) % birdImages.length;
    }
    if ((int) posX == (int) targetX && (int) posY == (int) targetY) {
      randomTarget();
    }
    
    posX = lerp(posX, targetX, flyWeight);
    posY = lerp(posY, targetY, flyWeight);
    
    image(birdImages[imgPos], posX, posY);
  }
}
class Bullet {
  float posX, posY;
  float targetX, targetY;
  boolean dead;
  
  Bullet(float posX, float posY) {
    targetX = posX;
    targetY = posY;
    this.posX = width / 2;
    this.posY = height * 2;
  }
  
  void update() {
    if (dead) { return; }
    
    posX = lerp(posX, targetX, 0.5);
    posY = lerp(posY, targetY, 0.5);
    
    noStroke();
    fill(255, 255, 0);
    circle(posX, posY, 25);
    
    if ((int) posX == (int) targetX && (int) posY == (int) targetY) {
      dead = true;
    }
  }
}
