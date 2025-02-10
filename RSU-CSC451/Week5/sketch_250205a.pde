int originX;
int originY;

int[] lineX = new int[0];
int[] lineY = new int[0];
color[] lineColor = new color[0];
int lineLength = 20;
int lineArrayLength = 0;

void setup() {
  windowResize(640, 480);
  originX = width / 2;
  originY = height / 2;
  background(255);
  
  lineX = append(lineX, originX);
  lineY = append(lineY, originY);
  lineColor = append(lineColor, color(0));
  
  strokeWeight(5);
}
void draw() {
  background(255);
  for (int i = 0; i < lineArrayLength; i++) {
    stroke(lineColor[i + 1]);
    line(lineX[i], lineY[i], lineX[i + 1], lineY[i + 1]);
  }
}

void keyPressed() {
  int ll = lineLength;
  
  if (key == 'r') {
    color col = lineColor[lineColor.length - 1];
    color newCol = color(min(red(col) + ll, 255), max(green(col) - ll, 0), max(blue(col) - ll, 0));
    
    lineColor[lineColor.length - 1] = newCol;
  }
  if (key == 'g') {
    color col = lineColor[lineColor.length - 1];
    color newCol = color(max(red(col) - ll, 0), min(green(col) + ll, 255), max(blue(col) - ll, 0));
    
    lineColor[lineColor.length - 1] = newCol;
  }
  if (key == 'b') {
    color col = lineColor[lineColor.length - 1];
    color newCol = color(max(red(col) - ll, 0), max(green(col) - ll, 0), min(blue(col) + ll, 255));
    
    lineColor[lineColor.length - 1] = newCol;
  }
  if (key == 'c') {
    lineColor[lineColor.length - 1] = color(0);
  }
  
  if (key == ' ') {
    println("X");
    println(lineX);
    println("Y");
    println(lineY);
  }
}

void mouseClicked() {
  if (mouseButton == LEFT) {
    lineX = append(lineX, lineX[lineX.length - 1] - 25);
    lineY = append(lineY, lineY[lineY.length - 1]);
    lineColor = append(lineColor, lineColor[lineColor.length - 1]);
    lineArrayLength++;
  }
  
  if (mouseButton == RIGHT) {
    lineX = append(lineX, lineX[lineX.length - 1] + 25);
    lineY = append(lineY, lineY[lineY.length - 1]);
    lineColor = append(lineColor, lineColor[lineColor.length - 1]);
    lineArrayLength++;
  }
}

// Jittipon Pannak 6606405

void mouseWheel(MouseEvent event) {
  float e = event.getCount();
  
  if (e > 0.0) {
    lineX = append(lineX, lineX[lineX.length - 1]);
    lineY = append(lineY, lineY[lineY.length - 1] + 25);
    lineColor = append(lineColor, lineColor[lineColor.length - 1]);
    lineArrayLength++;
  } else {
    lineX = append(lineX, lineX[lineX.length - 1] );
    lineY = append(lineY, lineY[lineY.length - 1] - 25);
    lineColor = append(lineColor, lineColor[lineColor.length - 1]);
    lineArrayLength++;
  }
}
