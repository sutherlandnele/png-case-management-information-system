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
public class FeedbackSearchParam {

    private Integer client_id;
    private Integer case_worker_id;
    private String from_date;
    private String to_date;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public FeedbackSearchParam() {
    }

    public FeedbackSearchParam(Integer client_id, Integer case_worker_id, String from_date, String to_date) {
        this.client_id = client_id;
        this.case_worker_id = case_worker_id;
        this.from_date = from_date;
        this.to_date = to_date;
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

    public String getFrom_date() {
        return from_date;
    }

    public void setFrom_date(String from_date) {
        this.from_date = from_date;
    }

    public String getTo_date() {
        return to_date;
    }

    public void setTo_date(String to_date) {
        this.to_date = to_date;
    }


}
