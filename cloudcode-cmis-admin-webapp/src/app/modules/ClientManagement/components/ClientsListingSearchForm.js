import React, { useState, useRef } from "react";
import { Button, Form, Col, Card} from "react-bootstrap";
import { kind } from "../../Administration/ReferenceInfoManagement";


export function ClientsListingSearchForm(props) {

 
  const countries = props.refData.filter(x => x.kind_code === kind.COUNTRY);

  const rsdStatuses = props.refData.filter(x => x.kind_code === kind.RSD_STATUS);



  const queryParamsInitialState = { 
    client_code: undefined,
    first_name:undefined, 
    last_name:undefined, 
    ur_number:undefined, 
    country_id:undefined, 
    rsd_status_id:undefined, 
    dsp_status_id:undefined

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

    const {name,value} =event.target;

    setQueryParams({...queryParams, [name]: value})

  }

  return (
    
    <Card>
      <Card.Header>
        <h4>Search Clients</h4>
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
            <Col lg md={12} sm={12}>
              <Form.Group controlId="urNumberControl">
                <Form.Label>UR #</Form.Label>
                <Form.Control name="ur_number" onChange={formValueChangeHandler} />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="clientCodeSearchControl">
                <Form.Label>Identification Code</Form.Label>
                <Form.Control name="client_code" onChange={formValueChangeHandler} />
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="rsdStatusControl">
                <Form.Label>Refugee Status</Form.Label>
                <Form.Control as="select" name="rsd_status_id" onChange={formValueChangeHandler}>
                 <option value="">-- Select --</option>
                  {rsdStatuses.map((s, index) => (
                    <option key={index} value={s.id}>
                      {s.text}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="countryControl">
                <Form.Label>Country</Form.Label>
                <Form.Control as="select"  name="country_id" onChange={formValueChangeHandler}>
                  <option value="">-- Select --</option>
                  {countries.map((a, index) => (
                    <option key={index} value={a.id}>
                      {a.text}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            {/* <Col lg md={12} sm={12}>
              <Form.Group controlId="DSPControl">
                <Form.Label>Durable Solution Pathway Status</Form.Label>
                <Form.Control as="select"  name="dsp_status_id" onChange={formValueChangeHandler}>
                  <option value="">-- Select --</option>
                  <option value="1">Red</option>
                  <option value="2">Orange</option>
                  <option value="3">Green</option>
                </Form.Control>
              </Form.Group>
            </Col> */}
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
