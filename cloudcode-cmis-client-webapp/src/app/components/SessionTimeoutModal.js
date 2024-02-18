import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SessionTimeoutModal = ({  open, countdown, onLogout,onContinue }) => {

    return (
        <Modal show={open} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
            <Modal.Title>Session Timeout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>The current session is about to expire in{" "}<span style={{fontWeight:"bolder", color:"red"}}>{countdown}</span> seconds.</h5>
                <p>Would you like to continue the session?</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={onLogout}>
                Logout
            </Button>
            <Button variant="primary" onClick={onContinue}>
                Continue Session
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SessionTimeoutModal;