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

import com.cloudcode.cmis.microserv.authorise.authenticate.OAuth2Parameters;
import com.cloudcode.cmis.microserv.authorise.authenticate.TokenHandler;
import com.google.gson.Gson;
import com.cloudcode.datagenerics.GenericDatabaseDAO;
import com.cloudcode.cmis.microserv.common.Common;
import com.cloudcode.cmis.microserv.keycloak.admin.client.KeyCloakAdminClientService;
import com.cloudcode.cmis.model.objects.CaseWorker;
import com.cloudcode.cmis.model.objects.CaseWorkerUser;
import com.cloudcode.cmis.model.objects.Client;
import com.cloudcode.cmis.model.objects.ClientUser;
import com.cloudcode.cmis.model.objects.KeyValue;
import com.cloudcode.cmis.model.objects.User;
import com.cloudcode.cmis.model.objects.UserAccessKey;
import com.cloudcode.cmis.model.objects.UserSearchParam;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
public class UserController extends BaseController {

    private static final LogWrapper mLogger = LogWrapper.getInstance(UserController.class);

    private final GenericDatabaseDAO databaseDao;

    @Value(value = "${security.oauth2.client.access-token-uri}")
    private String keycloakAuthorizationAccessTokenUri;

    @Value(value = "${security.oauth2.client.client-id}")
    String clientId;

    @Value(value = "${security.oauth2.client.client-secret}")
    String clientSecret;

    @Value(value = "${security.oauth2.client.scope}")
    String clientScope;

    @Value(value = "${security.oauth2.client.grant.type}")
    String clientGrantype;

    @Value(value = "${security.oauth2.client.logout-uri}")
    String logoutUri;

    @Value(value = "${keycloak.client.admin.role}")
    String adminUserRole;

    @Value(value = "${keycloak.client.case.worker.role}")
    String caseWorkerUserRole;
    
    @Value(value = "${keycloak.client.ica.role}")
    String icaUserRole;

    @Value(value = "${keycloak.client.client.role}")
    String clientUserRole;

    @Autowired
    KeyCloakAdminClientService keycloakAdminClientService;

    @Autowired
    public UserController(GenericDatabaseDAO databaseDao) {
        super(databaseDao);
        this.databaseDao = databaseDao;
    }

    /* =============================================================================
     *
     * @param user
     * @return
     * =============================================================================
     */
    @PostMapping("/users/admin/auth")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> AdminUserAuthenticate(HttpServletRequest request,
            HttpServletResponse response, @RequestBody User userIn) throws IOException, Exception {

        if (userIn == null) {
            return new ResponseEntity<>(Common.toJSON("Bad request. User cannot be null."), HttpStatus.BAD_REQUEST);
        }

        try {
            //get resource owner access token using client
            TokenHandler tokenHandler = new TokenHandler(new OAuth2Parameters(this.clientId,
                    this.clientSecret,
                    userIn.getUsername(),
                    userIn.getPassword(),
                    this.keycloakAuthorizationAccessTokenUri,
                    this.clientGrantype,
                    this.clientScope));

            tokenHandler.getTokens();

            if (!tokenHandler.getHttpResponseStatusCode().equals("200")) {
                String errorMessage = "Cannot login. " + userIn.getUsername() + " does not exist or username and password is incorrect.";
                mLogger.error(errorMessage);
                return new ResponseEntity<>(Common.toJSON(errorMessage), HttpStatus.NOT_FOUND);
            }

            String accessToken = tokenHandler.getAccessToken();
            String refreshToken = tokenHandler.getRefreshToken();

            //audit user login action
            String clientIpAddress = this.getClientIp(request);
            String message = userIn.getUsername() + " logged into the system from " + clientIpAddress + " on " + Common.todayString("yyyy-MM-dd HH:mm:ss");
            //this.UserAccessLoginAuditCreate(user.getUsername(), clientIpAddress, "LOGIN", message);
            mLogger.info(message);

            User user = keycloakAdminClientService.GetUser(userIn.getUsername());

            //Deny access to client users
            if (!keycloakAdminClientService.GetClientRoleName(user.getRoleId()).toUpperCase().equals(adminUserRole.toUpperCase())
                    && !keycloakAdminClientService.GetClientRoleName(user.getRoleId()).toUpperCase().equals(caseWorkerUserRole.toUpperCase())
                    && !keycloakAdminClientService.GetClientRoleName(user.getRoleId()).toUpperCase().equals(icaUserRole.toUpperCase())                    
                    ) {
                return new ResponseEntity<>(Common.toJSON("Access denied."), HttpStatus.FORBIDDEN);
            }
            
            if (keycloakAdminClientService.GetClientRoleName(user.getRoleId()).toUpperCase().equals(caseWorkerUserRole.toUpperCase())){
                //get case worker id from user id
                CaseWorker cw = (CaseWorker) databaseDao.findByName("api.cmis.case-workers.userId", CaseWorker.class, user.getId());
                if(cw == null){
                    return new ResponseEntity<>(Common.toJSON("User does not have a corresponding srm record."), HttpStatus.FORBIDDEN);
                }
                user = new CaseWorkerUser((int)cw.getId(),user.getId(), user.getUsername(),"", user.getFirst_name(), user.getLast_name(), user.getEmail(), user.getRoleId(),user.getRoleCode(), user.isEnabled());
            }

            UserAccessKey uak = new UserAccessKey(user, accessToken, refreshToken);

            return new ResponseEntity<>(Common.toJSON(uak), HttpStatus.OK);

        } catch (IOException ex) {
            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* =============================================================================
     *
     * @param user
     * @return
     * =============================================================================
     */
    @PostMapping("/users/client/auth")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> ClientUserAuthenticate(HttpServletRequest request,
            HttpServletResponse response, @RequestBody User userIn) throws IOException, Exception {

        if (userIn == null) {
            return new ResponseEntity<>(Common.toJSON("Bad request. User cannot be null."), HttpStatus.BAD_REQUEST);
        }

        try {
            //get resource owner access token using client
            TokenHandler tokenHandler = new TokenHandler(new OAuth2Parameters(this.clientId,
                    this.clientSecret,
                    userIn.getUsername(),
                    userIn.getPassword(),
                    this.keycloakAuthorizationAccessTokenUri,
                    this.clientGrantype,
                    this.clientScope));

            tokenHandler.getTokens();

            if (!tokenHandler.getHttpResponseStatusCode().equals("200")) {
                String errorMessage = "Cannot login. " + userIn.getUsername() + " does not exist or username and password is incorrect.";
                mLogger.error(errorMessage);
                return new ResponseEntity<>(Common.toJSON(errorMessage), HttpStatus.NOT_FOUND);
            }

            String accessToken = tokenHandler.getAccessToken();
            String refreshToken = tokenHandler.getRefreshToken();

            //audit user login action
            String clientIpAddress = this.getClientIp(request);
            String message = userIn.getUsername() + " logged into the system from " + clientIpAddress + " on " + Common.todayString("yyyy-MM-dd HH:mm:ss");
            //this.UserAccessLoginAuditCreate(user.getUsername(), clientIpAddress, "LOGIN", message);
            mLogger.info(message);

            User user = keycloakAdminClientService.GetUser(userIn.getUsername());

            //Deny access to admin and case worker users
            if (!keycloakAdminClientService.GetClientRoleName(user.getRoleId()).toUpperCase().equals(clientUserRole.toUpperCase())) {
                return new ResponseEntity<>(Common.toJSON("Access denied."), HttpStatus.FORBIDDEN);
            }
            
            //get case client id from user id
            Client c = (Client) databaseDao.findByName("api.cmis.clients.get.userId", Client.class, user.getId());
            
            if(c == null){
                return new ResponseEntity<>(Common.toJSON("User does not have a corresponding client record."), HttpStatus.FORBIDDEN);
            }
            
            if(c.getAssigned_case_worker_id() == null){
                return new ResponseEntity<>(Common.toJSON("Client is not assigned to a case worker yet. Client not allowed to login."), HttpStatus.FORBIDDEN);
            }            
            
            user = new ClientUser((int)c.getId(),user.getId(), user.getUsername(),"", user.getFirst_name(), user.getLast_name(), user.getEmail(), user.getRoleId(),user.getRoleCode(), user.isEnabled());

            UserAccessKey uak = new UserAccessKey(user, accessToken, refreshToken);

            return new ResponseEntity<>(Common.toJSON(uak), HttpStatus.OK);

        } catch (IOException ex) {
            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /* ========================================================================
     * GetUsers
     * @return
     * =========================================================================
     */
    @GetMapping("/users")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity GetUsers() throws Exception {

        List<User> users = keycloakAdminClientService.GetUsers();

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(users), HttpStatus.OK);

    }

    /* ========================================================================
     * GetKeyValueUsers
     * @return
     * =========================================================================
     */
    @GetMapping("/users/keyvalue")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.case.worker')")
    public ResponseEntity GetKeyValueUsers() throws Exception {

        List<KeyValue> kvUsers = keycloakAdminClientService.GetKeyValueUsers();

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(kvUsers), HttpStatus.OK);

    }

    /* ========================================================================
     * GetKvClientRoleUsers
     * @return
     * =========================================================================
     */
    @GetMapping("/users/roles/client/keyvalue")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.case.worker')")
    public ResponseEntity GetKvClientRoleUsers() throws Exception {

        List<KeyValue> kvUsers = keycloakAdminClientService.GetUsersOfRole("cmis.api.server.role.client");
//        List<Client> clients = databaseDao.selectAll("api.cmis.clients.get", Client.class);
//        
//        //filter out those that have already been assigned
//        Set<String> clientUserIdSet = clients.stream()
//                                        .map(Client::getUser_id)
//                                        .collect(Collectors.toSet());
//        
//        List<KeyValue> finalKv = kvUsers.stream()
//            .filter(e -> !clientUserIdSet.contains(e.getKey()))
//            .collect(Collectors.toList());
//        
        
        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(kvUsers), HttpStatus.OK);

    }

    /* ========================================================================
     * GetKvClientRoleUsers
     * @return
     * =========================================================================
     */
    @GetMapping("/users/roles/srm/keyvalue")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin', 'cmis.api.server.role.case.worker')")
    public ResponseEntity GetKvSrmRoleUsers() throws Exception {

        List<KeyValue> kvUsers = keycloakAdminClientService.GetUsersOfRole("cmis.api.server.role.case.worker");
        
//        List<CaseWorker> srms = databaseDao.selectAll("api.cmis.case-workers.get", CaseWorker.class);
//        
//        //filter out those that have already been assigned
//        Set<String> srmUserIdSet = srms.stream()
//                                        .map(CaseWorker::getUser_id)
//                                        .collect(Collectors.toSet());
//        
//        List<KeyValue> finalKv = kvUsers.stream()
//            .filter(e -> !srmUserIdSet.contains(e.getKey()))
//            .collect(Collectors.toList());

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(kvUsers), HttpStatus.OK);

    }

    /* ========================================================================
     * GetUsers
     * @return
     * =========================================================================
     */
    @GetMapping("/users/roles")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity GetAllClientUserRoles() throws Exception {

        List<KeyValue> roles = keycloakAdminClientService.GetClientRoles();

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(roles), HttpStatus.OK);

    }

    /* ========================================================================
     * FindUsers
     * @return
     * =========================================================================
     */
    @PostMapping("/users/find")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity FindUsers(@RequestBody UserSearchParam userSearchParamIn) throws Exception {

        List<User> users = keycloakAdminClientService.GetUsers();

        if (userSearchParamIn != null) {

            if (userSearchParamIn.getFirst_name() != null && !userSearchParamIn.getFirst_name().isEmpty()) {
                users = users.stream().filter(p -> p.getFirst_name() != null && p.getFirst_name().toUpperCase().contains(userSearchParamIn.getFirst_name().toUpperCase())).collect(Collectors.toList());
            }

            if (userSearchParamIn.getLast_name() != null && !userSearchParamIn.getLast_name().isEmpty()) {
                users = users.stream().filter(p -> p.getLast_name() != null && p.getLast_name().toUpperCase().contains(userSearchParamIn.getLast_name().toUpperCase())).collect(Collectors.toList());
            }

            if (userSearchParamIn.getUsername() != null && !userSearchParamIn.getUsername().isEmpty()) {
                users = users.stream().filter(p -> p.getUsername() != null && p.getUsername().toUpperCase().contains(userSearchParamIn.getUsername().toUpperCase())).collect(Collectors.toList());
            }
            if (userSearchParamIn.getRole_id() != null && !userSearchParamIn.getRole_id().isEmpty()) {
                users = users.stream().filter(p -> p.getRoleId() != null && p.getRoleId().equals(userSearchParamIn.getRole_id())).collect(Collectors.toList());
            }

        }

        Gson gson = new Gson();

        return new ResponseEntity<>(gson.toJson(users), HttpStatus.OK);

    }

    /**
     * CreateUser
     *
     * @param userIn
     * @return
     * @throws Exception
     */
    @PostMapping("/users")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> CreateUser(@RequestBody User userIn) throws Exception {

        if (userIn == null) {

            return new ResponseEntity<>(Common.toJSON("User is null."), HttpStatus.BAD_REQUEST);
        }

        try {

            String userId = keycloakAdminClientService.createUser(userIn.getUsername(), userIn.getFirst_name(), userIn.getLast_name(), userIn.getEmail(), true);
            userIn.setId(userId);

            keycloakAdminClientService.definePassword(userId, userIn.getPassword());

            keycloakAdminClientService.AssignClientRoleByRoleId(userId, userIn.getRoleId());

            mLogger.info("User with Id: " + userId + " created successfully!");

            //audit fee profile create action
            //this.FeeProfileAuditCreate(feeId, "CREATE");
            return new ResponseEntity<>(userIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/users/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> UpdateUser(@RequestBody User userIn, @PathVariable String id) throws Exception {

        if (userIn == null) {

            return new ResponseEntity<>(Common.toJSON("User is null."), HttpStatus.BAD_REQUEST);
        }

        try {

            //update user details
            keycloakAdminClientService.updateUser(userIn);

            //update user role
            if (!Common.isNothing(userIn.getRoleId())) {
                //remove all previous role(s)
                keycloakAdminClientService.RemoveAllUserClientRoles(id);
                keycloakAdminClientService.AssignClientRoleByRoleId(id, userIn.getRoleId());
            }

            //update user password
            if (!Common.isNothing(userIn.getPassword())) {
                keycloakAdminClientService.definePassword(id, userIn.getPassword());
            }

            mLogger.info("User : " + userIn.getFirst_name() + " " + userIn.getLast_name() + " updated successfully!");

            return new ResponseEntity<>(userIn.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/users/{id}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.admin')")
    public ResponseEntity<String> DeactivateUser(@PathVariable String id) throws Exception {

        if (id.isEmpty()) {

            return new ResponseEntity<>(Common.toJSON("User id is empty."), HttpStatus.BAD_REQUEST);
        }

        try {

            //update user details
            keycloakAdminClientService.disableUser(id);

            String msg = "User Id: " + id + " disabled successfully!";
            mLogger.info(msg);

            return new ResponseEntity<>(Common.toJSON(msg), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * =========================================================================
     * CloseSession
     *
     * @param request
     * @param response
     * @param uak
     * @return
     * @throws IOException
     * =========================================================================
     */
    @PostMapping("/users/session/close")
    @CrossOrigin(origins = "*")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> CloseSession(HttpServletRequest request,
            HttpServletResponse response, @RequestBody UserAccessKey uak) throws IOException, Exception {
        if (uak == null) {
            return new ResponseEntity<>(Common.toJSON("No valid access key supplied."), HttpStatus.BAD_REQUEST);
        }
        try {

            //get resource owner access token using client
            TokenHandler tokenHandler = new TokenHandler(new OAuth2Parameters(this.logoutUri,
                    uak.getRefreshToken(),
                    this.clientId,
                    this.clientSecret));

            tokenHandler.invalidateTokens();
            long httpStatusCode = Long.parseLong(tokenHandler.getHttpResponseStatusCode());

            if (httpStatusCode != 204 && httpStatusCode != 200) {
                String errorMessage = "Cannot end session for user: " + uak.getUser().getUsername() + "!";
                mLogger.error(errorMessage);
                return new ResponseEntity<>(Common.toJSON(errorMessage), HttpStatus.NOT_FOUND);
            }

            //audit user logout action
            String clientIpAddress = this.getClientIp(request);
            String message = uak.getUser().getUsername() + " logged out of the system from " + clientIpAddress + " on " + Common.todayString("yyyy-MM-dd HH:mm:ss");

            mLogger.info(message);

            return new ResponseEntity<>(Common.toJSON("Session for username: " + uak.getUser().getUsername() + " has ended"), HttpStatus.OK);
        } catch (IOException | NumberFormatException ex) {
            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /* =============================================================================
     *
     * @param user
     * @return
     * =============================================================================
     */
    @PostMapping("/users/reset/password")
    @CrossOrigin(origins = "*")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> ChangePassword(@RequestBody User userIn) throws IOException, Exception {

        if (userIn == null) {
            return new ResponseEntity<>(Common.toJSON("Bad request. User cannot be null."), HttpStatus.BAD_REQUEST);
        }

        try {
            keycloakAdminClientService.definePassword(userIn.getId(), userIn.getPassword());

            //get resource owner access token using client
            String message = "Password for user " + userIn.getFirst_name() + " " + userIn.getLast_name() + " updated successfully!";
            mLogger.info(message);

            return new ResponseEntity<>(Common.toJSON(message), HttpStatus.OK);
        } catch (Exception ex) {
            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/users/clients/client/{username}")
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyAuthority('cmis.api.server.role.client')")
    public ResponseEntity<String> GetClientByUserUsername(@PathVariable String username) throws Exception {

        if (username == null) {
            return new ResponseEntity<>(Common.toJSON("Client not found."), HttpStatus.NOT_FOUND);
        }

        try {

            User user = keycloakAdminClientService.GetUser(username);

            Client client = (Client) databaseDao.findByName("api.cmis.clients.get.user.id", Client.class, user.getId());

            if (client == null) {
                return new ResponseEntity<>(Common.toJSON("Client not found."), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(client.toJSON(), HttpStatus.OK);

        } catch (Exception ex) {

            mLogger.error(ex.getMessage());
            return new ResponseEntity<>(Common.toJSON(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     *
     * @param @return @throws Exception
     */
    
    //    private void BulkCreateTmpClientUsers() throws Exception {
    //
    //        List<User> users = keycloakAdminClientService.GetUsers();
    //
    //        users.forEach(u -> {
    //
    //            MapSqlParameterSource params = new MapSqlParameterSource()
    //                    .addValue("username", u.getUsername())
    //                    .addValue("user_id", u.getId());
    //
    //            try {
    //
    //                long id = databaseDao.insert(params, "tmp_user", "id");
    //                mLogger.info("Tmp User with Id: " + id + " created successfully!");
    //
    //            } catch (Exception ex) {
    //
    //                mLogger.error(ex.getMessage());
    //            }
    //
    //        });
    //
    //    }
    


}
