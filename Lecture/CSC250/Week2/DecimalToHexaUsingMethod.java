package CSC250.Week2;

import java.util.Scanner;

public class DecimalToHexaUsingMethod {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.print("Please Enter Decimal Number : ");
        int base = sc.nextInt();
        
        String hex = decimalToHexadecimal(base);
        System.out.println("Hexadecimal Number is : " + hex);
    }

    static String decimalToHexadecimal(int decimal) {
        final char[] hexChr = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};

        int num = decimal;
        int rem;
        String hex = "";

        while (num > 0) {
            rem = num % 16;
            num = num / 16;
            hex = hexChr[rem] + hex;
        }

        return hex;
    }
}
