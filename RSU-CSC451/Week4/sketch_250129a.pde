/*

int x = 0;

void setup() {
  println(x);
}

void draw() {
  println(++x);
  if (x >= 5) {
    noLoop();
  }
}

int x;

void setup() {
  size(400, 200);
  frameRate(30);
}

void draw() {
  if (x <= width) {
    line(x, 0, x, height);
  }
  
  x += 3;
}

void setup() {
  size(800, 400);
  colorMode(HSB, width, 100, 100);
  frameRate(59);
}

void draw() {
  if (x <= width) {
    stroke(++x, 100, 100);
    line(x, 0, x, height);
  }
}

long start;

void setup() {
  size(300, 300);
  fill(0);
  textSize(30);
  frameRate(10);
  start = millis();
}

void draw() {
  background(255);
  long stop = millis();
  text(stop - start, 100, 140);
  start = stop;
}

void setup() {
  size(300, 300);
  
  cx = width / 2;
  cy = height / 2;
  
  frameRate(120);
  colorMode(HSB);
  noStroke();
  smooth();
}

void draw() {
  background(0, 190);
  circle(QUARTER_PI);
  circle(HALF_PI);
  circle(PI);
  circle(TWO_PI);
  angle += 0.01;
}

void circle(float phase) {
  float d = width / 2 + (sin(phase + angle) * width / 2);
  fill(d, 360, 360, 170);
  ellipse(cx, cy, d, d);
}

float x1 = 0, y1 = 0, x2 = 0, y2 = 0;


void setup() {
  size(1000, 700);
  background(0);
    
  frameRate(144);
  colorMode(HSB, width, 100, 100);
}

void draw() {
  x1 = rand(x1, 1, 1, width);
  y1 = rand(y1, 1, 1, height);
  x2 = random(width);
  y2 = random(height);
  
  line(x1, y1, x2, y2);
  
  if (random(100) < 1.0) {
    stroke(random(360), 100, 100);
  }
}

float rand(float n, float va, float min, float max) {
  n += random(-va, va);
  if (n < min || max < n) {
    return random(max);
  } else {
    return n;
  }
}

*/
