package com.vaccination.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vaccines")
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private Double price;
    private Integer dosesRequired;
    private String origin;

    @Column(length = 2000)
    private String sideEffects;

    @Column(length = 2000)
    private String strainsCovered;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDosesRequired() {
        return dosesRequired;
    }

    public void setDosesRequired(Integer dosesRequired) {
        this.dosesRequired = dosesRequired;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(String sideEffects) {
        this.sideEffects = sideEffects;
    }

    public String getStrainsCovered() {
        return strainsCovered;
    }

    public void setStrainsCovered(String strainsCovered) {
        this.strainsCovered = strainsCovered;
    }
}
