public class AbstractFigure {
    public static void main(String[] args) {
        System.out.println(new Triangle(1, 1).getArea());
        System.out.println(new Regtangle(1, 1).getArea());
    }
}
abstract class Figure {
    protected double width, height;
    protected String name;

    Figure(double width, double height, String name) { this.width = width; this.height = height; this.name = name; }

    public String getName() { return name; }
    public abstract double getArea();
}
class Regtangle extends Figure {
    public Regtangle(double width, double height) { super(width, height, "Regtangle"); }

    public double getArea() { return width * height; }
}
class Triangle extends Figure {
    public Triangle(double width, double height) { super(width, height, "Triangle"); }    

    public double getArea() { return 0.5 * width * height; }
}