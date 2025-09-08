package com.vaccine.dto;

public class ReportDTO {
    private long totalVaccinated;
    private long totalPopulation;
    private double coveragePercentage;

    public long getTotalVaccinated() { return totalVaccinated; }
    public void setTotalVaccinated(long totalVaccinated) { this.totalVaccinated = totalVaccinated; }

    public long getTotalPopulation() { return totalPopulation; }
    public void setTotalPopulation(long totalPopulation) { this.totalPopulation = totalPopulation; }

    public double getCoveragePercentage() { return coveragePercentage; }
    public void setCoveragePercentage(double coveragePercentage) { this.coveragePercentage = coveragePercentage; }
}
