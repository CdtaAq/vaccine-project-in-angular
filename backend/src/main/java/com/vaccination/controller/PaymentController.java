package com.vaccination.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.vaccination.repo.AppointmentRepository;
import com.vaccination.repo.PaymentRepository;
import com.vaccination.model.Payment;
import com.vaccination.model.Appointment;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
  private final AppointmentRepository apptRepo;
  private final PaymentRepository payRepo;

  public PaymentController(AppointmentRepository apptRepo, PaymentRepository payRepo){
    this.apptRepo = apptRepo; this.payRepo = payRepo;
  }

  @PostMapping("/mock-pay/{appointmentId}")
  public ResponseEntity<?> mockPay(@PathVariable Long appointmentId, @RequestBody PayReq req){
    Optional<Appointment> opt = apptRepo.findById(appointmentId);
    if(opt.isEmpty()) return ResponseEntity.badRequest().body("Appointment not found");
    Appointment appt = opt.get();
    var p = new Payment();
    p.setAppointment(appt);
    p.setAmount(req.amount);
    p.setMethod("QR-MOCK");
    p.setStatus("SUCCESS");
    p.setTransactionRef("MOCK-"+System.currentTimeMillis());
    payRepo.save(p);

    appt.setStatus("COMPLETED");
    apptRepo.save(appt);

    return ResponseEntity.ok(p);
  }

  static record PayReq(double amount){}
}
