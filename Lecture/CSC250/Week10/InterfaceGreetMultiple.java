public class InterfaceGreetMultiple {
    public static void h1(Greet1 g) { g.hello(); }
    public static void h2(Greet2 g) { g.hi(); }
    public static void main(String[] args) {
        Greeting greeting = new Greeting();
        h1(greeting);
        h2(greeting);
    }
}
