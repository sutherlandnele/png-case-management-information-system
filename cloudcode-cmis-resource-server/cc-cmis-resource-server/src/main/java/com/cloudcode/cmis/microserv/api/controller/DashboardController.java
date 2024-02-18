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

import com.cloudcode.cmis.microserv.common.Common;
import com.google.gson.Gson;
import com.cloudcode.datagenerics.GenericDatabaseDAO;
import com.cloudcode.cmis.model.objects.DashboardTable;
import com.cloudcode.cmis.model.objects.DashboardTableSearchParam;
import com.cloudcode.cmis.model.objects.MonthlyReport;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.sql.Types;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class DashboardController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(DashboardController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public DashboardController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * GetDashboardSummary
     * @return
     * =========================================================================
     */
    @GetMapping("/dashboards/summary")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin','cmis.api.server.role.case.worker','cmis.api.server.role.ica')")
    public ResponseEntity GetDashboardSummary() throws Exception {
        
        String currentYear = Common.todayString("yyyy");
        String currentMonth = Common.todayString("MM");
        
        
        Object parameters[] = {
                currentMonth,
                currentYear
         };
            
        int parameterTypes[] = {
            Types.VARCHAR,
            Types.VARCHAR      
        };
        
        List<MonthlyReport> mr = databaseDao.selectBy("api.cmis.dashboards.summary.get", MonthlyReport.class, parameters, parameterTypes);
        
        Gson gson = new Gson();

        
        if(!mr.isEmpty()){
          return new ResponseEntity<>(gson.toJson(mr.get(0)), HttpStatus.OK);
        }            
       
        return new ResponseEntity<>(Common.toJSON("Summary not found."), HttpStatus.NOT_FOUND);

    }
    
    /* ========================================================================
     * AdminGetDashboardTable
     * @return
     * =========================================================================
     */
    @GetMapping("/dashboards/table")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica')")
    public ResponseEntity AdminGetDashboardTable() throws Exception {
        
        List<DashboardTable> dt = databaseDao.selectAll("api.cmis.dashboards.table.get", DashboardTable.class);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(dt), HttpStatus.OK);

    }
    /* ========================================================================
     * SrmGetDashboardTable
     * @return
     * =========================================================================
     */
    @GetMapping("/dashboards/table/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetDashboardTable(@PathVariable long caseWorkerId) throws Exception {
        
        List<DashboardTable> dt = databaseDao.selectBy("api.cmis.dashboards.table.get.srm", DashboardTable.class, caseWorkerId);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(dt), HttpStatus.OK);

    }
        
    /* ========================================================================
     * AdminFindDashboardTableData
     * @return
     * =========================================================================
     */
    @PostMapping("/dashboards/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.ica')")
    public ResponseEntity AdminFindDashboardTableData(@RequestBody DashboardTableSearchParam searchParams) throws Exception {
        
        List<DashboardTable> rs = databaseDao.selectAll("api.cmis.dashboards.table.get", DashboardTable.class);

       if (searchParams != null) {
           
           
           if(searchParams.getFirst_name() != null && !searchParams.getFirst_name().isEmpty()){
                   rs = rs.stream().filter(p ->p.getFirst_name()!=null && p.getFirst_name().toUpperCase().contains(searchParams.getFirst_name().toUpperCase())).collect(Collectors.toList());
           }
           
            if(searchParams.getLast_name() != null && !searchParams.getLast_name().isEmpty()){
                   rs = rs.stream().filter(p ->p.getLast_name()!=null && p.getLast_name().toUpperCase().contains(searchParams.getLast_name().toUpperCase())).collect(Collectors.toList());
           }
           if(searchParams.getClient_code()!= null && !searchParams.getClient_code().isEmpty()){
                   rs = rs.stream().filter(p -> p.getClient_code() !=null && p.getClient_code().toUpperCase().contains(searchParams.getClient_code().toUpperCase())).collect(Collectors.toList());
           }   
           if(searchParams.getUr_number() != null && !searchParams.getUr_number().isEmpty()){
                   rs = rs.stream().filter(p -> p.getUr_number() !=null && p.getUr_number().toUpperCase().contains(searchParams.getUr_number().toUpperCase())).collect(Collectors.toList());
           }   
           
            if(searchParams.getDsp_color_id() != null && !searchParams.getDsp_color_id().isEmpty()){
                rs = rs.stream().filter(p -> p.getDsp_color_id() !=null && p.getDsp_color_id().toUpperCase().equals(searchParams.getDsp_color_id().toUpperCase()))  .collect(Collectors.toList());
            } 
        }        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(rs), HttpStatus.OK);

    }

    /* ========================================================================
     * SrmFindDashboardTableData
     * @return
     * =========================================================================
     */
    @PostMapping("/dashboards/find/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    
    public ResponseEntity SrmFindDashboardTableData(@RequestBody DashboardTableSearchParam searchParams, @PathVariable long caseWorkerId) throws Exception {
        
        List<DashboardTable> rs = databaseDao.selectBy("api.cmis.dashboards.table.get.srm", DashboardTable.class, caseWorkerId);    

       if (searchParams != null) {
           
           
           if(searchParams.getFirst_name() != null && !searchParams.getFirst_name().isEmpty()){
                   rs = rs.stream().filter(p ->p.getFirst_name()!=null && p.getFirst_name().toUpperCase().contains(searchParams.getFirst_name().toUpperCase())).collect(Collectors.toList());
           }
           
            if(searchParams.getLast_name() != null && !searchParams.getLast_name().isEmpty()){
                   rs = rs.stream().filter(p ->p.getLast_name()!=null && p.getLast_name().toUpperCase().contains(searchParams.getLast_name().toUpperCase())).collect(Collectors.toList());
           }
           if(searchParams.getClient_code()!= null && !searchParams.getClient_code().isEmpty()){
                   rs = rs.stream().filter(p -> p.getClient_code() !=null && p.getClient_code().toUpperCase().contains(searchParams.getClient_code().toUpperCase())).collect(Collectors.toList());
           }   
           if(searchParams.getUr_number() != null && !searchParams.getUr_number().isEmpty()){
                   rs = rs.stream().filter(p -> p.getUr_number() !=null && p.getUr_number().toUpperCase().contains(searchParams.getUr_number().toUpperCase())).collect(Collectors.toList());
           }   
           
            if(searchParams.getDsp_color_id() != null && !searchParams.getDsp_color_id().isEmpty()){
                rs = rs.stream().filter(p -> p.getDsp_color_id() !=null && p.getDsp_color_id().toUpperCase().equals(searchParams.getDsp_color_id().toUpperCase()))  .collect(Collectors.toList());
            } 
        }        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(rs), HttpStatus.OK);

    }

      

}
