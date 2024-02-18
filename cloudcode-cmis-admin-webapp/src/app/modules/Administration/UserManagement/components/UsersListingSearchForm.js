import React, { useState, useRef } from "react";
import { Button, Form, Col, Card} from "react-bootstrap";
import { getRoleName } from "..";
import { useSelector } from "react-redux";



export function UsersListingSearchForm(props) {

  const queryParamsInitialState = { 

    first_name:undefined, 
    last_name:undefined, 
    username:undefined, 
    role_id: undefined

  };

  const [queryParams, setQueryParams] = useState(queryParamsInitialState);

  const searchFormRef = useRef();

  const { userRoleEntities: userRoles } = useSelector((state) => state.user);


  const handleSearchReset = () => {

    setQueryParams(queryParamsInitialState);
    searchFormRef.current.reset();

    props.onHandleSearch(queryParamsInitialState);
    
  }

  const handleSearch = () => {

      props.onHandleSearch(queryParams);
  }

  const formValueChangeHandler = (event) =>{

    const {name,value} = event.target;

    setQueryParams({...queryParams, [name]: value})

  }

  return (
    
    <Card>
      <Card.Header>
        <h4>Search Users</h4>
      </Card.Header>
      <Card.Body>
        <Form ref={searchFormRef}>
          <Form.Row>
          <Col lg md={12} sm={12}>
              <Form.Group controlId="firstNameSearchControl">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="first_name" onChange={formValueChangeHandler} />
              </Form.Group>
            </Col>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="lastNameSearchControl">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="last_name" onChange={formValueChangeHandler} />
              </Form.Group>
            </Col>

          </Form.Row>
          <Form.Row>
            <Col lg md={12} sm={12}>
              <Form.Group controlId="roleSearchControl">
                <Form.Label>User Role</Form.Label>
                <Form.Control as="select"  name="role_id" onChange={formValueChangeHandler}>
                  <option value="">-- Select --</option>
                  {userRoles.map((kv) => (
                    <option key={kv.key} value={kv.key}>
                      {getRoleName(userRoles,kv.key)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg md={12} sm={12}>
              <Form.Group controlId="usernameSearchControl">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" onChange={formValueChangeHandler} />
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
