import { useSubheader } from "../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React, { useEffect, useMemo, useRef } from "react";
import { SelectedClientDetails } from "..";
import { Button, CardDeck, Card, Spinner, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquare, Plus, Binoculars } from "react-bootstrap-icons";
import { getDateString } from "../../../Helpers";
import { clientEngagementSagaActions } from "..";
import { getCaseWorkerName } from "../../Administration/CaseWorkerManagement";
import { useLocation, useHistory } from "react-router";
import RelatedDocuments from "../components/RelatedDocuments";
import {ClientROEsListingSearchForm} from "..";



const HeaderActions = ({history,currentClient}) => (
  <>
    <Button
      variant="primary"
      onClick={(e) => history.push({pathname:"/client-management/client-roe-management/client-roe-update-form",state:{roeId:0,currentClient:currentClient,isEditMode:false}})}>
      <Plus />
      Create New Engagement
    </Button>

  </>
);

const RowActions = ({ row, currentClient, history, isAdmin}) => (
  <>
    {isAdmin.current && <Button
      title="Edit client engagement details"
      variant="primary"
      className="mr-1"
      onClick={(e) => history.push({pathname:"/client-management/client-roe-management/client-roe-update-form",state:{roeId:row.id,currentClient:currentClient,isEditMode:true,isReadOnly:false}})}
    >
      <PencilSquare size={18} />
    </Button>}
    <Button
      title="View client engagement details"
      variant="primary"
      onClick={(e) => history.push({pathname:"/client-management/client-roe-management/client-roe-update-form",state:{roeId:row.id,currentClient:currentClient,isEditMode:true,isReadOnly:true}})}
    >
      <Binoculars size={18} />
    </Button>
  </>
);

const getColumns = (caseWorkers, currentClient, history,isAdmin) => {
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
      cell: (row) => <RowActions row={row} currentClient={currentClient} history={history} isAdmin={isAdmin} />,
      allowOverflow: true,
      button: true,
      width: "156px",
    }
  ];

  return columns;
};

export const ClientROEsListing = (props) => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Manage Engagements");
  
  const dispatch = useDispatch();
  const { engagement, caseWorker, auth : {user} } = useSelector((state) => state);
  const { listLoading } = engagement;
  const caseWorkers = caseWorker.entities;

  const location = useLocation();
  const history = useHistory();

  const currentClient = location.state;

  const data = engagement.entities.filter(e=>e.client_id === Number(currentClient.id));


  const headerActionsMemo = useMemo(() => <HeaderActions history={history} currentClient={currentClient} />,[history, currentClient]);

  const isAdmin = useRef(false);

  useEffect(() => {

    if(user.roleCode === "SRM"){

      isAdmin.current = false;

      dispatch(clientEngagementSagaActions.fetchAllSrmEngagements(user.caseWorkerId));

    }
    else{

      isAdmin.current = true;
      dispatch(clientEngagementSagaActions.fetchAllEngagements());

    }
    


  }, [dispatch ,user.roleCode, user.caseWorkerId]);


  const handleSearch = (queryParams) => {

    if(user.roleCode === "SRM"){
      dispatch(clientEngagementSagaActions.findSrmEngagements(user.caseWorkerId,queryParams));

    }
    else{
      dispatch(clientEngagementSagaActions.findEngagements(queryParams));
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
                  onClick={(e) => history.push("/client-management")}
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
                  columns={getColumns(caseWorkers, currentClient, history,isAdmin)}
                  data={data}
                  actions={headerActionsMemo}
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
        <RelatedDocuments docListType="roe" />
      </Col>
    </CardDeck>
  );
};
