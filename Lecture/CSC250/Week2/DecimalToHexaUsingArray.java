package CSC250.Week2;

import java.util.Scanner;

public class DecimalToHexaUsingArray {

    final static char[] hexChr = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int rem, num, base;
        String hex = "";

        System.out.print("Please Enter Decimal Number : ");
        base = sc.nextInt();
        num = base;

        while (num > 0) {
            rem = num % 16;
            num = num / 16;
            hex = hexChr[rem] + hex;
        }

        System.out.println("Hexadecimal Number is : " + hex);
    }

    
}
