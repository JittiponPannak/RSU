
import java.awt.Container;
import java.awt.event.*;
import javax.swing.*;

public class SwingGUI extends JFrame implements ActionListener {
    JPanel upperPanel = new JPanel();
    JPanel lowerPanel = new JPanel();
    Container container = getContentPane();

    JButton displayButton = new JButton("Display");
    JButton clearButton = new JButton("Clear");
    JButton closeButton = new JButton("Close");
    JLabel messageLabel = new JLabel("Message");
    JTextField messageField = new JTextField(15);

    public SwingGUI() {
        upperPanel.add(messageLabel);
        upperPanel.add(messageField);
        
        lowerPanel.add(displayButton);
        lowerPanel.add(clearButton);
        lowerPanel.add(closeButton);
        
        container.add("North", upperPanel);
        container.add("South", lowerPanel);

        displayButton.addActionListener(this);
        clearButton.addActionListener(this);
        closeButton.addActionListener(this);

        this.addWindowListener(new WindowAdapter() { @Override public void windowClosing(WindowEvent e) { shutdown(); } });

        this.setSize(640, 480);
        this.setTitle("SwingGUI");
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    @Override public void actionPerformed(ActionEvent e) {
        if (e.getSource() == displayButton)
            displayMessage();
        else if (e.getSource() == clearButton)
            clearMessage();
        else if (e.getSource() == closeButton)
            shutdown();
    }

    public void displayMessage() {
        messageField.setText("Hello World!");
    }    
    public void clearMessage() {
        messageField.setText("");
    }
    public void shutdown() {
        this.dispose();
        System.exit(0);
    }

    public static void main(String[] args) {
        SwingGUI frame = new SwingGUI();
    }
}
