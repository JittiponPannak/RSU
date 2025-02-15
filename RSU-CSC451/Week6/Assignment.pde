void setup() {
  size(500, 500);
  
  noFill();
  smooth();
  background(255);
  
  // 6606405 Jittipon Pannak
  translate(width / 2, height / 2);
  circ(0, 0, width, 3);
}

void circ(int posX, int posY, int size, int limit) {
  if (size > limit) {
    circle(posX, posY, size);
    circ(posX - size / 4, posY, size / 2, limit);
    circ(posX + size / 4, posY, size / 2, limit);
  }
}
