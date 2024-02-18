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
package com.cloudcode.cmis.microserv.keycloak.admin.client;

import com.cloudcode.cmis.microserv.common.GenericComparator;
import com.cloudcode.cmis.model.objects.EnabledRole;
import com.cloudcode.cmis.model.objects.EnabledUserClientRoles;
import com.cloudcode.cmis.model.objects.KeyValue;
import com.cloudcode.cmis.model.objects.User;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ws.rs.core.Response;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleScopeResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * 
 */
@Service
public class KeyCloakAdminClientService {
    
    private static final LogWrapper mLogger = LogWrapper.getInstance(KeyCloakAdminClientService.class);


    @Autowired
    Keycloak keycloak;
    
    @Autowired
    RealmResource realmResource;
    
    @Autowired
    UsersResource usersResource;
    
    @Autowired
    ClientRepresentation clientRep;

    public KeyCloakAdminClientService() {
        //check if there is active sessions. if not activate one through the autowired this.usersResource call
        //this.test();
    }
    
    public boolean CanManageKeycloakRealm() {
        try {

            Optional<UserRepresentation> userRep = this.usersResource.search("test").stream().findFirst();
            return true;

        } //try again if it fails with a 401 Unauthorized the first time...
        catch (Exception ex) {
            if (ex.getMessage().contains("401")) {

                try {
                    Optional<UserRepresentation> userRep = this.usersResource.search("test").stream().findFirst();
                    return true;
                } catch (Exception ex2) {
                    return false;
                }
            }
            return false;
        }
    }

    private UserRepresentation defineUser(String username,
            String firstname,
            String lastname,
            String email,
            boolean enabled) {
        // Define user
        UserRepresentation userRep = new UserRepresentation();
        userRep.setEnabled(enabled);
        userRep.setUsername(username);
        userRep.setFirstName(firstname);
        userRep.setLastName(lastname);
        userRep.setEmail(email);
        userRep.setAttributes(Collections.singletonMap("origin", Arrays.asList("demo")));
        return userRep;
    }

    public String createUser(String username,
            String firstname,
            String lastname,
            String email,
            boolean enabled) {
        UserRepresentation user = defineUser(username, firstname, lastname, email, enabled);

        // Create user (requires manage-users role)
        Response response = usersResource.create(user);
        System.out.printf("Repsonse: %s %s%n", response.getStatus(), response.getStatusInfo());
        System.out.println(response.getLocation());
        String userId = CreatedResponseUtil.getCreatedId(response);

        System.out.printf("User created with userId: %s%n", userId);
        return userId;
    }
    
    public void updateUser(User userIn){
          UserResource userResource = this.usersResource.get(userIn.getId());
          UserRepresentation userRep = userResource.toRepresentation();
          userRep.setFirstName(userIn.getFirst_name());
          userRep.setLastName(userIn.getLast_name());
          userRep.setEmail(userIn.getEmail());    
          userRep.setEnabled(userIn.isEnabled());
          userResource.update(userRep);
    }
    
    public void definePassword(String userId, String password) {
        // Define password credential
        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(password);

        UserResource userResource = this.usersResource.get(userId);

        // Set password credential
        userResource.resetPassword(passwordCred);
    }
    
    public void disableUser(String userId) {
         UserResource userResource = this.usersResource.get(userId);
          UserRepresentation user = userResource.toRepresentation();
          user.setEnabled(false);
    }

    public void AssignClientRoles(String userId, String role) {

        UserResource userResource = this.usersResource.get(userId);

        // Get client level role (requires view-clients role)
        RoleRepresentation userClientRole = realmResource.clients().get(this.clientRep.getId())
                .roles().get(role).toRepresentation();

        // Assign client level role to user
        userResource.roles() //
                .clientLevel(this.clientRep.getId()).add(Arrays.asList(userClientRole));
    }
    
    public void AssignClientRoleByRoleId(String userId, String roleId) {
        
        try {
            String role = GetClientRoleName(roleId);

            UserResource userResource = this.usersResource.get(userId);

            // Get client level role (requires view-clients role)
            RoleRepresentation userClientRole = realmResource.clients().get(this.clientRep.getId())
                    .roles().get(role).toRepresentation();

            // Assign client level role to user
            userResource.roles() //
                    .clientLevel(this.clientRep.getId()).add(Arrays.asList(userClientRole));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void RemoveClientRoles(String userId, String role) {

        UserResource userResource = this.usersResource.get(userId);

        // Get client level role (requires view-clients role)
        RoleRepresentation userClientRole = realmResource.clients().get(this.clientRep.getId())
                .roles().get(role).toRepresentation();
        // Assign client level role to user
        userResource.roles() //
                .clientLevel(this.clientRep.getId()).remove(Arrays.asList(userClientRole));
    }
    
    public void RemoveAllUserClientRoles(String userId){
        
          UserResource ur = this.usersResource.get(userId);
          
          RoleScopeResource rsr = ur.roles().clientLevel(this.clientRep.getId());
          
          rsr.listAll().stream().forEach(r -> {
              
               RoleRepresentation userClientRole = realmResource.clients().get(this.clientRep.getId())
                .roles().get(r.getName()).toRepresentation();
                 
               ur.roles() 
                .clientLevel(this.clientRep.getId()).remove(Arrays.asList(userClientRole));          
          
          });
    }
    
    public String GetUserFullName(String username) {
        Optional<UserRepresentation> userRep = this.usersResource.search(username).stream().findFirst();
        if (userRep == null) {
            return "";
        }

        return userRep.get().getFirstName() + " " + userRep.get().getLastName()  ;
    }

    public String GetUserName(String userid) {
        Optional<UserRepresentation> userRep =  this.usersResource
                                                    .list()
                                                    .stream()
                                                    .filter(ur -> (ur.getId().equals(userid))).findFirst();
        
        if (userRep == null) {
            return "";
        }

        return userRep.get().getUsername();
    }    
    
    public String GetClientRoleName(String roleId){
        
       List<KeyValue> kvl = GetClientRoles().stream().filter(kv -> (kv.getKey() == null ? roleId == null : kv.getKey().equals(roleId))).collect(Collectors.toList());
       if(kvl.isEmpty()){
           return "";
       }
       
       return kvl.get(0).getValue();
    }

    public boolean DoesUserExist(String username) {
        List<UserRepresentation> list = this.usersResource.search(username);
        return list.stream().anyMatch(userRep -> (userRep.getUsername().equals(username.toLowerCase())));
    }
    
    private String GetUserId(String username) {
        try {

            Optional<UserRepresentation> userRep = this.usersResource.search(username).stream().findFirst();
        

            if (userRep == null) {
                return "";
            }

            return userRep.get().getId();

        }
        catch (Exception ex) {

                mLogger.error(ex.getMessage());          
                
        }
        
        return null;


    }
    
   
    
    private UserResource GetUserResource(String username){
        return  this.usersResource.get(GetUserId(username));
    }
    
    public User GetUser(String username){
        String userId = GetUserId(username);
        UserResource ur = this.usersResource.get(userId);
        UserRepresentation userRep = ur.toRepresentation();
        String userRoleId = "";
        String userRoleCode = "";
        
        List<KeyValue> kv = GetUserClientRoles(username);
        
        if(!kv.isEmpty()){
            userRoleId = kv.get(0).getKey();
            userRoleCode = kv.get(0).getValue().substring(21).replace(".", "").toUpperCase();
            if(userRoleCode.equals("CASEWORKER")){
                userRoleCode = "SRM";
            }
        }
        
       
        User user = new User(userRep.getId(), userRep.getUsername(),"", userRep.getFirstName(),userRep.getLastName(), userRep.getEmail(), userRoleId,userRoleCode, userRep.isEnabled());
        
        return user;            

        
    }
    
    public List<KeyValue> GetUserClientRoles(String username){
        try {
              
            RoleScopeResource rsr = GetUserResource(username).roles().clientLevel(this.clientRep.getId());
            
             return rsr.listAll().stream()
                     .filter(rr -> (!rr.getName().toUpperCase().equalsIgnoreCase("UMA_PROTECTION"))) 
                     .map(rr -> (new KeyValue(rr.getId(), rr.getName()))).collect(Collectors.toList());
             
             //return rsr.listAll().stream().collect(Collectors.toMap(p1 -> (p1.getId()), p2 -> (p2.getName())));
             
                    
        } catch (Exception ex) {
            mLogger.error(ex.getMessage());
        }

        return null;        
    }

    public boolean HasClientRole(String username, String role) {

        try {
              
            RoleScopeResource rsr = GetUserResource(username).roles().clientLevel(this.clientRep.getId());

            return rsr.listAll().stream()
                    .anyMatch(userClientRole -> (userClientRole.getName().equalsIgnoreCase(role)));

        } catch (Exception ex) {
            mLogger.error(ex.getMessage());
        }

        return false;

    }
    
    public List<KeyValue>  GetKeyValueUsers() {
        
            //        return this.usersResource.list().stream()
            //                .collect(Collectors.toMap(p1 -> (p1.getId()), p2 -> (p2.getUsername())));   
             List<UserRepresentation> userReps = realmResource.users().search(null, 0, Integer.MAX_VALUE);

             return userReps.stream()
                     .filter(rr -> (!rr.getUsername().toUpperCase().equalsIgnoreCase("cimsadmin")))
                     .map(rr -> (new KeyValue(rr.getId(), rr.getFirstName() + " (" + rr.getUsername() + ")"))).collect(Collectors.toList());

    }
    
    public List<KeyValue>  GetClientRoles() {        
        
        //        return realmResource.clients().get(this.clientRep.getId()).roles().list().stream()
        //                .collect(Collectors.toMap(p1 -> (p1.getId()), p2 -> (p2.getName())));    
        return this.realmResource.clients().get(this.clientRep.getId()).roles().list().stream()
                .filter(rr -> (!rr.getName().toUpperCase().equalsIgnoreCase("UMA_PROTECTION")))  
                .map(rr -> (new KeyValue(rr.getId(), rr.getName()))).collect(Collectors.toList());

    }
    
    public EnabledUserClientRoles GetEnabledUserClientRoles(String userId){
        
        EnabledUserClientRoles enabledUserClientRoles = new EnabledUserClientRoles(userId,new ArrayList<EnabledRole>());     
        
        try {            
            
            //1st get all user client roles
            UserResource ur = this.usersResource.get(userId);
            RoleScopeResource rsr = ur.roles().clientLevel(this.clientRep.getId());
            List<KeyValue> userClientRoles = rsr.listAll().stream()
                    .filter(rr -> (!rr.getName().toUpperCase().equalsIgnoreCase("UMA_PROTECTION"))) 
                    .map(rr -> (new KeyValue(rr.getId(), rr.getName()))).collect(Collectors.toList());
            
            //Next, loop through all client roles and check if user has role
            for (KeyValue item : GetClientRoles()) {
                Boolean isEnabled = userClientRoles.stream().anyMatch(rr -> (rr.getKey().equalsIgnoreCase(item.getKey())));
                EnabledRole er = new EnabledRole(item.getKey(), item.getValue(),isEnabled);
                enabledUserClientRoles.getEnabledRoles().add(er);
            }     
            
            return enabledUserClientRoles;

        } catch (Exception ex) {
            mLogger.error(ex.getMessage());
        }

        return null; 
        
    }
    


    public List<KeyValue> GetUsersOfRole(String roleName) {
        
        List<UserRepresentation> userReps = realmResource.users().search(null, 0, Integer.MAX_VALUE);
        List<KeyValue> userListing = new ArrayList<>();

        try {

            //1. loop through list of realm users
            userReps.forEach(uRep -> {
                
                UserResource ur = this.usersResource.get(uRep.getId());
                RoleScopeResource rsr = ur.roles().clientLevel(this.clientRep.getId());
                
                //2. loop through the roles of the user and see if user has the specific role assigned
                boolean userHasRole = rsr.listAll().stream()
                        .anyMatch(rr -> (rr.getName().toUpperCase().equalsIgnoreCase(roleName)));
                
                //3. if user has the role then add it to the list of users to return
                if (userHasRole) {
                    userListing.add(new KeyValue(uRep.getId(), uRep.getUsername() + " - " + uRep.getFirstName() + " " + uRep.getLastName()));
                }
            });

        } catch (Exception ex) {
            mLogger.error(ex.getMessage());
        }
        
        return userListing;
    }

    public List<User> GetUsers(){
        
        List<UserRepresentation> userReps = realmResource.users().search(null, 0, Integer.MAX_VALUE);
        List<User> userListing = new ArrayList<>();

        try {

            userReps.stream()
                .filter(ur -> (!ur.getUsername().toUpperCase().equalsIgnoreCase("cimsadmin")))
                .forEach(uRep -> {
                
                User user = new User();
                user.setId(uRep.getId());
                user.setUsername(uRep.getUsername());
                user.setEmail(uRep.getEmail());
                user.setFirst_name(uRep.getFirstName());
                user.setLast_name(uRep.getLastName());
                user.setEnabled(uRep.isEnabled());
                
                UserResource ur = this.usersResource.get(uRep.getId());
                RoleScopeResource rsr = ur.roles().clientLevel(this.clientRep.getId());
                
                List<String> userRoles = rsr.listAll().stream()
                                   .map(r -> r.getId())
                                   .collect(Collectors.toList());
                
                //quick and dirty way to get only one role since i know that the app only allows users to have only 1 role at any time
                if(!userRoles.isEmpty()){
                    user.setRoleId(userRoles.get(0));
                }
                
                userListing.add(user);
                
            });
            

        } catch (Exception ex) {
            mLogger.error(ex.getMessage());
        }
        
        Collections.sort(userListing, new GenericComparator("username", true));
        
        return userListing;

    }

}
