import processing.sound.*;

final PImage[] birdImages = new PImage[2];
final PImage[] cloudsSmallImages  = new PImage[2];
final PImage[] towerImages  = new PImage[1];
final SoundFile[] jumpSounds = new SoundFile[3];

SoundFile music;
SoundFile explodeSound;
SoundFile scoreSound;

final int birdImageSizeX = 64;
final int cloudSmallImageSizeX = 96;
final int towerImageSizeX = 32, towerImageSizeY = 256;

// Shoud at least exceeded birdImageSize.
final int pipeSizeMinimum = birdImageSizeX * 2;

boolean start = true;
State state;

void setup() {
  birdImages[0] = loadImage("bird0.png");
  birdImages[1] = loadImage("bird1.png");
  cloudsSmallImages[0] = loadImage("cloudsmall0.png");
  cloudsSmallImages[1] = loadImage("cloudsmall1.png");
  towerImages[0] = loadImage("tower0.png");
  
  jumpSounds[0] = new SoundFile(this, "jump1.wav");
  jumpSounds[1] = new SoundFile(this, "jump2.wav");
  jumpSounds[2] = new SoundFile(this, "jump3.wav");
  
  music = new SoundFile(this, "Bonetrousle.mp3");
  explodeSound = new SoundFile(this, "explode.wav");
  scoreSound = new SoundFile(this, "score.wav");
  
  size(500, 600);
  background(0, 155, 255);
}

void draw() {
  if (state == null) {
    if (start) {
      background(0, 155, 255);
      image(birdImages[0], (width / 2) - birdImageSizeX, height / 2);
    }
    
    textSize(24);
    text("Press Space to Start", width / 3.25, height / 1.25);
    text("6606405 Jittipon Pannak", 100, 100);
    text("6606638 Jedsada boontasang", 125, 125);
  } else if (state.gameOver || state.paused) {
    state = null;
  } else {
    background(0, 155, 255);
    state.update();

    fill(0);
    textSize(26);
    text("Score : " + state.score, 20 , 24);
    
    textSize(24);
    fill(255);
    text("Score : " + state.score, 24, 24);
  }
}
void keyPressed() {
  if (state == null) {
    if (key == ' ')
      startGame();
  } else {
    /*
    if (key == 'a')
      state.player.posX -= 10;
    if (key == 'd')
      state.player.posX += 10;
    */
    if (key == ' ')
      state.player.jump();
    if (key == 'q')
      state.player.drop();
    if (key == 'p')
      state.score += 10;
  }
}

void startGame() {
  state = new State();
  music.loop();
  music.amp(0.125);
  state.spawnPipe();
}
void pauseGame() {
  if (state != null) {
    state.paused = !state.paused;
  }
}
