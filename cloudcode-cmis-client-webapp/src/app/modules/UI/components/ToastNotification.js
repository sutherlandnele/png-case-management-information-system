import React from "react";
import { Toast } from "react-bootstrap";

function ToastNotification({ setShow, show, status, title, message }) {
  let variant = "Success";

  switch (status) {
    case "error":
      variant = "Danger";
      break;
    case "info":
      variant = "Info";
      break;
    case "success":
      variant = "Success";
      break;
    default:
      break;
  }
  return (
    <div className="position-absolute w-100 p-4 d-flex flex-column align-items-end">
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10
        }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          className="d-inline-block m-1"
          bg={variant.toLowerCase()}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default ToastNotification;
