package CSC250;
import java.util.ArrayList;
import java.util.Scanner;
import javax.swing.JOptionPane;

public class Week1 {
    static void helloWorld() {
        System.out.println("Hello World!");
    }
    static void inputName() {
        Scanner sc = new Scanner(System.in);

        System.out.print("Please Enter your Name : ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name);
    }
    static void inputNameSwing() {
        String name = JOptionPane.showInputDialog("Please Enter your Name : ");
        JOptionPane.showMessageDialog(null, "Hello, " + name);
    }
    static void arrayNumber() {
        int[] arr = new int[5];
    //  int[] arr = {1, 3, 5, 7, 9};

        arr[0] = 1;
        arr[1] = 3;
        arr[2] = 5;
        arr[3] = 7;
        arr[4] = 9;

        for (int i = 0; i < arr.length; i++)
            System.out.println("arr[" + i + "] : " + arr[i]);
        
        /* For Each
        for (int x : arr)
            System.out.println(x);
        */
    }
    static void raggedArray() {
        int[][] arr = new int[5][];
        arr[0] = new int[2];
        arr[1] = new int[3];
        arr[2] = new int[1];
        arr[3] = new int[5];
        arr[4] = new int[3];
       
        for (int row = 0; row < arr.length; row++)
            for (int col = 0; col < arr[row].length; col++)
                arr[row][col] = row;

        for (int[] row : arr) {
            for (int col : row)
                System.out.print(col + "\t");
            System.out.println();
        }
    }
    static void arrayList() {
        ArrayList<String> arr = new ArrayList();
        Runnable test = () -> {
            System.out.println();
            for (int i = 0; i < arr.size(); i++)
             System.out.println(arr.get(i)); };
        
        arr.add("Emily");
        arr.add("Bob");
        arr.add("Cindy");

        test.run();
        
        arr.set(2, "Jackie");
        test.run();

        arr.add(1, "Ann");
        test.run();

        arr.remove(1);
        test.run();
    }

    public static void main(String[] args) {
        arrayList();
    }
}
