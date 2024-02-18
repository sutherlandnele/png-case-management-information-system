import { useSubheader } from "../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React, { useEffect } from "react";
import { Button, CardDeck, Card, Spinner, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Binoculars } from "react-bootstrap-icons";
import { getDateString } from "../../../Helpers";
import { getCaseWorkerName, caseWorkerSagaActions } from "../../Administration/CaseWorkerManagement";
import { getClientName, clientSagaActions } from "../../ClientManagement";
import { useHistory } from "react-router";
import {ClientFeedbacksListingSearchForm, feedbackSagaActions} from "..";



const RowActions = ({ row, history }) => (
  <>

    <Button
      title="View feedback details"
      variant="primary"
      onClick={(e) => history.push({pathname:"/feedback/feedback-view",state:{feedback:row}})}
    >
      <Binoculars size={18} />
    </Button>
  </>
);

const getColumns = (caseWorkers, clients, history) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "60px",
      omit: true

    },       
    {
      name: "Submitted Date & Time",
      selector: (row) => getDateString(row.created_date,"DD/MM/yyyy HH:mm:ss"),
      sortable: true,
    }, 
    {
      name: "Text",
      selector: (row) => row.text,
      sortable: false,
      omit: true
    }, 
    {
      name: "Assigned SRM",
      selector: (row) => getCaseWorkerName(caseWorkers,row.case_worker_id),
      sortable: true,
      omit:false,

    },
    {
      name: "Client",
      selector: (row) => getClientName(clients,row.client_id),
      sortable: false,
      wrap: true,
      omit: false
    },
    

    {
      name: "Actions",
      cell: (row) => <RowActions row={row} history={history} />,
      allowOverflow: true,
      button: true,
      width: "156px",
    }
  ];

  return columns;
};

export const ClientFeedbacksListing = (props) => {
  
  const suhbeader = useSubheader();
  suhbeader.setTitle("Client Feedbacks");
  
  const dispatch = useDispatch();

  const {
    feedback: { listLoading, entities: data },
    caseWorker: { entities: caseWorkers },
    client: { entities: clients },
    auth: {user}
  } = useSelector((state) => state);
   

  const history = useHistory();

  useEffect(() => {

    dispatch(caseWorkerSagaActions.fetchCaseWorkers());

    if(user.roleCode === "SRM"){
      dispatch(clientSagaActions.fetchSrmClients(user.caseWorkerId));
      dispatch(feedbackSagaActions.fetchAllSrmClientFeedbacks(user.caseWorkerId));
    }
    else{
      dispatch(clientSagaActions.fetchClients());
      dispatch(feedbackSagaActions.fetchAllClientFeedbacks());
    }

  }, [dispatch,user.roleCode, user.caseWorkerId]);


  const handleSearch = (queryParams) => {
    
    if(user.roleCode === "SRM"){
      dispatch(feedbackSagaActions.findAllSrmClientFeedbacks(user.caseWorkerId,queryParams));

    }
    else{
      dispatch(feedbackSagaActions.findAllClientFeedbacks(queryParams));

    }

  }
  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={12} md={12} sm={12}>
        <Card className="card-custom card-stretch gutter-b">
          <Card.Body>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <ClientFeedbacksListingSearchForm onHandleSearch={handleSearch} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <DataTable
                  title="Feedbacks History"
                  columns={getColumns(caseWorkers, clients, history)}
                  data={data}
                  progressPending={listLoading}
                  progressComponent={<Spinner animation="border" />}
                  pagination
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>   
    </CardDeck>
  );
};
