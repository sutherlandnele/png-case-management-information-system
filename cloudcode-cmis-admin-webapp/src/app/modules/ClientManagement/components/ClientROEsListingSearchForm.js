import React, { useState, useRef } from "react";
import { Button, Form, Col, Card} from "react-bootstrap";


export function ClientROEsListingSearchForm(props) {



  const queryParamsInitialState = { 

    from_date:undefined, 
    to_date:undefined

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

      <Card.Body>
        <Form ref={searchFormRef}>
          <Form.Row>
          <Col lg={12} md={12} sm={12}>
            <h4>Search Engagements</h4>
            </Col>
          </Form.Row>
          <Form.Row>
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
