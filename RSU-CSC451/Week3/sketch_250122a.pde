// 6606405

void setup() {
  size(480, 480);
  assignment();
}
void draw() {
  //class05();
  //assignment();
}

void class01() {
  windowResize(400, 400);
  
  // Graph
  
  strokeWeight(5);
  for (int x = 0; x < width; x++) {
    stroke(#FF0000);
    point(x * 20, height - x);
    
    stroke(#00FF00);
    point(x * 20, height - sq(x));
    
    stroke(#0000FF);
    point(x * 20, height - sq(x) * x);
  }
}

void class02() {
  windowResize(400, 400);
  background(0);
  
  // Circle
  
  float cx = width / 2.0;
  float cy = height / 2.0;
  int rsq1 = 200 * 200;
  int rsq2 = 205 * 205;
  float r = width / 2 - 20;
  
  for (float x = -cx; x < cx; x++) {
    for (float y = -cy; y < cy; y++) {
      if (x * x + y * y > rsq1 && x * x + y * y < rsq2)
        point(x + cx, y + cy);
    }
  }
}

void class03() {
  windowResize(400, 400);
  background(0);
  strokeWeight(5);
  stroke(#FFFFFF);
  noFill();
  
  // Spiral / Logo
  
  for(int i = 0; i < 180; i += 15) {
    float start = radians(i);
    float stop = start + HALF_PI;
    arc(width / 2, height / 2, i, i, start, stop);
  }
}

void class04() {
  windowResize(400, 400);
  background(0);
  strokeWeight(5);
  stroke(#FFFFFF);
  noFill();
  
  // Random
  
  for (int x = 0; x < width; x++) {
    point(x, random(-400, 400));
  }
}

void class05() {
  windowResize(400, 400);
  background(0);
  strokeWeight(5);
  stroke(#FFFFFF);
  noFill();
  
  // Random
  
  for (int i = 0; i < width; i++) {
    line(random(0, 400), random(0, 400),
         random(0, 400), random(0, 400));
  }
}
