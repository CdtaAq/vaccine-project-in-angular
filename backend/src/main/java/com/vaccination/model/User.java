package com.vaccination.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name;
  @Column(unique=true, nullable=false) private String email;
  @Column(nullable=false) private String password;
  private String role; // ROLE_USER or ROLE_ADMIN
  private Integer age;
  private String gender;
  private String profession;
  private String disease;
  private Instant createdAt = Instant.now();

  // getters/setters omitted for brevity - generate via IDE or Lombok
  // ...
}
