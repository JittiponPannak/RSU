PImage image1;
PImage image2;
PImage image3;

void setup() {
  size(1200, 400);
  image1 = loadImage("image1.jpg");
  image2 = loadImage("image2.jpg");
  image3 = loadImage("image3.jpg");
  
  image1.resize(width / 3, height);
  image2.resize(width / 3, height);
  image3.resize(width / 2, height);
}
void draw() {
  image(image3, width * 0.2475, 0);
  image(image1, 0, 0);
  image(image2, width * 0.667, 0);
}
