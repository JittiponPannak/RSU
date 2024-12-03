public class PolyBankAccount {
    private String accountNumber;
    private double accountBalance;
    
    public PolyBankAccount() {
        accountNumber = null;
        accountBalance = 0.0;
    }
    public PolyBankAccount(String accountNumber, double accountBalance) {
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
    }

    public void payInterest() { System.out.println("Not Enough Information to Pay Interest on"); }

    public String getAccountNumber() { return accountNumber; }
    public double getAccountBalance() { return accountBalance; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public void setAccountBalance(double accountBalance) { this.accountBalance = accountBalance; }

    @Override public String toString() { return "Account Number : %s\nAccount Balance : %.2f\n\n"
                                        .formatted(getAccountNumber(), getAccountBalance()); }
}