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

import java.util.List;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class EnabledUserClientRoles {
    

    private String userId;
    private List<EnabledRole> enabledRoles;

    public EnabledUserClientRoles( String userId, List<EnabledRole> enabledRoles) {
        this.userId = userId;
        this.enabledRoles = enabledRoles;
    }

    public EnabledUserClientRoles() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<EnabledRole> getEnabledRoles() {
        return enabledRoles;
    }

    public void setEnabledRoles(List<EnabledRole> enabledRoles) {
        this.enabledRoles = enabledRoles;
    }

   

  
    

}
