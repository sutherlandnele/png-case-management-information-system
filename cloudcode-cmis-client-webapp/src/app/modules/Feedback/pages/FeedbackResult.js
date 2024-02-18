import { useSubheader } from "../../../../_metronic/layout";
import React from "react";
import { Form, Col, Card } from "react-bootstrap";
import { Check2Circle } from "react-bootstrap-icons";

export const FeedbackResult = (props) => {
  const suhbeader = useSubheader();

  suhbeader.setTitle("Thank you!");

  return (

      <Card>
        <Card.Body>
          <Form>
            <Form.Row>
              <Col lg md={12} sm={12}>
                <Form.Label>
                  <p style={{ fontSize: "14px" }}>
                    <Check2Circle size={50} color="green" className="mr-5" />
                    Thank you for submitting your feedback. Your feedback is
                    important to us.
                  </p>
                </Form.Label>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
  );
};
