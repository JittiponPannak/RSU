
void setup() {
  size(400, 400);
  
}
void draw() {
  homework();
}


void test01() {
  strokeWeight(10);
  line(10,10,90,10);
  strokeWeight(5);
  rect(10,50,80,30);
}

void test02() {
  windowResize(200, 200);
  
  int w = 0;
  for (int x = 10; x < width; x += 20) {
    stroke(255, 2, 255 - x, 255);
    strokeWeight(w++);
    line(x, 10, x, height - 10);
  }
}

void test03() {
  background(255, 0, 0);
  strokeWeight(5);
  rect(10, 10, 50, 50);
  noStroke();
  fill(255, 255, 0, 100);
  rect(50, 50, 75, 75);
}

void test04() {
  windowResize(255, 100);
  background(0, 0, 255);
  noStroke();
  
  for (int i = 0; i < 255; i += 20) {
    fill(i, i);
    rect(i, 30, 30, 60);
    
  }
}

void test05() {
  background(255);
  noStroke();
  noSmooth();
  
  fill(255, 0, 0, 150);
  ellipse(width / 2.5, height / 2.5, width / 2, height / 2);
  
  fill(0, 255, 0, 150);
  ellipse(width / 1.5, height / 2.5, width / 2, height / 2);
}


void test06() {
  rectMode(RADIUS);
  fill(200);
  rect(50, 50, 30, 30);
  rectMode(CENTER);
  fill(100);
  rect(50, 50, 30, 30);
}

void test07() {
  colorMode(HSB, 360, 100, 100);
  for (int s = 0; s < 100;s++) {
    for (int b = 0; b < 100;b++) {
      stroke((s + b) * 2, s, b);
      point(s, b);
    }
  }
  
  //colorMode(RGB, 100);
  //color c = color(100, 50, 20);
  //background(c);
  
}

void test08() {
  color to = color(0, 0, 255);
  float inc = 0.0;
  for (int x = 0; x < width; x += 20) {
    inc += 30.0 / width;
    fill(lerpColor(color(255, 0, 0), to, inc));
    rect(x, 0, 20, 100);
  }
}
