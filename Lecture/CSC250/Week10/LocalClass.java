public class LocalClass {
    public static void main(String[] args) {
        int n = 0;
        if (n == 0) {
            class B {
                void f() { System.out.println("0"); }
            }
            new B().f();
        } else {
            class B {
                void f() { System.out.println("1"); }
            }
            new B().f();
        }
    }
}
