
import java.awt.Container;
import java.awt.GridLayout;
import javax.swing.*;

public class BankAppGUI extends JFrame {
    private JLabel nameLabel, SSNLabel, addressLabel, phoneLabel;
    private JTextField nameField, SSNField, addressField, pField;
    private Container pane = this.getContentPane();
    private GridLayout layout = new GridLayout(4, 2);


    public BankAppGUI() {
        this.setTitle("New Customer");
        this.setSize(640, 480);
        this.setLocationRelativeTo(null);

        this.setLayout(layout);
        
        nameLabel = new JLabel("Enter Name");
        SSNLabel = new JLabel("Enter SSN");
        addressLabel = new JLabel("Enter Address");
        phoneLabel = new JLabel("Enter Phone");

        nameField = new JTextField(30);
        SSNField = new JTextField(12);
        addressField = new JTextField(50);
        pField = new JTextField(12);

        pane.add(nameLabel);
        pane.add(nameField);

        pane.add(SSNLabel);
        pane.add(SSNField);
        
        pane.add(addressLabel);
        pane.add(addressField);
        
        pane.add(phoneLabel);
        pane.add(pField);

        this.setVisible(true);
    }

    public static void main(String[] args) {
        BankAppGUI bank = new BankAppGUI();
    }
}
