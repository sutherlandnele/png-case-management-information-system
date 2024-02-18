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


import com.cloudcode.common.utils.logging.LogWrapper;
import java.io.IOException;
import java.util.Map;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class TokenHandler implements IOAuth2Constants{
    
    private static final LogWrapper mLogger = LogWrapper.getInstance(TokenHandler.class);
    
    private final OAuth2Utils oauth2Utils;
    private Map<String, String> tokenMap = null;
    private String accessToken = "";
    private String refreshToken = "";
    private String httpResponseStatusCode = "";

    OAuth2Parameters oath2Parameters = null;
    
    public TokenHandler(OAuth2Parameters oath2Parameters){
        this.oath2Parameters = oath2Parameters;
        oauth2Utils = new OAuth2Utils();
    }
    
    
    /**
     * @return the oauth2Utils
     */
    public OAuth2Utils getOauth2Utils() {
        return oauth2Utils;
    }

    public void getTokens() throws IOException{
        
    	tokenMap = this.getOauth2Utils().getAccessToken(oath2Parameters);
        
        this.httpResponseStatusCode = getTokenMap().get(HTTP_RESPONSE_STATUS_CODE);
        
        String tempAccessToken = getTokenMap().get(ACCESS_TOKEN);
        if (getOauth2Utils().isValid(tempAccessToken))
           accessToken = tempAccessToken;
        String tempRefreshToken = getTokenMap().get(REFRESH_TOKEN);
        if (getOauth2Utils().isValid(tempRefreshToken))
           refreshToken = tempRefreshToken;
    }
    
    public void invalidateTokens() throws IOException{
        
    	tokenMap = this.getOauth2Utils().invalidateToken(oath2Parameters);
        
        this.httpResponseStatusCode = getTokenMap().get(HTTP_RESPONSE_STATUS_CODE);
        
    }   

    
    /**
     * @return the tokenMap
     */
    public Map<String, String> getTokenMap() {
        return tokenMap;
    }

    /**
     * @return the accessToken
     */
    public String getAccessToken() {
        return accessToken;
    }

    /**
     * @return the refreshToken
     */
    public String getRefreshToken() {
        return refreshToken;
    }

    public String getHttpResponseStatusCode() {
        return httpResponseStatusCode;
    }

    public void setHttpResponseStatusCode(String httpResponseStatusCode) {
        this.httpResponseStatusCode = httpResponseStatusCode;
    }
      
}
