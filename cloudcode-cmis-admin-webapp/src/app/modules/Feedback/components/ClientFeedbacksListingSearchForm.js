import React, { useState, useRef } from "react";
import { Button, Form, Col, Card } from "react-bootstrap";
import {  useSelector } from "react-redux";

export function ClientFeedbacksListingSearchForm(props) {
  const queryParamsInitialState = {
    client_id: undefined,
    case_worker_id: undefined,
  };


  const { client, caseWorker, auth:{user} } = useSelector((state) => state);

  const clients = client.entities;
  const caseWorkers = caseWorker.entities;

  const [queryParams, setQueryParams] = useState(queryParamsInitialState);

  const searchFormRef = useRef();

  const handleSearchReset = () => {
    setQueryParams(queryParamsInitialState);
    searchFormRef.current.reset();

    props.onHandleSearch(queryParamsInitialState);
  };

  const handleSearch = () => {
    props.onHandleSearch(queryParams);
  };

  const formValueChangeHandler = (event) => {
    let { name, value } = event.target;
    setQueryParams({ ...queryParams, [name]: value });
  };

  // useEffect(() => {
  //   dispatch(clientSagaActions.fetchClients());
  //   dispatch(caseWorkerSagaActions.fetchCaseWorkers());
  // }, [dispatch]);

  return (
    <Card>
      <Card.Header><h4>Search Client Feedbacks</h4></Card.Header>
      <Card.Body>
        <Form ref={searchFormRef}>
          <Form.Row>

            {user.roleCode !== "SRM" &&

            <Col lg md={12} sm={12}>
              <Form.Group controlId="caseWorkerControl">
                <Form.Label>Status Resolution Manager</Form.Label>
                <Form.Control
                  as="select"
                  name="case_worker_id"
                  onChange={formValueChangeHandler}
                >
                  <option value="">-- Select --</option>
                  {caseWorkers.map((cw, index) => (
                    <option key={index} value={cw.id}>
                      {cw.first_name + " " + cw.second_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            
            }


            <Col lg md={12} sm={12}>
              <Form.Group controlId="clientControl">
                <Form.Label>Client</Form.Label>
                <Form.Control
                  as="select"
                  name="client_id"
                  onChange={formValueChangeHandler}
                >
                  <option value="">-- Select --</option>
                  {clients.map((c, index) => (
                    <option key={index} value={c.id}>
                      {c.first_name + " " + c.last_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="fromDateControl">
                <Form.Label>From</Form.Label>
                <Form.Control type="date" name="from_date" onChange={formValueChangeHandler} />

              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="toDateControl">
                <Form.Label>To</Form.Label>
                <Form.Control type="date" name="to_date" onChange={formValueChangeHandler} />
              </Form.Group>
            </Col>
          </Form.Row>
          <Button onClick={handleSearch} variant="primary">
            Search
          </Button>{" "}
          <Button onClick={handleSearchReset} variant="secondary">
            Reset
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
