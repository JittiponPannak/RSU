import java.util.Date;
import javax.swing.JOptionPane;

public class InvoiceComposition {
    public static void main(String[] args) {
        String choice = "", output = "", 
               invoiceNumber = "", productID = "";
        int invoiceType = -1, productQuantity = 0;
        Invoice invoice = null;

        while (!choice.equalsIgnoreCase("x")) {
            invoiceNumber = JOptionPane.showInputDialog("Invoice Number : ");
            invoiceType = Integer.parseInt(JOptionPane.showInputDialog("Invoice Type (1 = Regular, 2 = Discounted) : "));

            productID = JOptionPane.showInputDialog("Product's ID : ");
            productQuantity = Integer.parseInt(JOptionPane.showInputDialog("Product Quantity : "));

            invoice = new Invoice(invoiceNumber, invoiceType, productID, productQuantity);
            
            output = String.format(
                "Invoice Number : %s\n" +
                "Invoice Date : %s\n" +
                "Invoice Type : %s\n" +
                "Invoice Discount : %.2f\n" +
                "\n" + 
                "Product ID : %s\n" +
                "Product Name : %s\n" +
                "Product Price : $%.2f\n" +
                "Order Quantity : %d\n" +
                "\n" + 
                "Tax Rate : %.2f\n" +
                "Invoice Total : %.2f\n" +
                "Invoice Count : %d\n",
                
                invoice.getInvoiceNumber(),
                invoice.getInvoiceDateString(),
                invoice.getInvoiceType(),
                invoice.getInvoiceDiscount() * 100,

                invoice.getProduct().getProductID(),
                invoice.getProduct().getProductName(),
                invoice.getProduct().getProductPrice(),
                invoice.getProductQuantity(),
                

                Invoice.getTAXRATE() * 100,
                invoice.getInvoiceTotal(),
                Invoice.getInvoiceCount()
            );
            
            choice = JOptionPane.showInputDialog(null,
                output + "\n\nType 'x' to Exit", 
                "Invoice Application", JOptionPane.PLAIN_MESSAGE);
        }
    }
}

class Product {
    private String productID;
    private String productName;
    private double productPrice = 0.0f;
    
    public Product(String id) { setProductID(id); }

    public void setProductID(String id) {
        productID = id;
        setProductName(id);
        setProductPrice(id);
    }
    public void setProductName(String id) {
        if (id.equalsIgnoreCase("G1000"))
            productName = "Gadget";
        else if (id.equalsIgnoreCase("W1000"))
            productName = "Widget";
        else
            productName = "Unknown";
    }
    public void setProductPrice(String id) {
        if (id.equalsIgnoreCase("G1000"))
            productPrice = 100.0f;
        else if (id.equalsIgnoreCase("W1000"))
            productPrice = 200.0f;
        else
            productPrice = 0.0f;
    }

    public String getProductID() { return productID; }
    public String getProductName() { return productName; }
    public double getProductPrice() { return productPrice; }
    
}
class Invoice {
    public final static double TAX_RATE = 0.05f;
    
    public static int invoiceCount;

    private String invoiceNumber;
    private Date invoiceDate;
    private int invoiceType;
    private double discountPercent = 0.0f;
    private double invoiceTotal;

    private Product product;
    private int productQuantity;

    public Invoice(String number, int type, String productID, int quantity) {
        invoiceNumber = number;
        invoiceDate = new Date();
        invoiceType = type;

        product = new Product(productID);
        productQuantity = quantity;
        
        invoiceCount++;
        setInvoiceTotal(type, quantity);
    }
    
    public void setInvoiceTotal(int type, int quantity) {
        if (type == 2) {
            discountPercent = 0.1f;
            invoiceTotal = (product.getProductPrice() * quantity) * (1 - discountPercent) * (1 + TAX_RATE);
        }
        else {
            discountPercent = 0.0f;
            invoiceTotal = (product.getProductPrice() * quantity) * (1 + TAX_RATE);
        }
    }

    public String getInvoiceNumber() { return invoiceNumber; }
    public int getInvoiceType() { return invoiceType; }
    public double getInvoiceTotal() { return invoiceTotal; }
    public double getInvoiceDiscount() { return discountPercent; }
    public Date getInvoiceDate() { return invoiceDate; }
    public String getInvoiceDateString() { return invoiceDate.toString(); }
    public Product getProduct() { return product; }
    public int getProductQuantity() { return productQuantity; }
    
    public static final double getTAXRATE() { return TAX_RATE; }
    public static int getInvoiceCount() { return invoiceCount; }
}