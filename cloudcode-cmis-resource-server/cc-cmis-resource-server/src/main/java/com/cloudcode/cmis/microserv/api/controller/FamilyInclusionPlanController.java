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
import com.cloudcode.cmis.model.objects.FamilyInclusionPlan;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.sql.Types;
import java.util.List;
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
public class FamilyInclusionPlanController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(FamilyInclusionPlanController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public FamilyInclusionPlanController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * AdminGetFamilyInclusionPlans
     * @return
     * =========================================================================
     */
    @GetMapping("/fips")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity AdminGetFamilyInclusionPlans() throws Exception {
        
        List<FamilyInclusionPlan> fips = databaseDao.selectAll("api.cmis.family-inclusion-plans.get", FamilyInclusionPlan.class);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(fips), HttpStatus.OK);

    }
    
    /* ========================================================================
     * SrmGetFamilyInclusionPlans
     * @return
     * =========================================================================
     */
    @GetMapping("/fips/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetFamilyInclusionPlans(@PathVariable long caseWorkerId) throws Exception {
        
        List<FamilyInclusionPlan> fips = databaseDao.selectBy("api.cmis.family-inclusion-plans.get.srm", FamilyInclusionPlan.class, caseWorkerId);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(fips), HttpStatus.OK);

    }    
    
    /**
     * AdminCreateFamilyInclusionPlan
     * @param fipIn
     * @return
     * @throws Exception
     */
    @PostMapping("/fips")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin' )")
    public ResponseEntity<String> AdminCreateFamilyInclusionPlan(@RequestBody FamilyInclusionPlan fipIn) throws Exception {

        if (fipIn == null) {

            return new ResponseEntity<>(Common.toJSON("Family Inclusion Plan is null."), HttpStatus.BAD_REQUEST);
        }

        MapSqlParameterSource params = new MapSqlParameterSource()                
                .addValue("children_history", fipIn.getChildren_history())
                .addValue("case_worker_id", fipIn.getCase_worker_id())
                .addValue("client_id", fipIn.getClient_id())
                .addValue("created_by",getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("client_history",  fipIn.getClient_history())   
                .addValue("custody_legal_issues",  fipIn.getCustody_legal_issues())        
                .addValue("living_arrangement_support",  fipIn.getLiving_arrangement_support())   
                .addValue("relationship_status",  fipIn.getRelationship_status())   
                .addValue("spouse_history",  fipIn.getSpouse_history())
                .addValue("family_inclusion_resolution",  fipIn.getFamily_inclusion_resolution())                
                .addValue("last_updated_date",  fipIn.getLast_updated_date())                        
                .addValue("last_updated_by",  fipIn.getLast_updated_date());        

        try {

            long id = databaseDao.insert(params, "family_inclusion_plan", "id");
            fipIn.setId(id);
            mLogger.info("FIP with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");

            return new ResponseEntity<>(fipIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * SrmCreateFamilyInclusionPlan
     * @param fipIn
     * @param caseWorkerId
     * @return
     * @throws Exception
     */
    @PostMapping("/fips/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker' )")
    public ResponseEntity<String> SrmCreateFamilyInclusionPlan(@RequestBody FamilyInclusionPlan fipIn,@PathVariable long caseWorkerId ) throws Exception {

        if (fipIn == null) {

            return new ResponseEntity<>(Common.toJSON("Family Inclusion Plan is null."), HttpStatus.BAD_REQUEST);
        }
        
        if(!clientMangagedBySrm(fipIn.getClient_id(),caseWorkerId)){
            return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);            
        }
                

        MapSqlParameterSource params = new MapSqlParameterSource()                
                .addValue("children_history", fipIn.getChildren_history())
                .addValue("case_worker_id", fipIn.getCase_worker_id())
                .addValue("client_id", fipIn.getClient_id())
                .addValue("created_by",getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("client_history",  fipIn.getClient_history())   
                .addValue("custody_legal_issues",  fipIn.getCustody_legal_issues())        
                .addValue("living_arrangement_support",  fipIn.getLiving_arrangement_support())   
                .addValue("relationship_status",  fipIn.getRelationship_status())   
                .addValue("spouse_history",  fipIn.getSpouse_history())
                .addValue("family_inclusion_resolution",  fipIn.getFamily_inclusion_resolution())                
                .addValue("last_updated_date",  fipIn.getLast_updated_date())                        
                .addValue("last_updated_by",  fipIn.getLast_updated_date());        

        try {

            long id = databaseDao.insert(params, "family_inclusion_plan", "id");
            fipIn.setId(id);
            mLogger.info("FIP with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");

            return new ResponseEntity<>(fipIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * AdminUpdateFamilyInclusionPlan
     * @param fipIn
     * @param id
     * @return
     * @throws Exception
     */
    @PutMapping("/fips/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.case.worker' )")
    public ResponseEntity<String> AdminUpdateFamilyInclusionPlan(@RequestBody FamilyInclusionPlan fipIn,@PathVariable Long id) throws Exception {

        if (fipIn == null) {

            return new ResponseEntity<>(Common.toJSON("Family inclusion plan id is null."), HttpStatus.BAD_REQUEST);
        }

        Object fipParameters[] = {   
                fipIn.getChildren_history(),
                fipIn.getCase_worker_id(),
                fipIn.getClient_id(),
                fipIn.getCreated_by(),
                fipIn.getCreated_date(),
                fipIn.getClient_history(),  
                fipIn.getCustody_legal_issues(),    
                fipIn.getLiving_arrangement_support(),
                fipIn.getRelationship_status(),  
                fipIn.getSpouse_history(),    
                fipIn.getFamily_inclusion_resolution(),                
                getCurrentUsername(),    
                Common.todayString("yyyy-MM-dd HH:mm:ss"),                      
                id
         };
            
        int fipParameterTypes[] = {
            Types.VARCHAR,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.VARCHAR,            
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,            
            Types.INTEGER          
        };

        try {

            databaseDao.insert("api.cmis.family-inclusion-plans.put", fipParameters, fipParameterTypes);

            mLogger.info("Family inclusion plan : " + id + " updated successfully!");


            return new ResponseEntity<>(fipIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    /**
     * SrmUpdateFamilyInclusionPlan
     * @param fipIn
     * @param id
     * @param caseWorkerId
     * @return
     * @throws Exception
     */
    @PutMapping("/fips/{id}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.case.worker' )")
    public ResponseEntity<String> SrmUpdateFamilyInclusionPlan(@RequestBody FamilyInclusionPlan fipIn,@PathVariable Long id, @PathVariable long caseWorkerId) throws Exception {

        if (fipIn == null) {

            return new ResponseEntity<>(Common.toJSON("Family inclusion plan id is null."), HttpStatus.BAD_REQUEST);
        }
        
        if(!clientMangagedBySrm(fipIn.getClient_id(),caseWorkerId)){
            return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);            
        }
        
        Object fipParameters[] = {   
                fipIn.getChildren_history(),
                fipIn.getCase_worker_id(),
                fipIn.getClient_id(),
                fipIn.getCreated_by(),
                fipIn.getCreated_date(),
                fipIn.getClient_history(),  
                fipIn.getCustody_legal_issues(),    
                fipIn.getLiving_arrangement_support(),
                fipIn.getRelationship_status(),  
                fipIn.getSpouse_history(),    
                fipIn.getFamily_inclusion_resolution(),                
                getCurrentUsername(),    
                Common.todayString("yyyy-MM-dd HH:mm:ss"),                      
                id
         };
            
        int fipParameterTypes[] = {
            Types.VARCHAR,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.VARCHAR,            
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,            
            Types.INTEGER          
        };

        try {

            databaseDao.insert("api.cmis.family-inclusion-plans.put", fipParameters, fipParameterTypes);

            mLogger.info("Family inclusion plan : " + id + " updated successfully!");


            return new ResponseEntity<>(fipIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    @GetMapping("/fips/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica' )")
    public ResponseEntity<String> AdminGetClientFip(@PathVariable Long clientId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Fip not found."), HttpStatus.NOT_FOUND);
        }


        try {

           FamilyInclusionPlan fip  = (FamilyInclusionPlan) databaseDao.findById("api.cmis.family-inclusion-plans.get.clientId", FamilyInclusionPlan.class , clientId);
           
           if(fip == null){
                return new ResponseEntity<>(null, HttpStatus.OK);
           }
           return new ResponseEntity<>(fip.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

        
    @GetMapping("/fips/client/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client' )")
    public ResponseEntity<String> ClientGetClientFip(@PathVariable Long clientId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Fip not found."), HttpStatus.NOT_FOUND);
        }
        
        //TODO: Get client id from currently logged in userid and check if it is equal to "id". 


        try {

           FamilyInclusionPlan fip  = (FamilyInclusionPlan) databaseDao.findById("api.cmis.family-inclusion-plans.get.clientId", FamilyInclusionPlan.class , clientId);
           
           if(fip == null){
                return new ResponseEntity<>(null, HttpStatus.OK);
           }
           return new ResponseEntity<>(fip.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

           
    @GetMapping("/fips/{clientId}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker' )")
    public ResponseEntity<String> SrmGetClientFip(@PathVariable Long clientId, @PathVariable long caseWorkerId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Fip not found."), HttpStatus.NOT_FOUND);
        }
        
        //TODO: Get client id from currently logged in userid and check if it is equal to "id". 


        try {

           FamilyInclusionPlan fip  = (FamilyInclusionPlan) databaseDao.findById("api.cmis.family-inclusion-plans.get.clientId", FamilyInclusionPlan.class , clientId);
           
           if(fip == null){
                return new ResponseEntity<>(null, HttpStatus.OK);
           }
           
           if(fip.getCase_worker_id() != caseWorkerId){
                return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);   
           }
           
           
           return new ResponseEntity<>(fip.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

   
   
   
}
