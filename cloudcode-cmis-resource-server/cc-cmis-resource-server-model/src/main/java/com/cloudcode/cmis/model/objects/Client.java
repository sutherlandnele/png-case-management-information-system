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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.gson.Gson;
import java.util.Date;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
public class Client {

    private long id;
    private String client_code;
    private String first_name;
    private String last_name;
    private String mobile_number;    
    private String email;
    private String phone_number;
    private String address;    
    private String date_of_birth;
    private Integer language_id;
    private Integer gender_id;    
    private Integer country_id;
    private Integer rsd_status_id;
    private Integer marital_status_id;    
    private String visa_number;
    private Integer assigned_case_worker_id;
    private String ur_number;    
    private String user_id;
    private String created_by;
    private String created_date;
    private String last_updated_by;
    private String last_updated_date;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public Client() {
    }

    public Client(long id, String client_code, String first_name, String last_name, String mobile_number, String email, String phone_number, String address, String date_of_birth, Integer language_id, Integer gender_id, Integer country_id, Integer rsd_status_id, Integer marital_status_id, String visa_number, Integer assigned_case_worker_id, String ur_number,String user_id, String created_by, String created_date, String last_updated_by, String last_updated_date) {
        this.id = id;
        this.client_code = client_code;
        this.first_name = first_name;
        this.last_name = last_name;
        this.mobile_number = mobile_number;
        this.email = email;
        this.phone_number = phone_number;
        this.address = address;
        this.date_of_birth = date_of_birth;
        this.language_id = language_id;
        this.gender_id = gender_id;
        this.country_id = country_id;
        this.rsd_status_id = rsd_status_id;
        this.marital_status_id = marital_status_id;
        this.visa_number = visa_number;
        this.assigned_case_worker_id = assigned_case_worker_id;
        this.ur_number = ur_number;
        this.user_id = user_id;
        this.created_by = created_by;
        this.created_date = created_date;
        this.last_updated_by = last_updated_by;
        this.last_updated_date = last_updated_date;
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

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getMobile_number() {
        return mobile_number;
    }

    public void setMobile_number(String mobile_number) {
        this.mobile_number = mobile_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public Integer getLanguage_id() {
        return language_id;
    }

    public void setLanguage_id(Integer language_id) {
        this.language_id = language_id;
    }

    public Integer getGender_id() {
        return gender_id;
    }

    public void setGender_id(Integer gender_id) {
        this.gender_id = gender_id;
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

    public Integer getMarital_status_id() {
        return marital_status_id;
    }

    public void setMarital_status_id(Integer marital_status_id) {
        this.marital_status_id = marital_status_id;
    }

    public String getVisa_number() {
        return visa_number;
    }

    public void setVisa_number(String visa_number) {
        this.visa_number = visa_number;
    }

    public Integer getAssigned_case_worker_id() {
        return assigned_case_worker_id;
    }

    public void setAssigned_case_worker_id(Integer assigned_case_worker_id) {
        this.assigned_case_worker_id = assigned_case_worker_id;
    }

    public String getUr_number() {
        return ur_number;
    }

    public void setUr_number(String ur_number) {
        this.ur_number = ur_number;
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

    public String getClient_code() {
        return client_code;
    }

    public void setClient_code(String client_code) {
        this.client_code = client_code;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    
}
