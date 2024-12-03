
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

public class Reservation {
    Customer customer;
    ArrayList<Court> courts = new ArrayList();
    
    Instant dateStart;
    Instant dateEnded;

    double total = 0.0f;

    boolean extend(long minute) {
        if (!hasFinish()) {
            return false;
        } else {
            dateEnded = dateEnded.plus(minute,
                    java.time.temporal.ChronoUnit.MINUTES);
            updatePrice();
            return true;
        }
    }
    
    void updatePrice() {
        total = 0.0f;
        
        for (Court court : courts)
            total += court.price;
        
        if (dateStart != null && dateEnded != null) {
            long minutes = ChronoUnit.MINUTES.between(dateStart, dateEnded);
            double datePrice = (double) Math.ceilDiv(minutes, 60);
            total *= datePrice;
        }
        
        if (customer instanceof GuestCustomer guest) {
            total += guest.reservationFee;
        } else if(customer instanceof MemberCustomer member) {
            total *= member.discountPercent;
        }
    }

    boolean hasStarted() { return dateStart.isBefore(Instant.now()); }
    boolean hasFinish() { return dateEnded.isBefore(Instant.now()); }
}
