void _point() {
  for (int y = 20; y <= 460; y += 5)
  for (int x = 20; x <= 460; x += 5)
    point(x, y);
}

void _line() {
  for (int i = 10; i < 100; i += 10)
    line(10, i, 90, i);
  
  for(int i = 0; i < 50; i++)
    line(i*2, 10, i*2, 90);
  
  for (float x = 10;  x < 80;  x *= 1.15)
    line(x, 20, x, 80);
  
  for(int i = 0; i < 50; i++)
    line(i*2, 10, i, 90);
  
  for(int i = 0; i < 100; i += 2)
    line(i, i, i, 50);
  
  for(int i = 0; i < 700; i += 2)
    line(i,50,i,sin(radians(i*3))*30+50);
  
  for(int i = 0; i < 100; i += 2)
    line(i, 10, random(100), 90);
  
  for (int y = 20; y < 80; y += 5)
    for (int x = 20; x < 80; x += 5)
      if ((x % 10) == 0) 
        line(x, y, x+5, y-5);
      else
        line(x, y, x+5, y+5);
  
  for(int i = 0; i < width/2; i += 3)
    line(i, 10, height-10, i*2);
}

void _rect() {
for(int i = 100; i > 0; i -= 2)
  rect(0, 0 ,i, i);

  for(int i = 0; i < 100; i += 5)
    rect(i, 0, 3, 99);

  noStroke();
  for (int y = 0; y < 100; y += 5)
  for (int x = 0; x < 100; x += 5) {
    fill((x+y) * 1.5);
    rect(x, y, 10, 10);
  }
}

void _test01() {
  line(10, 20, 80, 90);
  rect(50, 50, 40, 20);
  
}
