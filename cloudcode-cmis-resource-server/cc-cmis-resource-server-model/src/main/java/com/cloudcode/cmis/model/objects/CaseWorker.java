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
import java.util.Date;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class CaseWorker {

    private long id;
    private String first_name;
    private String second_name;
    private String mobile_number;
    private String phone_number;
    private String address;
    private String created_by;
    private String created_date;
    private String last_updated_by;
    private String last_updated_date;
    private String user_id;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public CaseWorker() {
    }

    public CaseWorker(long id, String first_name, String second_name, String mobile_number, String phone_number, String address, String created_by, String created_date, String last_updated_by, String last_updated_date,String user_id) {
        this.id = id;
        this.first_name = first_name;
        this.second_name = second_name;
        this.mobile_number = mobile_number;
        this.phone_number = phone_number;
        this.address = address;
        this.created_by = created_by;
        this.created_date = created_date;
        this.last_updated_by = last_updated_by;
        this.last_updated_date = last_updated_date;
        this.user_id = user_id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getSecond_name() {
        return second_name;
    }

    public void setSecond_name(String second_name) {
        this.second_name = second_name;
    }

    public String getMobile_number() {
        return mobile_number;
    }

    public void setMobile_number(String mobile_number) {
        this.mobile_number = mobile_number;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }

    public String getLast_updated_by() {
        return last_updated_by;
    }

    public void setLast_updated_by(String last_updated_by) {
        this.last_updated_by = last_updated_by;
    }

    public String getLast_updated_date() {
        return last_updated_date;
    }

    public void setLast_updated_date(String last_updated_date) {
        this.last_updated_date = last_updated_date;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    
   
    
}
