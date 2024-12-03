public class Unity1 {
    public static void main(String[] args) {
        Figure.compute(new Figure(1, 1, "Undefined"));
        Figure.compute(new Triangle(1, 1));
        Figure.compute(new Regtangle(1, 1));
    }
}

class Figure {
    protected double width, height;
    protected String name;

    Figure(double width, double height, String name) { this.width = width; this.height = height; this.name = name; }

    public String getName() { return this.name; }
    public double getArea() { return 0.0f; }
    public static void compute(Figure figure) { System.out.println(figure.getName() + " : " + figure.getArea()); }
}
class Regtangle extends Figure {
    public Regtangle(double width, double height) { super(width, height, "Regtangle"); }

    public double getArea() { return width * height; }
}
class Triangle extends Figure {
    public Triangle(double width, double height) { super(width, height, "Triangle"); }    

    public double getArea() { return 0.5 * width * height; }
}