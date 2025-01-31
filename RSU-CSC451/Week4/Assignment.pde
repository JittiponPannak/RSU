Digit[] digits = new Digit[10];
int number;

void setup() {
  size(250, 100);
  frameRate(144);
  strokeWeight(5);
  strokeJoin(BEVEL);
  stroke(0);
  
  int w = 30;
  int h = 60;
  
  digits[0] = new Digit(new int[] { 0, w, w, 0, 0 }, new int[] { 0, 0, h, h, 0 });
  digits[1] = new Digit(new int[] { w, w }, new int[] { 0, h });
  digits[2] = new Digit(new int[] { 0, w, w, 0, 0, 0, w }, new int[] { 0, 0, w, w, h, h, h });
  digits[3] = new Digit(new int[] { 0, w, w, 0, w, w, 0 }, new int[] { 0, 0, w, w, w, h, h });
  digits[4] = new Digit(new int[] { 0, 0, w, w, w, w }, new int[] { 0, w, w, h, 0, w });
  digits[5] = new Digit(new int[] { w, 0, 0, w, w, 0 }, new int[] { 0, 0, w, w, h, h });
  digits[6] = new Digit(new int[] { w, 0, 0, w, w, 0 }, new int[] { 0, 0, h, h, w, w });
  digits[7] = new Digit(new int[] { 0, w, w }, new int[] { 0, 0, h });
  digits[8] = new Digit(new int[] { 0, 0, w, w, 0, 0, w }, new int[] { w, 0, 0, h, h, w, w });
  digits[9] = new Digit(new int[] { w, 0, 0, w, w, 0 }, new int[] { w, w, 0, 0, h, h });
}
void draw() {
  background(255);
  
  if (keyPressed == true) {
    digits[6].display(20, 20);
    digits[4].display(80, 20);
    digits[0].display(140, 20);
    digits[5].display(200, 20);
    return;
  }
  
  // 6606405
  // Jittipon Pannak
  if (number < 10000) {
    int d1 = (number / 1000) % 10;
    int d2 = (number / 100) % 10;
    int d3 = (number / 10) % 10;
    int d4 = number % 10;
    
    digits[d1].display(20, 20);
    digits[d2].display(80, 20);
    digits[d3].display(140, 20);
    digits[d4].display(200, 20);
    
    number++;
  }
}

class Digit {
  private int[] x;
  private int[] y;
  private int len;
  
  Digit(int[] x, int[] y) {
    this.x = x;
    this.y = y;
    this.len = min(x.length, y.length);
  }
  
  void display(int originX, int originY) {
    beginShape();
    for (int z = 0; z < len; z++) {
      vertex(originX + x[z], y[z] + originY);
    }
    endShape();
  }
}
