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
public class DashboardTableSearchParam {
    
    private String client_code;
    private String first_name;
    private String last_name;
    private String ur_number;
    private String dsp_color_id;


    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public DashboardTableSearchParam() {
    }

    public DashboardTableSearchParam(String client_code, String first_name, String last_name, String ur_number, String dsp_color_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.ur_number = ur_number;
        this.dsp_color_id = dsp_color_id;
        this.client_code = client_code;
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

    public String getUr_number() {
        return ur_number;
    }

    public void setUr_number(String ur_number) {
        this.ur_number = ur_number;
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
    

}
