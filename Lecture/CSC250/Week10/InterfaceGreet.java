public class InterfaceGreet {
    public static void main(String[] args) {
        Greet g = new Hello2();
        g.hello();
        g.hi();
    }
}

interface Greet {
    void hello();
    void hi();
}

abstract class Hello1 implements Greet {
    public void hello() { System.out.println("Hello"); }
}

class Hello2 extends Hello1 {
    public void hi() { System.out.println("Hi"); }
}