import 'dart:io';

void main() {
  /*
  forLoop();
  forEach();
  whileLoop();
  breakLoop();
  
  function1();
  */

  function2();
}

void forLoop() {
  for (int i = 0; i < 10; i++) {
    print(i);
  }
}
void forEach() {
  List<String> car = ['Tesla', 'Toyota', 'Honda'];
  car.forEach((x) {
    print(x);
    print(x + " 2");
  });

  // Lambda
  car.forEach((x) => print(x));
}
void whileLoop() {
  int score = -1;
  while (score < 0 || score > 100) {
    print("Enter Score: ");
    score = int.parse(stdin.readLineSync()!);

    if (score > 50) {
      print("Passed");
    } else {
      print("Failed");
    }
  }
}
void breakLoop() {
  String password;
  for (int i = 1; i < 4; i++) {
    print("Enter Password : ");
    password = stdin.readLineSync()!;

    if (password == '1234') {
      print("Login Success");
      break;
    }
    
    if (i == 3) {
      print("Login UnSuccess");
    }
  }
}

void function1() {
  functionAdd1(1, 2);
  functionAdd2(a: 5, b: 10);
  functionAdd2(a: 5);
}
void functionAdd1(int a, int b) {
  print(a + b);
}
void functionAdd2({required a, b = 1}) {
  print(a + b);
}

void function2() {
  int w = 10;
  int h = 10;

  int result1 = function2Area1(w, h);
  print("Area = $result1");

  int result2 = function2Area2(height: h, width: w);
  print("Area = $result2");
}
int function2Area1(int width, int height) {
  return width * height;
}
int function2Area2({required int width, int? height}) {
  return width * height!;
}