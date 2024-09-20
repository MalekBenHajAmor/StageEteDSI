package com.example.reservation.Service;

import com.example.reservation.Entity.Reservation;
import com.example.reservation.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        reservation.setCreatedAt(LocalDateTime.now());
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long reservationId) {
        return reservationRepository.findById(reservationId);
    }

    public Reservation updateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }
}
