package com.vaccine.controller;

import com.vaccine.dto.ReportDTO;
import com.vaccine.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/dosesPerDay")
    public ResponseEntity<Map<String, Long>> getDosesPerDay() {
        return ResponseEntity.ok(reportService.getDosesPerDay());
    }

    @GetMapping("/populationCoverage")
    public ResponseEntity<ReportDTO> getPopulationCoverage() {
        return ResponseEntity.ok(reportService.getPopulationCoverage());
    }

    @GetMapping("/ageGenderSplit")
    public ResponseEntity<Map<String, Long>> getAgeGenderSplit() {
        return ResponseEntity.ok(reportService.getAgeGenderSplit());
    }
}
