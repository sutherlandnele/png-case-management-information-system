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

package com.cloudcode.cmis.microserv.api.controller;

import com.google.gson.Gson;
import com.cloudcode.datagenerics.GenericDatabaseDAO;
import com.cloudcode.cmis.model.objects.Reference;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 *
 */
@RestController
@PropertySource("classpath:datamanager.properties")
@RequestMapping("/api/cmis")
public class ReferenceController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(ReferenceController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public ReferenceController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * GetReferences
     * @return
     * =========================================================================
     */
    @GetMapping("/references")
    @CrossOrigin(origins = "*")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity GetReferences() throws Exception {
        
        List<Reference> refs = databaseDao.selectAll("api.cmis.references.get", Reference.class);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(refs), HttpStatus.OK);

    }

    

}
