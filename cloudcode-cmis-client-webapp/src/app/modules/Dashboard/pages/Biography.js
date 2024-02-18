import React from "react";
import {  Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getRefText } from "../../ReferenceInfoManagement"; 
import Moment from 'moment';



function Biography(props) {
   
  const {reference, caseWorker, client}  = useSelector(state => state);

  const {entities:refs} = reference;
  const {entity: cw} = caseWorker;
  const {foundClient: currentClient} = client;


  return (
    <Card>
      <Card.Header>
        <h5>My Bio Page</h5>
      </Card.Header>
      <Card.Body>
        <Card.Title><h2>{currentClient.first_name + " " + currentClient.last_name }</h2></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ getRefText(refs,currentClient.country_id) + " " + getRefText(refs,currentClient.rsd_status_id)}</Card.Subtitle>
        <Card.Text>
          <br/>
          Id Code: <span style={{backgroundColor:"yellow", fontWeight:"bold", padding: "4px"}}>{currentClient.client_code}</span><br/><br/>
          Date of Birth: <strong>{Moment(new Date(currentClient.date_of_birth)).format("DD/MM/yyyy")}</strong><br/><br/>
          Assigned SRM: <strong>{cw.first_name + " " + cw.second_name}</strong><br/><br/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Biography;


