package com.vaccination.model;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name="chat_messages")
public class ChatMessage {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String room;
  private String sender;
  @Column(columnDefinition="TEXT") private String message;
  private Instant createdAt = Instant.now();
  // getters/setters
}
