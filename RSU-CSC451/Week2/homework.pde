void homework() {
  // 6606405 Jittipon
  int circleSize = width - 40;
  
  colorMode(HSB, 360, 180, 180);
  for (int rad = 0; rad < circleSize; rad++) {
    noFill();
    smooth();
    stroke(rad, width, width);
    circle(width / 2, height / 2, rad);
  }
}
