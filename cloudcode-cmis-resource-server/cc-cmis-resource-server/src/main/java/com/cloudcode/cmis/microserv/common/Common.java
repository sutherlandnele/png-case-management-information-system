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
package com.cloudcode.cmis.microserv.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 */
@Service
public class Common {

    

    
    public static String TIMEZONE_CITY;

    @Value("${timezone.city}")
    public void setStaticTimeZoneCity(String name){
        Common.TIMEZONE_CITY = name;
    }
    

    public static boolean isNothing(String value) {
        try {
            if (value == null || value.isEmpty() || value.length() == 0) {
                return true;
            }
        } catch (Exception ex) {
            return true;
        }

        return false;
    }

    public static <T> T CheckNullAndReturn(T value, T defaultValue) {
        if (value == null) {
            return defaultValue;
        }

        return value;
    }
    



    /**
     * =========================================================================
     *
     * @param obj
     * @return
     * =========================================================================
     */
    public static String toJSON(Object obj) {
       Gson gson = new GsonBuilder().create();
       return gson.toJson(obj);
    }
    
    /**
     * 
     * @param inputString
     * @param length
     * @return 
     */

    public static String padLeftZeros(String inputString, int length) {
        
        if (inputString.length() >= length) {
            return inputString;
        }
        
        StringBuilder sb = new StringBuilder();
        
        while (sb.length() < length - inputString.length()) {
            sb.append('0');
        }
        
        sb.append(inputString);

        return sb.toString();
    }
    
    public static String nullIfEmpty(String dt){
        if(dt.isEmpty()){
            return null;
        }
        return dt;
    }
    
    public static String formatDateToString(Date dt, String format){
        
        if(dt == null ){
            return null;
        }
        SimpleDateFormat sformat = new SimpleDateFormat(format);
        sformat.setLenient(true);        
        sformat.setTimeZone(TimeZone.getTimeZone(Common.TIMEZONE_CITY));

    
        return sformat.format(dt);
    }
    
    
    
    //list of possible date formats
    private static final String[] formats = {
        "yyyy-MM-dd'T'HH:mm:ss'Z'", 
        "yyyy-MM-dd'T'HH:mm:ssZ",
        "yyyy-MM-dd'T'HH:mm:ss", 
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
        "yyyy-MM-dd'T'HH:mm:ss.SSSZ", 
        "yyyy-MM-dd HH:mm:ss",
        "MM/dd/yyyy HH:mm:ss", 
        "MM/dd/yyyy'T'HH:mm:ss.SSS'Z'",
        "MM/dd/yyyy'T'HH:mm:ss.SSSZ", 
        "MM/dd/yyyy'T'HH:mm:ss.SSS",
        "MM/dd/yyyy'T'HH:mm:ssZ", 
        "MM/dd/yyyy'T'HH:mm:ss",
        "yyyy:MM:dd HH:mm:ss", 
        "yyyyMMdd",
        "yyyy-MM-dd"
    };
    
    
    private static String GetDateFormat(String dt) {
        if (dt != null && !dt.isEmpty()) {
             String parsedFormat = "";

            for (String parse : formats) {
                SimpleDateFormat sdf = new SimpleDateFormat(parse);
                try {
                    sdf.parse(dt);
                    parsedFormat = parse;
                } catch (ParseException e) {
                  //System.console().printf(e.getMessage());
                }
            }
            if(!parsedFormat.isEmpty()){
                return parsedFormat;
            }
            
            return null;
        }
        return null;
    }
    
    public static Date formatStringToDate(String dt) {
        
        if(dt == null || dt.isEmpty()){
            return null;
        }
        
        String parseFormat = GetDateFormat(dt);
        
        SimpleDateFormat sformat = new SimpleDateFormat(parseFormat);
        //sformat.setLenient(true);        
        //sformat.setTimeZone(TimeZone.getTimeZone(Common.TIMEZONE_CITY));
        
        try{
            return sformat.parse(dt);
        }
        catch(Exception ex) {
            return null;
        }
    }

    
//    public static Date formatStringToDate(String dt, String format) {
//        
//        if(dt == null || dt.isEmpty()){
//            return null;
//        }
//        
//        SimpleDateFormat sformat = new SimpleDateFormat(format);
//        sformat.setLenient(true);        
//        sformat.setTimeZone(TimeZone.getTimeZone(Common.TIMEZONE_CITY));
//        
//        try{
//            return sformat.parse(dt);
//        }
//        catch(Exception ex) {
//            return null;
//        }
//    }
    
    public static String todayString(String format){
        
        Date nowUTC = new Date();
 
        return formatDateToString(nowUTC,format);
    }

}
