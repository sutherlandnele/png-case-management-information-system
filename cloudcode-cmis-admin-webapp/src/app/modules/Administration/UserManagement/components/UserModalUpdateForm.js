import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Card, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getRoleName, getRoleId } from "..";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'



export const UserModalUpdateForm = ({
  show,
  onSave,
  OnCancel,
  editUserId,
  isEditMode,
  setEditMode,
}) => {


  const { userEntities: users, userRoleEntities: userRoles } = useSelector((state) => state.user);


  const newUserDefaultRoleId = getRoleId(userRoles, "cmis.api.server.role.client");

  const initialValue = {
    id: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    roleId: newUserDefaultRoleId,
    enabled: true
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});


  const { username, password, first_name, last_name, email, roleId, enabled } = formValue;

  const handleCancel = () => {
    setFormValue(initialValue);
    setEditMode(false);
    OnCancel();
  };

  const handleSubmit = (e) => {

    e.preventDefault();    

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {

      //hand form errors
      setFormErrors(newErrors);

    } else {
      //there were no errors
      onSave(formValue);
      setFormValue(initialValue);
      setEditMode(false);
    }
  };

  const formValueChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });

      // Check and see if errors exist, and remove them from the error object:
      if (!!formErrors[name]) {
        setFormErrors({...formErrors,[name]: null})
      }
  };


  const findFormErrors = () => {

    const { username, first_name, last_name, roleId, password } = formValue;

    const newErrors = {};

    // username errors
    if (!username || username === "") {
      newErrors.username = "This field is required!";
    } else if (username.length > 30) {
      newErrors.username = "Username is too long!";
    }

    // first name errors
    if (!first_name || first_name === "") {
      newErrors.first_name = "This field is required!";
    } else if (first_name.length > 30) {
      newErrors.first_name = "First name is too long!";
    }

    // last name errors
    if (!last_name || last_name === "") {
      newErrors.last_name = "This field is required!";
    } else if (last_name.length > 30) {
      newErrors.last_name = "Last name is too long!";
    }
    
    // user id errors
    if (!roleId || roleId === "") {
      newErrors.roleId = "Please select a role!";
    } 

    if (!isEditMode) {
      // password errors
      if (!password || password === "") {
        newErrors.password = "This field is required!";
      } else if (last_name.length > 30) {
        newErrors.password = "Password is too long!";
      }
    }

    return newErrors;
  };


  useEffect(() => {

    setFormErrors({}); //reset form errors

    if (isEditMode) {
      let singleUser = users.find((c) => c.id === editUserId);
      setFormValue({
        ...singleUser,
        username: singleUser.username,id:editUserId
      });
    }
  }, [users, editUserId, isEditMode]);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEditMode ? "Edit " : "Create "} User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header>
            <h4>User Details</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="usernameControl" className="required">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      value={username || ""}
                      name="username"
                      readOnly={isEditMode && true}
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.username}
                    </Form.Control.Feedback>                      
                  </Form.Group>
                </Col>

                <Col lg md={12} sm={12}>
                  <Form.Group controlId="passwordControl" className= {!isEditMode? "required":""}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={password || ""}
                      type="password"
                      name="password"
                      onChange={formValueChangeHandler}
                      isInvalid={!isEditMode?!!formErrors.password:false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {!isEditMode?formErrors.password:""}
                    </Form.Control.Feedback>  
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="firstNameControl" className="required">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      value={first_name || ""}
                      name="first_name"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.first_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.first_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="lastNameControl" className="required">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      value={last_name || ""}
                      name="last_name"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.last_name}

                    />
                     <Form.Control.Feedback type="invalid">
                      {formErrors.last_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="emailControl">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email || ""}
                      name="email"
                      type="email"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <fieldset>
                    <Form.Group as={Row} className="mb-3 required">
                      <Form.Label as="legend" column sm={3}>
                        Role
                      </Form.Label>
                      <Col sm={9}>
                        {userRoles.map((v) => (
                          <Form.Check isInvalid={!!formErrors.roleId}
                            key={v.key}
                            className="mb-3"
                            type="radio"
                            label={getRoleName(userRoles, v.key)}
                            name="roleId"
                            onChange={formValueChangeHandler}
                            checked={roleId === v.key}
                            value={v.key}
                            id={v.key}
                          />
                        ))}
                      </Col>
                    <div style={{color:"red"}}>
                      {formErrors.roleId}
                    </div>
                    </Form.Group>

                  </fieldset>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col lg={2} md={2} sm={2}>

                  <BootstrapSwitchButton
                    onstyle="outline-success"
                    width={95} 
                    offstyle="outline-danger"  
                    checked={enabled}
                    onlabel="Enabled"
                    offlabel="Disabled"
                    onChange={(checked) => {
                      setFormValue({
                        ...formValue,
                        enabled: checked
                      });
                    }}
                  />
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <div className="float-right">
                    <Button type="submit" variant="primary">
                      Save
                    </Button>{" "}
                    <Button onClick={handleCancel} variant="secondary">
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
