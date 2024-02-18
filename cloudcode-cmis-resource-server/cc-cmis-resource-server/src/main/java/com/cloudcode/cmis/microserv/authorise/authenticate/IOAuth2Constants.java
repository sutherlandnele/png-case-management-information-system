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
package com.cloudcode.cmis.microserv.authorise.authenticate;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public interface IOAuth2Constants {

	public static final String ACCESS_TOKEN = "access_token";
	public static final String REFRESH_TOKEN = "refresh_token";       
	public static final String CONFIG_FILE_PATH = "com/ibm/oauth/Oauth2Client.config";
	public static final String RESOURCE_SERVER_URL = "resource_server_url";	
	public static final String AUTHORIZATION = "Authorization";
	public static final String BEARER = "Bearer";
	public static final String BASIC = "Basic";
	public static final String JSON_CONTENT = "application/json";
	public static final String XML_CONTENT = "application/xml";
	public static final String URL_ENCODED_CONTENT = "application/x-www-form-urlencoded";	
        public static final String HTTP_RESPONSE_STATUS_CODE = "httpResponseStatusCode";
	public static final int HTTP_OK = 200;
	public static final int HTTP_FORBIDDEN = 403;
	public static final int HTTP_UNAUTHORIZED = 401;   
      
}
