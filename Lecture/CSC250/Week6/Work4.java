public class Work4 {
    public static void main(String[] args) {
        PolyBankAccount account0 = new PolyBankAccount();
        account0.payInterest();
        System.out.println(account0);
    
        PolyBankAccount account1 = new PolyBankAccount("1111", 100);
        account1.payInterest();
        System.out.println(account1);

        SavingBankAccount account2 = new SavingBankAccount("2222", 110);
        account2.payInterest();
        System.out.println(account2);

        SavingBankAccount account3 = new SavingBankAccount("2222", 110);
        account3.setAccountBalance(1000);
        account3.payInterest();
        System.out.println(account3);
    }
}
