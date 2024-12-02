package Database;

import java.util.HashMap;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Database {
    static java.awt.image.BufferedImage IMAGE_NOT_AVAILABLE;
    
    static Database instance = new Database();
    
    HashMap<Integer, Category> categories = new HashMap();
    HashMap<String, Item> items = new HashMap();
    HashMap<Integer, Order> orders = new HashMap();
    HashMap<String, OrderDetail> details = new HashMap();
    HashMap<Integer, Restock> restocks = new HashMap();
    HashMap<Integer, Delivery> deliveries = new HashMap();
    HashMap<Integer, Supplier> suppliers = new HashMap();
    
    java.sql.Connection connection = null;
    
    public Database() {
        try {
            // Setting up API
            
            Class.forName("net.ucanaccess.jdbc.UcanaccessDriver");
            connection = java.sql.DriverManager.getConnection("jdbc:ucanaccess://src/Hardware.accdb");
            
            // Loading Assets
            
            IMAGE_NOT_AVAILABLE = javax.imageio.ImageIO.read(new java.io.File("src/ImageNull.png"));
            
            // Data
            
            /*
            
            refreshCategory();
            refreshItem();
            
            refreshOrder();
            
            refreshRestock();
            refreshDelivery();
            refreshSupplier();
            System.out.println();
            
            for (Category category : categories.values())
                System.out.println(category.name);
            
            for (Item item : items.values())
                System.out.println(item);
            
            for (Order order : orders.values())
                System.out.println(order.id);
            for (OrderDetail detail : details.values())
                System.out.println(detail.getUID());
            
            for (Restock restock : restocks.values())
                System.out.println(restock.id);
            
            for (Delivery delivery : deliveries.values())
                System.out.println(delivery.id);
            
            for (Supplier supplier : suppliers.values())
                System.out.println(supplier.name);
            
            */

        } catch (Exception e) { e.printStackTrace(); }
    }
    
    void refreshCategory() {
        try {
            System.out.print("Refreshing Category ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM category");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Category category;
                int key = rs.getInt("categoryID");
                
                if (categories.containsKey(key))
                    category = categories.get(key);
                else
                    category = new Category();

                category.update(rs);
                
                if (!categories.containsKey(key))
                    categories.put(key, category);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    void refreshItem() {
        try {
            System.out.print("Refreshing Item ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM item");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Item item;
                int id = rs.getInt("itemID");
                int subID = rs.getInt("itemSubID");
                
                String key = Item.getUID(id, subID);
                
                if (items.containsKey(key))
                    item = items.get(key);
                else
                    item = new Item();

                item.update(rs);
                
                if (!items.containsKey(key))
                    items.put(key, item);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    void refreshOrder() {
        try {
            System.out.print("Refreshing Order ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM orders");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Order order;
                int key = rs.getInt("orderID");
                
                if (orders.containsKey(key))
                    order = orders.get(key);
                else
                    order = new Order();

                order.update(rs);
                
                if (!orders.containsKey(key))
                    orders.put(key, order);
            
                refreshODetails(key);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    void refreshODetails(int orderID) {
        try {
            System.out.print("Refreshing Order Detail ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM orderID WHERE orderID = ?");
            ps.setInt(1, orderID); ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                OrderDetail detail;
                int ItemID = rs.getInt("itemID");
                int ItemsubID = rs.getInt("itemSubID");
                
                String key = OrderDetail.getUID(orderID, ItemID, ItemsubID);
                
                if (details.containsKey(key))
                    detail = details.get(key);
                else
                    detail = new OrderDetail();

                detail.update(rs);
                
                if (!details.containsKey(key))
                    details.put(key, detail);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    void refreshRestock() {
        try {
            System.out.print("Refreshing Refresh ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM restock");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Restock restock;
                int key = rs.getInt("restockID");
                
                if (restocks.containsKey(key))
                    restock = restocks.get(key);
                else
                    restock = new Restock();

                restock.update(rs);
                
                if (!restocks.containsKey(key))
                    restocks.put(key, restock);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    void refreshDelivery() {
        try {
            System.out.print("Refreshing Delivery ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM delivery");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Delivery delivery;
                int key = rs.getInt("deliveryID");
                
                if (deliveries.containsKey(key))
                    delivery = deliveries.get(key);
                else
                    delivery = new Delivery();

                delivery.update(rs);
                
                if (!deliveries.containsKey(key))
                    deliveries.put(key, delivery);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    void refreshSupplier() {
        try {
            System.out.print("Refreshing Supplier ...");
            
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM supplier");
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Supplier supplier;
                int key = rs.getInt("supplierID");
                
                if (suppliers.containsKey(key))
                    supplier = suppliers.get(key);
                else
                    supplier = new Supplier();

                supplier.update(rs);
                
                if (!suppliers.containsKey(key))
                    suppliers.put(key, supplier);
            }
            
            System.out.print(" OK");
        } catch (Exception e) {
            System.out.print(" FAILED");
            e.printStackTrace();
        }
        
        System.out.println();
    }
    
    void addOrder(Order order) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO Orders (orderDate, orderTotal, orderCustomerPhone, orderCustomerName, orderCustomerAddress) VALUES (?, ?, ?, ?, ?)");
            
            ps.setDate(1, order.date);
            ps.setDouble(2, order.total);
            ps.setString(3, order.customerPhone);
            ps.setString(4, order.customerName);
            ps.setString(5, order.customerAddress);
            
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    void addOrderDetail(OrderDetail[] details) {
        try {
            for (OrderDetail detail : details) {
                PreparedStatement ps = connection.prepareStatement("INSERT INTO OrderDetail (orderID, itemID, itemSubID, orderAmount, orderSubTotal) VALUES (?, ?, ?, ?, ?)");
                
                ps.setInt(1, detail.orderID);
                ps.setInt(2, detail.itemID);
                ps.setInt(3, detail.itemSubID);
                ps.setInt(4, detail.amount);
                ps.setDouble(5, detail.subTotal);

                ps.executeUpdate();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    void addRestock(Restock restock) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO Restock (supplierID, itemID, itemSubID, restockDate, restockQuantity, restockCost) VALUES (?, ?, ?, ?, ?, ?)");
            
            ps.setInt(1, restock.supplierID);
            ps.setInt(2, restock.itemID);
            ps.setInt(3, restock.itemSubID);
            ps.setDate(4, restock.date);
            ps.setInt(5, restock.quantity);
            ps.setDouble(6, restock.cost);
            
            ps.executeUpdate();
            
            ps = connection.prepareStatement("UPDATE Item SET itemAvailable = itemAvailable + ? WHERE itemID = ? AND itemSubID = ?");
            
            ps.setInt(1, restock.quantity);
            ps.setInt(2, restock.itemID);
            ps.setInt(3, restock.itemSubID);
            
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        refreshItem();
    }
    void addDelivery(Delivery delivery) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO Delivery (deliveryDate, orderID) VALUES (?, ?)");
            
            ps.setDate(1, delivery.date);
            ps.setInt(2, delivery.orderID);
            
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    void addSupplier(Supplier supplier) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO Supplier (supplierID, supplierName, supplierPhone) VALUES (?, ?, ?)");
            
            ps.setInt(1, supplier.id);
            ps.setString(2, supplier.name);
            ps.setString(3, supplier.phone);
            
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    void updateOrder(Order order, OrderDetail[] details) {
        try {
            PreparedStatement ps;
            
            ps = connection.prepareStatement("UPDATE Orders SET orderDate = ?, orderTotal = ?, orderCustomerPhone = ?, orderCustomerName = ?, orderCustomerAddress = ? WHERE OrderID = ?");
            
            ps.setDate(1, order.date);
            ps.setDouble(2, order.total);
            ps.setString(3, order.customerPhone);
            ps.setString(4, order.customerName);
            ps.setString(5, order.customerAddress);
            ps.setInt(6, order.id);
            
            ps.executeUpdate();
            
            for (OrderDetail detail : details) {
                ps = connection.prepareStatement("UPDATE OrderDetail SET orderAmount = ?, orderSubTotal = ? WHERE OrderID = ?");
                
                ps.setInt(1, detail.amount);
                ps.setDouble(2, detail.subTotal);
                ps.setInt(3, order.id);

                ps.executeUpdate();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    void updateItem(Item item) {
        try {
            PreparedStatement ps;
            
            ps = connection.prepareStatement("UPDATE Item SET itemName = ?, itemPrice = ?, itemAvailable = ? WHERE OrderID = ?");
            
            ps.setString(1, item.name);
            ps.setDouble(2, item.price);
            ps.setInt(3, item.available);
            
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    Category requestNewCategory() {
        try {
            Category category = new Category();
            
            PreparedStatement ps = connection.prepareStatement("SELECT Max(categoryID) AS Newest FROM Category");
            ResultSet rs = ps.executeQuery(); rs.next();
            category.id = rs.getInt("Newest") + 1;
            
            return category;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    Item requestNewItem() {
        try {
            Item item = new Item();
            
            PreparedStatement ps = connection.prepareStatement("SELECT Max(itemID) AS Newest FROM Item");
            ResultSet rs = ps.executeQuery(); rs.next();
            item.id = rs.getInt("Newest" + 1);
            
            return item;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    Item requestNewSubItem(int id) {
        try {
            Item item = new Item();
            
            PreparedStatement ps = connection.prepareStatement("SELECT Max(itemSubID) AS Newest FROM Item WHERE itemID = ?");
            ps.setInt(1, id); ResultSet rs = ps.executeQuery(); rs.next();
            item.id = id; item.subID = rs.getInt("Newest");
            
            return item;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    Order requestNewOrder() {
        try {
            Order order = new Order();
            
            PreparedStatement ps = connection.prepareStatement("SELECT Max(OrderID) AS Newest FROM Orders");
            ResultSet rs = ps.executeQuery(); rs.next();
            order.id = rs.getInt("Newest");
            
            return order;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    Delivery requestNewDelivery() {
        try {
            Delivery delivery = new Delivery();
            
            PreparedStatement ps = connection.prepareStatement("SELECT Max(deliveryID) AS Newest FROM Delivery");
            ResultSet rs = ps.executeQuery(); rs.next();
            delivery.id = rs.getInt("Newest");
            
            return delivery;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    Supplier requestNewSupplier() {
        try {
            Supplier supplier = new Supplier();
            
            PreparedStatement ps = connection.prepareStatement("SELECT Max(supplierID) AS Newest FROM Supplier");
            ResultSet rs = ps.executeQuery(); rs.next();
            supplier.id = rs.getInt("Newest");
            
            return supplier;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

class Category {
    int id;
    String name;

    void update(ResultSet data) throws Exception {
        id = data.getInt("categoryID");
        name = data.getString("categoryName");
    }
    
    @Override public boolean equals(Object obj) {return obj instanceof Category category ? this.id == category.id : false; }
}
class Item {
    int id;
    int subID;
    int categoryID;
    String name;
    java.awt.image.BufferedImage image;
    double price;
    int available;
    
    void update(ResultSet data) throws Exception {
        id = data.getInt("itemID");
        subID = data.getInt("itemSubID");
        categoryID = data.getInt("categoryID");
        name = data.getString("itemName");
        price = data.getDouble("itemPrice");
        available = data.getInt("itemAvailable");

        String imageURL = data.getString("itemImageURL");
        Thread.startVirtualThread(new java.lang.Runnable() {
            @Override public void run() {
                try {
                    java.net.URL url = java.net.URI.create(imageURL).toURL();
                    image = javax.imageio.ImageIO.read(url);
                } catch (Exception e) {
                    java.awt.image.BufferedImage placeholder = Database.IMAGE_NOT_AVAILABLE;
                    image = new java.awt.image.BufferedImage(placeholder.getColorModel(), 
                    placeholder.copyData(placeholder.getRaster().createCompatibleWritableRaster()),  
                    placeholder.isAlphaPremultiplied(), null);
                }
            }
        });
    }
            
    String getUID() { return getUID(id, subID); }
    static String getUID(int id, int subID) { return "%d::%d".formatted(id, subID); }
    
    @Override public String toString() { return "%s (%s)".formatted(name, getUID());  }
    @Override public boolean equals(Object obj) {return obj instanceof Item item ? this.id == item.id && name.equals(item.name) : false; }
}
class Order {
    int id;
    java.sql.Date date;
    double total;
    String customerName;
    String customerPhone;
    String customerAddress;
    
    void update(ResultSet data) throws Exception {
        id = data.getInt("orderID");
        date = data.getDate("orderDate");
        total = data.getDouble("orderTotal");
        customerName = data.getString("orderCustomerPhone");
        customerPhone = data.getString("orderCustomerName");
        customerAddress = data.getString("orderCustomerAddress");
    }
    
    @Override public boolean equals(Object obj) {return obj instanceof Order order ? this.id == order.id : false; }
}
class OrderDetail {
    int orderID;
    int itemID;
    int itemSubID;
    int amount;
    double subTotal;
    
    void update(ResultSet data) throws Exception {
        orderID = data.getInt("orderID");
        itemID = data.getInt("itemID");
        itemSubID = data.getInt("itemSubID");
        amount = data.getInt("orderAmount");
        subTotal = data.getDouble("orderSubTotal");
    }
    
    String getUID() { return getUID(orderID, itemID, itemSubID); }
    static String getUID(int orderID, int id, int subID) { return "%d::%d::%d".formatted(orderID, id, subID); }
    
    @Override public boolean equals(Object obj) {return obj instanceof OrderDetail detail ? this.orderID == detail.orderID && this.itemID == detail.itemID && this.itemSubID == this.itemSubID : false; }
}
class Restock {
    int id;
    int supplierID;
    int itemID;
    int itemSubID;
    java.sql.Date date;
    int quantity;
    double cost;
    
    void update(ResultSet data) throws Exception {
        id = data.getInt("restockID");
        supplierID = data.getInt("supplierID");
        itemID = data.getInt("itemID");
        date = data.getDate("restockDate");
        itemSubID = data.getInt("itemSubID");
        quantity = data.getInt("restockQuantity");
        cost = data.getDouble("restockCost");
    }
    
    @Override public boolean equals(Object obj) {return obj instanceof Restock restock ? this.id == restock.id : false; }
}
class Supplier {
    int id;
    String name;
    String phone;
    
    void update(ResultSet data) throws Exception {
        id = data.getInt("supplierID");
        name = data.getString("supplierName");
        phone = data.getString("supplierPhone");
    }
    
    @Override public boolean equals(Object obj) {return obj instanceof Supplier supplier ? this.id == supplier.id : false; }
}
class Delivery {
    int id;
    java.sql.Date date;
    int orderID;
    
    void update(ResultSet data) throws Exception {
        id = data.getInt("deliveryID");
        date = data.getDate("deliveryDate");
        orderID = data.getInt("orderID");
    }
    
    @Override public boolean equals(Object obj) {return obj instanceof Supplier supplier ? this.id == supplier.id : false; }
}