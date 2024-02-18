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
public class Feedback {

    private long id;
    private String text;
    private String created_date;
    private Integer client_id;
    private Integer case_worker_id;
    
    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public Feedback() {
    }

    public Feedback(long id, String text, String created_date, Integer client_id, Integer case_worker_id) {
        this.id = id;
        this.text = text;
        this.created_date = created_date;
        this.client_id = client_id;
        this.case_worker_id = case_worker_id;
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

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }

    public Integer getClient_id() {
        return client_id;
    }

    public void setClient_id(Integer client_id) {
        this.client_id = client_id;
    }

    public Integer getCase_worker_id() {
        return case_worker_id;
    }

    public void setCase_worker_id(Integer case_worker_id) {
        this.case_worker_id = case_worker_id;
    }


    
}
