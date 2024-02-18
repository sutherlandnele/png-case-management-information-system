import {useSubheader} from "../../../../_metronic/layout";
import React, { useState } from "react";
import { Button, Form, Col, Card} from "react-bootstrap";
import {BootstrapReboot} from "react-bootstrap-icons";
import { useSelector , useDispatch} from "react-redux";
//import Rate from "../components/Rate" 
import { useHistory } from "react-router-dom";
import {feedbackSagaActions} from "..";


export const FeedbackForm = (props) => {

  const suhbeader = useSubheader();
  const history = useHistory();

  //rating related
  //const [rating, setRating] = useState(0);

  suhbeader.setTitle("Feedback");

  //const [queryParams, setQueryParams] = useState(queryParamsInitialState);


  const { client : {foundClient: currentClient}}  = useSelector(state => state);

  const dispatch = useDispatch();

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    dispatch(feedbackSagaActions.createFeedback(formValue))
    history.push({pathname:"/feedback/feedback-result", state:{result:"success"}});
  }


  const handleCancelRequest = () => {
    let path = `/`; 
    history.push(path);
  }

  const initialState = {
    text:"",
    client_id:currentClient.id,
    case_worker_id: currentClient.assigned_case_worker_id
  }

  const [formValue, setFormValue] = useState(initialState);

  const formValueChangeHandler = (event) =>{
    const {name, value } = event.target;
    setFormValue({...formValue, [name]: value});
  }


  return (
    <Card>
      <Card.Header>
        <h4>
          <BootstrapReboot size={24} className="mr-4" />
          Provide your Feedback!
        </h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmitRequest}>
          {/* <Form.Row>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="fullName"
                  onChange={formValueChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={formValueChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="mobileNumer">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="mobileNumer"
                  onChange={formValueChangeHandler}
                />
              </Form.Group>
            </Col>
          </Form.Row> */}
          <Form.Row>
            <Col lg={12} md={12} sm={12}>
              <Form.Group controlId="feedbackDescription">
                <Form.Label>Describe your feedback here</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="text"
                  onChange={formValueChangeHandler}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          {/* <Form.Row>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="rating">
                <Form.Label>Rate the service.</Form.Label>
                <Rate rating={rating} onRating={(rate) => setRating(rate)} />
              </Form.Group>
            </Col>
          </Form.Row> */}
          <Button type="submit" variant="primary">
            Submit
          </Button>{" "}
          <Button onClick={handleCancelRequest} variant="secondary">
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

