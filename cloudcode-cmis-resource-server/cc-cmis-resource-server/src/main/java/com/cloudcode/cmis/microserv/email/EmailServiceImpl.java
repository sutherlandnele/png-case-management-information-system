/*
 * ************************************************************************
 * Cloudcode PNG Limited Case Management Information System (CMIS) version 1.0.0
 * ************************************************************************
 * Copyright (c) 2021 Cloudcode PNG Limited
 * ************************************************************************
 * CMIS RESTApi - Microservice for Cloudcode PNG Limited CMIS project
 * Support: Sutherland Nele sutherland.nele@cloudcode.com.pg
 * V01.00.00 
 * ************************************************************************
 */
package com.cloudcode.cmis.microserv.email;

import com.cloudcode.cmis.microserv.common.Common;
import com.cloudcode.common.utils.logging.LogWrapper;
import freemarker.template.TemplateException;
import freemarker.template.Configuration;
import freemarker.template.Template;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 *
 */
@Service("emailService")
public class EmailServiceImpl implements EmailService {

    private static final LogWrapper mLogger = LogWrapper.getInstance(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SimpleMailMessage preConfiguredMessage;
    
    @Autowired
    private Configuration freemarkerConfig;

    @Value(value = "${cc.api.admin.email.from}")
    private String emailFrom;
  
    
    /**
     * This method will send compose and send the message
     *
     * @param to
     * @param subject
     * @param body
     * @throws javax.mail.MessagingException
     * @throws java.io.IOException
     *
     */
    @Override
    public void sendMail(String to, String subject, String body) throws IOException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailFrom);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    /**
     * This method will send a pre-configured message
     *
     * @param message
     *
     */
    @Override
    public void sendPreConfiguredMail(String message) throws IOException {
        SimpleMailMessage mailMessage = new SimpleMailMessage(preConfiguredMessage);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }

    /**
     * Multimedia emails are send using MimeMessageHelper which is used to
     * configure MimeMessage.These mime messages are rich text emails.
     *
     * @param to
     * @param subject
     * @param body
     * @param fileToAttach
     * @param fileName
     * @throws javax.mail.MessagingException
     * @throws java.io.IOException
     */
    @Override
    public void sendMailWithAttachment(String to, String subject, String body, String fileToAttach, String fileName) throws IOException {

        MimeMessagePreparator preparator = (MimeMessage mimeMessage) -> {
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setFrom(new InternetAddress(emailFrom));
            mimeMessage.setSubject(subject);
            mimeMessage.setText(body);
            
            FileSystemResource file = new FileSystemResource(new File(fileToAttach));
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.addAttachment(fileName, file);
        };

        try {
            mailSender.send(preparator);
        } catch (MailException ex) {
            // simply log it and go on...
            mLogger.error(ex.getMessage());
        }
    }

    /**
     * sendMailWithInlineResources
     *
     * Rich text include media content in between text content.To do so in
     * emails, we have to use MimeMessageHelper‘s addInline() method.
     * @param to
     * @param subject
     * @param fileToAttach
     * @throws javax.mail.MessagingException
     * @throws java.io.IOException
     */
    @Override
    public void sendMailWithInlineResources(String to, String subject, String fileToAttach) throws IOException {

        MimeMessagePreparator preparator = (MimeMessage mimeMessage) -> {
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            mimeMessage.setFrom(new InternetAddress(emailFrom));
            mimeMessage.setSubject(subject);
            
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            
            helper.setText("<html><body><img src='cid:identifier1234'></body></html>", true);
            
            FileSystemResource res = new FileSystemResource(new File(fileToAttach));
            helper.addInline("identifier1234", res);
        };

        try {
            mailSender.send(preparator);
        } catch (MailException ex) {
            // simply log it and go on...
            mLogger.error(ex.getMessage());
        }
    }

    /**
     * sendHtmlMail
     *
     * 
     * @param to
     * @param subject
     * @param object
     * @param tmplt
     * @param attachFilePath
     * @throws javax.mail.MessagingException
     * @throws java.io.IOException
     * @throws freemarker.template.TemplateException
     */
    @Async 
    @Override
    public void sendFreeMarkerHtmlMail(String to, String subject, Object object,String tmplt, String attachFilePath) 
            throws IOException, TemplateException {     
        
        
        String content = "";
        Map<String, Object> root = new HashMap<>();
        root.put("root",object);
        
        try {
            
            Template template = freemarkerConfig.getTemplate(tmplt);
            content = FreeMarkerTemplateUtils.processTemplateIntoString(template, root);
            
        } catch (TemplateException | IOException e){
            mLogger.error(e.getMessage());
        }

        //Get MimeMessage object
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper;
        try {
            messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom(emailFrom);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);
            
            //add logo as inline message
            
            //offer letter as attachment            
            if(!Common.isNothing(attachFilePath)){                
               
                FileSystemResource resource = new FileSystemResource(new File(attachFilePath));
                String fileName = resource.getFile().getName();
                
                messageHelper.addAttachment(fileName, resource);
            }
            
            //send email
            mailSender.send(message);
            //Log output
            mLogger.info("Mail sent successfully");
            
        } catch (Exception ex) {
            mLogger.error("Email not sent! Error: " + ex.getMessage());
        }
    }





}
