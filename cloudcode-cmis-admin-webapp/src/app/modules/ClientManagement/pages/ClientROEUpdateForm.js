import { useSubheader } from "../../../../_metronic/layout";
import React, { useState, useEffect } from "react";
import { Button, Form, Col, Card, CardDeck, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { SelectedClientDetails } from "..";
import { useSelector, useDispatch } from "react-redux";
import { clientEngagementSagaActions} from "..";
import RelatedDocuments from "../components/RelatedDocuments";


export const ClientROEUpdateForm = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Create or Update Engagement Details");

  const history = useHistory();
  const location = useLocation();

  const {engagement: {entities: engagements}, auth: {user}} = useSelector(state => state);
  const dispatch = useDispatch();

  //need to pass this via use useHistory Hook
  const {roeId, currentClient, isEditMode, isReadOnly} = location.state;

  const initialValue = {
    id:roeId,
    client_id: currentClient.id,
    case_worker_id: currentClient.assigned_case_worker_id,
    engagement_purpose: "",
    engagement_discussion: "",
    actions_and_ownership: "",
    next_appointment_date_time: ""
  };

  const [formValue, setFormValue] = useState(initialValue);

  const {engagement_purpose,
    engagement_discussion,
    actions_and_ownership,
    next_appointment_date_time} = formValue;

  const handleCancel = () => {
    history.push({
      pathname: "/client-management/client-roe-management/client-roes-listing",
      state: currentClient,
    });
  };

  const handleSubmit = () => {
    if(isEditMode)
    {
      dispatch(clientEngagementSagaActions.updateClientEngagement(roeId, formValue));
    }
    else
    {

      if(user.roleCode === "SRM"){
        dispatch(clientEngagementSagaActions.createSrmClientEngagement(user.caseWorkerId,formValue));
  
      }
      else{
        dispatch(clientEngagementSagaActions.createClientEngagement(formValue));
  
      }

      handleCancel();
    }
  };

  const formValueChangeHandler = (event) => {
    const {name,value} =  event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if(isEditMode){
      let singleEngagement = engagements.find(c => c.id === Number(roeId));
      setFormValue(singleEngagement);
    }
   
  }, [engagements,roeId,isEditMode]);

  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h4>{isEditMode?"Edit ": "Create New "} Engagement Details</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Row>
                <Col>
                  <div className="float-right">
                  {!isReadOnly && <Button onClick={handleSubmit} variant="primary">
                    Save
                  </Button>}{" "}
                  <Button onClick={handleCancel} variant="secondary">
                    Back
                  </Button>
                  </div>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="engagementPurposeControl">
                    <Form.Label>Engagement Purpose</Form.Label>
                    <Form.Control
                      readOnly={isReadOnly}
                      style={{backgroundColor:isReadOnly?"#ccc":"white"}}
                      value={engagement_purpose || ""}
                      as="textarea"
                      rows={10}
                      name="engagement_purpose"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="engagementDiscussionControl">
                    <Form.Label>Engagement Discussion</Form.Label>
                    <Form.Control
                      readOnly={isReadOnly}
                      style={{backgroundColor:isReadOnly?"#ccc":"white"}}
                      value={engagement_discussion || ""}
                      as="textarea"
                      rows={10}
                      name="engagement_discussion"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="actionsAndOwnershipControl">
                    <Form.Label>Actions &amp; Ownership</Form.Label>
                    <Form.Control
                      value={actions_and_ownership || ""}
                      readOnly={isReadOnly}
                      style={{backgroundColor:isReadOnly?"#ccc":"white"}}                      
                      as="textarea"
                      rows={10}
                      name="actions_and_ownership"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="nextAppointmentDateControl">
                    <Form.Label>Next Appointment Date</Form.Label>
                    <Form.Control
                      value={next_appointment_date_time || ""}
                      readOnly={isReadOnly}
                      style={{backgroundColor:isReadOnly?"#ccc":"white"}}                      
                      as="textarea"
                      rows={10}
                      name="next_appointment_date_time"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <div className="float-right">
                  {!isReadOnly && <Button onClick={handleSubmit} variant="primary">
                    Save
                  </Button>}{" "}
                  <Button onClick={handleCancel} variant="secondary">
                    Back
                  </Button>
                  </div>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} md={12} sm={12}>
        <SelectedClientDetails currentClient={currentClient} />
        <RelatedDocuments docListType="roe"/>

      </Col>
    </CardDeck>
  );
};
