import React from "react";
import { Button, Card, CardDeck, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useSubheader } from "../../../../_metronic/layout";
import { getCaseWorkerName } from "../../Administration/CaseWorkerManagement";
import { getClientName } from "../../ClientManagement";
import { getDateString } from "../../../Helpers";

export const ClientFeedbackViewForm = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Feedback Details");
  
  const {
    caseWorker: { entities: caseWorkers },
    client: { entities: clients },
  } = useSelector((state) => state);
   

  const history = useHistory();
  const location = useLocation();
  const {feedback} = location.state;

  const {client_id, created_date, case_worker_id, text} = feedback;

 
  const handleCancel = () => {
    history.push({
      pathname: "/feedback"
    });
  };



  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={12} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h4> Feedback Details</h4>
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
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="clientNameControl">
                    <Form.Label>Client</Form.Label>
                    <Form.Control
                      value={getClientName(clients, client_id) || ""}
                      name="client_id"
                      readOnly={true}
                    />
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="createdDateControl">
                    <Form.Label>Submitted Date &amp; Time</Form.Label>
                    <Form.Control
                      value={getDateString(created_date,"DD/MM/yyyy HH:mm:ss") || ""}
                      name="created_date"
                      readOnly={true}
                    />
                  </Form.Group>
                </Col>     
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="srmControl">
                    <Form.Label>Assigned Status Resolution Manager</Form.Label>
                    <Form.Control
                      value={getCaseWorkerName(caseWorkers, case_worker_id) || ""}
                      name="case_worker_id"
                      readOnly={true}
                    />
                  </Form.Group>
                </Col>                           
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="textControl">
                    <Form.Label>Feedback Message Body</Form.Label>
                    <Form.Control
                      value={text || ""}
                      as="textarea"
                      rows={10}
                      name="text"
                      readOnly={true}
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

    </CardDeck>
  );
};
