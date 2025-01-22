void assignment() {
  // 6606405 Jittipon Pannak
  background(255, 255, 255, 255);
  
  colorMode(HSB, 360, 100, 100);
  strokeWeight(5);
  noClip();
  
  float halfWidth = width / 2.0;
  float halfHeight = height / 2.0;
  int size = 200;
  
  for (int radius = 0; radius < size; radius++) {
    for (float angle = 0; angle <= TWO_PI; angle += 0.005) {
      float x = radius * cos(angle) + halfWidth;
      float y = radius * sin(angle) + halfHeight;
      float hue = map(angle, 0, TWO_PI, 0, 360);
      
      stroke(hue, radius, 100);
      point(x, y);
    }
  }
  
}

void assignmentOld() {
  /*
  background(255, 255, 255, 255);
  
  noStroke();
  fill(0, 0, 0, 255);
  ellipse(width / 2, height / 2, width / 1.2, height / 1.2);
  
  
  for (int x = 0; x < 360; x++) {
    stroke(x, x, 360);
    point(x, x);
  }
  
  float cw = width / 2.0;
  float ch = height / 2.0;
  int size = 2;
  
  colorMode(HSB, 360, 100, 100);
  strokeWeight(5);
  noClip();
  
  for (int radius = 0; radius < size; radius++) {
    for (float angle = 0; angle <= TWO_PI; angle += 0.001) {
      float x = radius * cos(angle) + cw;
      float y = radius * sin(angle) + ch;
      
      stroke(map(angle, 0, TWO_PI, 0, 360), radius, 100);
      point(x, y);
    }
  }
  */
}
