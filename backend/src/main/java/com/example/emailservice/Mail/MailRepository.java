package com.example.emailservice.Mail;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;


public interface MailRepository extends JpaRepository<Mail, Long> {

    List<Mail> findByOwnerAndStatusAndTrashed(String owner, String status, boolean trashed);

    List<Mail> findByOwnerAndTrashed(String owner, boolean trashed);

    Optional<Mail> findByIdAndStatus(Long id, String status);
}
