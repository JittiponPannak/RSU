import java.awt.*;
import java.awt.event.*;

public class EventListenerInner extends Frame implements ActionListener {

    public EventListenerInner() {
        Button closeButton = new Button("Close");
        
        this.add(closeButton);
        
        this.setSize(640, 480);
        this.setTitle("AWTFrameWithButton");
        this.setLocationRelativeTo(null);
        this.setVisible(true);

        closeButton.addActionListener(this);
        this.addWindowListener(new WindowAdapter() { @Override public void windowClosing(WindowEvent e) { shutdown(); } });
    }

    public void shutdown() { this.dispose(); System.exit(0); }

    @Override public void actionPerformed(ActionEvent e) { shutdown(); }
    
    public static void main(String[] args) {
        EventListenerInner frameWithButton = new EventListenerInner();
    }
}
