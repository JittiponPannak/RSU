
import java.util.Stack;

public class GenericStack {
    public static void main(String[] args) {
        Stack stack = new Stack();

        stack.push(new Integer(1));
        stack.push(new Double(2.0));
        stack.push(new String("3"));

        while (!stack.isEmpty()) {
            System.out.println(stack.pop());
        }
    }
}
