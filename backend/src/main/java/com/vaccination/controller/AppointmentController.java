package com.vaccination.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.vaccination.service.AppointmentService;
import com.vaccination.model.Appointment;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
  private final AppointmentService apptSvc;
  public AppointmentController(AppointmentService apptSvc){ this.apptSvc = apptSvc; }

  @PostMapping("/book")
  public ResponseEntity<?> book(@RequestBody BookRequest req, Principal p) {
    try {
      Appointment a = apptSvc.book(p.getName(), req.hospitalId, req.vaccineId, LocalDateTime.parse(req.date));
      return ResponseEntity.ok(a);
    } catch(Exception e){
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PutMapping("/{id}/approve")
  public ResponseEntity<?> approve(@PathVariable Long id) {
    var a = apptSvc.approve(id);
    return ResponseEntity.ok(a);
  }

  @GetMapping("/my")
  public ResponseEntity<List<Appointment>> myAppointments(Principal p) {
    return ResponseEntity.ok(apptSvc.listByUser(p.getName()));
  }

  @GetMapping("/all")
  public ResponseEntity<List<Appointment>> all() { return ResponseEntity.ok(apptSvc.listAll()); }

  static record BookRequest(Long hospitalId, Long vaccineId, String date){}
}
