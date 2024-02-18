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
public class FamilyInclusionPlan {

    private long id;
    private Integer client_id;
    private Integer case_worker_id;
    private String relationship_status;
    private String client_history;
    private String spouse_history;
    private String children_history;    
    private String custody_legal_issues;
    private String living_arrangement_support;      
    private String family_inclusion_resolution;
    private String created_by;
    private String created_date;
    private String last_updated_by;
    private String last_updated_date;

    public String toJSON() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public FamilyInclusionPlan() {
    }

    public FamilyInclusionPlan(long id, Integer client_id, Integer case_worker_id, String relationship_status, String client_history, String spouse_history, String children_history, String custody_legal_issues, String living_arrangement_support, String family_inclusion_resolution, String created_by, String created_date, String last_updated_by, String last_updated_date) {
        this.id = id;
        this.client_id = client_id;
        this.case_worker_id = case_worker_id;
        this.relationship_status = relationship_status;
        this.client_history = client_history;
        this.spouse_history = spouse_history;
        this.children_history = children_history;
        this.custody_legal_issues = custody_legal_issues;
        this.living_arrangement_support = living_arrangement_support;
        this.family_inclusion_resolution = family_inclusion_resolution;
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

    public String getRelationship_status() {
        return relationship_status;
    }

    public void setRelationship_status(String relationship_status) {
        this.relationship_status = relationship_status;
    }

    public String getClient_history() {
        return client_history;
    }

    public void setClient_history(String client_history) {
        this.client_history = client_history;
    }

    public String getSpouse_history() {
        return spouse_history;
    }

    public void setSpouse_history(String spouse_history) {
        this.spouse_history = spouse_history;
    }

    public String getChildren_history() {
        return children_history;
    }

    public void setChildren_history(String children_history) {
        this.children_history = children_history;
    }

    public String getCustody_legal_issues() {
        return custody_legal_issues;
    }

    public void setCustody_legal_issues(String custody_legal_issues) {
        this.custody_legal_issues = custody_legal_issues;
    }

    public String getLiving_arrangement_support() {
        return living_arrangement_support;
    }

    public void setLiving_arrangement_support(String living_arrangement_support) {
        this.living_arrangement_support = living_arrangement_support;
    }

    public String getFamily_inclusion_resolution() {
        return family_inclusion_resolution;
    }

    public void setFamily_inclusion_resolution(String family_inclusion_resolution) {
        this.family_inclusion_resolution = family_inclusion_resolution;
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
