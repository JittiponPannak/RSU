public class Work1 {

}

class A {
    public void Hello() { System.out.println("Hello World!"); }
}
class B {
    private A a = new A();

    public void Hi() { System.out.println("Hi!"); }
    public void Hello() { a.Hello(); }
    public A getA() { return a; }
}
class C extends A {
    public void Hi() { System.out.println("Hi!"); }
}