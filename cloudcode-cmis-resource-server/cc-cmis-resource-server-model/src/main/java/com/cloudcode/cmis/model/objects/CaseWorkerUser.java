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

import com.google.gson.Gson;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class CaseWorkerUser extends User {

    private Integer caseWorkerId;

    public CaseWorkerUser() {
    }

    public CaseWorkerUser(Integer caseWorkerId) {
        this.caseWorkerId = caseWorkerId;
    }

    public CaseWorkerUser(Integer caseWorkerId, String id, String username, String password, String first_name, String last_name, String email, String roleId, String roleCode, boolean enabled) {
        super(id, username, password, first_name, last_name, email, roleId, roleCode, enabled);
        this.caseWorkerId = caseWorkerId;
    }

    public Integer getCaseWorkerId() {
        return caseWorkerId;
    }

    public void setCaseWorkerId(Integer caseWorkerId) {
        this.caseWorkerId = caseWorkerId;
    }


    

    
}
