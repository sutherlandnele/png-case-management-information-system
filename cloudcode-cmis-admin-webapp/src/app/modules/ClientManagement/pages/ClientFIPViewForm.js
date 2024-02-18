import React, { useEffect, useState } from "react";
import { Button, Card, CardDeck, Col, Form, Row } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router";
import {  SelectedClientDetails } from "..";
import { useSubheader } from "../../../../_metronic/layout";
import {isEmpty} from "lodash";


export const ClientFIPViewForm = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Family Inclusion Plan Details");
  const history = useHistory();

  const {
    fip: { foundFip: currentFip },
    client: { foundClient: currentClient },
  } = useSelector((state) => state);


  const [formValue, setFormValue] = useState({});

  const {relationship_status,
    client_history,
    spouse_history,
    children_history,
    custody_legal_issues,
    living_arrangement_support,
    family_inclusion_resolution
  } = formValue;


  const handleCancel = () => {
    history.push({
      pathname: "/"
    });
  };


  useEffect(() => {

    if (!isEmpty(currentFip)) {
      setFormValue(currentFip);

    } else {
      setFormValue({
        relationship_status: undefined,
        client_history:undefined,
        spouse_history:undefined,
        children_history:undefined,
        custody_legal_issues:undefined,
        living_arrangement_support:undefined,
        family_inclusion_resolution:undefined
      });
    }

  }, [currentFip]);

  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h4> Family Inclusion Plan Details</h4>
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
                  <Form.Group controlId="relationshipStatusControl">
                    <Form.Label>Relationship Status</Form.Label>
                    <Form.Control
                      value={relationship_status || ""}
                      as="textarea"
                      rows={10}
                      name="relationship_status"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="clientHistoryControl">
                    <Form.Label>Client History</Form.Label>
                    <Form.Control
                      value={client_history || ""}
                      as="textarea"
                      rows={10}
                      name="client_history"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="spouseHistoryControl">
                    <Form.Label>Spouse history</Form.Label>
                    <Form.Control
                      value={spouse_history || ""}
                      as="textarea"
                      rows={10}
                      name="spouse_history"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="childrenHistoryControl">
                    <Form.Label>Children History</Form.Label>
                    <Form.Control
                      value={children_history || ""}
                      as="textarea"
                      rows={10}
                      name="children_history"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="custodyLegalIssuesControl">
                    <Form.Label>Custody Legal Issues</Form.Label>
                    <Form.Control
                      value={custody_legal_issues || ""}
                      as="textarea"
                      rows={10}
                      name="custody_legal_issues"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="livingArrangementSupportControl">
                    <Form.Label>Living Arrangement Support</Form.Label>
                    <Form.Control
                      value={living_arrangement_support || ""}
                      as="textarea"
                      rows={10}
                      name="living_arrangement_support"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="familyInclusionResolutionControl">
                    <Form.Label>Family Inclusion Resolution</Form.Label>
                    <Form.Control
                      value={family_inclusion_resolution || ""}
                      as="textarea"
                      rows={10}
                      name="family_inclusion_resolution"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}                      />
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
