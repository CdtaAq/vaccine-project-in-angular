package com.vaccination.model;
import jakarta.persistence.*;
@Entity
@Table(name="vaccines")
public class Vaccine {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name;
  private String type;
  private Double price;
  private Integer dosesRequired;
  private String origin;
  @Column(length=2000) private String sideEffects;
  @Column(length=2000) private String strainsCovered;
  // getters/setters
}
