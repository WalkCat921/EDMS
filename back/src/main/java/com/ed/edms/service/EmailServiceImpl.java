package com.ed.edms.service;

import com.ed.edms.pojo.MailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl {
    private final JavaMailSender mailSender;
    private final CurrentUserInfoService currentUserInfoService;
    @Value("${spring.mail.username}")
    private String mailFromUsername;
    @Value("${spring.mail.toName}")
    private String mailToName;


    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
        currentUserInfoService = new CurrentUserInfoService();
    }

    public String sendEmail(MailRequest mailRequest) {
        SimpleMailMessage messageToUserMail = new SimpleMailMessage();
        messageToUserMail.setFrom(mailFromUsername);
        messageToUserMail.setTo(mailToName);
        messageToUserMail.setText(mailRequest.getBody() + "\nОтзыв отправлен пользователем  " +
                currentUserInfoService.getCurrentUsername());
        messageToUserMail.setSubject(mailRequest.getSubject());

        mailSender.send(messageToUserMail);

        return "Сообщение успешно отправлено";
    }
}
