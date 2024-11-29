import java.util.ArrayList;
import java.util.HashMap;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Main {
    static Main instance;
    static FrameMain frame = new FrameMain();
    static Database database = new Database();

    public static void main(String[] args) { instance = new Main(); frame.setVisible(true); }
}

class Database {
    java.sql.Connection connection = null;

    public Database() {
        try {
            // Setting up API

            Class.forName("net.ucanaccess.jdbc.UcanaccessDriver");
            connection = java.sql.DriverManager.getConnection("jdbc:ucanaccess://Hardware.accdb");
            
        } catch (Exception e) { /* e.printStackTrace(); */ }
    }

    HashMap<String, ArrayList<Object>> getCategory() {
        try {
            PreparedStatement st = connection.prepareStatement("SELECT * FROM category");
            ResultSet rs = st.executeQuery();
            HashMap<String, ArrayList<Object>> hm = new HashMap<>();
            
            hm.put("categoryID", new ArrayList<>());
            hm.put("categoryName", new ArrayList<>());

            while (rs.next()) {
                hm.get("categoryID").add(rs.getInt("categoryID"));
                hm.get("categoryName").add(rs.getString("categoryName"));
            }

            return hm;
        } catch (Exception e) { /* e.printStackTrace(); */ }
        return null;
    }
    HashMap<String, ArrayList<Object>> getItem(int category) {
        try {
            PreparedStatement st = connection.prepareStatement("SELECT * FROM item WHERE categoryID = " + category);
            ResultSet rs = st.executeQuery();
            HashMap<String, ArrayList<Object>> hm = new HashMap<>();

            hm.put("itemID", new ArrayList<>());
            hm.put("itemSubID", new ArrayList<>());
            hm.put("itemName", new ArrayList<>());
            hm.put("itemPictureURL", new ArrayList<>());
            hm.put("categoryID", new ArrayList<>());
            hm.put("itemPrice", new ArrayList<>());
            hm.put("itemAvailable", new ArrayList<>());

            while (rs.next()) {
                hm.get("itemID").add(rs.getInt("itemID"));
                hm.get("itemSubID").add(rs.getInt("itemSubID"));
                hm.get("itemName").add(rs.getString("itemName"));
                hm.get("itemPictureURL").add(rs.getNString("itemPictureURL"));
                hm.get("categoryID").add(rs.getInt("categoryID"));
                hm.get("itemPrice").add(rs.getDouble("itemPrice"));
                hm.get("itemAvailable").add(rs.getInt("itemAvailable"));
            }

            return hm;
        } catch (Exception e) { /* e.printStackTrace(); */ }
        return null;
    }
    HashMap<String, ArrayList<Object>> getDelivery(java.sql.Date date) {
        try {
            PreparedStatement st = connection.prepareStatement("SELECT * FROM delivery WHERE date = ?");
            st.setDate(1, date);

            ResultSet rs = st.executeQuery();
            HashMap<String, ArrayList<Object>> hm = new HashMap<>();

            hm.put("deliveryID", new ArrayList<>());
            hm.put("deliveryDate", new ArrayList<>());
            hm.put("orderID", new ArrayList<>());

            while (rs.next()) {
                hm.get("deliveryID").add(rs.getInt("deliveryID"));
                hm.get("deliveryDate").add(rs.getInt("deliveryDate"));
                hm.get("orderID").add(rs.getString("orderID"));
            }

            return hm;
        } catch (Exception e) { /* e.printStackTrace(); */ }
        return null;
    }
    HashMap<String, ArrayList<Object>> getSuppliers() {
        try {
            PreparedStatement st = connection.prepareStatement("SELECT * FROM supplier");
            ResultSet rs = st.executeQuery();
            HashMap<String, ArrayList<Object>> hm = new HashMap<>();

            hm.put("supplierID", new ArrayList<>());
            hm.put("supplierName", new ArrayList<>());
            hm.put("supplierPhone", new ArrayList<>());

            while (rs.next()) {
                hm.get("supplierID").add(rs.getInt("supplierID"));
                hm.get("supplierName").add(rs.getString("supplierName"));
                hm.get("supplierPhone").add(rs.getString("supplierPhone"));
            }

            return hm;
        } catch (Exception e) { /* e.printStackTrace(); */ }
        return null;
    }

}