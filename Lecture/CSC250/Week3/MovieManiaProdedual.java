
import java.util.Date;
import javax.swing.JOptionPane;

public class MovieManiaProdedual {

    public static void main(String[] args) {
        String choiceString;
        String numberString;
        String totalString;
        String typeString;
        String outputString;
        Date invoiceDate;
        
        int type = 0;
        double total = 0;
        double discountPercentage = 0;

        while (true) {
            numberString = JOptionPane.showInputDialog("Enter Invoice Number : ");
            totalString = JOptionPane.showInputDialog("Enter Invoice Total : ");
            total = Double.parseDouble(totalString);
            
            typeString = JOptionPane.showInputDialog("Enter Invoice Type (1 = Regular, 2 = Discount) : ");
            type = Integer.parseInt(typeString);
            invoiceDate = new Date();

            if (type == 2) {
                discountPercentage = 0.1;
                total = total * (1 - discountPercentage);
            } else {
                discountPercentage = 0.0;
            }

            outputString = String.format("Invoice Number : %s\nInvoice Date : %tD" +
                    "\nInvoice Type : %d\nInvoice Discount : %.2f\nInvoice Total : %.2f",
                    numberString, invoiceDate, type, discountPercentage * 100, total);
            outputString += "\n\n\nPress Enter to Continue or 'x' to Exit : ";
            
            choiceString = JOptionPane.showInputDialog(null,
                    outputString, "Invoice Application", JOptionPane.PLAIN_MESSAGE);

            if (choiceString.equalsIgnoreCase("x")) { break; }
        }
    }
}