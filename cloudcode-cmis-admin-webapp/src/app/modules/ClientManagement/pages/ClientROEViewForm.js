import { useSubheader } from "../../../../_metronic/layout";
import React, { useEffect } from "react";
import { Button, Form, Col, Card, CardDeck, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { SelectedClientDetails } from "..";
import { useSelector, useDispatch } from "react-redux";
import { clientEngagementSagaActions} from "..";


export const ClientROEViewForm = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Engagement Details");

  const history = useHistory();
  const location = useLocation();

  const {engagement: {foundEngagement: currentEngagement}, auth: {user}} = useSelector(state => state);

  const dispatch = useDispatch();

  //need to pass this via use useHistory Hook
  const {roeId, currentClient} = location.state;


  const handleCancel = () => {
    history.push({
      pathname:
        "/client-management/client-roe-management/client-roes-view-listing",
      state: { clientId: currentClient.id },
    });
  };

  

  useEffect(() => {

    if(user.roleCode === "SRM"){
      dispatch(clientEngagementSagaActions.fetchSrmEngagementById(roeId, user.caseWorkerId));

    }
    else{
      dispatch(clientEngagementSagaActions.fetchEngagementById(roeId));

    }

   
  }, [dispatch,roeId, user.roleCode, user.caseWorkerId]);

  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h4> Engagement Details</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Row>
                <Col>
                  <div className="float-right">

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
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                      value={currentEngagement.engagement_purpose || ""}
                      as="textarea"
                      rows={10}
                      name="engagement_purpose"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="engagementDiscussionControl">
                    <Form.Label>Engagement Discussion</Form.Label>
                    <Form.Control
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                      value={currentEngagement.engagement_discussion || ""}
                      as="textarea"
                      rows={10}
                      name="engagement_discussion"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="actionsAndOwnershipControl">
                    <Form.Label>Actions &amp; Ownership</Form.Label>
                    <Form.Control
                      value={currentEngagement.actions_and_ownership || ""}
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                    
                      as="textarea"
                      rows={10}
                      name="actions_and_ownership"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="nextAppointmentDateControl">
                    <Form.Label>Next Appointment Date</Form.Label>
                    <Form.Control
                      value={currentEngagement.next_appointment_date_time || ""}
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                     
                      as="textarea"
                      rows={10}
                      name="next_appointment_date_time"
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <div className="float-right">
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
      </Col>
    </CardDeck>
  );
};
