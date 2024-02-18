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

package com.cloudcode.cmis.microserv.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */

@ComponentScan(basePackages = {"com.cloudcode"})
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class,
                                  UserDetailsServiceAutoConfiguration.class})
public class microserviceAdminManagerApplication {
	public static void main(String[] args) {
	    SpringApplication.run(microserviceAdminManagerApplication.class, args);
	}
}