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
package com.cloudcode.cmis.microserv.authorise.authenticate;

import com.cloudcode.common.utils.logging.LogWrapper;
import java.util.HashSet;
import java.util.Set;
import static org.jboss.resteasy.plugins.providers.multipart.i18n.LogMessages.LOGGER;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * SecurityContextUtils is used to get username and roles to set created by, last updated by fields.
 */
@Component
public class SecurityContextUtils {

    private static final LogWrapper mLogger = LogWrapper.getInstance(SecurityContextUtils.class);

  private static final String ANONYMOUS = "anonymous";

  private SecurityContextUtils() {
  }

  public static String getUserName() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    String username = ANONYMOUS;

    if (null != authentication) {
      if (authentication.getPrincipal() instanceof UserDetails) {
        UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
        username = springSecurityUser.getUsername();

      } else if (authentication.getPrincipal() instanceof String) {
        username = (String) authentication.getPrincipal();

      } else {
        LOGGER.debug("User details not found in Security Context");
      }
    } else {
      LOGGER.debug("Request not authenticated, hence no user name available");
    }

    return username;
  }

  public static Set<String> getUserRoles() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    Set<String> roles = new HashSet<>();

    if (null != authentication) {
      authentication.getAuthorities()
          .forEach(e -> roles.add(e.getAuthority()));
    }
    return roles;
  }
}