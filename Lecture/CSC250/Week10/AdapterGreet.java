public class AdapterGreet {
    public static void main(String[] args) {
        new GreetsImpliment().hello();
    }
}

interface Greets {
    public void hello();
    public void hi();
    public void bye();
}
abstract class GreetsAdapter implements Greets {
    public void hello() {};
    public void hi() {};
    public void bye() {};
}
class GreetsImpliment extends GreetsAdapter {
    public void hello() { System.out.println("Hello"); }
}