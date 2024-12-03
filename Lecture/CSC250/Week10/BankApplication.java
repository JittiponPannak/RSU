public class BankApplication {
    public static void main(String[] args) {
        Account account0 = new SavingAccount("0000", 100);
        System.out.println(account0.toString());
    }
}

abstract class Account {
    private String accountNumber;
    private double accountBalance;

    public Account(String accountNumber, double accountBalance) { this.accountNumber = accountNumber; this.accountBalance = accountBalance;}

    // Getters & Setters
    public String getAccountNumber() { return accountNumber; }
    public double getAccountBalance() { return accountBalance; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public void setAccountBalance(double accountBalance) { this.accountBalance = accountBalance; }

    // public abstract double payInterest(double balance);
}
class SavingAccount extends Account implements BankInterface, AccountInterface {
    private double interestRate;

    public SavingAccount(String accountNumber, double accountBalance) {
        super(accountNumber, accountBalance);
        this.setInterestRate(accountBalance);
        }
    
    public double payInterest(double balance) {
        double newBalance = 0.0f;
        
        if (balance >= 100)
            newBalance = balance * (1 + interestRate);
        
        setAccountBalance(newBalance);

        return newBalance;
    }

    public String toString() {
        final String format = "This is a saving account.\nNumber : %s\nBalance : %.2f\n\nFor Bank : %s\nLocated At : %s\n";
        return format.formatted(getAccountNumber(), getAccountBalance(), BANK_NAME, BANK_ADDRESS);
    }

    // Getters & Setters
    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double balance) {
        if (balance >= 100)
            interestRate = 0.05f;
        else
            interestRate = 0.00f;
    }

}

interface BankInterface {
    public static final String BANK_NAME = "Rangsit Banking";
    public static final String BANK_ADDRESS = "MuangAke Village, Paholayothin, Pathumtani";
    public static final String BANK_PHONE = "02-997-2222";

    public abstract String toString();

}
interface AccountInterface {
    public abstract double payInterest(double balance);
}