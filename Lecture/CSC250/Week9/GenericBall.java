public class GenericBall {
    public static void main(String[] args) {
        Ball<String, Integer> ball = new Ball("Takraw", 0);
        System.out.println(ball.getT() + " : " + ball.getS());
    }
}
class Ball<T, S> {
    private T t;
    private S s;

    Ball(T t, S s) { this.t = t; this.s = s; }

    public T getT() { return t; }
    public S getS() { return s; }
}