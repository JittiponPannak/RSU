import 'dart:io';

void main() {
  // smallest();
  bmi();
}

void smallest() {
  print("Input N Loop : ");
  int n = int.parse(stdin.readLineSync()!);
  
  int result = 0;
  for (int i = 0; i < n; i++) {
    print("Input Number " + (i + 1).toString() + " : ");
    int input = int.parse(stdin.readLineSync()!);
    
    if (i == 0 || input < result) {
      result = input;
    }
  }

  print("The Minimum Number is : " + result.toString());
}
void bmi() {
  print("Enter Weight (kg) : ");
  int weight = int.parse(stdin.readLineSync()!);
  print("Enter Height (cm) : ");
  int height = int.parse(stdin.readLineSync()!);
  
  double bmi = bmiCalculator(weight, height.toDouble());

  print("Your BMI is : $bmi");
  if (bmi >= 40.0) {
    print("BMI Status : Obese");
  } else if (bmi >= 25.0) {
    print("BMI Status : Overweight");
  } else if (bmi >= 18.5) {
    print("BMI Status : Normal");
  } else {
    print("BMI Status : Underweight");
  }
}
double bmiCalculator(int weight, double height) {
  if (height >= 5) { height = height / 100; }
  return weight / (height * height);
}