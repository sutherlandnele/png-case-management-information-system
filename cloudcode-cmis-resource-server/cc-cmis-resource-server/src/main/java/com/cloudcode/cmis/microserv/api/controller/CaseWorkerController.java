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
import com.cloudcode.cmis.model.objects.CaseWorker;
import com.cloudcode.cmis.model.objects.CaseWorkerSearchParam;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.sql.Types;
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
public class CaseWorkerController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(CaseWorkerController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public CaseWorkerController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }


    /* ========================================================================
     * GetCaseWorkers
     * @return
     * =========================================================================
     */
    @GetMapping("/case-workers")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.case.worker')")
    public ResponseEntity GetCaseWorkers() throws Exception {
        
        List<CaseWorker> caseWorkers = databaseDao.selectAll("api.cmis.case-workers.get", CaseWorker.class);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(caseWorkers), HttpStatus.OK);

    }
    
    /**
     *
     * @param caseWorkerIn
     * @return
     * @throws Exception
     */
    @PostMapping("/case-workers")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> CreateCaseWorker(@RequestBody CaseWorker caseWorkerIn) throws Exception {

        if (caseWorkerIn == null) {

            return new ResponseEntity<>(Common.toJSON("Case worker is null."), HttpStatus.BAD_REQUEST);
        }

        MapSqlParameterSource params = new MapSqlParameterSource()         
                
                .addValue("address", caseWorkerIn.getAddress())
                .addValue("first_name", caseWorkerIn.getFirst_name())
                .addValue("second_name", caseWorkerIn.getSecond_name())
                .addValue("created_by",getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("mobile_number",  caseWorkerIn.getMobile_number())   
                .addValue("phone_number",  caseWorkerIn.getPhone_number())        
                .addValue("last_updated_date",  caseWorkerIn.getLast_updated_date())      
                .addValue("user_id",  caseWorkerIn.getUser_id())                       
                .addValue("last_updated_by",  caseWorkerIn.getLast_updated_date());         

        try {

            long id = databaseDao.insert(params, "case_worker", "id");
            caseWorkerIn.setId(id);
            mLogger.info("Case worker with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");

            return new ResponseEntity<>(caseWorkerIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
 
    /* ========================================================================
     * FindCaseWorkers
     * @return
     * =========================================================================
     */
    @PostMapping("/case-workers/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity FindCaseWorkers(@RequestBody CaseWorkerSearchParam caseWorkerSearchParam) throws Exception {
        
        List<CaseWorker> cws = databaseDao.selectAll("api.cmis.case-workers.get", CaseWorker.class);

       if (caseWorkerSearchParam != null) {
           if(caseWorkerSearchParam.getFirst_name() != null && !caseWorkerSearchParam.getFirst_name().isEmpty()){
                   cws = cws.stream().filter(p ->p.getFirst_name()!=null && p.getFirst_name().toUpperCase().contains(caseWorkerSearchParam.getFirst_name().toUpperCase())).collect(Collectors.toList());
           }
           
            if(caseWorkerSearchParam.getLast_name() != null && !caseWorkerSearchParam.getLast_name().isEmpty()){
                   cws = cws.stream().filter(p ->p.getSecond_name()!=null && p.getSecond_name().toUpperCase().contains(caseWorkerSearchParam.getLast_name().toUpperCase())).collect(Collectors.toList());
           }
        
        }        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(cws), HttpStatus.OK);

    }
    

    @PutMapping("/case-workers/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> UpdateCaseWorker(@RequestBody CaseWorker caseWorkerIn,@PathVariable Long id) throws Exception {

        if (caseWorkerIn == null) {

            return new ResponseEntity<>(Common.toJSON("Case worker is null."), HttpStatus.BAD_REQUEST);
        }

        Object caseWorkersParameters[] = {   
                caseWorkerIn.getAddress(),
                caseWorkerIn.getFirst_name(),
                caseWorkerIn.getSecond_name(),
                caseWorkerIn.getCreated_by(),
                caseWorkerIn.getCreated_date(),
                caseWorkerIn.getMobile_number(),  
                caseWorkerIn.getPhone_number(),    
                getCurrentUsername(),    
                Common.todayString("yyyy-MM-dd HH:mm:ss"),  
                caseWorkerIn.getUser_id(),
                id
         };
            
        int caseWorkersParameterTypes[] = {
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

            databaseDao.insert("api.cmis.case-workers.put", caseWorkersParameters, caseWorkersParameterTypes);

            mLogger.info("Case worker : " + id + " updated successfully!");


            return new ResponseEntity<>(caseWorkerIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }    
    
    @GetMapping("/case-workers/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin','cmis.api.server.role.ica')")
    public ResponseEntity<String> AdminGetClientCaseWorker(@PathVariable Long clientId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Case worker not found."), HttpStatus.NOT_FOUND);
        }


        try {

           CaseWorker cw = (CaseWorker) databaseDao.findById("api.cmis.case-workers.get.clientId", CaseWorker.class , clientId);
           
           return new ResponseEntity<>(cw.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/case-workers/{clientId}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity<String> SrmGetClientCaseWorker(@PathVariable Long clientId, @PathVariable long caseWorkerId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Case worker not found."), HttpStatus.NOT_FOUND);
        }


        try {

           CaseWorker cw = (CaseWorker) databaseDao.findById("api.cmis.case-workers.get.clientId", CaseWorker.class , clientId);
           
           if(cw.getId() != caseWorkerId){
              return new ResponseEntity<>(Common.toJSON("SRM cannot view SRM info. Access forbidden."), HttpStatus.FORBIDDEN);              
           }
           
           return new ResponseEntity<>(cw.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/case-workers/client/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client' )")
    public ResponseEntity<String> ClientGetClientCaseWorker(@PathVariable Long clientId) throws Exception {

        if (clientId == 0) {
            return new ResponseEntity<>(Common.toJSON("Case worker not found."), HttpStatus.NOT_FOUND);
        }
        
        //TODO: Get client id from currently logged in userid and check if it is equal to "id". 

        try {

           CaseWorker cw = (CaseWorker) databaseDao.findById("api.cmis.case-workers.get.clientId", CaseWorker.class , clientId);
           
           return new ResponseEntity<>(cw.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
