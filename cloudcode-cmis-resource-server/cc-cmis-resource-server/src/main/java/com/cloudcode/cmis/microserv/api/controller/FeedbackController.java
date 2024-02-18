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
import com.cloudcode.cmis.microserv.common.Common;
import com.cloudcode.cmis.model.objects.Feedback;
import com.cloudcode.cmis.model.objects.FeedbackSearchParam;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
public class FeedbackController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(FeedbackController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public FeedbackController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * AdminGetFeedbacks
     * @return
     * =========================================================================
     */
    @GetMapping("/feedbacks")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity AdminGetFeedbacks() throws Exception {
        
        List<Feedback> fb = databaseDao.selectAll("api.cmis.feedbacks.get", Feedback.class);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(fb), HttpStatus.OK);

    }
    
    /* ========================================================================
     * SrmGetFeedbacks
     * @return
     * =========================================================================
     */
    @GetMapping("/feedbacks/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetFeedbacks(@PathVariable long caseWorkerId) throws Exception {
        
        List<Feedback> fb = databaseDao.selectBy("api.cmis.feedbacks.get.srm", Feedback.class, caseWorkerId);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(fb), HttpStatus.OK);

    }
    
    
    
    /**
     * CreateFeedback
     * @param feedbackIn
     * @return
     * @throws Exception
     */
    @PostMapping("/feedbacks")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client')")
    public ResponseEntity<String> CreateFeedback(@RequestBody Feedback feedbackIn) throws Exception {

        if (feedbackIn == null) {

            return new ResponseEntity<>(Common.toJSON("Feedback is null."), HttpStatus.BAD_REQUEST);
        }

        MapSqlParameterSource params = new MapSqlParameterSource()                
                .addValue("text", feedbackIn.getText())
                .addValue("client_id", feedbackIn.getClient_id())
                .addValue("case_worker_id",feedbackIn.getCase_worker_id());        

        try {

            long id = databaseDao.insert(params, "feedback", "id");
            feedbackIn.setId(id);
            mLogger.info("Feedback with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");

            return new ResponseEntity<>(feedbackIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    @PostMapping("/feedbacks/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity AdminFindFeedbacks(@RequestBody FeedbackSearchParam searchParamIn) throws Exception {
        
        List<Feedback> rs = databaseDao.selectAll("api.cmis.feedbacks.get", Feedback.class);   
        Date from_date = Common.formatStringToDate(searchParamIn.getFrom_date());
        Date to_date = Common.formatStringToDate(searchParamIn.getTo_date());

       if (searchParamIn != null) {
        
           if(searchParamIn.getClient_id()!= null){
                   rs = rs.stream().filter(p -> (p.getClient_id() != null && p.getClient_id().intValue() == searchParamIn.getClient_id().intValue())).collect(Collectors.toList());
           }             
           
           if(searchParamIn.getCase_worker_id()!= null){
                   rs = rs.stream().filter(p -> p.getCase_worker_id()!=null && p.getCase_worker_id().intValue() == searchParamIn.getCase_worker_id().intValue()).collect(Collectors.toList());
           } 
           
           if(from_date != null){
                rs = rs.stream().filter(p -> Common.formatStringToDate(p.getCreated_date()).compareTo(from_date) >= 0).collect(Collectors.toList()); 
           }
           
           if(to_date != null){
                rs = rs.stream().filter(p -> Common.formatStringToDate(p.getCreated_date()).compareTo(to_date) <= 0).collect(Collectors.toList()); 
           }
         
        }        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(rs), HttpStatus.OK);

    }
    
    
    @PostMapping("/feedbacks/srm/{caseWorkerId}/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmFindFeedbacks(@RequestBody FeedbackSearchParam searchParamIn, @PathVariable long caseWorkerId) throws Exception {
        
        List<Feedback> rs = databaseDao.selectBy("api.cmis.feedbacks.get.srm", Feedback.class, caseWorkerId);   
        Date from_date = Common.formatStringToDate(searchParamIn.getFrom_date());
        Date to_date = Common.formatStringToDate(searchParamIn.getTo_date());

       if (searchParamIn != null) {
        
           if(searchParamIn.getClient_id()!= null){
                   rs = rs.stream().filter(p -> (p.getClient_id() != null && p.getClient_id().intValue() == searchParamIn.getClient_id().intValue())).collect(Collectors.toList());
           }             
           
           if(from_date != null){
                rs = rs.stream().filter(p -> Common.formatStringToDate(p.getCreated_date()).compareTo(from_date) >= 0).collect(Collectors.toList()); 
           }
           
           if(to_date != null){
                rs = rs.stream().filter(p -> Common.formatStringToDate(p.getCreated_date()).compareTo(to_date) <= 0).collect(Collectors.toList()); 
           }
         
        }        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(rs), HttpStatus.OK);

    }



    

}
