package Core;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Stack;

public class Main {
    int orderIDRecent;
    
    HashMap<String, Table> tables = new HashMap();
    HashMap<String, Food> foods = new HashMap();
    HashMap<Food, Double> discount = new HashMap();
    HashMap<Table, Order> orders = new HashMap();
    
    HashSet<Table> availableTable = new HashSet();
    HashSet<Food> availableFood = new HashSet();
    LinkedList<Integer> customerQueue = new LinkedList();
    LinkedList<SubOrder> orderPrepareQueue = new LinkedList();
    LinkedList<SubOrder> orderServingQueue = new LinkedList();

    static Main instance = new Main();
    public static void main(String[] args) {}
    
    public Main() {
        int customLoad = javax.swing.JOptionPane.showConfirmDialog(
                null, "Do you want to Custom Load?", 
                "Loader", javax.swing.JOptionPane.YES_NO_OPTION);
        
        java.io.File tableFile = null;
        java.io.File foodFile = null;
        java.util.Scanner sc;
        
        if (customLoad == javax.swing.JOptionPane.YES_OPTION) {
            javax.swing.JFileChooser fc = new javax.swing.JFileChooser(new java.io.File("src/"));
            fc.setAcceptAllFileFilterUsed(false);
            fc.addChoosableFileFilter(new javax.swing.filechooser.FileNameExtensionFilter("CSV File", "csv"));
            int result;
            
            javax.swing.JOptionPane.showMessageDialog(null, "Table File");
            while (tableFile == null) {
                result = fc.showOpenDialog(null);
                if (result == javax.swing.JFileChooser.APPROVE_OPTION) {
                    tableFile = fc.getSelectedFile();
                }
            }
            
            javax.swing.JOptionPane.showMessageDialog(null, "Food File");
            while (foodFile == null) {
                result = fc.showOpenDialog(null);
                if (result == javax.swing.JFileChooser.APPROVE_OPTION) {
                    foodFile = fc.getSelectedFile();
                }
            }
            
        } else {
            tableFile = new java.io.File("src/table.csv");
            foodFile = new java.io.File("src/food.csv");
        }
        
        try {
            sc = new java.util.Scanner(tableFile);
            sc.nextLine();
            while (sc.hasNextLine()) {
                String[] data = sc.nextLine().split(",");
                
                Table table = new Table();
                table.id = data[0];
                table.seats = Integer.parseInt(data[1]);
                
                tables.put(table.id, table);
                availableTable.add(table);
            }
            
            sc = new java.util.Scanner(foodFile);
            sc.nextLine();
            while (sc.hasNextLine()) {
                String[] data = sc.nextLine().split(",");
                
                Food food = new Food();
                food.name = data[0];
                food.price = Double.parseDouble(data[1]);
                
                foods.put(food.name, food);
                availableFood.add(food);
            }
        } catch (Exception e) { e.printStackTrace(); }
        new FrameMain().setVisible(true);
    }
    
    int customerEnqueue() {
        if (customerQueue.isEmpty())
            customerQueue.add(0);
        else
            customerQueue.add(customerQueue.peekLast() + 1);
        return customerQueue.peekLast();
    }
    int customerDequeue() {
        return !(customerQueue.isEmpty()) ? customerQueue.pop() : 0;
    }
    
    void cancelSubOrder(SubOrder sO) {
        Order order = orders.get(sO.table);
        order.unServedorders.remove(sO);
    }
    void serveSubOrder(SubOrder sO) {
        Order order = orders.get(sO.table);
        order.servedOrders.push(order.unServedorders.remove(order.unServedorders.indexOf(sO)));
    }
    
    Magic magic = new Magic();
    class Magic {
        java.util.Random rng = new java.util.Random();
        java.util.Timer timer;
        
        public Magic() {
            timer = new java.util.Timer();
            timer.scheduleAtFixedRate(new java.util.TimerTask() {
                @Override public void run() {
                    if (!orderServingQueue.isEmpty()) { 
                        if (rng.nextBoolean()) {
                            SubOrder sO = orderServingQueue.pop();
                            System.out.println("%s - %s has been served.".formatted(sO.table, sO.food.name));
                            ((FrameMain) FrameManager.instance.list.lastElement()).refresh();
                        }
                    }
                }
            }, 0, 1000 * 30);
        }
    }
}

class Table {
    String id;
    int seats;
}

class Food {
    String name;
    double price;
}

class Order {
    int id;
    Date date = Date.from(Instant.now());
    Table table;
    Stack<SubOrder> unServedorders = new Stack();
    Stack<SubOrder> servedOrders = new Stack();
}
class SubOrder {
    Table table;
    Food food;
    int amount;
    double discount;
}