class State {
  int score;
  int seconds;
  
  boolean paused;
  boolean gameOver;
  
  Player player = new Player();
  ArrayList<Cloud> clouds = new ArrayList();
  ArrayList<Pipe> pipes = new ArrayList();
  ArrayList<Object> queueDelete = new ArrayList();
  
  State() {
    start = false;
  }
  
  void spawnPipe() {
    Pipe pipe = new Pipe();
    pipe.speed = random(1, score + 1);
    pipes.add(pipe);
  }
  
  void update() {
    if (!paused && !gameOver) {
      float playerPosX = player.tPosX + player.posX + birdImageSizeX / 2;
      float playerPosY = player.tPosY + player.posY + birdImageSizeX / 2;
        
      if (pipes.size() < 2) {
        for (Pipe _pipe : pipes) {
          if (_pipe.posX < (width / 2)) {
            spawnPipe();
            break;
          }
        }

      }
      
      if (clouds.size() < 10) {
        Cloud cloud = new Cloud();
        clouds.add(cloud);
      }
      
      for (Cloud cloud : clouds) {
        cloud.update();
      }
      
      for (Pipe pipe : pipes) {
        pipe.update();
        
        if (!pipe.passed && playerPosX > pipe.posX) {
          pipe.passed = true;
          score++;
          scoreSound.play();
        }
        
        boolean isInsideX = playerPosX > pipe.posX && playerPosX < (pipe.posX + pipe.sizeX);
        boolean isInsideY = playerPosY > (pipe.sizeY + pipe.gapSize) || playerPosY < pipe.sizeY;
        
        if ((isInsideX && isInsideY) || playerPosY > height) {
          gameOver = true;
          explodeSound.play();
          music.stop();
        }
      }
      
      player.update();
      
    }
    
    for (Object object : queueDelete) {
      if (clouds.contains(object)) { clouds.remove(object); }
      if (pipes.contains(object)) { pipes.remove(object); }
    }
    queueDelete.clear();
    
    seconds++;
  }
  
}
