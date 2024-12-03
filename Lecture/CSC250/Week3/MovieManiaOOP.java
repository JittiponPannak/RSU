import java.util.Date;
import javax.swing.JOptionPane;

public class MovieManiaOOP {
    public static void main(String[] args) {
        while (true) {
            try {
                String invoiceNumber = JOptionPane.showInputDialog("Enter Invoice Number : ");
                String rawInvoiceTotal = JOptionPane.showInputDialog("Enter Invoice Total : ");
                String rawInvoiceType = JOptionPane.showInputDialog("Enter Invoice Type (1 = Regular, 2 = Discount) : ");
                
                double invoiceTotal = Double.parseDouble(rawInvoiceTotal);
                int invoiceType = Integer.parseInt(rawInvoiceType);

                Invoice invoice = new Invoice(invoiceNumber, invoiceTotal, invoiceType);
                String invoiceResult = String.format("""
                        Invoice Number : %s
                        Invoice Date : %tD
                        Invoice Type : %d
                        Invoice Discount : %.2f
                        Invoice Total : %.2f""",
                        invoice.getNumber(), invoice.getDate(), invoice.getType(),
                        invoice.getDiscountPercentage(), invoice.getTotal());
                String continuedAnswer = JOptionPane.showInputDialog(null,
                        invoiceResult + "\n\n\nPress Enter to Continue or 'x' to Exit : ",
                        "Invoice Application", JOptionPane.PLAIN_MESSAGE);
                
                if (continuedAnswer.equalsIgnoreCase("x")) { break; }
            } catch (Exception e) {
                JOptionPane.showMessageDialog(null,
                        "Please Try Again!\n" + e.toString(), 
                        "Error!", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}

class Invoice {
    private String number;
    private Date date;
    private int type;
    private float discount;
    private double total;

    public Invoice(String iNumber, double iTotal, int iType) {
        this.number = iNumber;
        this.type = iType;
        this.date = new Date();
        updateTotal(iTotal, iType);
    }

    /*
    public void setNumber(String newNumber) { number = newNumber; }
    public void setDate(Date newDate) { date = newDate; }
    public void setType(int newType) { type = newType; }
    public void setDiscount(float newDiscount) { discount = newDiscount; }
    public void setTotal(double newTotal) { total = newTotal; }
    */
    
    public String getNumber() { return this.number; }
    public Date getDate() { return this.date; }
    public int getType() { return this.type; }
    public float getDiscount() { return this.discount; }
    public double getTotal() { return this.total; }

    public String getDateString() { return this.date.toString(); }
    public float getDiscountPercentage() { return this.discount * 100; }

    public void updateTotal(double iTotal, int iType) {
        if (iType == 2) {
            this.discount = 0.1f;
            iTotal *= (1 - this.discount);
        }
        
        this.total = iTotal;
    }

    public String getResult() {
        return String.format("""
            Invoice Number : %s
            Invoice Date : %tD
            Invoice Type : %d
            Invoice Discount : %.2f
            Invoice Total : %.2f""",
            this.getNumber(), this.getDate(), this.getType(),
            this.getDiscountPercentage(), this.getTotal());
    }
}
