import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {userSagaActions} from "../../UserManagement";
 

export const CaseWorkerModalUpdateForm = ({ show, onSave, OnCancel,editCaseWorkerId,isEditMode,setEditMode }) => {

  const initialValue = {
    id:editCaseWorkerId,
    first_name: "",
    second_name: "",
    mobile_number: "",
    phone_number: "",
    address: "",
    user_id: ""
  };

  const {
    caseWorker: { entities: caseWorkers },
    user: { keyValueUsers },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});


  const {
    first_name,
    second_name,
    mobile_number,
    phone_number,
    address,
    user_id
  } = formValue;

  const formValueChangeHandler = (event) => {
    const {name,value} =  event.target;
    setFormValue({ ...formValue, [name]: value });

    // Check and see if errors exist, and remove them from the error object:
    if (!!formErrors[name]) {
      setFormErrors({...formErrors,[name]: null})
    }
    
  };


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


  const findFormErrors = () => {

    const { first_name, second_name, user_id } = formValue;

    const newErrors = {};

    // first name errors
    if (!first_name || first_name === "") {
      newErrors.first_name = "This field is required!";
    } else if (first_name.length > 30) {
      newErrors.first_name = "First name is too long!";
    }

    // last name errors
    if (!second_name || second_name === "") {
      newErrors.second_name = "This field is required!";
    } else if (second_name.length > 30) {
      newErrors.second_name = "Second name is too long!";
    }
    
    // user id errors
    if (!user_id || user_id === "") {
      newErrors.user_id = "This field is required!";
    } 


    return newErrors;
  };


  useEffect(() => {

    setFormErrors({}); //reset form errors

    dispatch(userSagaActions.fetchSrmKvUsers());

    if(isEditMode){
      let singleCaseWorker = caseWorkers.find(c => c.id === Number(editCaseWorkerId));
      setFormValue(singleCaseWorker);
    }
   
  }, [caseWorkers,editCaseWorkerId,isEditMode, dispatch]);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEditMode? "Edit ":"Create "} Status Resolution Manager Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header>
            <h4>Status Resolution Manager Details</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
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
                    <Form.Label>Second Name</Form.Label>
                    <Form.Control
                      value={second_name || ""}
                      name="second_name"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.second_name}

                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.second_name}
                    </Form.Control.Feedback>  
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="mobileNumberControl">
                    <Form.Label>Mobile #</Form.Label>
                    <Form.Control
                      value={mobile_number || ""}
                      name="mobile_number"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="phoneNumberControl">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      value={phone_number || ""}                    
                      name="phone_number"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="addressControl">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      value={address || ""}
                      as="textarea"
                      rows={3}
                      name="address"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>

                <Col lg md={12} sm={12}>
                  <Form.Group controlId="userControl" className="required">
                    <Form.Label>Related User Id</Form.Label>
                    <Form.Control
                      value={user_id || ""}
                      as="select"
                      name="user_id"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.user_id}
                    >
                      <option value="">-- Select --</option>
                      {keyValueUsers.map((kv, i) => (
                        <option key={i} value={kv.key}>
                          {kv.value}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.user_id}
                    </Form.Control.Feedback>                     
                    <Form.Text id="userControlHelp" muted>
                      Make sure you assign the correct user id to this SRM.
                      Because an incorrect assignment will cause the SRM to
                      see another SRM's client information.
                    </Form.Text>
                  </Form.Group>
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
