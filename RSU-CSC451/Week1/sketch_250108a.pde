import java.util.Date;

PImage img;
int tick;

void setup() {
  size(480, 480);
  
  img = loadImage(
          "rsu.jpg");
  img.resize(width,
            height);
  
  background(img);
  textSize(80);
  textAlign(CENTER,
            CENTER);
  loop();
}

void draw() {
  // _line();
  // _rect();
  // _test01();
  myTimer();
  _point();
}

void myTimer() {
  tick += frameCount;
  
  int seconds = tick % 60;
  int minutes = (tick / 60) % 60;
  int hours = (tick / (60 * 60)) % 24;
  int days = (tick / (60 * 60 * 24)) + 1;
  
  background(img);
  
  fill(255);
  rectMode(CENTER);
  rect(width / 2, height / 2,
    width / 1.5, height / 1.5);
  
  fill(255, 0, 0);
  arc(240, 40, 40, 40, 0,
    (frameCount / 20) % TAU * 2);
  
  for(int i = 0; i < 700; i += 2) {
    stroke(255);
    line(i,height * 0.90,i,sin(radians(i*2.5))
          * frameCount % random(25) + (height * 0.90));
  }
  
  String t = "" +
            nf(days, 2) + "\n" + 
            nf(hours, 2) + ":" +
            nf(minutes, 2) + ":" +
            nf(seconds, 2) + "\n("
            + tick + ")";
  fill(0, 0, 0);
  text(t, width / 2, height / 2);
}
