class Pipe {
  float sizeX, sizeY;
  float posX;
  float gapSize;
  float speed;
  boolean passed;
  
  Pipe() {
    randomSeed(frameCount);
    
    gapSize = random(pipeSizeMinimum, pipeSizeMinimum * 1.5);
    sizeX = random(32, 96);
    sizeY = random(height - gapSize * 2);
    posX = random(width + sizeX, (width * 2) + sizeX);
  }
  
  void update() {
    if ((posX + sizeX) < (-sizeX)) {
      if (!state.queueDelete.contains(this))
        state.queueDelete.add(this);
    }
    posX -= speed;

    float bottomStart = sizeY + gapSize;
    
    stroke(0);
    strokeWeight(5);
    fill(255);
    
    rect(posX, 0, sizeX, sizeY);
//    rect(posX, sizeY, sizeX, gapSize);
    rect(posX, bottomStart, sizeX, height - bottomStart);
  }
}
