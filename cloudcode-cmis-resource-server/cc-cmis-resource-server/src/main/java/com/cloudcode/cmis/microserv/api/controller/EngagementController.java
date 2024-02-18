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
import com.cloudcode.cmis.model.objects.Engagement;
import com.cloudcode.cmis.model.objects.EngagementSearchParam;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.sql.Types;
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
import org.springframework.web.bind.annotation.PutMapping;
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
public class EngagementController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(EngagementController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public EngagementController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * AdminGetAllEngagements
     * @return
     * =========================================================================
     */
    @GetMapping("/engagements")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin','cmis.api.server.role.ica')")
    public ResponseEntity AdminGetAllEngagements() throws Exception {

        List<Engagement> engagements = databaseDao.selectAll("api.cmis.engagements.get", Engagement.class);

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(engagements), HttpStatus.OK);

    }
    
    /* ========================================================================
     * SrmGetAllEngagements
     * @return
     * =========================================================================
     */
    @GetMapping("/engagements/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetAllEngagements(@PathVariable long caseWorkerId) throws Exception {

        List<Engagement> engagements = databaseDao.selectBy("api.cmis.engagements.get.srm", Engagement.class, caseWorkerId);

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(engagements), HttpStatus.OK);

    }    
    
    

    /* ========================================================================
     * AdminGetClientEnagements By clientId
     * @return
     * =========================================================================
     */
    @GetMapping("/engagements/clients/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica' )")
    public ResponseEntity AdminGetClientEnagements(@PathVariable Long clientId) throws Exception {

        List<Engagement> engagements = databaseDao.selectBy("api.cmis.engagements.get.clientId", Engagement.class, clientId);

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(engagements), HttpStatus.OK);

    }


    /* ========================================================================
     * ClientGetClientEnagements By clientId
     * @return
     * =========================================================================
     */
    @GetMapping("/engagements/clients/client/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client')")
    public ResponseEntity ClientGetClientEnagements(@PathVariable Long clientId) throws Exception {

        List<Engagement> engagements = databaseDao.selectBy("api.cmis.engagements.get.clientId", Engagement.class, clientId);

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(engagements), HttpStatus.OK);

    }
        
    /* ========================================================================
     * SrmGetClientEnagements By clientId
     * @return
     * =========================================================================
     */
    @GetMapping("/engagements/clients/{clientId}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority( 'cmis.api.server.role.case.worker' )")
    public ResponseEntity SrmGetClientEnagements(@PathVariable Long clientId, @PathVariable long caseWorkerId) throws Exception {

        List<Engagement> engagements = databaseDao.selectBy("api.cmis.engagements.get.clientId", Engagement.class, clientId);
        
        engagements = engagements.stream().filter(p -> p.getCase_worker_id()!=null && p.getCase_worker_id() == caseWorkerId).collect(Collectors.toList());
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(engagements), HttpStatus.OK);

    }
    

    /**
     *
     * @param engagementIn
     * @return
     * @throws Exception
     */
    @PostMapping("/engagements")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> AdminCreateEngagement(@RequestBody Engagement engagementIn) throws Exception {

        if (engagementIn == null) {

            return new ResponseEntity<>(Common.toJSON("Engagement is null."), HttpStatus.BAD_REQUEST);
        }

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("actions_and_ownership", engagementIn.getActions_and_ownership())
                .addValue("case_worker_id", engagementIn.getCase_worker_id())
                .addValue("client_id", engagementIn.getClient_id())
                .addValue("created_by", getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("engagement_discussion", engagementIn.getEngagement_discussion())
                .addValue("engagement_purpose", engagementIn.getEngagement_purpose())
                .addValue("last_updated_by", engagementIn.getLast_updated_by())
                .addValue("last_updated_date", engagementIn.getLast_updated_date())
                .addValue("next_appointment_date_time", engagementIn.getNext_appointment_date_time());

        try {

            long id = databaseDao.insert(params, "engagement", "id");
            engagementIn.setId(id);
            mLogger.info("Engagement with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");
            return new ResponseEntity<>(engagementIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    
    
    /**
     * SrmCreateEngagement
     * @param engagementIn
     * @param caseWorkerId
     * @return
     * @throws Exception
     */
    @PostMapping("/engagements/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity<String> SrmCreateEngagement(@RequestBody Engagement engagementIn, @PathVariable long caseWorkerId) throws Exception {

        if (engagementIn == null) {

            return new ResponseEntity<>(Common.toJSON("Engagement is null."), HttpStatus.BAD_REQUEST);
        }
        
        if(!clientMangagedBySrm(engagementIn.getClient_id(),caseWorkerId)){
            return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);            
        }

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("actions_and_ownership", engagementIn.getActions_and_ownership())
                .addValue("case_worker_id", engagementIn.getCase_worker_id())
                .addValue("client_id", engagementIn.getClient_id())
                .addValue("created_by", getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("engagement_discussion", engagementIn.getEngagement_discussion())
                .addValue("engagement_purpose", engagementIn.getEngagement_purpose())
                .addValue("last_updated_by", engagementIn.getLast_updated_by())
                .addValue("last_updated_date", engagementIn.getLast_updated_date())
                .addValue("next_appointment_date_time", engagementIn.getNext_appointment_date_time());

        try {

            long id = databaseDao.insert(params, "engagement", "id");
            engagementIn.setId(id);
            mLogger.info("Engagement with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");
            return new ResponseEntity<>(engagementIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * AdminUpdateEngagement
     * @param engagementIn
     * @param id
     * @return
     * @throws Exception
     */    
    @PutMapping("/engagements/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')") //engagement update can only be done by admin per req
    public ResponseEntity<String> AdminUpdateEngagement(@RequestBody Engagement engagementIn, @PathVariable Long id) throws Exception {

        if (engagementIn == null) {

            return new ResponseEntity<>(Common.toJSON("Engagement is null."), HttpStatus.BAD_REQUEST);
        }

        Object engagementParameters[] = {
            engagementIn.getActions_and_ownership(),
            engagementIn.getCase_worker_id(),
            engagementIn.getCreated_by(),
            engagementIn.getCreated_date(),
            engagementIn.getClient_id(),
            engagementIn.getEngagement_discussion(),
            engagementIn.getEngagement_purpose(),
            getCurrentUsername(),
            Common.todayString("yyyy-MM-dd HH:mm:ss"),
            engagementIn.getNext_appointment_date_time(),
            id
        };

        int engagementParameterTypes[] = {
            Types.VARCHAR,
            Types.INTEGER,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.INTEGER,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.INTEGER
        };

        try {

            databaseDao.insert("api.cmis.engagements.put", engagementParameters, engagementParameterTypes);

            mLogger.info("Engagement : " + id + " updated successfully!");

            return new ResponseEntity<>(engagementIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    
   /* ========================================================================
    * AdminFindEngagements
    * @return
    * =========================================================================
    */
    @PostMapping("/engagements/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica')")
    public ResponseEntity AdminFindEngagements(@RequestBody EngagementSearchParam searchParams) throws Exception {
        
        Date from_date = Common.formatStringToDate(searchParams.getFrom_date());
        Date to_date = Common.formatStringToDate(searchParams.getTo_date());

        List<Engagement> rs = databaseDao.selectAll("api.cmis.engagements.get", Engagement.class);

       if (searchParams != null) {
           
           
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
    

   /* SrmFindEngagements
    * AdminFindEngagements
    * @return
    * =========================================================================
    */
    @PostMapping("/engagements/srm/{caseWorkerId}/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmFindEngagements(@RequestBody EngagementSearchParam searchParams, @PathVariable long caseWorkerId) throws Exception {
        
        Date from_date = Common.formatStringToDate(searchParams.getFrom_date());
        Date to_date = Common.formatStringToDate(searchParams.getTo_date());

        List<Engagement> rs = databaseDao.selectBy("api.cmis.engagements.get.srm", Engagement.class, caseWorkerId);

       if (searchParams != null) {
           
           
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
    
        
   /* ========================================================================
    * AdminFindEngagementsForClient
    * @return
    * =========================================================================
    */
    @PostMapping("/engagements/{clientId}/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica')")
    public ResponseEntity AdminFindEngagementsForClient(@RequestBody EngagementSearchParam searchParams, @PathVariable long clientId) throws Exception {
        
        Date from_date = Common.formatStringToDate(searchParams.getFrom_date());
        Date to_date = Common.formatStringToDate(searchParams.getTo_date());

        List<Engagement> rs = databaseDao.selectBy("api.cmis.engagements.get.clientId", Engagement.class, clientId);

       if (searchParams != null) {
           
           
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
    
  
        
   /* ========================================================================
    * SrmFindEngagementsForClient
    * @return
    * =========================================================================
    */
    @PostMapping("/engagements/{clientId}/srm/{caseWorkerId}/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmFindEngagementsForClient(@RequestBody EngagementSearchParam searchParams, @PathVariable long clientId) throws Exception {
        
        Date from_date = Common.formatStringToDate(searchParams.getFrom_date());
        Date to_date = Common.formatStringToDate(searchParams.getTo_date());

        List<Engagement> rs = databaseDao.selectBy("api.cmis.engagements.get.clientId", Engagement.class, clientId);

       if (searchParams != null) {
           
           
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
      
    
    
    
    
   /* ========================================================================
    * AdminGetEngagementById
    * @return
    * =========================================================================
    */
    @GetMapping("/engagements/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica')")
    public ResponseEntity AdminGetEngagementById(@PathVariable long id) throws Exception {


        Engagement e = (Engagement) databaseDao.findById("api.cmis.engagements.get.id", Engagement.class, id);    
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(e), HttpStatus.OK);
    }
    
   /* ========================================================================
    * SrmGetEngagementById
    * @return
    * =========================================================================
    */
    @GetMapping("/engagements/{id}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetEngagementById(@PathVariable long id, @PathVariable long caseWorkerId) throws Exception {


        Engagement e = (Engagement) databaseDao.findById("api.cmis.engagements.get.id", Engagement.class, id);    
        
        if(e.getCase_worker_id() != caseWorkerId){
            return new ResponseEntity<>(Common.toJSON("SRM cannot view engagement record."), HttpStatus.FORBIDDEN);            
        }
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(e), HttpStatus.OK);
    }    
   /* ========================================================================
    * ClientGetEngagementById
    * @return
    * =========================================================================
    */
    @GetMapping("/engagements/{id}/client/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client')")
    public ResponseEntity ClientGetEngagementById(@PathVariable long id, @PathVariable long clientId) throws Exception {


        Engagement e = (Engagement) databaseDao.findById("api.cmis.engagements.get.id", Engagement.class, id); 
        
        if(e.getClient_id() != clientId){
            return new ResponseEntity<>(Common.toJSON("Client cannot view engagement record."), HttpStatus.FORBIDDEN);            
        }
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(e), HttpStatus.OK);
    }
    
    
   
}
