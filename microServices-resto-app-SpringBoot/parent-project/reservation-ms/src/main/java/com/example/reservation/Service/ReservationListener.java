import com.example.reservation.Entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class ReservationListener {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @RabbitListener(queues = "userQueue")
    public void handleUserMessage(String message) {
        try {
            User user = objectMapper.readValue(message, User.class);
            System.out.println("Received User message: " + user);

            // Example: Use the User object to create or update a reservation
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
