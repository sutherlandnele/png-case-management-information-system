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
public class CurrentDSPTotal {

    private long red;
    private long orange;
    private long green;
    private long total;


    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public CurrentDSPTotal() {
    }

    public CurrentDSPTotal(long red, long orange, long green, long total) {
        this.red = red;
        this.orange = orange;
        this.green = green;
        this.total = total;
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

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
    
}
