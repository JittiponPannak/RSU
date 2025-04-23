class Player {
  int animIndex;
  int animDelay;
  
  boolean isFalling;
  float flyToY, fallMomentum;
  float posX, posY;
  float tPosX, tPosY;
  float rotation;
  
  Player() {
    posY = height / 3.0;
    
    tPosX = (width / 2) - (birdImageSizeX / 2 * 2);
    tPosY = posY + (birdImageSizeX / 2);
  }
  
  void drop() {
    isFalling = true;
    fallMomentum += 10.0;
  }
  void jump() {
    flyToY = posY - birdImageSizeX;
    fallMomentum = 0.0;
    isFalling = false;
    
    jumpSounds[(int) random(jumpSounds.length)].play();
  }
  
  void update() {
    if (flyToY > (posY - 16)) {
      isFalling = true;
    }
    
    if (isFalling) {
      fallMomentum += 1.0;
      posY = lerp(posY, posY + fallMomentum, 0.1);
    } else {
      posY = lerp(posY, flyToY, 0.1);
    }
    
    animDelay--;
    if (animDelay <= 0) {
      animDelay = 12;
      animIndex = (animIndex + 1) % birdImages.length;
    }
    
    pushMatrix();
    translate(tPosX, tPosY);
    
    /*
    if (isFalling) {
      rotation = lerp(rotation, 10, 0.75);
    } else {
      rotation = lerp(rotation, -5, 0.75);
    }
    */
    
    rotate(rotation);
    image(birdImages[animIndex], posX, posY);
    popMatrix();
    
  }
}
