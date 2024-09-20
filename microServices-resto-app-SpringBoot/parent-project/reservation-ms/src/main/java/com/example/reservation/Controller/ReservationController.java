package com.example.reservation.Controller;

import com.example.reservation.Entity.Reservation;
import com.example.reservation.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        if (reservation.isPresent()) {
            return ResponseEntity.ok(reservation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservationDetails) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        if (reservation.isPresent()) {
            Reservation existingReservation = reservation.get();
            existingReservation.setCustomerId(reservationDetails.getCustomerId());
            existingReservation.setReservationTime(reservationDetails.getReservationTime());
            existingReservation.setNumberOfGuests(reservationDetails.getNumberOfGuests());
            Reservation updatedReservation = reservationService.updateReservation(existingReservation);
            return ResponseEntity.ok(updatedReservation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
