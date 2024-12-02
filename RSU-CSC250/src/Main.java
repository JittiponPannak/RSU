
import java.io.File;
import java.io.FileWriter;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Scanner;
import javax.swing.JFrame;

public class Main {
    static ArrayList<Court> courts = new ArrayList();
    static ArrayList<Customer> customers = new ArrayList();
    static ArrayList<Reservation> reservations = new ArrayList();
    
    public static void main(String[] args) {
        load();
        new FrameMain() { @Override public void dispose() { save(); super.dispose(); } }.setVisible(true);
    }

    public static void save() {
        try {
            File file;
            FileWriter fw;
            
            file = new File("src/data/courts.txt");
            if (!file.exists()) file.createNewFile();
            fw = new FileWriter(file);
            for (Court court : courts) {
                String data = "%d\t%f\n".formatted(court.courtID, court.price);
                fw.append(data);
            }
            fw.close();
            
            file = new File("src/data/customer.txt");
            if (!file.exists()) file.createNewFile();
            fw = new FileWriter(file);
            for (Customer customer : customers) {
                String data = "%d\t%d\t%s\t%s\n".formatted(customer.id, customer instanceof MemberCustomer ? 1 : 0, customer.name, customer.phone);
                fw.append(data);
            }
            fw.close();
            
            file = new File("src/data/reservation.txt");
            if (!file.exists()) file.createNewFile();
            fw = new FileWriter(file);
            for (Reservation reservation : reservations) {
                String data = "%d\t%d\t%d\t%f".formatted(reservation.customer.id, reservation.dateStart.toEpochMilli(), reservation.dateEnded.toEpochMilli(), reservation.total);
                for (Court court : reservation.courts)
                    data += "\t" + court.courtID;
                fw.append(data + "\n");
                
                System.out.println(data);
            }
            fw.close();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void load() {
        try {
            File file;
            Scanner sc;
            
            file = new File("src/data/courts.txt");
            if (!file.exists()) file.createNewFile();
            sc = new Scanner(file);
            while (sc.hasNextLine()) {
                Court court = new Court();
                String[] data = sc.nextLine().split("\t");
                
                court.courtID = Integer.parseInt(data[0]);
                court.price = Double.parseDouble(data[1]);
                
                courts.add(court);
            }
            
            file = new File("src/data/customer.txt");
            if (!file.exists()) file.createNewFile();
            sc = new Scanner(file);
            while (sc.hasNextLine()) {
                Customer customer;
                String[] data = sc.nextLine().split("\t");
                
                if (data[1].equals("1"))
                    customer = new MemberCustomer();
                else
                    customer = new GuestCustomer();
                
                customer.id = Integer.parseInt(data[0]);
                customer.name = data[2];
                customer.phone = data[3];
                
                customers.add(customer);
            }
            
            file = new File("src/data/reservation.txt");
            if (!file.exists()) file.createNewFile();
            sc = new Scanner(file);
            while (sc.hasNextLine()) {
                Reservation reservation = new Reservation();
                String[] data = sc.nextLine().split("\t");

                reservation.customer = customers.get(Integer.parseInt(data[0]));
                reservation.dateStart = Instant.ofEpochMilli(Long.parseLong(data[1]));
                reservation.dateEnded = Instant.ofEpochMilli(Long.parseLong(data[2]));
                reservation.total = Double.parseDouble(data[3]);
                for (int i = 4; i < data.length; i++)
                    reservation.courts.add(courts.get(Integer.parseInt(data[i])));

                reservations.add(reservation);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
