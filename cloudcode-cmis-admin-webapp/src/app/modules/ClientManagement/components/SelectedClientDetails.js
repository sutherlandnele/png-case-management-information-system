import React, {useEffect} from "react";
import {  Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getRefText } from "../../Administration/ReferenceInfoManagement"; 
import Moment from 'moment';
import { caseWorkerSagaActions } from "../../Administration/CaseWorkerManagement";

function SelectedClientDetails({currentClient}) {
  
  const dispatch = useDispatch();
  const {
    reference: { entities: refs },
    caseWorker: { foundCaseWorker },
    auth: {user}
  } = useSelector((state) => state);


useEffect(() => {
  if(user.roleCode === "SRM"){
    dispatch(caseWorkerSagaActions.fetchSrmCaseWorker(currentClient.id, user.caseWorkerId));
  }
  else{
    dispatch(caseWorkerSagaActions.fetchCaseWorker(currentClient.id));   
  }
  
}, [dispatch,currentClient.id,user.caseWorkerId,user.roleCode]);


  return (
    <Card className="mb-4">
      <Card.Header>
        <h5>Client Info</h5>
      </Card.Header>
      <Card.Body>
        <Card.Title><h2>{currentClient.first_name + " " + currentClient.last_name }</h2></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ getRefText(refs,currentClient.country_id) + " " + getRefText(refs,currentClient.rsd_status_id)}</Card.Subtitle>
        <Card.Text>
          <br/>
          Id Code: <span style={{backgroundColor:"yellow", fontWeight:"bold", padding: "4px"}}>{currentClient.client_code}</span><br/><br/>
          Date of Birth: <strong>{Moment(new Date(currentClient.date_of_birth)).format("DD/MM/yyyy")}</strong><br/><br/>
          Assigned SRM: <strong>{foundCaseWorker.first_name + " " + foundCaseWorker.second_name}</strong><br/><br/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SelectedClientDetails;


