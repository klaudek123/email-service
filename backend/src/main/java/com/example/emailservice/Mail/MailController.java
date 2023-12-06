package com.example.emailservice.Mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mails")
@CrossOrigin(origins = "http://localhost:3000")
public class MailController {
    private final MailRepository mailRepository;
    private final MailService mailService;


    @Autowired
    public MailController(MailRepository mailRepository, MailService mailService) {
        this.mailRepository = mailRepository;
        this.mailService = mailService;
    }

    @GetMapping("/all")
    public List<Mail> getAllMails(){
        return mailRepository.findAll();
    }

    @GetMapping
    public Mail getMailById(@RequestParam("id") Long id) {
        return mailService.findMailById(id).orElse(null);
    }

    @PostMapping("/sent")
    public ResponseEntity<String> sentMail(@RequestBody Mail mail) {
        try {
            mailService.sentMail(mail);
            return ResponseEntity.ok("Email sent successfully");
        }catch (Exception e){
            return ResponseEntity.status(501).body(e.getMessage());
        }

    }

    @GetMapping("/sent")
    public List<Mail> getSentMails(@RequestParam("owner") String owner) {
        return mailService.getSentMails(owner);
    }

    @GetMapping("/received")
    public List<Mail> getReceivedMails(@RequestParam("owner") String owner) {
        return mailService.getReceivedMails(owner);
    }


    @GetMapping("/saved")
    public List<Mail> getSavedMails(@RequestParam("owner") String owner) {
        return mailService.getSavedMails(owner);
    }

    @PostMapping("/unsent")
    public ResponseEntity<String> saveUnsentMail(@RequestBody Mail mail) {
        try {
            mailService.saveUnsentMail(mail);
            return ResponseEntity.ok("Email saved successfully");
        }catch (Exception e){
            return ResponseEntity.status(501).body(e.getMessage());
        }
    }

    @PutMapping("/{mailId}/trashed")
    public ResponseEntity<String> moveMailToTrash(@PathVariable Long mailId) {
        try {
            Optional<Mail> mailOptional = mailService.findMailById(mailId);
            if (mailOptional.isPresent()) {
                mailService.moveMailToTrash(mailOptional.get());
                return ResponseEntity.ok("Email moved to trash");
            } else {
                return ResponseEntity.notFound().build();
            }

        }catch (Exception e){
            return ResponseEntity.status(500).body("Error moving email to trash: " + e.getMessage());
        }
    }

    @PutMapping("/{mailId}/restore")
    public ResponseEntity<String> restoreFromTrash(@PathVariable Long mailId) {
        try {
            Optional<Mail> mailOptional = mailService.findMailById(mailId);
            if (mailOptional.isPresent()) {
                mailService.restoreFromTrash(mailOptional.get());
                return ResponseEntity.ok("Email restore from trash");
            } else {
                return ResponseEntity.notFound().build();
            }

        }catch (Exception e){
            return ResponseEntity.status(500).body("Error restoring email from trash: " + e.getMessage());
        }
    }

    @GetMapping("/trashed")
    public List<Mail> getTrashedMailsByOwner(@RequestParam("owner") String owner){
        return mailService.getTrashedMailsByOwner(owner);
    }

    @DeleteMapping("/{id}")
    public void deleteMail(@PathVariable Long id) {
        mailRepository.deleteById(id);
    }

}
