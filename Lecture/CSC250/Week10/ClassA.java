public class ClassA {
    static public class SubA {
        public void f() { System.out.println("In A"); }
    }
}

class TestInA {
    public static void main(String[] args) {
        ClassA.SubA subA = new ClassA.SubA();
        subA.f();
    }
}