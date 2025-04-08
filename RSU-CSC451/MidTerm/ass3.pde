int circAMode;
int circAX;
int circAY;
int circBMode;
int circBX;
int circBY;
float circR;

void setup() {
  size(300, 300);
  noStroke();
  
  fill(color(0, 0, 0, 255));
  rect(0, 0, width, height);
}

void draw() {
  if (circAY > 50) {
    circAMode = 1;
  } else if (circAY < -50) {
    circAMode = 0;
  }
  
  if (circAMode == 0)
    circAY++;
  else
    circAY--;
  
  fill(color(0, 0, 0, 10));
  rect(0, 0, width, height);
  
  fill(color(255, 0, 0, 255));
  translate(mouseX, mouseY);
  circle(circAX, circAY, 10);
  
  if (circBX > 50) {
    circBMode = 1;
  } else if (circBX < -50) {
    circBMode = 0;
  }
  
  if (circBMode == 0)
    circBX++;
  else
    circBX--;
  
  fill(color(0, 255, 0, 255));
  circle(circBX, circBY, 10);
  
  if (circR > TWO_PI) {
    circR = 0.0;
  }
  circR += 0.025;
  
  fill(color(0, 0, 255, 255));
  circle(10 + (50 * cos(circR)), 10 + (50 * sin(circR)), 10);
}
