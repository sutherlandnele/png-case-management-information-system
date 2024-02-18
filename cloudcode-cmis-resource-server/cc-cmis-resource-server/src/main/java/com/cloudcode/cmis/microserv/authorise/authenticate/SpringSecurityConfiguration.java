/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.cloudcode.cmis.microserv.authorise.authenticate;

/**
 *
 * @author Sutherland Nele <sutherland@platformpac.com.pg>
 * 
 */
import com.cloudcode.common.utils.logging.LogWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity

public class SpringSecurityConfiguration {
    
    private static final LogWrapper mLogger = LogWrapper.getInstance(SpringSecurityConfiguration.class);

    private final ObjectMapper objectMapper;
    
    @Value(value = "${cors.frontend.allowed.origin}")
    private String corsFrontendAllowedOrigin;

    @Autowired
    public SpringSecurityConfiguration(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable()
            .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers("/api/cmis/users/admin/auth", "/api/cmis/users/client/auth").permitAll() // Permit these URLs without authentication
                .anyRequest().authenticated() // Require authentication for all other requests
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(new CustomJwtConverter(objectMapper))
                )
            );

        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(corsFrontendAllowedOrigin)); // Example: Allow a specific origin
        // OR use allowedOriginPatterns to match against a pattern
        // configuration.setAllowedOriginPatterns(Arrays.asList("http://*.example.com"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
