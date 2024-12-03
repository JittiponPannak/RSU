
import javax.swing.JOptionPane;

public class BankingApplication {
    public static void main(String[] args) {
        Customer customer;
        String accountName;

        customer = new Customer(
            JOptionPane.showInputDialog("Customer SSN : "),
            JOptionPane.showInputDialog("Customer Name : "));
        
        accountName = JOptionPane.showInputDialog("Bank Account Name (Checking) : ");
        if (!accountName.isEmpty()) {
            customer.setCheckingAccount(new CheckingAccount(accountName, Double.parseDouble(JOptionPane.showInputDialog("Checking Balance : "))));
            customer.getCheckingAccount().accessServiceCharge();
        }

        accountName = JOptionPane.showInputDialog("Bank Account Name (Saving) : ");
        if (!accountName.isEmpty()) {
            customer.setSavingAccount(new SavingAccount(accountName, Double.parseDouble(JOptionPane.showInputDialog("Saving Balance : "))));
            customer.getSavingAccount().payInterest();
        }

        System.out.println(customer);
        


        /*
        boolean quitRequest = false;

        while (!quitRequest) {
            String input = JOptionPane.showInputDialog( "1. Checking Account\n" +
                                                        "2. Checking Account\n" +
                                                        "3. Checking Account\n" +
                                                        "4. Saving Account\n" +
                                                        "5. Quit Application"
                                                    );
            switch (input) {
                case "1" -> {
                }
                case "2" -> {

                }
                case "3" -> {

                }
                case "4" -> {

                }
                case "5" -> { quitRequest = true; }
            }
        }
        */

        
    }
}

class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double accountBalance) {
        this.accountNumber = accountNumber;
        this.balance = accountBalance;
    }
    @Override public String toString() { return "Account Number : %s\nAccount Balance : %.2f\n\n"
                                        .formatted(getAccountNumber(), getBalance()); }

    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
}

class CheckingAccount extends BankAccount {
    private double serviceCharge;

    public CheckingAccount(String accountNumber, double accountBalance) {
        super(accountNumber, accountBalance);
    }

    public double getServiceCharge() { return serviceCharge; }
    public void setServiceCharge(double serviceCharge) { this.serviceCharge = serviceCharge; }

    public void accessServiceCharge() {
        double currentBalance = getBalance();
        double newBalance = currentBalance;
        
        serviceCharge = (currentBalance < 100) ? 10 : 00;
        newBalance -= serviceCharge;

        setBalance(newBalance);
    }

    @Override public String toString() { return "[Checking Account]\n\nService Charge : %.2f\nAccount Balance : %.2f"
                                        .formatted(getServiceCharge(), getBalance()); }
}

class SavingAccount extends BankAccount {
    double interestRate;
    
    public SavingAccount(String accountNumber, double accountBalance) {
        super(accountNumber, accountBalance);
        setInterestRate(accountBalance);
    }

    public void payInterest() {
        double currentBalance = getBalance();
        double newBalance = currentBalance;
        
        if (currentBalance >= 100)
            newBalance = currentBalance * (1 + interestRate);
        setBalance(newBalance);
    }

    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double savingBalance) {
        if (savingBalance >= 100)
            interestRate = 0.05;
        else
            interestRate = 0.00;
    }
    
    @Override public String toString() { return "[Saving Account]\n\nInterest Rate %.3f\nAccount Balance : %.2f"
                                        .formatted(getInterestRate(), getBalance()); }
}

class Customer {
    private String socialSecurityNumber;
    private String name;
    private CheckingAccount checkingAccount;
    private SavingAccount savingAccount;

    public Customer(String ssn, String name) {
        this.socialSecurityNumber = ssn;
        this.name = name;
    }

    public CheckingAccount getCheckingAccount() { return checkingAccount; }
    public void setCheckingAccount(CheckingAccount checkingAccount) { this.checkingAccount = checkingAccount; }
    public SavingAccount getSavingAccount() { return savingAccount; }
    public void setSavingAccount(SavingAccount savingAccount) { this.savingAccount = savingAccount; }

    @Override public String toString() {
        return "[Customer]\n\nSSN : " + socialSecurityNumber + "\nName : " + name + "\n\n" +
                ((checkingAccount != null) ? checkingAccount : "Checking Account Not Opened") + "\n\n" +
                ((savingAccount != null) ? savingAccount : "Saving Account Not Opened");
    }
}
