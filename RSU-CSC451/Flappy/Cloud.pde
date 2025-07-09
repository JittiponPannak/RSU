class Cloud {
  int imgIdx;
  float posX, posY;
  float sizeX, sizeY;
  float speed;
  
  Cloud() {
    float ratio = random(0.25, 2.5);
    
    sizeX = 96 * ratio;
    sizeY = 64 * ratio;
    
    posX = random(width + sizeX, (width * 2) + sizeX);
    posY = random(0, height);
    
    imgIdx = ((int) random(cloudsSmallImages.length + 1)) % cloudsSmallImages.length;
    speed = ratio * random(1.0, 2.5);
  }
  
  void update() {
    if ((posX + sizeX) < (-sizeX)) {
      if (!state.queueDelete.contains(this))
        state.queueDelete.add(this);
    }
    posX -= speed * (state.score + 1);
    
    image(cloudsSmallImages[imgIdx], posX, posY, sizeX, sizeY);
  }
}
