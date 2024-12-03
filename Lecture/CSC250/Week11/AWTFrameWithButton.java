
import java.awt.Button;
import java.awt.Frame;

public class AWTFrameWithButton extends Frame {
    public AWTFrameWithButton() {
        Button closeButton = new Button("Close");
        
        this.add(closeButton);
        
        this.setSize(640, 480);
        this.setTitle("AWTFrameWithButton");
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    public static void main(String[] args) {
        AWTFrameWithButton frameWithButton = new AWTFrameWithButton();
    }
}
