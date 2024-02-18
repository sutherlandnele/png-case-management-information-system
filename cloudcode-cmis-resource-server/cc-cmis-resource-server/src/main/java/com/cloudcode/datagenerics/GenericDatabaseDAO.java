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

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * 
 */
package com.cloudcode.datagenerics;

import com.cloudcode.cmis.model.objects.ImageData;
import com.cloudcode.common.utils.logging.LogWrapper;
import java.io.InputStream;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Component;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * @param <E>
 */

@Component
public class GenericDatabaseDAO<E extends GenericEntity> implements DAO<E>{
    
    private static final LogWrapper mLogger = LogWrapper.getInstance(GenericDatabaseDAO.class);
    
    @Autowired
    JdbcTemplate jdbcTemplate;    
    

    @Autowired
    Environment environment;
    
    private ImageData getImageData(ResultSet resultSet) throws SQLException{
        ImageData imgData = new ImageData();
        imgData.setId(resultSet.getLong("id"));
        imgData.setDescription(resultSet.getString("description"));
        imgData.setBusinessName(resultSet.getString("businessname"));
        imgData.setBusinessNumber(resultSet.getString("businessnumber"));
        InputStream contentStream = resultSet.getClob("logo")
                                           .getAsciiStream();
      String content =
              new Scanner(contentStream, "UTF-8").useDelimiter("\\A").next();
      imgData.setLogo(content);        
        
      return imgData;  
    }
    
    @Override
    public Object selectImageData(String prop,Class<E> clazz, String name){
        List<ImageData> entities = jdbcTemplate.query(environment.getProperty(prop), new Object[]{name}, (resultSet, i) -> {
                  return getImageData(resultSet);
              });
        if (entities.size() == 1) {
            return entities.get(0);
        }
        return null;
    }

    @Override
    public List<E> selectAll(String prop, Class<E> clazz){
        
        
        return jdbcTemplate.query(environment.getProperty(prop),
                                  new BeanPropertyRowMapper(clazz));
    }
    
    @Override
    public List<E> selectBy(String prop, Class<E> clazz, long id){
    
        return jdbcTemplate.query(environment.getProperty(prop), new Object[]{id}, new BeanPropertyRowMapper(clazz));
     
    }
    
    @Override
    public List<E> selectBy(String prop, Class<E> clazz, Object[] parameters, int[]parameterTypes){
    
        return jdbcTemplate.query(environment.getProperty(prop), parameters, parameterTypes, new BeanPropertyRowMapper(clazz));
     
    }    
    
    @Override
    public void createAll(Map<String, E> entities) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
      
    @Override
    public void insert(String prop, Object[] parameters, int[]parameterTypes){
         jdbcTemplate.update(environment.getProperty(prop), parameters, parameterTypes);
    }
    
    @Override
    public void delete(String prop, Object[] parameters, int[]parameterTypes){
         jdbcTemplate.update(environment.getProperty(prop), parameters, parameterTypes);
    }
      
    @Override
    public Object findById(String prop, Class<E> clazz,long id){
        
        try{
           Object obj = jdbcTemplate.queryForObject(environment.getProperty(prop), 
                                           new Object[]{id}, 
                                           new BeanPropertyRowMapper(clazz));   
           return obj;
        }
        catch (EmptyResultDataAccessException e){

            return null;
        }

    }
    
    @Override
    public Object findByName(String prop, Class<E> clazz,String name){
        try{
             Object obj = jdbcTemplate.queryForObject(environment.getProperty(prop), 
                                           new Object[]{name}, 
                                           new BeanPropertyRowMapper(clazz));
             return obj;
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }    

    @Override
    public String getPropertyalue(String prop) {
        return environment.getProperty(prop);
    }
    
    /**
     * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
     * 
     *      --> implemented new interface method below that returns the id of the new record created
     * 
     * @param params
     * @param table
     * @param pk
     * @return Auto generated primary key
     */
    @Override
    public long insert(MapSqlParameterSource params, String table, String pk) {
        
        SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate.getDataSource())
                                        .withTableName(table)
                                        .usingGeneratedKeyColumns(pk);
        
        
        Number id = simpleJdbcInsert.executeAndReturnKey(params);
    
        return id.longValue();
    }
    
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
    @Override
    public Object selectImageData(String prop,Class<E> clazz, Long id){
        List<ImageData> entities = jdbcTemplate.query(environment.getProperty(prop), new Object[]{id}, (resultSet, i) -> {
                  return getImageData(resultSet);
              });
        if (entities.size() == 1) {
            return entities.get(0);
        }
        return null;        
    }

}        

