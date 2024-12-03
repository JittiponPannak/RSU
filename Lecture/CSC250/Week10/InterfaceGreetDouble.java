public class InterfaceGreetDouble {
    public static void main(String[] args) {
        Greeting g = new Greeting();
        g.hello();
        g.hi();
    }
}

interface Greet1 {
    public void hello();
}
interface Greet2 {
    public void hi();
}
class Greeting implements Greet1, Greet2 {
    public void hello() { System.out.println("Hello");};
    public void hi() { System.out.println("Hi");};
}