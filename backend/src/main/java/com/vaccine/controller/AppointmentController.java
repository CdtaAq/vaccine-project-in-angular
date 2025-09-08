package com.vaccine.controller;

import com.vaccine.dto.AppointmentDTO;
import com.vaccine.dto.PaymentDTO;
import com.vaccine.entity.Appointment;
import com.vaccine.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<AppointmentDTO> bookAppointment(@RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(appointmentService.bookAppointment(dto));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<AppointmentDTO> approveAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.approveAppointment(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByUser(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }
}
