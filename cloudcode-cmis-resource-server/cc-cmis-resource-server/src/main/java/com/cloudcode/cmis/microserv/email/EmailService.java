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

import freemarker.template.TemplateException;
import java.io.IOException;
import javax.mail.MessagingException;
import org.springframework.lang.Nullable;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * 
 */
public interface EmailService {
    
    public void sendMail(String to, String subject, String body) throws MessagingException, IOException;
    public void sendPreConfiguredMail(String message) throws MessagingException, IOException;
    public void sendMailWithAttachment(String to, String subject, String body, String fileToAttach, String fileName) throws MessagingException, IOException;
    public void sendMailWithInlineResources(String to, String subject, String fileToAttach) throws MessagingException, IOException;
    public void sendFreeMarkerHtmlMail(String to, String subject, Object object,String template, @Nullable String attachFilePath) throws MessagingException, IOException, TemplateException ;
}
