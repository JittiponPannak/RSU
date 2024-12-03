class AnonClass {
    void f() { System.out.println("Anonymous"); }
}

class Test {
    public static void main(String[] args) {
        AnonClass anon = new AnonClass() {
            void f() { System.out.println("TEST Anonymous"); }
        };
        anon.f();
    }
}