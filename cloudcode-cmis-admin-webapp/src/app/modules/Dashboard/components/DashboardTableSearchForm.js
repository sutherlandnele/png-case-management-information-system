import React, { useState, useRef } from "react";
import { Button, Form, Col, Card } from "react-bootstrap";

export function DashboardTableSearchForm(props) {
  const queryParamsInitialState = {
    client_code: undefined,
    first_name: undefined,
    last_name: undefined,
    ur_number: undefined,
    dsp_color_id: undefined,
  };

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
    const { name, value } = event.target;
    setQueryParams({ ...queryParams, [name]: value });
  };

  return (


      <Card>
        <Card.Header>
          <h4>Filter Summary Listing</h4>
        </Card.Header>
        <Card.Body>
          <Form ref={searchFormRef}>
            <Form.Row>
              <Col lg md={12} sm={12}>
                <Form.Group controlId="firstNameControl">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="first_name"
                    onChange={formValueChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col lg md={12} sm={12}>
                <Form.Group controlId="lastNameControl">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="last_name"
                    onChange={formValueChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col lg md={12} sm={12}>
                <Form.Group controlId="clientCodeSearchControl">
                  <Form.Label>Indentification Code</Form.Label>
                  <Form.Control
                    name="client_code"
                    onChange={formValueChangeHandler}
                  />
                </Form.Group>
              </Col>              
              <Col lg md={12} sm={12}>
                <Form.Group controlId="urNumberControl">
                  <Form.Label>UR #</Form.Label>
                  <Form.Control
                    name="ur_number"
                    onChange={formValueChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col lg md={12} sm={12}>
                <Form.Group controlId="dspIdControl">
                  <Form.Label>Durable Solution Id</Form.Label>
                  <Form.Control
                    as="select"
                    name="dsp_color_id"
                    onChange={formValueChangeHandler}
                  >
                    <option value="">-- Select --</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="green">Green</option>
                  </Form.Control>
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
