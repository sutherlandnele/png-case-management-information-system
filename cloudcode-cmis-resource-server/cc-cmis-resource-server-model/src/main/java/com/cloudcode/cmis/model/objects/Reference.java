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
 * 
 */
public class Reference {

    private long id;
    private String text;
    private String description;
    private String kind_code;
    private String email;

    public Reference() {
        
    }

    public Reference(long id, String text, String description, String kind_code, String email) {
        this.id = id;
        this.text = text;
        this.description = description;
        this.kind_code = kind_code;
        this.email = email;
    }
    
    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKind_code() {
        return kind_code;
    }

    public void setKind_code(String kind_code) {
        this.kind_code = kind_code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    
    
    
}
