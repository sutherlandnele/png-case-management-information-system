/*
 * ************************************************************************
 * Cloudcode PNG Limited Case Management Information System Version 1.0.0
 * ************************************************************************
 * Copyright (c) 2021 Cloudcode PNG Limited
 * ************************************************************************
 * CC Case Management Resource Server Restful API - Microservice for Case Management System
 * Support: Sutherland Nele sutherland.nele@cloudcode.com.pg
 * V01.00.00 
 * ************************************************************************
 */
package com.cloudcode.cmis.microserv.api.controller;
import com.cloudcode.cmis.model.objects.Client;
import com.cloudcode.common.utils.logging.LogWrapper;
import com.cloudcode.datagenerics.GenericDatabaseDAO;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Types;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;


/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 *
 */
public class BaseController {
    private static final LogWrapper mLogger = LogWrapper.getInstance(BaseController.class);
    
    private final GenericDatabaseDAO databaseDao;
    private final String LOCALHOST_IPV4 = "127.0.0.1";
    private final String LOCALHOST_IPV6 = "0:0:0:0:0:0:0:1";

    public BaseController(GenericDatabaseDAO dbDao) {
        this.databaseDao = dbDao;
    }
    protected String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }

        if (StringUtils.isEmpty(ipAddress) || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if (LOCALHOST_IPV4.equals(ipAddress) || LOCALHOST_IPV6.equals(ipAddress)) {
                try {
                    InetAddress inetAddress = InetAddress.getLocalHost();
                    ipAddress = inetAddress.getHostAddress();
                } catch (UnknownHostException e) {
                    mLogger.error(e.getMessage());
                }
            }
        }

        if (!StringUtils.isEmpty(ipAddress)
                && ipAddress.length() > 15
                && ipAddress.indexOf(",") > 0) {
            ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
        }

        return ipAddress;
    }
    protected String getCurrentUsername() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
        
        
//      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//      String name = auth.getName(); //get logged in username
//		
//      return name;
    }

    
        
    protected boolean clientMangagedBySrm(long clientId, long srmId) {

        Object params[] = {
            clientId,
            srmId
        };

        int paramTypes[] = {
            Types.INTEGER,
            Types.INTEGER,};

        List<Client> clients = databaseDao.selectBy("api.cmis.clients.get.isSrmClient", Client.class, params, paramTypes);

        if (!clients.isEmpty()) {
            return true;
        }

        return false;
    }
    
 
}
