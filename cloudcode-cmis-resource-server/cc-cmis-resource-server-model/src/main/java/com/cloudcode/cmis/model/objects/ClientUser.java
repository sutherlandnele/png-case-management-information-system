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
package com.cloudcode.cmis.model.objects;


/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class ClientUser extends User {

    private Integer clientId;

    public ClientUser() {
    }

    public ClientUser(Integer clientId) {
        this.clientId = clientId;
    }

    public ClientUser(Integer clientId, String id, String username, String password, String first_name, String last_name, String email, String roleId, String roleCode, boolean enabled) {
        super(id, username, password, first_name, last_name, email, roleId, roleCode, enabled);
        this.clientId = clientId;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }



    

    
}
