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
import com.cloudcode.cmis.model.objects.Client;
import com.cloudcode.cmis.model.objects.ClientSearchParam;
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
public class ClientController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(ClientController.class);

    private final GenericDatabaseDAO databaseDao;

    @Autowired
    public ClientController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* ========================================================================
     * AdminGetClients
     * @return
     * =========================================================================
     */
    @GetMapping("/clients")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity AdminGetClients() throws Exception {
        
       
        List<Client> clients = databaseDao.selectAll("api.cmis.clients.get", Client.class);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(clients), HttpStatus.OK);

    }
    
    /* ========================================================================
     * SrmGetClients
     * @return
     * =========================================================================
     */
    @GetMapping("/clients/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmGetClients(@PathVariable long caseWorkerId) throws Exception {
        
       
        List<Client> clients = databaseDao.selectBy("api.cmis.clients.get.srm", Client.class, caseWorkerId);    
       
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(clients), HttpStatus.OK);

    }
    
    /* ========================================================================
     * AdminFindClients
     * @return
     * =========================================================================
     */
    @PostMapping("/clients/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity AdminFindClients(@RequestBody ClientSearchParam clientSearchParamIn) throws Exception {
        
        List<Client> clients = databaseDao.selectAll("api.cmis.clients.get", Client.class);

       if (clientSearchParamIn != null) {
           if(clientSearchParamIn.getFirst_name() != null && !clientSearchParamIn.getFirst_name().isEmpty()){
                   clients = clients.stream().filter(p ->p.getFirst_name()!=null && p.getFirst_name().toUpperCase().contains(clientSearchParamIn.getFirst_name().toUpperCase())).collect(Collectors.toList());
           }
           
            if(clientSearchParamIn.getLast_name() != null && !clientSearchParamIn.getLast_name().isEmpty()){
                   clients = clients.stream().filter(p ->p.getLast_name()!=null && p.getLast_name().toUpperCase().contains(clientSearchParamIn.getLast_name().toUpperCase())).collect(Collectors.toList());
           }
            if(clientSearchParamIn.getClient_code()!= null && !clientSearchParamIn.getClient_code().isEmpty()){
                   clients = clients.stream().filter(p ->p.getClient_code()!=null && p.getClient_code().toUpperCase().contains(clientSearchParamIn.getClient_code().toUpperCase())).collect(Collectors.toList());
           }            
            if(clientSearchParamIn.getCountry_id() != null){
                   clients = clients.stream().filter(p -> p.getCountry_id()!=null && p.getCountry_id().intValue() == clientSearchParamIn.getCountry_id().intValue()).collect(Collectors.toList());
           }             
           if(clientSearchParamIn.getRsd_status_id() != null){
                   clients = clients.stream().filter(p -> p.getRsd_status_id() !=null && p.getRsd_status_id().intValue() == clientSearchParamIn.getRsd_status_id().intValue()).collect(Collectors.toList());
           } 
           if(clientSearchParamIn.getUr_number() != null && !clientSearchParamIn.getUr_number().isEmpty()){
                   clients = clients.stream().filter(p -> p.getUr_number() !=null && p.getUr_number().toUpperCase().contains(clientSearchParamIn.getUr_number().toUpperCase())).collect(Collectors.toList());
           }            
        }        
        
        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(clients), HttpStatus.OK);

    }
    
    /* ========================================================================
     * SrmFindClients
     * @return
     * =========================================================================
     */    
    @PostMapping("/clients/srm/{caseWorkerId}/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity SrmFindClients(@RequestBody ClientSearchParam clientSearchParamIn, @PathVariable long caseWorkerId) throws Exception {
        
        List<Client> clients = databaseDao.selectBy("api.cmis.clients.get.srm", Client.class,caseWorkerId);

       if (clientSearchParamIn != null) {
           if(clientSearchParamIn.getFirst_name() != null && !clientSearchParamIn.getFirst_name().isEmpty()){
                   clients = clients.stream().filter(p ->p.getFirst_name()!=null && p.getFirst_name().toUpperCase().contains(clientSearchParamIn.getFirst_name().toUpperCase())).collect(Collectors.toList());
           }
           
            if(clientSearchParamIn.getLast_name() != null && !clientSearchParamIn.getLast_name().isEmpty()){
                   clients = clients.stream().filter(p ->p.getLast_name()!=null && p.getLast_name().toUpperCase().contains(clientSearchParamIn.getLast_name().toUpperCase())).collect(Collectors.toList());
           }
            if(clientSearchParamIn.getClient_code()!= null && !clientSearchParamIn.getClient_code().isEmpty()){
                   clients = clients.stream().filter(p ->p.getClient_code()!=null && p.getClient_code().toUpperCase().contains(clientSearchParamIn.getClient_code().toUpperCase())).collect(Collectors.toList());
           }            
            if(clientSearchParamIn.getCountry_id() != null){
                   clients = clients.stream().filter(p -> p.getCountry_id()!=null && p.getCountry_id().intValue() == clientSearchParamIn.getCountry_id().intValue()).collect(Collectors.toList());
           }             
           if(clientSearchParamIn.getRsd_status_id() != null){
                   clients = clients.stream().filter(p -> p.getRsd_status_id() !=null && p.getRsd_status_id().intValue() == clientSearchParamIn.getRsd_status_id().intValue()).collect(Collectors.toList());
           } 
           if(clientSearchParamIn.getUr_number() != null && !clientSearchParamIn.getUr_number().isEmpty()){
                   clients = clients.stream().filter(p -> p.getUr_number() !=null && p.getUr_number().toUpperCase().contains(clientSearchParamIn.getUr_number().toUpperCase())).collect(Collectors.toList());
           }            
        }        
        
        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(clients), HttpStatus.OK);

    }    

    /**
     * AdminCreateClient
     * @param clientIn
     * @return
     * @throws Exception
     */
    @PostMapping("/clients")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin' )")
    public ResponseEntity<String> AdminCreateClient(@RequestBody Client clientIn) throws Exception {

        if (clientIn == null) {

            return new ResponseEntity<>(Common.toJSON("Client is null."), HttpStatus.BAD_REQUEST);
        }

        MapSqlParameterSource params = new MapSqlParameterSource()                
                .addValue("first_name", clientIn.getFirst_name())
                .addValue("last_name", clientIn.getLast_name())
                .addValue("mobile_number", clientIn.getMobile_number())
                .addValue("email",clientIn.getEmail())
                .addValue("phone_number", clientIn.getPhone_number())
                .addValue("address",  clientIn.getAddress())                        
                .addValue("date_of_birth", Common.formatStringToDate(clientIn.getDate_of_birth()))
                .addValue("language_id", clientIn.getLanguage_id())
                .addValue("gender_id", clientIn.getGender_id())
                .addValue("country_id",clientIn.getCountry_id())
                .addValue("rsd_status_id", clientIn.getRsd_status_id())
                .addValue("marital_status_id",  clientIn.getMarital_status_id())              
                .addValue("visa_number", clientIn.getVisa_number())
                .addValue("assigned_case_worker_id", clientIn.getAssigned_case_worker_id())
                .addValue("ur_number", clientIn.getUr_number())
                .addValue("user_id", clientIn.getUser_id())
                .addValue("created_by",getCurrentUsername())
                .addValue("created_date", Common.todayString("yyyy-MM-dd HH:mm:ss"))
                .addValue("last_updated_by", clientIn.getLast_updated_by())
                .addValue("last_updated_date",  clientIn.getLast_updated_date());

        try {

            long id = databaseDao.insert(params, "client", "id");
            clientIn.setId(id);
            mLogger.info("Client with Id: " + id + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");

            return new ResponseEntity<>(clientIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/clients/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> AdminUpdateClient(@RequestBody Client clientIn,@PathVariable Long id) throws Exception {

        if (clientIn == null) {

            return new ResponseEntity<>(Common.toJSON("Client is null."), HttpStatus.BAD_REQUEST);
        }

        Object clientParameters[] = {
                clientIn.getFirst_name(),
                clientIn.getLast_name(),
                clientIn.getMobile_number(),
                clientIn.getEmail(),
                clientIn.getPhone_number(),
                clientIn.getAddress(),
                Common.nullIfEmpty(clientIn.getDate_of_birth()),               
                clientIn.getLanguage_id(),
                clientIn.getGender_id(),
                clientIn.getCountry_id(),
                clientIn.getRsd_status_id(),
                clientIn.getMarital_status_id(),             
                clientIn.getVisa_number(),
                clientIn.getAssigned_case_worker_id(),
                clientIn.getUr_number(),         
                clientIn.getUser_id(),
                clientIn.getCreated_by(),
                clientIn.getCreated_date(),
                getCurrentUsername(),
                Common.todayString("yyyy-MM-dd HH:mm:ss"),
                id            
        };

        int clientParameterTypes[] = {
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.VARCHAR,           
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,           
            Types.INTEGER,
            Types.VARCHAR,           
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,   
            Types.INTEGER            
        };

        try {

            databaseDao.insert("api.cmis.clients.put", clientParameters, clientParameterTypes);

            mLogger.info("Client: " + clientIn.getFirst_name() + " " + clientIn.getLast_name() + " updated successfully!");


            return new ResponseEntity<>(clientIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/clients/{id}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity<String> SrmUpdateClient(@RequestBody Client clientIn,@PathVariable Long id, @PathVariable long caseWorkerId) throws Exception {

        if (clientIn == null) {

            return new ResponseEntity<>(Common.toJSON("Client is null."), HttpStatus.BAD_REQUEST);
        }
        
        if(clientIn.getAssigned_case_worker_id() != caseWorkerId){
             return new ResponseEntity<>(Common.toJSON("SRM cannot update this client. Access forbidden."), HttpStatus.FORBIDDEN);           
        }

        Object clientParameters[] = {
                clientIn.getFirst_name(),
                clientIn.getLast_name(),
                clientIn.getMobile_number(),
                clientIn.getEmail(),
                clientIn.getPhone_number(),
                clientIn.getAddress(),
                Common.nullIfEmpty(clientIn.getDate_of_birth()),               
                clientIn.getLanguage_id(),
                clientIn.getGender_id(),
                clientIn.getCountry_id(),
                clientIn.getRsd_status_id(),
                clientIn.getMarital_status_id(),             
                clientIn.getVisa_number(),
                clientIn.getAssigned_case_worker_id(),
                clientIn.getUr_number(),         
                clientIn.getUser_id(),
                clientIn.getCreated_by(),
                clientIn.getCreated_date(),
                getCurrentUsername(),
                Common.todayString("yyyy-MM-dd HH:mm:ss"),
                id            
        };

        int clientParameterTypes[] = {
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,     
            Types.VARCHAR,           
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.INTEGER,
            Types.VARCHAR,           
            Types.INTEGER,
            Types.VARCHAR,           
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,
            Types.VARCHAR,   
            Types.INTEGER            
        };

        try {

            databaseDao.insert("api.cmis.clients.put", clientParameters, clientParameterTypes);

            mLogger.info("Client: " + clientIn.getFirst_name() + " " + clientIn.getLast_name() + " updated successfully!");


            return new ResponseEntity<>(clientIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }    
    
    
    
    
    @GetMapping("/clients/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin','cmis.api.server.role.ica' )")
    public ResponseEntity<String> AdminGetClient(@PathVariable Long id) throws Exception {

        if (id == 0) {

            return new ResponseEntity<>(Common.toJSON("Client is not found."), HttpStatus.NOT_FOUND);
        }


        try {

           Client client = (Client) databaseDao.findById("api.cmis.clients.get.id", Client.class , id);
           
           return new ResponseEntity<>(client.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    @GetMapping("/clients/client/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client')")
    public ResponseEntity<String> ClientGetClient(@PathVariable Long id) throws Exception {

        if (id == 0) {

            return new ResponseEntity<>(Common.toJSON("Client is not found."), HttpStatus.NOT_FOUND);
        }
        
        //TODO: Get client id from currently logged in userid and check if it is equal to "id". 


        try {

           Client client = (Client) databaseDao.findById("api.cmis.clients.get.id", Client.class , id);
           
           return new ResponseEntity<>(client.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }    
    
    
    @GetMapping("/clients/{id}/srm/{caseWorkerId}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.case.worker')")
    public ResponseEntity<String> SrmGetClient(@PathVariable Long id, @PathVariable long caseWorkerId) throws Exception {

        if (id == 0) {

            return new ResponseEntity<>(Common.toJSON("Client is not found."), HttpStatus.NOT_FOUND);
        }
        
        //TODO: Get client id from currently logged in userid and check if it is equal to "id". 


        try {

           Client client = (Client) databaseDao.findById("api.cmis.clients.get.id", Client.class , id);
           
           if(client.getAssigned_case_worker_id() != caseWorkerId){
                return new ResponseEntity<>(Common.toJSON("SRM does not manage this client. Access forbidden."), HttpStatus.FORBIDDEN);               
           }
           
           return new ResponseEntity<>(client.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }  




}
