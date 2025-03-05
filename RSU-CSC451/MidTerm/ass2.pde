int[] circleColors = { 60, 120, 180, 240, 300, 360 };
float inc = 0.0;

void setup() {
  size(600, 400);
  colorMode(HSB, 360);
  stroke(255);
  noSmooth();
}

void tail(int x, int units, float angle, int col) {
  pushMatrix();
  translate(x, height);
  
  color colVal = color(col, 360, 360, 360);
  
  for (int i = units; i > 0; i -= 1) {
    strokeWeight(3);
    stroke(colVal);
    line(0, 0, 0, -25);
    translate(0, -25);
    rotate(angle);
  }
  
  fill(colVal);
  circle(0, -5, 25);
  
  popMatrix();
}


void draw() {
  inc += 0.01;
  float angle = sin(inc) / 10.0 + sin(inc * 1.2) / 20.0;
  
  background(0);
  tail(150, 9, angle / 1.4, circleColors[0]);
  tail(200, 8, angle / 0.7, circleColors[1]);
  tail(250, 12, angle, circleColors[2]);
  tail(350, 10, angle / 1.2, circleColors[3]);
  tail(400, 5, angle * 1.3, circleColors[4]);
  tail(450, 7, angle * 2.0, circleColors[5]);
}
