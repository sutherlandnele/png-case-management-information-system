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
public class Engagement {

    private long id;
    private Integer client_id;
    private Integer case_worker_id;
    private String engagement_purpose;
    private String engagement_discussion;
    private String actions_and_ownership;
    private String next_appointment_date_time;    
    private String created_by;
    private String created_date;
    private String last_updated_by;
    private String last_updated_date;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public Engagement() {
    }

    public Engagement(long id, Integer client_id, Integer case_worker_id, String engagement_purpose, String engagement_discussion, String actions_and_ownership, String next_appointment_date_time, String created_by, String created_date, String last_updated_by, String last_updated_date) {
        this.id = id;
        this.client_id = client_id;
        this.case_worker_id = case_worker_id;
        this.engagement_purpose = engagement_purpose;
        this.engagement_discussion = engagement_discussion;
        this.actions_and_ownership = actions_and_ownership;
        this.next_appointment_date_time = next_appointment_date_time;
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

    public String getEngagement_purpose() {
        return engagement_purpose;
    }

    public void setEngagement_purpose(String engagement_purpose) {
        this.engagement_purpose = engagement_purpose;
    }

    public String getEngagement_discussion() {
        return engagement_discussion;
    }

    public void setEngagement_discussion(String engagement_discussion) {
        this.engagement_discussion = engagement_discussion;
    }

    public String getActions_and_ownership() {
        return actions_and_ownership;
    }

    public void setActions_and_ownership(String actions_and_ownership) {
        this.actions_and_ownership = actions_and_ownership;
    }

    public String getNext_appointment_date_time() {
        return next_appointment_date_time;
    }

    public void setNext_appointment_date_time(String next_appointment_date_time) {
        this.next_appointment_date_time = next_appointment_date_time;
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


    
}
