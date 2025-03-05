/*
float currentColor = 0;
float oldX, oldY;

void setup() {
  size(500, 300);
  noSmooth();
  colorMode(HSB, 100);
  clear();
}

void draw() {
  if (keyPressed && key == 'c') {
    clear();
  }
}

void mouseDragged() {
  if (oldX == 0.0 && oldY == 0.0) {
    oldX = mouseX; oldY = mouseY;
  }
  
  stroke(color(currentColor++, 100, 100));
  strokeWeight(5);
  line(oldX, oldY, mouseX, mouseY);
  oldX = mouseX;
  oldY = mouseY;
  
  if (currentColor >= 100) {
    currentColor = 0.0f;
  }
}
void mouseReleased() {
  oldX = 0.0;
  oldY = 0.0;
}

void clear() {
  background(#FFFFFF);
}
*/
