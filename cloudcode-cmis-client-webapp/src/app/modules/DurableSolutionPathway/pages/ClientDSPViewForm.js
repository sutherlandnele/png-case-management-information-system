import { useSubheader } from "../../../../_metronic/layout";
import React, { useState, useEffect } from "react";
import { Button, Form, Col, Card, CardDeck, Row } from "react-bootstrap";
import { useHistory } from "react-router";
// import { SelectedClientDetails } from "..";
import { useSelector } from "react-redux";
import { getRefId, getRefDesc, getRefText } from "../../ReferenceInfoManagement";
import {styles} from "..";

export const ClientDSPViewForm = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Durable Solution Pathway");

  const {reference, dsp} = useSelector(state=> state);
  const {entity:currentDsp} = dsp;
  const {entities:refs} = reference;

 

  const history = useHistory();


  const initialValue = {

    phsyco_social_summary: undefined,
    durable_solution_discussion:undefined,
    barriers_and_solutions:undefined,
    durable_solution_id:getRefId(refs,"red")

  };

  const indicatorInit = {
    indicatorText: "Not ready yet",
    indicatorValue: getRefId(refs,"red"),
    indicatorColor: "red"
  }
  
  const [formValue, setFormValue] = useState(initialValue);
  const [indicatorDisplay, setIndicatorDisplay] = useState(indicatorInit);


  const  {
    phsyco_social_summary,
    durable_solution_discussion,
    barriers_and_solutions,
    durable_solution_id
  } = formValue;


  const handleCancel = () => {
    history.push({
      pathname: "/"
    });
  };



  const dspId = currentDsp.durable_solution_id;

  useEffect(() => {
      
      if(!!currentDsp){
        setFormValue(currentDsp);
        setIndicatorDisplay({indicatorText:getRefDesc(refs,dspId),indicatorValue:dspId,indicatorColor:getRefText(refs,dspId).toLowerCase()});
      }

  }, [currentDsp, refs,dspId]);

  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h4>My Durable Solution Pathway</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Row>
                <Col>
                  <div className="float-right">
                    <Button onClick={handleCancel} variant="secondary">
                      Close
                    </Button>
                  </div>
                </Col>
              </Form.Row>
              <Form.Group as={Row} className="mb-3 mt-3">
                  <Form.Label as="legend" column sm={3}>
                    Durable Solution Pathway Indicator 
                  </Form.Label>
                  <Col sm={9}>
                    <div className={`${styles.dspIndicator}`} style={{backgroundColor:indicatorDisplay.indicatorColor}} ><h4>{indicatorDisplay.indicatorText}</h4></div>
                  </Col>
                </Form.Group>             

              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="phsycoSocialSummaryControl">
                    <Form.Label>Psycho Social Summary</Form.Label>
                    <Form.Control
                      value={phsyco_social_summary || ""}
                      as="textarea"
                      rows={10}
                      name="phsyco_social_summary"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="durableSolutionDiscussionControl">
                    <Form.Label>Durable Solution Discussion</Form.Label>
                    <Form.Control
                      value={durable_solution_discussion || ""}
                      as="textarea"
                      rows={10}
                      name="durable_solution_discussion"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="barriersAndSolutionsControl">
                    <Form.Label>Barriers &amp; Solutions</Form.Label>
                    <Form.Control
                      value={barriers_and_solutions || ""}
                      as="textarea"
                      rows={10}
                      name="barriers_and_solutions"
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <fieldset>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column sm={2}>
                    Durable Solution Identification
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                      className="mb-3"
                      type="radio"
                      label="Not Identified"
                      name="durable_solution_id"
                      checked={Number(durable_solution_id) === getRefId(refs,"red")}
                      value={getRefId(refs,"red")}
                      id="red"
                    />
                    <Form.Check
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                      type="radio"
                      className="mb-3"
                      label="Non-Verified"
                      name="durable_solution_id"
                      checked={Number(durable_solution_id) === getRefId(refs,"orange")}
                      value={getRefId(refs,"orange")}
                      id="orange"
                    />
                    <Form.Check
                      readOnly={true}
                      style={{backgroundColor:"#ccc"}}
                      type="radio"
                      label="Verfied"
                      name="durable_solution_id"
                      checked={Number(durable_solution_id) === getRefId(refs,"green")}
                      value={getRefId(refs,"green")}
                      id="green"
                    />
                  </Col>
                </Form.Group>
              </fieldset>

              <Form.Row>
                <Col>
                  <div className="float-right">
                    <Button onClick={handleCancel} variant="secondary">
                      Close
                    </Button>
                  </div>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} md={12} sm={12}>
        {/* <SelectedClientDetails currentClient={currentClient} /> */}
      </Col>
    </CardDeck>
  );
};
