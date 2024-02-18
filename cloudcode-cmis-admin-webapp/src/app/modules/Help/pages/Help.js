import { useSubheader } from "../../../../_metronic/layout";
import React /*{ useEffect }*/ from "react";
import { Card, Accordion, CardDeck, Tab, Tabs, Image } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import dc006 from "../../../../documents/DC006.pdf";
import dc007 from "../../../../documents/DC007.pdf";
import dc008 from "../../../../documents/DC008.pdf";
import userManual from "../../../../documents/um_draft_v1.pdf";
import help from "../../../../documents/help.png";
import {useSelector} from "react-redux";


export const Help = (props) => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Helpful Information");
  const {auth: {user}} = useSelector(state => state);


  return (
    <>
      <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
        <Tab eventKey="overview" title="Overview">
          <Image src={help} rounded fluid style={{padding:"20px"}} />
        </Tab>
        {user.roleCode !== "ICA" && 
        <Tab eventKey="docs" title="Documents">
          <CardDeck>
            <Card>

              <Card.Body>
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <h5>
                        <ArrowRight className="m-4" />
                        Related Document Links
                      </h5>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div>
                          <a
                            href={dc006}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DC006 - Activity Statement - Engagement Plan - CWL
                          </a>
                          <br />
                          <br />
                          <a
                            href={dc007}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DC007 - Activity Statement - Record of Engagement -
                            CWL
                          </a>
                          <br />
                          <br />
                          <a
                            href={dc008}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DC008 - Activity Statement - Durable Solution Plan -
                            CWL
                          </a>
                          <br />
                          <br />
                        </div>
                        <div></div>
                        <div></div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      <h5>
                        <ArrowRight className="m-4" />
                        Case Management System User Manual
                      </h5>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <div>
                          <a
                            href={userManual}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Case Management Information System User Manual
                          </a>
                          <br />
                          <br />
                        </div>
                        <div></div>
                        <div></div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Card.Body>
            </Card>
          </CardDeck>{" "}
        </Tab>
        }
        {/* <Tab eventKey="contact" title="Contact" disabled></Tab> */}
      </Tabs>
    </>
  );
};
