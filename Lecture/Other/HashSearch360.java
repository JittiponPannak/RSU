import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

public class HashSearch360 {
    public static void main(String[] args) {
        Random rand = new Random("TEST".hashCode());
        Scanner sc = new Scanner(System.in);
        int[] array;
        int arraySize;
        
        System.out.print("Array Size : ");
        arraySize = sc.nextInt();
        array = new int[arraySize];
        Arrays.fill(array, -1);

        for (int i = 0; i < arraySize; i++) {
            int value = rand.nextInt(100 + 1);
            array[value % arraySize] = value;
        }

        System.out.println(Arrays.toString(array));
        System.out.println("");

        while (true) {
            System.out.print("Target Value : ");
            int target = sc.nextInt();
            int index = target % arraySize;
            if (index < 0) { break; }

            if (array[index] == -1) {
                System.out.println("Not Found");
            } else {
                System.out.println("Found At : " + index);
            }
        }

        sc.close();
    }
}
