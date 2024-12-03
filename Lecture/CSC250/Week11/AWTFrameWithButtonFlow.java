
import java.awt.Button;
import java.awt.FlowLayout;
import java.awt.Frame;

public class AWTFrameWithButtonFlow extends Frame {
    public AWTFrameWithButtonFlow() {
        Button closeButton = new Button("Close");
        
        this.setLayout(new FlowLayout());
        this.add(closeButton);
        
        this.setSize(640, 480);
        this.setTitle("AWTFrameWithButton");
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    public static void main(String[] args) {
        AWTFrameWithButtonFlow frameWithButton = new AWTFrameWithButtonFlow();
    }
}
