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
import com.cloudcode.cmis.model.objects.CurrentDSPTotal;
import com.cloudcode.cmis.model.objects.DurableSolutionPathway;
import com.cloudcode.cmis.model.objects.MonthlyReport;
import com.cloudcode.cmis.model.objects.Reference;
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
public class DurableSolutionPathwayController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(DurableSolutionPathwayController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public DurableSolutionPathwayController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * AdminGetPathways
     * @return
     * =========================================================================
     */
    @GetMapping("/pathways")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity AdminGetPathways() throws Exception {
        
        List<DurableSolutionPathway> dsps = databaseDao.selectAll("api.cmis.pathways.get", DurableSolutionPathway.class);    
       
        Gson gson = new Gson();
        
        return new ResponseEntity<>(gson.toJson(dsps), HttpStatus.OK);

    }

    /* ========================================================================
     * SrmGetPathways
     * @return
     * =========================================================================
     */
    @GetMapping("/pathways/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetPathways(@PathVariable long caseWorkerId) throws Exception {
        
        List<DurableSolutionPathway> dsps = databaseDao.selectBy("api.cmis.pathways.get.srm", DurableSolutionPathway.class, caseWorkerId);    
       
        Gson gson = new Gson();
        
        return new ResponseEntity<>(gson.toJson(dsps), HttpStatus.OK);

    }    
    
    /**
     * AdminCreateDurableSolutionPathway
     * @param pathwayIn
     * @return
     * @throws Exception
     */
    @PostMapping("/pathways")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> AdminCreateDurableSolutionPathway(@RequestBody DurableSolutionPathway pathwayIn) throws Exception {

        if (pathwayIn == null) {

            return new ResponseEntity<>(Common.toJSON("Pathway is null."), HttpStatus.BAD_REQUEST);
        }
        


        MapSqlParameterSource params = new MapSqlParameterSource()                
                .addValue("barriers_and_solutions", pathwayIn.getBarriers_and_solutions())
                .addValue("case_worker_id", pathwayIn.getCase_worker_id())
                .addValue("client_id", pathwayIn.getClient_id())
                .addValue("created_by",getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("durable_solution_discussion",  pathwayIn.getDurable_solution_discussion())   
                .addValue("durable_solution_id",  pathwayIn.getDurable_solution_id())        
                .addValue("phsyco_social_summary",  pathwayIn.getPhsyco_social_summary())      
                .addValue("last_updated_date",  pathwayIn.getLast_updated_date())                        
                .addValue("last_updated_by",  pathwayIn.getLast_updated_date());        

        try {

            long id = databaseDao.insert(params, "durable_solution_pathway", "id");
            pathwayIn.setId(id);
            mLogger.info("DSP with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");
            
            //always call after dsp updated/created
            ValidateAndUpdateMonthlyReport(null, pathwayIn);


            return new ResponseEntity<>(pathwayIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * SrmCreateDurableSolutionPathway
     * @param pathwayIn
     * @param caseWorkerId
     * @return
     * @throws Exception
     */
    @PostMapping("/pathways/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker' )")
    public ResponseEntity<String> SrmCreateDurableSolutionPathway(@RequestBody DurableSolutionPathway pathwayIn, @PathVariable long caseWorkerId) throws Exception {

        if (pathwayIn == null) {

            return new ResponseEntity<>(Common.toJSON("Pathway is null."), HttpStatus.BAD_REQUEST);
        }
        
        if(!clientMangagedBySrm(pathwayIn.getClient_id(),caseWorkerId)){
            return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);            
        }
        


        MapSqlParameterSource params = new MapSqlParameterSource()                
                .addValue("barriers_and_solutions", pathwayIn.getBarriers_and_solutions())
                .addValue("case_worker_id", pathwayIn.getCase_worker_id())
                .addValue("client_id", pathwayIn.getClient_id())
                .addValue("created_by",getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("durable_solution_discussion",  pathwayIn.getDurable_solution_discussion())   
                .addValue("durable_solution_id",  pathwayIn.getDurable_solution_id())        
                .addValue("phsyco_social_summary",  pathwayIn.getPhsyco_social_summary())      
                .addValue("last_updated_date",  pathwayIn.getLast_updated_date())                        
                .addValue("last_updated_by",  pathwayIn.getLast_updated_date());        

        try {

            long id = databaseDao.insert(params, "durable_solution_pathway", "id");
            pathwayIn.setId(id);
            mLogger.info("DSP with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");
            
            //always call after dsp updated/created
            ValidateAndUpdateMonthlyReport(null, pathwayIn);


            return new ResponseEntity<>(pathwayIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * AdminUpdateDurableSolutionPathway
     * @param pathwayIn
     * @param id
     * @return
     * @throws Exception
     */
    
    @PutMapping("/pathways/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> AdminUpdateDurableSolutionPathway(@RequestBody DurableSolutionPathway pathwayIn,@PathVariable Long id) throws Exception {

        if (pathwayIn == null) {

            return new ResponseEntity<>(Common.toJSON("Pathway is null."), HttpStatus.BAD_REQUEST);
        }


         //get previous dsp values for comparision b4 updating
         DurableSolutionPathway prevDsp = GetDurableSolutionPathway(id);

        
        Object pathwayParameters[] = {
                pathwayIn.getBarriers_and_solutions(),
                pathwayIn.getCase_worker_id(),
                pathwayIn.getClient_id(),
                pathwayIn.getCreated_by(),
                pathwayIn.getCreated_date(),
                pathwayIn.getDurable_solution_discussion(),  
                pathwayIn.getDurable_solution_id(),    
                pathwayIn.getPhsyco_social_summary(),
                getCurrentUsername(),    
                Common.todayString("yyyy-MM-dd HH:mm:ss"),                      
                id
         };
            
        int pathwayParameterTypes[] = {
            Types.VARCHAR,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.INTEGER,           
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.INTEGER          
        };

        try {

            databaseDao.insert("api.cmis.pathways.put", pathwayParameters, pathwayParameterTypes);

            mLogger.info("Durable solution pathway : " + id + " updated successfully!");
            
            //always call after dsp updated/created
            ValidateAndUpdateMonthlyReport(prevDsp, pathwayIn);

           
            return new ResponseEntity<>(pathwayIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    
    /**
     * SrmUpdateDurableSolutionPathway
     * @param pathwayIn
     * @param id
     * @param caseWorkerId
     * @return
     * @throws Exception
     */
    
    @PutMapping("/pathways/{id}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity<String> SrmUpdateDurableSolutionPathway(@RequestBody DurableSolutionPathway pathwayIn,@PathVariable Long id, @PathVariable Long caseWorkerId) throws Exception {

        if (pathwayIn == null) {

            return new ResponseEntity<>(Common.toJSON("Pathway is null."), HttpStatus.BAD_REQUEST);
        }

        if(!clientMangagedBySrm(pathwayIn.getClient_id(),caseWorkerId)){
            return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);            
        }

         //get previous dsp values for comparision b4 updating
         DurableSolutionPathway prevDsp = GetDurableSolutionPathway(id);

        
        Object pathwayParameters[] = {
                pathwayIn.getBarriers_and_solutions(),
                pathwayIn.getCase_worker_id(),
                pathwayIn.getClient_id(),
                pathwayIn.getCreated_by(),
                pathwayIn.getCreated_date(),
                pathwayIn.getDurable_solution_discussion(),  
                pathwayIn.getDurable_solution_id(),    
                pathwayIn.getPhsyco_social_summary(),
                getCurrentUsername(),    
                Common.todayString("yyyy-MM-dd HH:mm:ss"),                      
                id
         };
            
        int pathwayParameterTypes[] = {
            Types.VARCHAR,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.INTEGER,           
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.INTEGER          
        };

        try {

            databaseDao.insert("api.cmis.pathways.put", pathwayParameters, pathwayParameterTypes);

            mLogger.info("Durable solution pathway : " + id + " updated successfully!");
            
            //always call after dsp updated/created
            ValidateAndUpdateMonthlyReport(prevDsp, pathwayIn);

           
            return new ResponseEntity<>(pathwayIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    @GetMapping("/pathways/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica' )")
    public ResponseEntity<String> AdminGetClientDsp(@PathVariable Long clientId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Pathway not found."), HttpStatus.NOT_FOUND);
        }


        try {

           DurableSolutionPathway dsp = (DurableSolutionPathway) databaseDao.findById("api.cmis.pathways.get.clientId", DurableSolutionPathway.class , clientId);
           
           if(dsp == null){
                return new ResponseEntity<>(null, HttpStatus.OK);
           }
           
           return new ResponseEntity<>(dsp.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
     
    
    @GetMapping("/pathways/{clientId}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity<String> SrmGetClientDsp(@PathVariable Long clientId, @PathVariable long caseWorkerId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Pathway not found."), HttpStatus.NOT_FOUND);
        }


        try {

           DurableSolutionPathway dsp = (DurableSolutionPathway) databaseDao.findById("api.cmis.pathways.get.clientId", DurableSolutionPathway.class , clientId);
           
           if(dsp == null){
                return new ResponseEntity<>(null, HttpStatus.OK);
           }
           
           if(dsp.getCase_worker_id() != caseWorkerId){
            return new ResponseEntity<>(Common.toJSON("Client not managed by SRM. Access forbidden."), HttpStatus.FORBIDDEN);    
           }
           
           return new ResponseEntity<>(dsp.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
     
    @GetMapping("/pathways/client/{clientId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client' )")
    public ResponseEntity<String> ClientGetClientDsp(@PathVariable Long clientId) throws Exception {

        if (clientId == 0) {

            return new ResponseEntity<>(Common.toJSON("Pathway not found."), HttpStatus.NOT_FOUND);
        }


        try {

           DurableSolutionPathway dsp = (DurableSolutionPathway) databaseDao.findById("api.cmis.pathways.get.clientId", DurableSolutionPathway.class , clientId);
           
            //TODO: Get client id from currently logged in userid and check if it is equal to "id". 

           
           if(dsp == null){
                return new ResponseEntity<>(null, HttpStatus.OK);
           }
           
           return new ResponseEntity<>(dsp.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private void ValidateAndUpdateMonthlyReport(DurableSolutionPathway prevDsp, DurableSolutionPathway newDsp){
  

        String prevDspStateColor = null;

        if (prevDsp != null) {

            prevDspStateColor = prevDsp.getDurable_solution_id() == null ? null : GetDspStateColorFromRef(prevDsp.getDurable_solution_id());
        }

        String newDspStateColor = newDsp.getDurable_solution_id() == null ? null : GetDspStateColorFromRef(newDsp.getDurable_solution_id());
        
        MonthlyReport mrToUpdate = GetCurrentMonthlyReport();

        Boolean isNewMrCreated = false;

        if (mrToUpdate == null) {
            mrToUpdate = CreateNewMonthlyReport();
            isNewMrCreated = true;
        }

        if (mrToUpdate != null) {

            Character nextStepIndicator = GetDspStatusChangeResult(prevDspStateColor, newDspStateColor);

            switch (nextStepIndicator) {
                case 'U':
                    mrToUpdate.setStatus_change_up(mrToUpdate.getStatus_change_up() + 1);
                    break;
                case 'D':
                    mrToUpdate.setStatus_change_down(mrToUpdate.getStatus_change_down() + 1);
                    break;
                default:
                    break;
            }

            if (!isNewMrCreated) {
                CurrentDSPTotal cdt = GetCurrentDSPTotal();
                mrToUpdate.setGreen(cdt.getGreen());
                mrToUpdate.setRed(cdt.getRed());
                mrToUpdate.setOrange(cdt.getOrange());
                mrToUpdate.setTotal_in_cohort(cdt.getTotal());
            }

            UpdateMonthlyReport(mrToUpdate);

        }
        else{
            
            mLogger.error("Could not update monthly report as there was no report to update");
        }
    }
    
    private MonthlyReport CreateNewMonthlyReport(){
        
            CurrentDSPTotal cdt = GetCurrentDSPTotal();

            
            if(cdt != null){
                
                MonthlyReport mr = new MonthlyReport();

                String currentYear = Common.todayString("yyyy");
                String currentMonth = Common.todayString("MM");
                
                mr.setCreated_by("super_user");
                mr.setCreated_date(Common.todayString("yyyy-MM-dd HH:mm:ss"));
                mr.setMonth(currentMonth);
                mr.setYear(currentYear);
                mr.setRed(cdt.getRed());
                mr.setOrange(cdt.getOrange());
                mr.setGreen(cdt.getGreen());
                mr.setStatus_change_down(0);
                mr.setStatus_change_up(0);
                mr.setTotal_in_cohort(cdt.getTotal());
                
                MapSqlParameterSource params = new MapSqlParameterSource()                
                    .addValue("month", currentMonth)
                    .addValue("year", currentYear)
                    .addValue("total_in_cohort", cdt.getTotal())
                    .addValue("red",cdt.getRed())
                    .addValue("orange", cdt.getOrange())
                    .addValue("green",  cdt.getGreen())   
                    .addValue("status_change_up",  0)        
                    .addValue("status_change_down",  0)    
                    .addValue("created_by", "super_user")                       
                    .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss")); 
                
                try{
                    
                    long id = databaseDao.insert(params, "monthly_report", "id");
                    mr.setId(id);
                    mLogger.info("Monthly report with Id: " + id + " created successfully!");
                    
                    return mr;
                }
                catch(Exception ex){
                    mLogger.error(ex.getMessage());
                    return null;
                }                
            }      
            else
            {
                mLogger.error("Can't create monthly report because there is no data!");
            }
            return null;
    } 

    private void UpdateMonthlyReport(MonthlyReport mr) {
        
        if (mr == null) {

            mLogger.error("Monthly report is null");
            return;
        }

        Object parameters[] = {
            mr.getMonth(),
            mr.getYear(),
            mr.getTotal_in_cohort(),
            mr.getRed(),
            mr.getOrange(),
            mr.getGreen(),
            mr.getStatus_change_up(),
            mr.getStatus_change_down(),
            "super_user",
            Common.todayString("yyyy-MM-dd HH:mm:ss"),
            mr.getId()
        };

        int parameterTypes[] = {
            Types.VARCHAR,
            Types.VARCHAR,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,    
            Types.VARCHAR,           
            Types.INTEGER
        };

        try {

            databaseDao.insert("cmis.monthly.report.update", parameters, parameterTypes);

            mLogger.info("Monthly report : " + mr.getId() + " updated successfully!");


        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
        }
    }

    private Character GetDspStatusChangeResult(String prevState, String newState){
        
        Character up = 'U';
        Character down = 'D';
        Character ignore = 'I';
        
        //Ups
        if(prevState == null && "ORANGE".equals(newState)){
            return up;
        }
        if("RED".equals(prevState) && "ORANGE".equals(newState)){
            return up;
        }
               
        if("ORANGE".equals(prevState) && "GREEN".equals(newState)){
            return up;
        }
        if("RED".equals(prevState) && "GREEN".equals(newState)){
            return up;
        }
        
        if(prevState == null && "GREEN".equals(newState)){
            return up;
        }        
        
        //Downs
        if("ORANGE".equals(prevState) && "RED".equals(newState)){
            return down;
        }
                
        if("GREEN".equals(prevState) && "ORANGE".equals(newState)){
            return down;
        }
        
        if("GREEN".equals(prevState) && "RED".equals(newState)){
            return down;
        }
        
        if("GREEN".equals(prevState) && newState == null){
            return down;
        }    
        
        if("ORANGE".equals(prevState) && newState == null){
            return down;
        }          

        return ignore;    
        
    }

    private String GetDspStateColorFromRef(long ref_dsp_id){
        
        Reference ref = (Reference) databaseDao.findById("cmis.ref.get.id", Reference.class, ref_dsp_id);
        
        if(ref == null){
            return null;
        }
        
        return ref.getText().trim().toUpperCase();        
    }  
     
    private MonthlyReport GetCurrentMonthlyReport() {

        String currentYear = Common.todayString("yyyy");
        String currentMonth = Common.todayString("MM");

        Object parameters[] = {
            currentYear,
            currentMonth
        };

        int parameterTypes[] = {
            Types.VARCHAR,
            Types.VARCHAR,};

        List<MonthlyReport> mr = databaseDao.selectBy("cmis.monthly.report.get.current", MonthlyReport.class, parameters, parameterTypes);

        if (mr.isEmpty()) {
            return null;
        }

        return mr.get(0);

    }
    
    private DurableSolutionPathway GetDurableSolutionPathway(long dsp_id){
        
        DurableSolutionPathway dsp = (DurableSolutionPathway) databaseDao.findById("cmis.dsp.get.id", DurableSolutionPathway.class, dsp_id);
        
        if(dsp == null){
            return null;
        }
        
        return dsp;
    }
    
    private CurrentDSPTotal GetCurrentDSPTotal(){
        
       List<CurrentDSPTotal> dspStatusTotalsList = databaseDao.selectAll("cmis.dsp.totals.get", CurrentDSPTotal.class);  
       
       if(dspStatusTotalsList.isEmpty()){
           return null;
       }
       
       return dspStatusTotalsList.get(0); 
    }
    
}
