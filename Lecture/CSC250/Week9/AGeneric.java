public class AGeneric<T> {
    boolean member(T t, T[] a) {
        for (T b : a) {
            if (b.equals(t)) {
                return true;
            }
        }

        return false;
    }
    public static void main(String[] args) {
        AGeneric<Integer> a1 = new AGeneric();
        Integer[] i = {1, 2, 3, 4, 5};
        System.out.println(a1.member(2, i));

        AGeneric<Double> a2 = new AGeneric();
        Double[] d = {1.0, 2.0, 3.0, 4.0, 5.0};
        System.out.println(a2.member(10.0, d));
    }
}

