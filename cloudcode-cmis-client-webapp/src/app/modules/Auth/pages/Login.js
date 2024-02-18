import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { authSagaActions } from "..";
import { Form } from "react-bootstrap";


function Login(props) {

  const findFormErrors = () => {
    const { username, password } = formValue;

    const newErrors = {};
    // username errors
    if (!username || username === "") {
      newErrors.username = "cannot be blank!";
    } else if (username.length > 30) {
      newErrors.username = "username is too long!";
    }
    // password errors
    if (!password || password === "") {
      newErrors.password = "cannot be blank!";
    }

    return newErrors;
  };


  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [formValue, setFormValue] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const formValueChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });

      // Check and see if errors exist, and remove them from the error object:
      if (!!formErrors[name]) {
        setFormErrors({...formErrors,[name]: null})
      }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      //hand form errors
      setFormErrors(newErrors);
    } else {
      //there were no errors
      dispatch(authSagaActions.login(formValue.username,formValue.password ));

    }
  };

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <Form
        onSubmit={handleFormSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
            {auth.lastError && <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">ACCESS DENIED!</div>
            </div>}
        <Form.Group
          controlId="usernameControl"
          className="fv-plugins-icon-container"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="form-control-solid h-auto py-5 px-6"
            type="text"
            name="username"
            isInvalid={!!formErrors.username}
            onChange={formValueChangeHandler}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          controlId="passwordControl"
          className="fv-plugins-icon-container"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control-solid h-auto py-5 px-6"
            type="password"
            name="password"
            onChange={formValueChangeHandler}
            isInvalid={!!formErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.username}
          </Form.Control.Feedback>
        </Form.Group>


        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          {/* <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link> */}
          <button
            id="kt_login_signin_submit"
            type="submit"
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {!!auth.actionsLoading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </Form>
      {/*end::Form*/}
    </div>
  );
}

export default Login;
