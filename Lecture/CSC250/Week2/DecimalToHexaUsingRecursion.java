package CSC250.Week2;

import java.util.Scanner;

public class DecimalToHexaUsingRecursion {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Please Enter Decimal Number : ");
        int base = sc.nextInt();
        
        DecimalHexa dh = new DecimalHexa();
        String hex = dh.decHex(base);

        System.out.println("Hexadecimal Number is : " + hex);
    }
}
