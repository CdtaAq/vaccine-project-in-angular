package com.vaccination.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="appointments")
public class Appointment {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

  @ManyToOne @JoinColumn(name="user_id") private User user;
  @ManyToOne @JoinColumn(name="hospital_id") private Hospital hospital;
  @ManyToOne @JoinColumn(name="vaccine_id") private Vaccine vaccine;

  private LocalDateTime appointmentDate;
  private String status = "PENDING";
  @Lob private String qrCode;
  // getters/setters
}
