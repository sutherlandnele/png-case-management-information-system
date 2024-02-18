import { useSubheader } from "../../../../_metronic/layout";
import React, { useState, useEffect } from "react";
import { Button, Form, Col, Card, CardDeck, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { SelectedClientDetails } from "..";
import { styles } from "..";
import { useSelector } from "react-redux";
import {
  getRefId,
  getRefDesc,
  getRefText,
} from "../../Administration/ReferenceInfoManagement";
import { isEmpty } from "lodash";

export const ClientDSPViewForm = (props) => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Durable Solution Pathway Details");

  const history = useHistory();

  const {
    reference: { entities: refs },
    dsp: { foundDsp: currentDsp },
    client: { foundClient: currentClient },
  } = useSelector((state) => state);

  const [formValue, setFormValue] = useState({});
  const [indicatorDisplay, setIndicatorDisplay] = useState({});

  const {
    phsyco_social_summary,
    durable_solution_discussion,
    barriers_and_solutions,
    durable_solution_id,
  } = formValue;

  const handleCancel = () => {
    history.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    if (!isEmpty(currentDsp)) {
      setFormValue(currentDsp);
      setIndicatorDisplay({
        indicatorText: getRefDesc(refs, currentDsp.durable_solution_id),
        indicatorValue: currentDsp.durable_solution_id,
        indicatorColor: getRefText(
          refs,
          currentDsp.durable_solution_id
        ).toLowerCase(),
      });
    } else {
      setFormValue({
        phsyco_social_summary: undefined,
        durable_solution_discussion: undefined,
        barriers_and_solutions: undefined,
        durable_solution_id: getRefId(refs, "red"),
      });

      setIndicatorDisplay({
        indicatorText: "Not Identified",
        indicatorValue: getRefId(refs, "red"),
        indicatorColor: "red",
      });
    }
  }, [refs, currentDsp]);

  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>
        <Card>
          <Card.Header>
            <h4>Durable Solution Pathway Details</h4>
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
              <Form.Group as={Row} className="mb-3 mt-3">
                <Form.Label as="legend" column sm={3}>
                  Durable Solution Pathway Indicator
                </Form.Label>
                <Col sm={9}>
                  <div
                    className={`${styles.dspIndicator}`}
                    style={{ backgroundColor: indicatorDisplay.indicatorColor }}
                  >
                    <h4>{indicatorDisplay.indicatorText}</h4>
                  </div>
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
                      style={{ backgroundColor: "#ccc" }}
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
                      style={{ backgroundColor: "#ccc" }}
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
                      style={{ backgroundColor: "#ccc" }}
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
                      className="mb-3"
                      type="radio"
                      label="Not Identified"
                      name="durable_solution_id"
                      checked={
                        Number(durable_solution_id) === getRefId(refs, "red")
                      }
                      value={getRefId(refs, "red")}
                      id="red"
                      readOnly={true}
                      style={{ backgroundColor: "#ccc" }}
                    />
                    <Form.Check
                      type="radio"
                      className="mb-3"
                      label="Non-Verified"
                      name="durable_solution_id"
                      checked={
                        Number(durable_solution_id) === getRefId(refs, "orange")
                      }
                      value={getRefId(refs, "orange")}
                      id="orange"
                      readOnly={true}
                      style={{ backgroundColor: "#ccc" }}
                    />
                    <Form.Check
                      type="radio"
                      label="Verified"
                      name="durable_solution_id"
                      checked={
                        Number(durable_solution_id) === getRefId(refs, "green")
                      }
                      value={getRefId(refs, "green")}
                      readOnly={true}
                      style={{ backgroundColor: "#ccc" }}
                      id="green"
                    />
                  </Col>
                </Form.Group>
              </fieldset>

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
