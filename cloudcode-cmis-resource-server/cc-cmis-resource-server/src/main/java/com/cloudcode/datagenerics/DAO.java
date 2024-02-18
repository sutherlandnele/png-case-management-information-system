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



package com.cloudcode.datagenerics;

import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * 
 */
public interface DAO<E extends GenericEntity>  {
    
    /**
     * 
     * @param entities 
     */
    public void createAll(Map<String, E> entities);
    public List<E> selectAll(String prop, Class<E> clazz);
    
    public List<E> selectBy(String prop, Class<E> clazz, long id);
    
    public List<E> selectBy(String prop, Class<E> clazz, Object[] parameters, int[]parameterTypes);
    
    public void insert(String prop, Object[] parameters, int[]parameterTypes);
    
    public void delete(String prop, Object[] parameters, int[]parameterTypes);
     
    public Object findById(String prop, Class<E> clazz,long id);
    
    public Object findByName(String prop, Class<E> clazz,String name);
    
    public String getPropertyalue(String prop);
    
    public Object selectImageData(String prop,Class<E> clazz, String name);
    /**
     * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
     * 
     *      --> added new interface method below that returns the id of the new record created
     * 
     * @param params
     * @param table
     * @param pk
     * @return Auto generated primary key
     */
    
    public long insert(MapSqlParameterSource params, String table, String pk);
    
    /**
     * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
     * 
     *      --> added new interface method below that selects by id
     * 
     * @param prop
     * @param clazz
     * @param id
     * @return 
     */
    public Object selectImageData(String prop,Class<E> clazz, Long id);
    
    
}
