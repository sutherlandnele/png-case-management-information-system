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
 * 
 */
public class MonthlyReport {

    private long id;
    private String month;
    private String year;
    private long total_in_cohort;
    private long red;
    private long orange;
    private long green;
    private long status_change_up;
    private long status_change_down;
    private String created_by;
    private String created_date;
    private String last_updated_by;
    private String last_updated_date;


    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public MonthlyReport() {
    }

    public MonthlyReport(long id, String month, String year, long total_in_cohort, long red, long orange, long green, long status_change_up, long status_change_down, String created_by, String created_date, String last_updated_by, String last_updated_date) {
        this.id = id;
        this.month = month;
        this.year = year;
        this.total_in_cohort = total_in_cohort;
        this.red = red;
        this.orange = orange;
        this.green = green;
        this.status_change_up = status_change_up;
        this.status_change_down = status_change_down;
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

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public long getTotal_in_cohort() {
        return total_in_cohort;
    }

    public void setTotal_in_cohort(long total_in_cohort) {
        this.total_in_cohort = total_in_cohort;
    }

    public long getRed() {
        return red;
    }

    public void setRed(long red) {
        this.red = red;
    }

    public long getOrange() {
        return orange;
    }

    public void setOrange(long orange) {
        this.orange = orange;
    }

    public long getGreen() {
        return green;
    }

    public void setGreen(long green) {
        this.green = green;
    }

    public long getStatus_change_up() {
        return status_change_up;
    }

    public void setStatus_change_up(long status_change_up) {
        this.status_change_up = status_change_up;
    }

    public long getStatus_change_down() {
        return status_change_down;
    }

    public void setStatus_change_down(long status_change_down) {
        this.status_change_down = status_change_down;
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
