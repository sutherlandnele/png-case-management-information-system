import React from "react";
import {  Card } from "react-bootstrap";
import dc006 from "../../../../documents/DC006.pdf";
import dc007 from "../../../../documents/DC007.pdf";
import dc008 from "../../../../documents/DC008.pdf";


const RoeDocs = () => {
  return (<>  
  <a href={dc007} target="_blank" rel="noopener noreferrer">DC007 - Activity Statement - Record of Engagement - CWL</a><br/><br/>
  </>);
}

const FipDocs = () => {
  return (<>  
    <a href={dc006} target="_blank" rel="noopener noreferrer">DC006 - Activity Statement - Engagement Plan - CWL</a><br/><br/>  
  </>);
}

const DspDocs = () => {
  return (<>  
    <a href={dc008} target="_blank" rel="noopener noreferrer">DC008 - Activity Statement - Durable Solution Plan - CWL</a><br/><br/>
  </>);
}

const ShowRelatedDocs = ({docListType}) => {
  switch (docListType) {
    case "fip":
      return <FipDocs/>;      
    case "dsp":
      return <DspDocs/>;
    case "roe":
        return <RoeDocs/>;
    default:
      break;
  }
}


export default function RelatedDocuments({docListType}) {
   
  return (
    <Card>
      <Card.Header>
        <h5>Related Document(s)</h5>
      </Card.Header>
      <Card.Body>
        <Card.Text>
            <ShowRelatedDocs docListType={docListType} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}



