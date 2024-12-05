package Core;

import java.util.Stack;
import javax.swing.JFrame;

public class FrameManager {
    static FrameManager instance;
    
    Stack<JFrame> list = new Stack();

    public FrameManager(JFrame root) { list.push(root); }
    void next(JFrame frame) { list.peek().setVisible(false); list.push(frame); frame.setVisible(true); }
    void prev() { if (list.size() > 1) { list.pop().dispose(); list.peek().setVisible(true); } }
}
