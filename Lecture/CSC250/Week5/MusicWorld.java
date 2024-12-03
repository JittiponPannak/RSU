import java.util.Date;
import javax.swing.JOptionPane;

public class MusicWorld {
    public static void main(String[] args) {
        String choice = "", output = "";
        String tOrderNumber = "";
        int lineNumber = 0;
        CDOrder order = null;
        LineItem[] line = new LineItem[CDOrder.MAX_LINE_NUMBER_ITEM];

        while (!choice.equalsIgnoreCase("x")) {
            lineNumber = 0;
            order = null;

            tOrderNumber = JOptionPane.showInputDialog("Order Number : ");
            
            for (int index = 0; index < CDOrder.MAX_LINE_NUMBER_ITEM; index++) {
                Object[] temp = new Object[4];
                
                temp[0] = JOptionPane.showInputDialog("[%d] CD ID (Empty to Quit) : ".formatted(index));
                if (temp[0].equals("")) { break; }
                
                temp[1] = JOptionPane.showInputDialog("CD Title : ");
                temp[2] = Double.valueOf(JOptionPane.showInputDialog("CD Price : "));
                temp[3] = Integer.valueOf(JOptionPane.showInputDialog("Quantity : "));

                line[index] = new LineItem(
                            (String) temp[0],
                            (String) temp[1],
                            (double) temp[2],
                            (int) temp[3]);
                lineNumber++;
            }

            line = java.util.Arrays.copyOf(line, lineNumber);
            order = new CDOrder(tOrderNumber, line, lineNumber);
            
            System.out.println("Order Number : " + order.getOrderNumber());
            System.out.println("Order Date : " + order.getOrderDateString());
            for (int index = 0; index < lineNumber ; index++ ) {
                System.out.print("ID : " + order.getLineItems()[index].getCD().getID() + "\t\t");
                System.out.print("Title : " + order.getLineItems()[index].getCD().getTitle() + "\t\t");
                System.out.print("Price : $" + order.getLineItems()[index].getCD().getPrice() + "\t\t");
                System.out.print("Quantity : $" + order.getLineItems()[index].getQuantity() + "\t\t");
                System.out.print("Sub Total : $" + order.getLineItems()[index].getSubTotal());
                System.out.println();
            }

            System.out.println("Order SubTotal : $" + order.getSubTotal());
            System.out.println("Order Tax : " + order.getTax() + "(TAX RATE : " + CDOrder.TAX_RATE +")");
            System.out.println("Order Total : $" + order.getTotal());

            choice = JOptionPane.showInputDialog(null, output +
                    "\n\nType 'x' to Exit",  "Invoice Application",
                    JOptionPane.PLAIN_MESSAGE);
        }
    }
}
class CD {
    private String ID;
    private String title;
    private double price;

    public CD(String cdID, String cdTitle, double cdPrice) {
        ID = cdID;
        title = cdTitle;
        price = cdPrice;
    }

    public String getID() { return ID; }
    public String getTitle() { return title; }
    public double getPrice() { return price; }
}
class LineItem {
    final static double DISCOUNT_FOR_05 = 0.10f,
                        DISCOUNT_FOR_10 = 0.15f,
                        DISCOUNT_FOR_15 = 0.20f;

    private static int lineItemNumber;
    
    private CD cd;
    private int quantity;
    private double discRate;
    private double subTotal;

    public LineItem(String cdID, String cdTitle, double cdPrice, int cdQuantity) {
        lineItemNumber++;
        cd = new CD(cdID, cdTitle, cdPrice);
        quantity = cdQuantity;
        setDiscRate();
        setSubTotal();
    }

    public void setDiscRate() {
        if (quantity >= 15)
            discRate = DISCOUNT_FOR_15;
        else if (quantity >= 10)
            discRate = DISCOUNT_FOR_10;
        else if (quantity >= 5)
            discRate = DISCOUNT_FOR_05;
        else
            discRate = 0.0f;
    }
    public void setSubTotal() {
        subTotal = cd.getPrice() * (1 + discRate) * quantity;
    }
    
    public int getLineItemNumber() { return lineItemNumber; }
    public CD getCD() { return cd; }
    public int getQuantity() { return quantity; }
    public double getDiscRate() { return discRate; }
    public double getSubTotal() { return subTotal; }

    @Override
    public String toString() {
        return  ("Line Item Number : %d\n" +
                "CD : %s/%s/%.2f\n" +
                "Quantity : %d\n" + 
                "Discount : %.2f\n" + 
                "Total : %.2f\n").formatted(
                    lineItemNumber,
                    cd.getID(),
                    cd.getTitle(),
                    cd.getPrice(),
                    quantity,
                    discRate,
                    subTotal
                );
    }
}
class CDOrder {
    final static double TAX_RATE = 0.05f;
    final static int MAX_LINE_NUMBER_ITEM = 50;

    private String orderNumber;
    private Date orderDate;
    
    private int lineNumber;
    private LineItem[] lineItems;
    
    private double subTotal;
    private double tax;
    private double total;

    public CDOrder(String number, LineItem[] item, int line) {
        orderNumber = number;
        orderDate = new Date();

        lineNumber = line;
        lineItems = item;

        setSubTotal();
        setTax();
        setTotal();
    }

    public void setSubTotal() {
        subTotal = 0.0f;
        for (LineItem lineItem : lineItems)
            subTotal += lineItem.getSubTotal();
    }
    public void setTax() { tax = subTotal * TAX_RATE; }
    public void setTotal() { total = subTotal + tax; }

    public String getOrderNumber() { return orderNumber; }
    public Date getOrderDate() { return orderDate; }
    public LineItem[] getLineItems() { return lineItems; }
    public double getSubTotal() { return subTotal; }
    public double getTax() { return tax; }
    public double getTotal() { return total; }

    public String getOrderDateString() { return orderDate.toString(); }
}