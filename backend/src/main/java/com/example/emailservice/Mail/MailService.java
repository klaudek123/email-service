package com.example.emailservice.Mail;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MailService {
    private final MailRepository mailRepository;

    public MailService(MailRepository mailRepository) {
        this.mailRepository = mailRepository;
    }


    public Mail removeIdFromMail(Mail mail){
        Mail sentMail = new Mail();
        sentMail.setSender(mail.getSender());
        sentMail.setRecipient(mail.getRecipient());
        sentMail.setSubject(mail.getSubject());
        sentMail.setContent(mail.getContent());
        return sentMail;
    }

    public void sentMail(Mail mail){
        Optional<Mail> savedMail = getSavedMailById(mail.getId());

        savedMail.ifPresent(value -> mailRepository.deleteById(value.getId()));

        Mail sentMail = removeIdFromMail(mail);
        sentMail.setOwner(mail.getSender());
        sentMail.setStatus("sent");
        mailRepository.save(sentMail);

        Mail receivedMail = removeIdFromMail(mail);
        receivedMail.setOwner(mail.getRecipient());
        receivedMail.setStatus("received");
        mailRepository.save(receivedMail);
    }

    public List<Mail> getSentMails(String owner) {
        return mailRepository.findByOwnerAndStatusAndTrashed(owner, "sent", false);
    }

    public List<Mail> getReceivedMails(String owner) {
        return mailRepository.findByOwnerAndStatusAndTrashed(owner, "received", false);
    }

    public Optional<Mail> findMailById(Long id) {
        return mailRepository.findById(id);
    }
    public void delete(Mail Mail) {
        mailRepository.findById(Mail.getId()).ifPresent(mailRepository::delete);
    }

    public List<Mail> getTrashedMailsByOwner(String owner) {
        return mailRepository.findByOwnerAndTrashed(owner, true);
    }

    public void moveMailToTrash(Mail mail) {
        mail.setTrashed(true);
        mailRepository.save(mail);
    }

    public void restoreFromTrash(Mail mail) {
        mail.setTrashed(false);
        mailRepository.save(mail);
    }

    public List<Mail> getSavedMails(String owner) {
        return mailRepository.findByOwnerAndStatusAndTrashed(owner, "saved", false);
    }

    public Optional<Mail> getSavedMailById(Long id){
        return mailRepository.findByIdAndStatus(id, "saved");
    }
    public void saveUnsentMail(Mail mail) {
        Mail savedMail = removeIdFromMail(mail);
        savedMail.setOwner(mail.getSender());
        savedMail.setStatus("saved");
        mailRepository.save(savedMail);
    }
}
