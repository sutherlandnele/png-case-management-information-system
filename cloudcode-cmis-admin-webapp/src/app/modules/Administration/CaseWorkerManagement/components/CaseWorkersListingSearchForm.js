import React, { useState, useRef } from "react";
import { Button, Form, Col, Card} from "react-bootstrap";


export function CaseWorkersListingSearchForm(props) {

  const queryParamsInitialState = { 

    first_name:undefined, 
    last_name:undefined

  };

  const [queryParams, setQueryParams] = useState(queryParamsInitialState);

  const searchFormRef = useRef();


  const handleSearchReset = () => {

    setQueryParams(queryParamsInitialState);
    searchFormRef.current.reset();

    props.onHandleSearch(queryParamsInitialState);
    
  }

  const handleSearch = () => {

      props.onHandleSearch(queryParams);
  }

  const formValueChangeHandler = (event) =>{
    let {name, value} = event.target;
    setQueryParams({...queryParams, [name]: value})

  }

  return (
    
    <Card>
      <Card.Header>
        <h4>Search Status Resolution Managers</h4>
      </Card.Header>
      <Card.Body>
        <Form ref={searchFormRef}>
          <Form.Row>
          <Col lg md={12} sm={12}>
              <Form.Group controlId="firstNameControl">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="first_name" onChange={formValueChangeHandler} />
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="lastNameControl">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="last_name" onChange={formValueChangeHandler} />
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
