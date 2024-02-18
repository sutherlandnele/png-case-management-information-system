/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.cloudcode.cmis.microserv.authorise.authenticate;

/**
 *
 * @author Sutherland Nele <sutherland@platformpac.com.pg>
 */

import com.cloudcode.common.utils.logging.LogWrapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;


/**
 *
 * @author suthzy
 * 
 * Refactored code to run on Spring Security 5/6 from prev version
 * 
 */
public class CustomJwtConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final LogWrapper mLogger = LogWrapper.getInstance(CustomJwtConverter.class);

    private ObjectMapper mapper;

    private static final String CLIENT_NAME_ELEMENT_IN_JWT = "resource_access";

    private static final String ROLE_ELEMENT_IN_JWT = "roles";

    private static final String AUTHORIZE_NAME_ELEMENT_IN_JWT = "authorization";

    private static final String SCOPE_ELEMENT_IN_JWT = "scopes";

    public CustomJwtConverter(ObjectMapper mapper) {
        this.mapper = mapper;
        mapper.registerModule(new JavaTimeModule()); //add this because you have customized jackson object deserialization

    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.addAll(extractRoles(jwt));
        authorities.addAll(extractScopes(jwt));
        return new JwtAuthenticationToken(jwt, authorities);
    }

    private List<GrantedAuthority> extractRoles(Jwt jwt) {
      JsonNode jwtNode = mapper.convertValue(jwt.getClaims(), JsonNode.class);
        Set<String> roles = new HashSet<>();

        jwtNode.path(CLIENT_NAME_ELEMENT_IN_JWT)
            .elements()
            .forEachRemaining(e -> e.path(ROLE_ELEMENT_IN_JWT)
                .elements()
                .forEachRemaining(r -> roles.add(r.asText())));
    

        List<GrantedAuthority> authorityList = roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        
        //mLogger.debug("End extractRoles: roles = " + authorityList);
        
        return authorityList;

    }

    private List<GrantedAuthority> extractScopes(Jwt jwt) {
        JsonNode jwtNode = mapper.convertValue(jwt.getClaims(), JsonNode.class);
        Set<String> scopes = new HashSet<>();

        jwtNode.path(AUTHORIZE_NAME_ELEMENT_IN_JWT)
            .elements()
            .forEachRemaining(e1 -> e1
                .elements()
                .forEachRemaining(e2 -> e2.path(SCOPE_ELEMENT_IN_JWT)
                    .elements()
                    .forEachRemaining(r -> scopes.add(r.asText()))));

         List<GrantedAuthority> authorityList = scopes.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        
        //mLogger.debug("End extractScopes: scopes = " + authorityList);
        
        return authorityList;
    }

    // ... (Other methods from your JwtAccessTokenCustomizer class to extract information)
}
