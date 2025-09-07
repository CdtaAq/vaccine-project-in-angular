package com.vaccination.model;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name="payments")
public class Payment {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @OneToOne @JoinColumn(name="appointment_id") private Appointment appointment;
  private Double amount;
  private String method;
  private String status;
  private String transactionRef;
  private Instant createdAt = Instant.now();
  // getters/setters
}
