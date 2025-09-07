package com.vaccination.model;
import jakarta.persistence.*;
@Entity
@Table(name="hospitals")
public class Hospital {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name;
  private String address;
  private String type;
  private Double charges;
  // getters/setters
}
