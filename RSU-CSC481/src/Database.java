import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;

public class Database {
    static Database instance = new Database();
    static java.sql.Connection connection;
    static int table, Canceltimeout; static String location;
    
    static HashMap<Integer, Category> categoryMap;
    static HashMap<String, Menu> menuMap;
    static ArrayList<Category> categories;
    static ArrayList<Menu> menus;
    
    public Database() {
        try {
            // Setting up API

            Class.forName("net.ucanaccess.jdbc.UcanaccessDriver");
            connection = java.sql.DriverManager.getConnection("jdbc:ucanaccess://src/Database.accdb");
            
            java.io.File file = new java.io.File("src/data/data.txt");
            if (true) {
                java.util.Scanner sc = new java.util.Scanner(file);
                table = Integer.parseInt(sc.nextLine());
                Canceltimeout = Integer.parseInt(sc.nextLine());
                location = sc.nextLine();
            }
            
            // Common Static Data

                categoryMap = new HashMap();
                menuMap = new HashMap();
                categories = new ArrayList();
                menus = new ArrayList();
            
            PreparedStatement ps;
            ResultSet rs;
            
            // Category
            
            ps = connection.prepareStatement("SELECT * FROM Category");
            rs = ps.executeQuery();
            
            while (rs.next()) {
                Category category = new Category();
                
                category.id = rs.getInt("CategoryID");
                category.name = rs.getString("CategoryName");
                
                categories.add(category);
                categoryMap.put(category.id, category);
            }
            
            System.out.println("\nCategory\n");
            for (Category category : categories) {
                System.out.println("%s | %s".formatted(category.id, category.name));
            }
            
            // Menu
            
            HashMap<Menu, ArrayList<Double>> menuTypePriceBuffer = new HashMap();
            
            ps = connection.prepareStatement("SELECT * FROM Menu");
            rs = ps.executeQuery();
            
            while (rs.next()) {
                String key = Menu.getUID(rs.getInt("CategoryID"), rs.getInt("MenuID"));
                Menu menu;
                
                if (menuMap.containsKey(key)) {
                    menu = menuMap.get(key);
                    menuTypePriceBuffer.get(menu).add(rs.getDouble("MenuPrice"));
                } else {
                    menu = new Menu();

                    menu.id = rs.getInt("MenuID");
                    menu.category = categoryMap.get(rs.getInt("CategoryID"));
                    menu.name = rs.getString("MenuName");
                    menu.pictureURL = rs.getString("MenuPicture");
                    menuTypePriceBuffer.put(menu, new ArrayList());
                    menuTypePriceBuffer.get(menu).add(rs.getDouble("MenuPrice"));

                    menus.add(menu);
                    menuMap.put(key, menu);
                }
            }
            
            for (Menu menu : menus) {
                ArrayList arr = menuTypePriceBuffer.get(menu);
                menu.price = new double[arr.size()];
                for (int i = 0; i < arr.size(); i++) {
                    menu.price[i] = (double) arr.get(i);
                }
            }
            
            System.out.println("\nMenu\n");
            for (Menu menu : menus) {
                System.out.println("%s | %s | %s".formatted(Menu.getUID(menu.category.id, menu.id),
                        menu.name, java.util.Arrays.toString(menu.price)));
            }
            
        } catch (Exception e) { e.printStackTrace(); }
    }
    
    Order order;
    ArrayList<OrderDetail> details = new ArrayList();
    ArrayList<CancelableOrder> canBeCancelled = new ArrayList();
    
    void begin() {
        try {
            PreparedStatement ps;
            ResultSet rs;
            
            ps = connection.prepareStatement("INSERT INTO [Orders] (orderDateStart, " + 
                    "orderTotal, orderTable, orderLocation, orderCanceled, memberID, reservationID) VALUES " +
                    "(?, ?, ?, ?, ?, ?, ?)", PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setDate(1, java.sql.Date.valueOf(java.time.LocalDate.now().toString()));
            ps.setDouble(2, 0.0);
            ps.setInt(3, table);
            ps.setString(4, location);
            ps.setBoolean(5, false);
            ps.setInt(6, 0);
            ps.setInt(7, 0);
            ps.executeUpdate();
            
            order = new Order();
            
            ps = connection.prepareStatement("SELECT Max(OrderID) AS Newest FROM Orders");     
            rs = ps.executeQuery(); rs.next();
            
            order.id = rs.getInt("Newest");
            
        } catch (Exception e) { e.printStackTrace(); }
    }
    void login(String phone) {
        try {
            PreparedStatement ps;
            ResultSet rs;
            
            ps = connection.prepareStatement("SELECT * FROM Member WHERE MemberPhone = ?");
            ps.setString(1, phone);
            rs = ps.executeQuery();
            
            boolean isLogin = rs.next();
            
            if (isLogin) {
                int MemberID = rs.getInt("MemberID");
                String MemberName = rs.getString("memberName");
                
                if (order == null) {
                    begin();
                }
                
                order.member = new Member();
                order.member.id = MemberID;
                order.member.name = MemberName;
                order.member.phone = phone;
                loginUpdate();
                
                // Update Discounted
                
                ps = connection.prepareStatement("UPDATE Orders SET orderTotal = orderTotal * 0.95 WHERE orderID = ?");
                ps.setInt(1, order.id);
                ps.executeUpdate();
                
                ps = connection.prepareStatement("UPDATE OrderDetail SET menuPriceTotal = menuPriceTotal * 0.95 WHERE orderID = ? AND menuCategoryID = 1");
                ps.setInt(1, order.id);
                ps.executeUpdate();
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
    void loginUpdate() {
        try {
            PreparedStatement ps;
            ResultSet rs;
            
                ps = connection.prepareStatement("UPDATE Orders SET memberID = ? WHERE orderID = ?");
                
                ps.setInt(1, order.member.id);
                ps.setInt(2, order.id);
                
                ps.executeUpdate();
        } catch (Exception e) { e.printStackTrace(); }
    }
    
    void process(TempOrder temp) {
        int length = temp.menus.size();
        OrderDetail[] result = new OrderDetail[length];
        
        try {
            PreparedStatement ps;
            ResultSet rs;
            
            ps = connection.prepareStatement("SELECT Max(OrderDetailID) AS Newest FROM OrderDetail");
            rs = ps.executeQuery();
            
            rs.next(); int lastestID = rs.getInt("Newest");
            
            for (int i = 0; i < length; i++) {
                OrderDetail detail = new OrderDetail();
                
                double rawPrice = 0.0f;
                double totalPrice = 0.0f;
                double discPrice = 0.0f;
                
                detail.id = ++lastestID;
                detail.menu = temp.menus.get(i);
                detail.amount = temp.amounts.get(i);
                detail.type = temp.types.get(i);
                
                rawPrice = detail.menu.price[detail.type] * temp.amounts.get(i);
                totalPrice = rawPrice;
                if (detail.menu.category.id == 1 && order.member != null) {
                    totalPrice = rawPrice * 0.95;
                    discPrice = rawPrice * 0.05;
                } 
                
                detail.total = totalPrice;
                detail.discounted = discPrice;
                
                ps = connection.prepareStatement("INSERT INTO OrderDetail " +
                    "(orderID, menuID, menuType,  menuCategoryID, menuQuantity, menuPriceTotal) " +
                    "VALUES (?, ?, ?, ?, ?, ?)", PreparedStatement.RETURN_GENERATED_KEYS);
                
                ps.setInt(1, order.id);
                ps.setInt(2, detail.menu.id);
                ps.setInt(3, detail.type);
                ps.setInt(4, detail.menu.category.id);
                ps.setInt(5, detail.amount);
                ps.setDouble(6, detail.total);
                
                ps.executeUpdate();
                
                CancelableOrder co = new CancelableOrder(detail);
                
                details.add(detail);
                canBeCancelled.add(co);
            }
            
           ps = connection.prepareStatement(
                    "UPDATE Orders SET orderTotal = ? WHERE orderID = ?");
            ps.setDouble(1, order.total);
            ps.setInt(2, order.id);
            ps.executeUpdate();
            
        } catch (Exception e) { e.printStackTrace(); }
    }
    void cancel(CancelableOrder cancellable) {
        try {
            if (canBeCancelled.contains(cancellable)) {
                PreparedStatement ps;
                ResultSet rs;
                
               ps = connection.prepareStatement("UPDATE OrderDetail SET orderCanceled = TRUE WHERE orderDetailID = ?");
                ps.setInt(1, cancellable.orderDetail.id);
                ps.executeUpdate();

               ps = connection.prepareStatement("UPDATE Orders SET orderCanceled = TRUE WHERE orderID = ?");
                ps.setInt(1, cancellable.orderDetail.id);
                ps.executeUpdate();
                
                recalculate();
                
                cancellable.orderDetail.canceled = true;
                canBeCancelled.remove(cancellable);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }
    void recalculate() {
        try {
                PreparedStatement ps;
                ResultSet rs;

                double t = 0.0f;
                double d = 0.0f;

                for (OrderDetail o : details) {
                    double or = o.menu.price[o.type] * o.amount;
                    o.total = o.menu.category.id == 1 && order.member != null ? or * 0.95 : or;
                    o.discounted = o.menu.category.id == 1 && order.member != null ? or * 0.05 : 0.0f;
                    
                    if (!o.canceled) {
                        t += o.total;
                        d += o.discounted;
                    }
                }

                order.total = t;
                order.discounted = d;

                ps = connection.prepareStatement("UPDATE Orders SET orderTotal = ? WHERE orderID = ?");
                ps.setDouble(1, order.total);
                ps.setInt(2, order.id);
                ps.executeUpdate();
                
        } catch (Exception e) { e.printStackTrace(); }
    }
    void bill() {
        try {
            PreparedStatement ps;
            ResultSet rs;
            
            recalculate();
            
           ps = connection.prepareStatement("UPDATE Orders SET orderPaid = ? WHERE orderID = ?");
            ps.setDouble(1, order.total);
            ps.setInt(2, order.id);
            ps.executeUpdate();
            
        } catch (Exception e) { e.printStackTrace(); }
    }
    void finish() {
        try {
            PreparedStatement ps;
            ResultSet rs;
            
           ps = connection.prepareStatement("UPDATE Orders SET orderDateEnd = ? WHERE orderID = ?");
            ps.setDate(1, java.sql.Date.valueOf(java.time.LocalDate.now().toString()));
            ps.setInt(2, order.id);
            ps.executeUpdate();
            
        } catch (Exception e) { e.printStackTrace(); }
    }
    
    void clear() {
        order = null;
        details.clear();
        canBeCancelled.clear();
    }
}

class Category {
    int id;
    String name;
    
    @Override public String toString() { return name; }
}
class Member {
    int id;
    String name;
    String phone;
    
    @Override public String toString() { return "%s (%s)".formatted(name, phone); }
}
class Menu {
    int id;
    String name;
    Category category;
    double[] price;
    String pictureURL;

    @Override public String toString() { return name; }
    
    String getUID() { return getUID(category.id, id); }
    javax.swing.ImageIcon getPicture(int width, int height ) { return Utility.getImageFromURL(pictureURL, width, height); }

    static String getUID(int category, int id) { return "%d:%d".formatted(category, id); }
}
class Order {
    int id;
    double total;
    double discounted;
    Member member;
}
class OrderDetail {
    int id;
    int type;
    Menu menu;
    int amount;
    double total;
    double discounted;
    boolean canceled;
}
class TempOrder {
    ArrayList<Menu> menus = new ArrayList();
    ArrayList<Integer> types = new ArrayList();
    ArrayList<Integer> amounts = new ArrayList();
    ArrayList<Double> totals = new ArrayList();
    ArrayList<Double> discounted = new ArrayList();
}
class CancelableOrder {
    java.util.Timer timer;
    OrderDetail orderDetail;

    public CancelableOrder(OrderDetail order) {
        CancelableOrder instance = this;
        
        orderDetail = order;
        timer = new java.util.Timer();
        
        timer.schedule(new java.util.TimerTask() {
            @Override public void run() {
                Database.instance.canBeCancelled.remove(instance);
                if (Main.instance.foodCancelFrame != null)
                        Main.instance.foodCancelFrame.dispose();
            }}, java.util.Date.from(java.time.Instant.now().plusSeconds(60 * Database.Canceltimeout)));
    }
}