import { useSubheader } from "../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React from "react";
import { SelectedClientDetails } from "..";
import { Button, CardDeck, Card, Spinner, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Binoculars } from "react-bootstrap-icons";
import { getDateString } from "../../../Helpers";
import { clientEngagementSagaActions } from "..";
import { getCaseWorkerName } from "../../Administration/CaseWorkerManagement";
import { useHistory, useLocation } from "react-router";
import {ClientROEsListingSearchForm} from "..";


const RowActions = ({ row, history, currentClient }) => (
  <>

    <Button
      title="View client engagement details"
      variant="primary"
      onClick={(e) => history.push({pathname:"/client-management/client-roe-management/client-roe-view-form",state:{roeId:row.id, currentClient: currentClient}})}
    >
      <Binoculars size={18} />
    </Button>
  </>
);

const getColumns = (caseWorkers, currentClient, history) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      omit: true

    },       
    {
      name: "Engagement Date & Time",
      selector: (row) => getDateString(row.created_date,"DD/MM/yyyy HH:mm:ss"),
      sortable: true,
    }, 
    {
      name: "Assigned SRM",
      selector: (row) => getCaseWorkerName(caseWorkers,row.case_worker_id),
      sortable: true,
      omit:true,

    },
    {
      name: "Engagement Discussion",
      selector: (row) => row.engagement_discussion,
      sortable: false,
      wrap: true,
      omit: false
    },
    {
      name: "Actions & Ownership",
      selector: (row) => row.actions_and_ownership,
      sortable: false,
      wrap: true
    },
    {
      name: "Next Appointment Date",
      selector: (row) => row.next_appointment_date,
      sortable: true,
      omit: true

    },

    {
      name: "Actions",
      cell: (row) => <RowActions row={row} currentClient={currentClient} history={history} />,
      allowOverflow: true,
      button: true,
      width: "156px",
    }
  ];

  return columns;
};

export const ClientROEsViewListing = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Client Engagements");
  
  const dispatch = useDispatch();

  const {
    engagement: { entities: data, listLoading },
    caseWorker: { entities: caseWorkers },
    client: { foundClient: currentClient },
    auth: {user}
  } = useSelector((state) => state);


  const history = useHistory();
  const location = useLocation();
  const {clientId} = location.state;


  const handleSearch = (queryParams) => {
    if(user.roleCode === "SRM"){
      dispatch(clientEngagementSagaActions.findSrmEngagementsByClientId(clientId, user.caseWorkerId, queryParams));

    }
    else{
      dispatch(clientEngagementSagaActions.findEngagementsByClientId(clientId, queryParams));

    }
    
  }
  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>
        <Card className="card-custom card-stretch gutter-b">
          <Card.Body>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Button
                  className="mr-1 mb-4"
                  style={{float:"right"}}
                  variant="secondary"
                  onClick={(e) => history.push("/")}
                >
                  Back
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <ClientROEsListingSearchForm onHandleSearch={handleSearch} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <DataTable
                  title="Engagements History"
                  columns={getColumns(caseWorkers, currentClient, history)}
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

      <Col lg={3} md={12} sm={12}>
        <SelectedClientDetails currentClient={currentClient} />
      </Col>
    </CardDeck>
  );
};
