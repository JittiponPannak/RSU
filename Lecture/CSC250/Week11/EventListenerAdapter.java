import java.awt.*;
import java.awt.event.*;

public class EventListenerAdapter extends Frame implements ActionListener {

    public EventListenerAdapter() {
        Button closeButton = new Button("Close");
        
        this.add(closeButton);
        
        this.setSize(640, 480);
        this.setTitle("AWTFrameWithButton");
        this.setLocationRelativeTo(null);
        this.setVisible(true);

        closeButton.addActionListener(this);
        this.addWindowListener(new WindowCloser(this));
    }

    public void shutdown() {
        this.dispose();
        System.exit(0);
    }

    @Override public void actionPerformed(ActionEvent e) { shutdown(); }
    
    public static void main(String[] args) {
        EventListenerAdapter frameWithButton = new EventListenerAdapter();
    }
    
    class WindowCloser extends WindowAdapter {
        EventListenerAdapter frame = null;
        
        public WindowCloser(EventListenerAdapter frame) { this.frame = frame; }
        
        @Override public void windowClosing(WindowEvent e) { frame.shutdown(); }
    }
}
