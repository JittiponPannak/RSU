public class GenericArray {
    public static void main(String[] args) {
        Object[] a = new Object[3];

        a[0] = new Integer(1);
        a[1] = new Double(2.0);
        a[2] = new Character('3');

        int x = ((Integer)a[0]).intValue();
        double y = ((Double)a[1]).doubleValue();
        char z = ((Character)a[2]).charValue();

        System.out.println("" + x + "\n" + y + "\n" + z);
    }
}