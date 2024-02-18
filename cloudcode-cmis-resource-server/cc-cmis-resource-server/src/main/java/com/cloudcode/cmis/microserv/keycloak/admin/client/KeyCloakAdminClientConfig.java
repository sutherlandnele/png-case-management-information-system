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
package com.cloudcode.cmis.microserv.keycloak.admin.client;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * 
 */
@Configuration
public class KeyCloakAdminClientConfig {

   
    @Value("${keycloak.admin.server.url}")
    String serverUrl;
    @Value("${keycloak.admin.realm}")            
    String realm;
    @Value("${keycloak.admin.client-id}")            
    String clientId;
    @Value("${keycloak.admin.client-secret}")            
    String clientSecret;
    @Value("${keycloak.admin.username}")            
    String username;
    @Value("${keycloak.admin.password}")            
    String password;   

    
    @Bean(name="keycloak")
    public Keycloak keycloak()
    {                
        return KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.PASSWORD)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .username(username)
                .password(password) 
                .resteasyClient(ResteasyClientBuilder.newBuilder().build())
                .build();
    }   
    
    @Bean(name="realmResource") 
    public RealmResource realmResource(){
            return this.keycloak().realm(this.realm);
    }
    
    @Bean(name="usersResource") 
    public UsersResource usersResource(){
            return this.realmResource().users();
    }
    
    @Bean(name="clientRep") 
    public ClientRepresentation clientRep() {
        return realmResource().clients().findByClientId(this.clientId).get(0);
    }
    
}
