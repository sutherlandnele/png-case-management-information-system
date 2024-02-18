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
public class ClientSearchParam {

    private String client_code;
    private String first_name;
    private String last_name;
    private Integer country_id;
    private Integer rsd_status_id;
    private String ur_number;
    private Integer dsp_status_id;


    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public ClientSearchParam() {
    }

    public ClientSearchParam(String client_code,String first_name, String last_name, Integer country_id, Integer rsd_status_id, String ur_number, Integer dsp_status_id) {
        this.client_code = client_code;
        this.first_name = first_name;
        this.last_name = last_name;
        this.country_id = country_id;
        this.rsd_status_id = rsd_status_id;
        this.ur_number = ur_number;
        this.dsp_status_id = dsp_status_id;
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


    public Integer getCountry_id() {
        return country_id;
    }

    public void setCountry_id(Integer country_id) {
        this.country_id = country_id;
    }

    public Integer getRsd_status_id() {
        return rsd_status_id;
    }

    public void setRsd_status_id(Integer rsd_status_id) {
        this.rsd_status_id = rsd_status_id;
    }



    public Integer getDsp_status_id() {
        return dsp_status_id;
    }

    public void setDsp_status_id(Integer dsp_status_id) {
        this.dsp_status_id = dsp_status_id;
    }

    public String getUr_number() {
        return ur_number;
    }

    public void setUr_number(String ur_number) {
        this.ur_number = ur_number;
    }

    public String getClient_code() {
        return client_code;
    }

    public void setClient_code(String client_code) {
        this.client_code = client_code;
    }
    
}
