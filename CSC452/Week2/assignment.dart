import 'dart:io';
import 'dart:math';

void main() {
  while (true) {
    // assignment1(65, 170);
    // assignment2();
    assignment3();
  }
}

double bmiCalculate(int weight, int height) {
  return weight / pow(height / 100, 2);
}

void assignment1(int weight, int height) {
  double bmi = bmiCalculate(weight, height);

  print("BMI : $bmi");
  if (bmi < 17.4)
    print("Underweight");
  else if (bmi < 24.9)
    print("Normal");
  else if (bmi < 39.9)
    print("Overweight");
  else
    print("Obese");
}

void assignment2() {
  print("Input Weight (kg) : ");
  int weight = int.parse(stdin.readLineSync()!);

  print("Input Height (cm) : ");
  int height = int.parse(stdin.readLineSync()!);

  assignment1(weight, height);
}

void assignment3() {
  print("Input Score to Grade : ");
  int score = int.parse(stdin.readLineSync()!);

  if (score <= 49)
    print("F");
  else if (score <= 59)
    print("D");
  else if (score <= 69)
    print("C");
  else if (score <= 79)
    print("B");
  else
    print("A");
}
