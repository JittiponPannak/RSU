/*


int mousePosX;
int mousePosY;
boolean mouseOrigin;
boolean mouseLeft;

int originX;
int originY;

int lineColorR;
int lineColorG;
int lineColorB;
color bgColor = color(255);

void setup() {
  windowResize(640, 480);
  originX = width / 2;
  originY = height / 2;
  background(bgColor);
  
  strokeWeight(5);
}

void draw() {
  if (mousePressed) {
    mousePosX = mouseX;
    mousePosY = mouseY;
    mouseOrigin = false;
    mouseLeft = mousePosX < width / 2;
  } else {
    /* Reset Position
    mousePosX = originX;
    mousePosY = originY;
  }
  
  background(bgColor);
  stroke(lineColorR, lineColorG, lineColorB);
  
  if (mouseOrigin) {
    line(originX, originY, mousePosX, mousePosY);
  }
  else if (mouseLeft) {
    line(0, originY, mousePosX, mousePosY);
  } else {
    line(width, originY, mousePosX, mousePosY);
  }
}

void mouseWheel(MouseEvent event) {
  // Positive == Dowm
  // Negative == Up
  float e = event.getCount();
  
  
}

void keyPressed() {
  if (key == 'r') {
    lineColorR = 255;
    lineColorG = 0;
    lineColorB = 0;
  }
  if (key == 'g') {
    lineColorR = max(lineColorR - 25, 0);
    lineColorG += min(lineColorG + 25, 255);
    lineColorB -= max(lineColorB - 25, 0);
  }
  if (key == 'b') {
    lineColorR = max(lineColorR - 25, 0);
    lineColorG -= max(lineColorG - 25, 0);
    lineColorB += min(lineColorB + 25, 255);
  }
  
  if (key == ' ') {
    mouseOrigin = true;
    mousePosX = originX;
    mousePosY = originY;
    background(bgColor);
  }
}

*/
