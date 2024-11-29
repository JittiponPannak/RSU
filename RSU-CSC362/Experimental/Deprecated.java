import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Deprecated {

}

class Legacy {
    Scanner sc = new Scanner(System.in);

    int privilege = 0;

    void begin() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
        
        System.out.println("Welcome To");
        System.out.println("Hardware Store");
        System.out.println("==============\n");

        new java.util.Timer().schedule(new java.util.TimerTask() {
            @Override public void run() { privilegeSelect(); }
            }, 1000);
    }
    void privilegeSelect() {
        System.out.print("\033[H\033[2J");
        System.out.flush();

        System.out.println("Select Privilege");
        System.out.println("\t1. Employee");
        System.out.println("\t2. Stocker");
        System.out.println("\t3. Manager");
        System.out.println("\t4. Exit");

        System.out.print("\n>\t");
        int input = Integer.valueOf(sc.nextLine());

        switch (input) {
            case 1 : {
                employeeMain();
            }
            case 2 : {
                stockerMain();
            }
            case 3 : {

            }
            case 4 : {
                return;
            }
        }
    }
    void employeeMain() {
        System.out.print("\033[H\033[2J");
        System.out.flush();

        System.out.println("Select Action");
        System.out.println("\t1. ");
        System.out.println("\t2. ");
        System.out.println("\t3. ");
        System.out.println("\t4. Return");

        System.out.print("\n>\t");
        int input = Integer.valueOf(sc.nextLine());

        switch (input) {
            case 1 : {
                employeeMain();
            }
            case 2 : {
                employeeMain();
            }
            case 3 : {
                employeeMain();
            }
            case 4 : {
                privilegeSelect();
            }
        }
    }
    void stockerMain() {
        System.out.print("\033[H\033[2J");
        System.out.flush();

        System.out.println("Select Action");
        System.out.println("\t1. New Restock");
        System.out.println("\t2. View Suppliers");
        System.out.println("\t3. Return");

        System.out.print("\n>\t");
        int input = Integer.valueOf(sc.nextLine());
        
        switch (input) {
            case 1 : {
                Object[] data = new Object[5];

                System.out.println("\n[ Supplier ID ]");
                System.out.print("\n>\t");
                data[0] = Integer.valueOf(sc.nextLine());

                System.out.println("\n[ Item ID ]");
                System.out.print("\n>\t");
                data[1] = Integer.valueOf(sc.nextLine());

                System.out.println("\n[ Item Sub ID ]");
                System.out.print("\n>\t");
                data[2] = Integer.valueOf(sc.nextLine());

                System.out.println("\n[ Quantity ]");
                System.out.print("\n>\t");
                data[3] = Integer.valueOf(sc.nextLine());

                System.out.println("\n[ Cost ]");
                System.out.print("\n>\t");
                data[4] = Double.valueOf(sc.nextLine());

                stockerMain();
            }
            case 2 : {
                HashMap<String, ArrayList<Object>> data = Main.database.getSuppliers();
                Object[] keySet = data.keySet().toArray();
                
                System.out.println("\n" + new String(new char[100]).replace("\0", "=") + "\n");

                for (int i = 0; i < keySet.length; i++) {
                    ArrayList<Object> value = data.get(keySet[i]);
                    System.out.println(String.format("%-25s%-25s%-25s%-25s", keySet[i], value.get(0), value.get(1), value.get(2)));
                }

                System.out.print("\nPress Enter to Continue"); sc.next();

                stockerMain();
            }
            case 3 : {
                privilegeSelect();
            }
        }
    }
}
