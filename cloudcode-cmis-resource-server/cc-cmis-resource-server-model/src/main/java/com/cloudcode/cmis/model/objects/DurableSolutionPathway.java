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
package com.cloudcode.cmis.model.objects;

import com.google.gson.Gson;
import java.util.Date;

/**
 *
 * @author Sutherland Nele <sutherland.nele@cloudcode.com.pg>
 * 
 */
public class DurableSolutionPathway {

    private long id;
    private Integer client_id;
    private Integer case_worker_id;    
    private String phsyco_social_summary;
    private String durable_solution_discussion;
    private String barriers_and_solutions;
    private Integer durable_solution_id;      
    private String created_by;    
    private String created_date;
    private String last_updated_by;
    private String last_updated_date;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public DurableSolutionPathway() {
    }

    public DurableSolutionPathway(long id, Integer client_id, Integer case_worker_id, String phsyco_social_summary, String durable_solution_discussion, String barriers_and_solutions, Integer durable_solution_id, String created_by, String created_date, String last_updated_by, String last_updated_date) {
        this.id = id;
        this.client_id = client_id;
        this.case_worker_id = case_worker_id;
        this.phsyco_social_summary = phsyco_social_summary;
        this.durable_solution_discussion = durable_solution_discussion;
        this.barriers_and_solutions = barriers_and_solutions;
        this.durable_solution_id = durable_solution_id;
        this.created_by = created_by;
        this.created_date = created_date;
        this.last_updated_by = last_updated_by;
        this.last_updated_date = last_updated_date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getClient_id() {
        return client_id;
    }

    public void setClient_id(Integer client_id) {
        this.client_id = client_id;
    }

    public Integer getCase_worker_id() {
        return case_worker_id;
    }

    public void setCase_worker_id(Integer case_worker_id) {
        this.case_worker_id = case_worker_id;
    }

    public String getPhsyco_social_summary() {
        return phsyco_social_summary;
    }

    public void setPhsyco_social_summary(String phsyco_social_summary) {
        this.phsyco_social_summary = phsyco_social_summary;
    }

    public String getDurable_solution_discussion() {
        return durable_solution_discussion;
    }

    public void setDurable_solution_discussion(String durable_solution_discussion) {
        this.durable_solution_discussion = durable_solution_discussion;
    }

    public String getBarriers_and_solutions() {
        return barriers_and_solutions;
    }

    public void setBarriers_and_solutions(String barriers_and_solutions) {
        this.barriers_and_solutions = barriers_and_solutions;
    }

    public Integer getDurable_solution_id() {
        return durable_solution_id;
    }

    public void setDurable_solution_id(Integer durable_solution_id) {
        this.durable_solution_id = durable_solution_id;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getCreated_date() {
        return created_date;
    }

    public void setCreated_date(String created_date) {
        this.created_date = created_date;
    }

    public String getLast_updated_by() {
        return last_updated_by;
    }

    public void setLast_updated_by(String last_updated_by) {
        this.last_updated_by = last_updated_by;
    }

    public String getLast_updated_date() {
        return last_updated_date;
    }

    public void setLast_updated_date(String last_updated_date) {
        this.last_updated_date = last_updated_date;
    }

    
}
