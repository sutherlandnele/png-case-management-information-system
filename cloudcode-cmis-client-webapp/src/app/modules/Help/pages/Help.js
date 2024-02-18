import { useSubheader } from "../../../../_metronic/layout";
import React /*{ useEffect }*/ from "react";
import { Card, Accordion, CardDeck } from "react-bootstrap";
import { ArrowRight, QuestionCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux";
// import {actions as agencySagaActions} from "../redux/agencySaga";

export const Help = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Help Information");

  // const dispatch = useDispatch();

  // const {agency} = useSelector(state => state);
  // const {entities: agencies} = agency;

  // useEffect(()=>{
  //   dispatch(agencySagaActions.fetchAgencies());
  // },[dispatch]);

   

  return (
    <CardDeck>
      <Card>
        <Card.Header>
          <h4>
            <QuestionCircle size={24} className="mr-4" />
            How Do I ...
          </h4>
        </Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <h5>
                  <ArrowRight className="m-4" />
                  Submit my feedback
                </h5>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>
                    You submit your feedback using the {" "}
                    <Link to="/feedback">Feedback Submission</Link> form.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                <h5>
                  <ArrowRight className="m-4" />
                  View my case details
                </h5>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                <p>
                  Click on one of the links describing your case to view further information about it.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                <h5>
                  <ArrowRight className="m-4" />
                  Change my login password 
                </h5>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                <p>
                  Use the feedback form to submit your password change request and we will reset the password for you. The self password reset feature is currently not available, but will have this feature available in the near future.
                 </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};
