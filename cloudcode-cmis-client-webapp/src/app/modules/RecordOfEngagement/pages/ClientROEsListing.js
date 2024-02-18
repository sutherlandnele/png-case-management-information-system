import { useSubheader } from "../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React, { useMemo } from "react";
// import { SelectedClientDetails } from "..";
import { Button, CardDeck, Card, Spinner, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Binoculars } from "react-bootstrap-icons";
import { getDateString } from "../../../Helpers";
import { useHistory } from "react-router";

const HeaderActions = ({history}) => (
  <>
    <Button
      className="mr-1"
      variant="secondary"
      onClick={(e) => history.push("/biography")}>
      Close
    </Button>

  </>
);

const RowActions = ({ row,history }) => (
  <>

    <Button
      title="View engagement details"
      variant="primary"
      onClick={(e) => history.push({pathname:"/roe/client-roe-view-form",state:{roeId:row.id}})}
    >
      <Binoculars size={18} />
    </Button>
  </>
);

const getColumns = (history) => {
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
      hide: "sm",

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
      hide: "sm",
      wrap: true
    },
    {
      name: "Next Appointment Date",
      selector: (row) => row.next_appointment_date,
      sortable: true,
      hide: "md",
      omit: true

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

export const ClientROEsListing = (props) => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Record of Engagements");
  
  const { engagement } = useSelector(state => state);

  const { listLoading } = engagement;
  const { entities: data } = engagement;


  const history = useHistory();

  const headerActionsMemo = useMemo(() => <HeaderActions history={history} />,[history]);


  return (
    <CardDeck as={Row} className="no-gutters">
      <Col lg={9} md={12} sm={12}>        
      <Card className="card-custom card-stretch gutter-b">
        <Card.Body>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <DataTable
                title="My Engagements History"
                columns={getColumns(history)}
                actions={headerActionsMemo}
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
        {/* <SelectedClientDetails currentClient={currentClient} /> */}
      </Col>
    </CardDeck>
  );
};
