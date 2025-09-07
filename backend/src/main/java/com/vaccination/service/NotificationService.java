package com.vaccination.service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
  private final JavaMailSender mailSender;
  public NotificationService(JavaMailSender mailSender){ this.mailSender = mailSender; }

  public void sendBookingConfirmation(String to, String subject, String body){
    var msg = new SimpleMailMessage();
    msg.setTo(to); msg.setSubject(subject); msg.setText(body);
    mailSender.send(msg);
  }
}
