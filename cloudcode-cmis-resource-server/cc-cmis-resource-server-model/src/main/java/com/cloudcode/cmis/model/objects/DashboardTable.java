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
public class DashboardTable {

    private long id;
    private String client_code;
    private String ur_number;    
    private String first_name;
    private String last_name;
    private Integer case_worker_id;
    private String dsp;
    private String roe;
    private String fip;
    private String dsp_color_id;


    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public DashboardTable() {
    }

    public DashboardTable(long id, String client_code, String ur_number, String first_name, String last_name, Integer case_worker_id, String dsp, String roe, String fip, String dsp_color_id) {
        this.id = id;
        this.client_code = client_code;
        this.ur_number = ur_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.dsp = dsp;
        this.roe = roe;
        this.fip = fip;
        this.dsp_color_id = dsp_color_id;
        this.case_worker_id = case_worker_id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUr_number() {
        return ur_number;
    }

    public void setUr_number(String ur_number) {
        this.ur_number = ur_number;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getDsp() {
        return dsp;
    }

    public void setDsp(String dsp) {
        this.dsp = dsp;
    }

    public String getRoe() {
        return roe;
    }

    public void setRoe(String roe) {
        this.roe = roe;
    }

    public String getFip() {
        return fip;
    }

    public void setFip(String fip) {
        this.fip = fip;
    }

    public String getDsp_color_id() {
        return dsp_color_id;
    }

    public void setDsp_color_id(String dsp_color_id) {
        this.dsp_color_id = dsp_color_id;
    }

    public String getClient_code() {
        return client_code;
    }

    public void setClient_code(String client_code) {
        this.client_code = client_code;
    }

    public Integer getCase_worker_id() {
        return case_worker_id;
    }

    public void setCase_worker_id(Integer case_worker_id) {
        this.case_worker_id = case_worker_id;
    }

 
    
}
