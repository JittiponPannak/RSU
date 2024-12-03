public class SavingBankAccount extends PolyBankAccount {
        double interestRate;
       
        public SavingBankAccount(String accountNumber, double accountBalance) {
            super(accountNumber, accountBalance);
            setInterestRate(accountBalance);
        }

        public void payInterest() {
            double currentBalance = getAccountBalance();
            double newBalance = currentBalance;
            
            if (currentBalance >= 100)
                newBalance = currentBalance * (1 + interestRate);
            
            setAccountBalance(newBalance);
        }
    
        public double getInterestRate() { return interestRate; }
        public void setInterestRate(double savingBalance) {
            if (savingBalance >= 100)
                interestRate = 0.05;
            else
                interestRate = 0.00;
        }
        
        @Override public String toString() { return "Account Number : %s\nAccount Balance : %.2f\nInterest Rate %.3f\n\n"
                                            .formatted(getAccountNumber(), getAccountBalance(), getInterestRate()); }
}
