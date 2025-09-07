package com.vaccination.service;
import org.springframework.stereotype.Service;
import java.util.List;
import com.vaccination.repo.AppointmentRepository;
import com.vaccination.model.*;
import com.vaccination.repo.UserRepository;
import com.vaccination.repo.HospitalRepository;
import com.vaccination.repo.VaccineRepository;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class AppointmentService {
  private final AppointmentRepository apptRepo;
  private final UserRepository userRepo;
  private final HospitalRepository hospRepo;
  private final VaccineRepository vacRepo;

  public AppointmentService(AppointmentRepository apptRepo, UserRepository userRepo,
                            HospitalRepository hospRepo, VaccineRepository vacRepo) {
    this.apptRepo=apptRepo; this.userRepo=userRepo; this.hospRepo=hospRepo; this.vacRepo=vacRepo;
  }

  public Appointment book(String userEmail, Long hospitalId, Long vaccineId, LocalDateTime date) throws Exception {
    var user = userRepo.findByEmail(userEmail).orElseThrow();
    var hosp = hospRepo.findById(hospitalId).orElseThrow();
    var vac = vacRepo.findById(vaccineId).orElseThrow();

    var appt = new Appointment();
    appt.setUser(user);
    appt.setHospital(hosp);
    appt.setVaccine(vac);
    appt.setAppointmentDate(date);
    appt.setStatus("PENDING");

    // generate QR with appointment minimal info
    String qrText = "appt:" + user.getEmail() + "|date:" + date.toString();
    String qrBase64 = generateQrBase64(qrText);
    appt.setQrCode(qrBase64);

    return apptRepo.save(appt);
  }

  public Appointment approve(Long id) {
    var appt = apptRepo.findById(id).orElseThrow();
    appt.setStatus("APPROVED");
    return apptRepo.save(appt);
  }

  public List<Appointment> listByUser(String userEmail) {
    var user = userRepo.findByEmail(userEmail).orElseThrow();
    return apptRepo.findByUser(user);
  }

  public List<Appointment> listAll() { return apptRepo.findAll(); }

  private String generateQrBase64(String text) throws Exception {
    var hints = new java.util.Hashtable<EncodeHintType, Object>();
    hints.put(EncodeHintType.MARGIN, 1);
    var bitMatrix = new MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, 250, 250, hints);
    var baos = new ByteArrayOutputStream();
    MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);
    return "data:image/png;base64," + Base64.getEncoder().encodeToString(baos.toByteArray());
  }
}
