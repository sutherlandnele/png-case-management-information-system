import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getKindRefs, kind } from "../../Administration/ReferenceInfoManagement";
import { getDateString} from "../../../Helpers";
 


export const ClientModalUpdateForm = ({ isAdmin, show, onSave, OnCancel,editClientId,isEditMode,setEditMode }) => {

  const initialValue = {
    id:editClientId,
    client_code:"",
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    language_id: "",
    gender_id: "",
    country_id: "",
    rsd_status_id: "",
    marital_status_id: "",
    visa_number: "",
    assigned_case_worker_id: "",
    ur_number: "",
    user_id: ""
  };

  const {reference, caseWorker, client,user} = useSelector(state => state);
  const {keyValueUsers} = user;
  const refs = reference.entities;
  const caseWorkers = caseWorker.entities;
  const clients = client.entities;
  const rsdStatuses = getKindRefs(kind.RSD_STATUS,refs);
  const maritalStatuses = getKindRefs(kind.MARITAL_STATUS,refs);
  const languages = getKindRefs(kind.LANGUAGE,refs);
  const countries = getKindRefs(kind.COUNTRY,refs);
  const genders = getKindRefs(kind.GENDER,refs);

  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});

  const {
    client_code,
    first_name,
    last_name,
    mobile_number,
    email,
    phone_number,
    address,
    date_of_birth,
    language_id,
    gender_id,
    country_id,
    rsd_status_id,
    marital_status_id,
    visa_number,
    assigned_case_worker_id,
    ur_number,
    user_id
  } = formValue;

  
  const findFormErrors = () => {
    const { first_name, last_name, date_of_birth, country_id, rsd_status_id, assigned_case_worker_id, user_id } = formValue;

    const newErrors = {};

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

    // country id errors
    if (!country_id || country_id === "") {
      newErrors.country_id = "This field is required!";
    } 

    // refugee status id errors
    if (!rsd_status_id || rsd_status_id === "") {
      newErrors.rsd_status_id = "This field is required!";
    } 

    // assigned srm id errors
    if (!assigned_case_worker_id || assigned_case_worker_id === "") {
      newErrors.assigned_case_worker_id = "This field is required!";
    } 
    
    // user id errors
    if (!user_id || user_id === "") {
      newErrors.user_id = "This field is required!";
    } 

    // dob errors
    if (!date_of_birth || date_of_birth === "") {
      newErrors.date_of_birth = "This field is required!";
    } 
    
    //email errors
    // var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    // if ((email || email !== "") && !emailPattern.test(email)) {
    //   newErrors.email = "Enter a valid email address!";  
    // }


    return newErrors;
  };

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

  const handleFormSubmit = (e) => {
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

  useEffect(() => {
    
    setFormErrors({}); //reset form errors

    if(isEditMode){
      let singleClient = clients.find(c => c.id === Number(editClientId));
      setFormValue({...singleClient,date_of_birth:getDateString(singleClient.date_of_birth,"yyyy-MM-DD")});
    }
   
  }, [clients,editClientId,isEditMode]);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEditMode ? "Edit " : "Create "} Client Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header>
            <h4>Client Details</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="clientCodeControl">
                    <Form.Label>Identification Code</Form.Label>
                    <Form.Control
                      value={client_code || "Will be auto-generated..."}
                      name="client_code"
                      style={{ backgroundColor: "rgb(237 236 236)" }}
                      readOnly={true}
                    />
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group
                    controlId="caseWorkerControl"
                    className="required"
                  >
                    <Form.Label>Assigned SRM</Form.Label>
                    <Form.Control
                      value={assigned_case_worker_id || ""}
                      disabled={!isAdmin}
                      as="select"
                      name="assigned_case_worker_id"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.assigned_case_worker_id}

                    >
                      <option value="">-- Select --</option>
                      {caseWorkers.map((cw, index) => (
                        <option key={index} value={cw.id}>
                          {cw.first_name + " " + cw.second_name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.assigned_case_worker_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="urNumberControl">
                    <Form.Label>UR #</Form.Label>
                    <Form.Control
                      value={ur_number || ""}
                      name="ur_number"
                      onChange={formValueChangeHandler}
                    />
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
                  <Form.Group controlId="emailControl">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email || ""}
                      type="email"
                      name="email"
                      onChange={formValueChangeHandler}
                    />
                   
                  </Form.Group>
                </Col>
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
                      name="address"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="dobControl" className="required">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      value={date_of_birth || ""}
                      type="date"
                      name="date_of_birth"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.date_of_birth}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.date_of_birth}
                    </Form.Control.Feedback>                       
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="languageControl">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      value={language_id || ""}
                      as="select"
                      name="language_id"
                      onChange={formValueChangeHandler}
                    >
                      <option value="">-- Select --</option>
                      {languages.map((s, index) => (
                        <option key={index} value={s.id}>
                          {s.text}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="genderControl">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      value={gender_id || ""}
                      as="select"
                      name="gender_id"
                      onChange={formValueChangeHandler}
                    >
                      <option value="">-- Select --</option>
                      {genders.map((s, index) => (
                        <option key={index} value={s.id}>
                          {s.text}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="maritalStatusControl">
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Control
                      value={marital_status_id || ""}
                      as="select"
                      name="marital_status_id"
                      onChange={formValueChangeHandler}
                    >
                      <option value="">-- Select --</option>
                      {maritalStatuses.map((s, index) => (
                        <option key={index} value={s.id}>
                          {s.text}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="countryControl" className="required">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      value={country_id || ""}
                      as="select"
                      name="country_id"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.country_id}
                    >
                      <option value="">-- Select --</option>
                      {countries.map((a, index) => (
                        <option key={index} value={a.id}>
                          {a.text}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.country_id}
                    </Form.Control.Feedback>  
                  </Form.Group>
                </Col>
                <Col lg md={12} sm={12}>
                  <Form.Group controlId="rsdStatusControl" className="required">
                    <Form.Label>Refugee Status</Form.Label>
                    <Form.Control
                      value={rsd_status_id || ""}
                      as="select"
                      name="rsd_status_id"
                      onChange={formValueChangeHandler}
                      isInvalid={!!formErrors.rsd_status_id}
                    >
                      <option value="">-- Select --</option>
                      {rsdStatuses.map((s, index) => (
                        <option key={index} value={s.id}>
                          {s.text}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.rsd_status_id}
                    </Form.Control.Feedback>                      
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col lg={4} md={12} sm={12}>
                  <Form.Group controlId="visaNumberControl">
                    <Form.Label>Visa Number</Form.Label>
                    <Form.Control
                      value={visa_number || ""}
                      name="visa_number"
                      onChange={formValueChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col lg={8} md={12} sm={12}>
                  <Form.Group controlId="userControl" className="required">
                    <Form.Label>Related User Id</Form.Label>
                    <Form.Control
                      value={user_id || ""}
                      as="select"
                      name="user_id"
                      onChange={formValueChangeHandler}
                      disabled={!isAdmin}
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
                      Make sure you assign the correct user id to this client.
                      Because an incorrect assignment will cause the client to
                      see another client's information when using the client app.
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
