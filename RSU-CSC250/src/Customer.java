public abstract class Customer {
    int id;
    String name;
    String phone;
}
class GuestCustomer extends Customer {
    double reservationFee = 40.0f;
}
class MemberCustomer extends Customer {
    double discountPercent = 0.95f;
}