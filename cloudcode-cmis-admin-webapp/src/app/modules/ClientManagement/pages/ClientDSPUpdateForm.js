import { useSubheader } from "../../../../_metronic/layout";
import React, { useState, useEffect } from "react";
import { Button, Form, Col, Card, CardDeck, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { SelectedClientDetails } from "..";
import { styles } from "..";
import { useSelector, useDispatch } from "react-redux";
import { dspSagaActions } from "..";
import {
  getRefId,
  getRefDesc,
  getRefText,
} from "../../Administration/ReferenceInfoManagement";
import RelatedDocuments from "../components/RelatedDocuments";

export const ClientDSPUpdateForm = (props) => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Create or Update Durable Solution Pathway Details");

  const dispatch = useDispatch();
  const {
    reference,
    dsp,
    auth: { user },
  } = useSelector((state) => state);
  const { entities: dsps } = dsp;
  const { entities: refs } = reference;

  const history = useHistory();
  const location = useLocation();
  const { isDspEditMode, currentClient } = location.state;

  const initialValue = {
    id: 0,
    client_id: currentClient.id,
    case_worker_id: currentClient.assigned_case_worker_id,
    phsyco_social_summary: undefined,
    durable_solution_discussion: undefined,
    barriers_and_solutions: undefined,
    durable_solution_id: getRefId(refs, "red"),
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [indicatorDisplay, setIndicatorDisplay] = useState({
    indicatorText: "Not Identified",
    indicatorValue: getRefId(refs, "red"),
    indicatorColor: "red",
  });

  const {
    phsyco_social_summary,
    durable_solution_discussion,
    barriers_and_solutions,
    durable_solution_id,
  } = formValue;

  const handleCancel = () => {
    history.push({
      pathname: "/client-management",
    });
  };

  const handleSubmit = () => {
    if (user.roleCode === "SRM") {
      if (isDspEditMode) {
        const singleDsp = dsps.find((d) => d.client_id === currentClient.id); //1-1 mapping between dsp and client so get first matched record using js array find method
        dispatch(
          dspSagaActions.updateSrmClientDsp(
            singleDsp.id,
            user.caseWorkerId,
            formValue
          )
        );
      } else {
        dispatch(
          dspSagaActions.createSrmClientDsp(user.caseWorkerId, formValue)
        );
        handleCancel();
      }
    } else {
      if (isDspEditMode) {
        const singleDsp = dsps.find((d) => d.client_id === currentClient.id); //1-1 mapping between dsp and client so get first matched record using js array find method
        dispatch(dspSagaActions.updateClientDsp(singleDsp.id, formValue));
      } else {
        dispatch(dspSagaActions.createClientDsp(formValue));
        handleCancel();
      }
    }
  };

  const formValueChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "durable_solution_id") {
      const red = getRefId(refs, "red");
      const orange = getRefId(refs, "orange");
      const green = getRefId(refs, "green");

      switch (Number(value)) {
        case red:
          setIndicatorDisplay({
            indicatorText: getRefDesc(refs, red),
            indicatorValue: red,
            indicatorColor: getRefText(refs, red).toLowerCase(),
          });
          break;
        case orange:
          setIndicatorDisplay({
            indicatorText: getRefDesc(refs, orange),
            indicatorValue: red,
            indicatorColor: getRefText(refs, orange).toLowerCase(),
          });
          break;
        case green:
          setIndicatorDisplay({
            indicatorText: getRefDesc(refs, green),
            indicatorValue: red,
            indicatorColor: getRefText(refs, green).toLowerCase(),
          });
          break;
        default:
          break;
      }
    }
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if (isDspEditMode) {
      const singleDsp = dsps.find((d) => d.client_id === currentClient.id); //1-1 mapping between dsp and client so get first matched record using js array find method
      setFormValue(singleDsp);
      const dspId = singleDsp.durable_solution_id;
      setIndicatorDisplay({
        indicatorText: getRefDesc(refs, dspId),
        indicatorValue: dspId,
        indicatorColor: getRefText(refs, dspId).toLowerCase(),
      });
    }
  }, [isDspEditMode, dsps, currentClient.id, refs]);

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
                    <Button onClick={handleSubmit} variant="primary">
                      Save
                    </Button>{" "}
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
                      onChange={formValueChangeHandler}
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
                      onChange={formValueChangeHandler}
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
                      onChange={formValueChangeHandler}
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
                      onChange={formValueChangeHandler}
                      checked={
                        Number(durable_solution_id) === getRefId(refs, "red")
                      }
                      value={getRefId(refs, "red")}
                      id="red"
                    />
                    <Form.Check
                      type="radio"
                      className="mb-3"
                      label="Non-Verified"
                      name="durable_solution_id"
                      onChange={formValueChangeHandler}
                      checked={
                        Number(durable_solution_id) === getRefId(refs, "orange")
                      }
                      value={getRefId(refs, "orange")}
                      id="orange"
                    />
                    <Form.Check
                      type="radio"
                      label="Verified"
                      name="durable_solution_id"
                      onChange={formValueChangeHandler}
                      checked={
                        Number(durable_solution_id) === getRefId(refs, "green")
                      }
                      value={getRefId(refs, "green")}
                      id="green"
                    />
                  </Col>
                </Form.Group>
              </fieldset>

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
        <RelatedDocuments docListType="dsp" />
      </Col>
    </CardDeck>
  );
};
