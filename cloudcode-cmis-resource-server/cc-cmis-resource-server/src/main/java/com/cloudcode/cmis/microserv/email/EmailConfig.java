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

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
 
@Configuration
@EnableAsync
public class EmailConfig 
{
    @Value(value = "${ipgw.api.admin.email.from}")
    private String emailFrom;
    
    @Bean
    public SimpleMailMessage emailTemplate()
    {
                
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("sutherland.nele@gmail.com");
        message.setFrom(emailFrom);
        message.setSubject("Test email");
        message.setText("This is just simple test email. Please ignore.");
        return message;
    }
    
    @Bean
    public TaskExecutor threadPoolTaskExecutor() {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(4);
        executor.setMaxPoolSize(4);
        executor.setThreadNamePrefix("EmailingWithFreemarkerTemplate");
        executor.initialize();

        return executor;
    }

}
