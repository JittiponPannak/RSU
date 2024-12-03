package CSC250.Week2;

public class DecimalHexa {
    final char[] hexChr = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
   
    String decHex(int num) {
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
