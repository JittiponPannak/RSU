
import java.awt.Button;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

public class EventListenerInterface extends Frame implements ActionListener, WindowListener {

    public EventListenerInterface() {
        Button closeButton = new Button("Close");
        
        this.add(closeButton);
        
        this.setSize(640, 480);
        this.setTitle("AWTFrameWithButton");
        this.setLocationRelativeTo(null);
        this.setVisible(true);

        closeButton.addActionListener(this);
        this.addWindowListener(this);
    }

    public void shutdown() {
        this.dispose();
        System.exit(0);
    }

    @Override public void actionPerformed(ActionEvent e) { shutdown(); }

    @Override public void windowOpened(WindowEvent e) { shutdown(); }
    @Override public void windowClosing(WindowEvent e) { }
    @Override public void windowClosed(WindowEvent e) { }
    @Override public void windowIconified(WindowEvent e) { }
    @Override public void windowDeiconified(WindowEvent e) { }
    @Override public void windowActivated(WindowEvent e) { }
    @Override public void windowDeactivated(WindowEvent e) { }
    
    public static void main(String[] args) {
        EventListenerInterface frameWithButton = new EventListenerInterface();
    }
}
