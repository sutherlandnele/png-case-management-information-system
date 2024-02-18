/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloudcode.cmis.microserv.authorise.authenticate;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class OAuth2Parameters {
        
    private String client_id;
    private String client_secret;
    private String username;
    private String password;
    private String authenticationServer;
    private String grantType;
    private String scope;
    private String refreshToken;

    
    public OAuth2Parameters(String client_id,
                            String client_secret,
                            String username,
                            String password,
                            String authenticationServer,
                            String grantType,
                            String scope){
                            this.client_id = client_id;
                            this.client_secret = client_secret;
                            this.username = username;
                            this.password = password;
                            this.authenticationServer = authenticationServer;
                            this.grantType= grantType;
                            this.scope = scope;    
    }
    
    public OAuth2Parameters(String authenticationServer, String refreshToken, String clientId, String clientSecret){
        this.client_id = clientId;
        this.client_secret = clientSecret;
        this.authenticationServer = authenticationServer;
        this.refreshToken = refreshToken;
    }
    
    /**
     * @return the client_id
     */
    public String getClient_id() {
        return client_id;
    }

    /**
     * @param client_id the client_id to set
     */
    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    /**
     * @return the client_secret
     */
    public String getClient_secret() {
        return client_secret;
    }

    /**
     * @param client_secret the client_secret to set
     */
    public void setClient_secret(String client_secret) {
        this.client_secret = client_secret;
    }

    /**
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the authenticationServer
     */
    public String getAuthenticationServer() {
        return authenticationServer;
    }

    /**
     * @param authenticationServer the authenticationServer to set
     */
    public void setAuthenticationServer(String authenticationServer) {
        this.authenticationServer = authenticationServer;
    }

    /**
     * @return the grantType
     */
    public String getGrantType() {
        return grantType;
    }

    /**
     * @param grantType the grantType to set
     */
    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    /**
     * @return the scope
     */
    public String getScope() {
        return scope;
    }

    /**
     * @param scope the scope to set
     */
    public void setScope(String scope) {
        this.scope = scope;
    }


    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    
}
