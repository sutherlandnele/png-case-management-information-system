import React, { useEffect, useState } from "react";
import { Button, Card, CardDeck, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { fipSagaActions, SelectedClientDetails } from "..";
import { useSubheader } from "../../../../_metronic/layout";
import RelatedDocuments from "../components/RelatedDocuments";


export const ClientFIPUpdateForm = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Create or Update Family Inclusion Plan Details");
  
  const dispatch = useDispatch();

  const {fip: {entities:fips}, auth: {user}} = useSelector(state=> state);

  const history = useHistory();
  const location = useLocation();
  const {isFipEditMode, currentClient} = location.state;

  const initialValue = {
    id: 0,
    client_id: currentClient.id,
    case_worker_id: currentClient.assigned_case_worker_id,
    relationship_status: undefined,
    client_history:undefined,
    spouse_history:undefined,
    children_history:undefined,
    custody_legal_issues:undefined,
    living_arrangement_support:undefined,
    family_inclusion_resolution:undefined
  };

  const [formValue, setFormValue] = useState(initialValue);

  const {relationship_status,
    client_history,
    spouse_history,
    children_history,
    custody_legal_issues,
    living_arrangement_support,
    family_inclusion_resolution
  } = formValue;




  const formValueChangeHandler = (event) => {
    const {name,value} =  event.target;
    setFormValue({ ...formValue, [name]: value });
  };




  const handleCancel = () => {
    history.push({
      pathname: "/client-management"
    });
  };


  const handleSubmit = () => {


    if(user.roleCode === "SRM"){

      if(isFipEditMode)
      {
        const singleFip = fips.find((f) => f.client_id === currentClient.id); //1-1 mapping between fip and client so get first matched record using js array find method
        dispatch(fipSagaActions.updateSrmClientFip(singleFip.id, user.caseWorkerId, formValue));
      }
      else
      {
        dispatch(fipSagaActions.createSrmClientFip(user.caseWorkerId, formValue));
        handleCancel();
      }
  
    }
    else{
      if(isFipEditMode)
      {
        const singleFip = fips.find((f) => f.client_id === currentClient.id); //1-1 mapping between fip and client so get first matched record using js array find method
        dispatch(fipSagaActions.updateClientFip(singleFip.id, formValue));
      }
      else
      {
        dispatch(fipSagaActions.createClientFip(formValue));
        handleCancel();
      }
  
    }





  };

  useEffect(() => {
    if (isFipEditMode) {
      const singleFip = fips.find((f) => f.client_id === currentClient.id); //1-1 mapping between fip and client so get first matched record using js array find method
      setFormValue(singleFip);
    }
  }, [isFipEditMode, fips, currentClient.id]);

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
                  <Button onClick={handleSubmit} variant="primary">
                    Save
                  </Button>{" "}
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
                      onChange={formValueChangeHandler}
                    />
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
                      onChange={formValueChangeHandler}
                    />
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
                      onChange={formValueChangeHandler}
                    />
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
                      onChange={formValueChangeHandler}
                    />
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
                      onChange={formValueChangeHandler}
                    />
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
                      onChange={formValueChangeHandler}
                    />
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
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <div className="float-right">
                  <Button onClick={handleSubmit} variant="primary">
                    Save
                  </Button>{" "}
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
        <RelatedDocuments docListType="fip"/>

      </Col>
    </CardDeck>
  );
};
