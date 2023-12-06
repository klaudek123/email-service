package com.example.emailservice.Mail;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String owner;
    private String sender;
    private String recipient;
    private String subject;
    private String content;
    private String status; //  "sent", "received","saved"
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean trashed; // true, false
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime Date;
    private boolean isRead;

    @PrePersist
    public void prePersist(){
        this.Date = LocalDateTime.now();
    }
}