public class CircleSquareApp {
    public static void main(String[] args) {
        while (true) {
            int mode = Integer.parseInt(javax.swing.JOptionPane.showInputDialog(null, 
                "What Shape you want to calculate \n[1. Circle]\n[2. Square]\n[3. Exit]"));

            if (mode == 1) { // Circle
                double radius = Double.parseDouble(javax.swing.JOptionPane.showInputDialog(
                    "Input your Circle Radius"));
                Circle circle = new Circle(radius);

                int circleMode = Integer.parseInt(javax.swing.JOptionPane.showInputDialog(
                "What do you want to calculate \n[1. Circumference]\n[2. Area]"));
                
                if (circleMode == 1) {
                    javax.swing.JOptionPane.showMessageDialog(null,
                    "Your Circle Radius is : " + circle.radius + "\nYour Circle Cirfumference is : " + circle.calculateCirfumference());
                } else if (circleMode == 2) {
                    javax.swing.JOptionPane.showMessageDialog(null,
                        "Your Circle Radius is : " + circle.radius + "\nYour Circle Area is : " + circle.calculateArea());
                }
            } else if (mode == 2) { // Square
                double side = Double.parseDouble(javax.swing.JOptionPane.showInputDialog(
                    "Input your Square Side Size"));
                Square square = new Square(side);
                
                int squareMode = Integer.parseInt(javax.swing.JOptionPane.showInputDialog(
                "What do you want to calculate \n[1. Cirfumference]\n[2. Area]"));
                
                if (squareMode == 1) {
                    javax.swing.JOptionPane.showMessageDialog(null,
                    "Your Square Side is : " + square.side + "\nYour Square Cirfumference is : " + square.calculateCirfumference());
                } else if (squareMode == 2) {
                    javax.swing.JOptionPane.showMessageDialog(null,
                        "Your Square Side is : " + square.side + "\nYour Square Area is : " + square.calculateArea());
                }
            } else if (mode == 3) { // Exit
                break;
            }
        }
    }
}
class Square {
    double side;

    public Square (double x){
        side = x;
    }
    public double calculateCirfumference() {
        return 2 * (side + side);
    }
    public double calculateArea() {
        return side * side;
    }
}
class Circle {
    double radius;

    public Circle(double r) {
        radius = r;
    }
    public double calculateCirfumference() {
        return (2 * Math.PI) * radius;
    }
    public double calculateArea() {
        return (Math.PI * (radius * radius));
    }
}

// 6606405 จิตติภณ พานนาค
// 6606250 ภูรีภัทร ภู่ระย้า