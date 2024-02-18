import DataTable from "react-data-table-component";
import React, { useEffect, useMemo} from "react";
import {
  Button,
  Spinner,
  Card,
  Row,
  Col,
  Container
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { dashboardSagaActions } from "../../Dashboard";
import { DashboardTableSearchForm } from "../components/DashboardTableSearchForm";
import { useHistory } from "react-router-dom";
import {referenceSagaActions} from "../../Administration/ReferenceInfoManagement";
import {dspSagaActions, clientSagaActions, clientEngagementSagaActions, fipSagaActions} from "../../ClientManagement";


// Blatant "inspiration" from https://www.freecodecamp.org/news/how-to-create-pdf-reports-in-react/
// define a generatePDF function that accepts a tickets argument
const generatePDF = (data) => {
  // initialize jsPDF
  const doc = new jsPDF("landscape", "pt");

  // define the columns we want and their titles
  const tableColumn = [
    "Id Code",
    "UR #",
    "First Name",
    "Last Name",
    "Record of Engagment",
    "Durable Solution Pathway",
    "Family Inclusion Plan",
  ];
  // define an empty array of rows
  const tableRows = [];

  const red = [];
  const orange = [];
  const green = [];

  // for each ticket pass all its data into an array
  data.forEach((dataItem, index) => {
    if (dataItem.dsp_color_id.toLowerCase() === "red") {
      red.push(index);
    }

    if (dataItem.dsp_color_id.toLowerCase() === "orange") {
      orange.push(index);
    }

    if (dataItem.dsp_color_id.toLowerCase() === "green") {
      green.push(index);
    }

    const item = [
      dataItem.client_code,
      dataItem.ur_number,
      dataItem.first_name,
      dataItem.last_name,
      dataItem.dsp,
      dataItem.roe,
      dataItem.fip,
    ];

    tableRows.push(item);
  });

  // startY is basically margin-top
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    willDrawCell: function(data) {
      if (data.row.section === "body") {
        if (red.includes(data.row.index)) {
          doc.setFillColor(242, 38, 19);
          doc.setTextColor(255, 255, 255);
        }

        if (orange.includes(data.row.index)) {
          doc.setFillColor(255, 140, 0);
          doc.setTextColor(255, 255, 255);
        }

        if (green.includes(data.row.index)) {
          doc.setFillColor(34, 139, 34);
          doc.setTextColor(255, 255, 255);
        }
      }
    },
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // title. and margin-top + margin-left
  //doc.text("Receipt Tracking.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const HeaderActions = ({ totalCount, onCSVExport, onPDFExport }) => (
  <>
    {totalCount > 0 && (
      <span>
        {/* <Button className="mr-1" variant="primary" onClick={(e) => onCSVExport(e.target.value)}>CSV</Button> */}
        <Button variant="primary" onClick={(e) => onPDFExport(e.target.value)}>
          PDF
        </Button>
      </span>
    )}
  </>
);

const getColumns = (dispatchClientRoes, dispatchClientFip, dispatchClientDsp) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      omit: true,
    },

    {
      name: "Id Code",
      selector: (row) => row.client_code,
      sortable: true,
    },
    {
      name: "UR #",
      selector: (row) => row.ur_number,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,

      hide: "sm",
    },
    {
      name: "Durable Solution Pathway",
      button: true,
      cell: (row) => (
        row.case_worker_id && <Button variant="link" onClick={()=>dispatchClientDsp(row.id)}
          style={{ color: "white" }}
        >
          View DSP
        </Button>
      ),
      width:"180px",
      wrap: true,
      hide: "md",
    },
    {
      name: "Record of Engagement",
      button: true,
      cell: (row) => (
        row.case_worker_id && <Button variant="link" onClick={()=> dispatchClientRoes(row.id) }
          style={{ color: "white" }}
        >
          View ROEs
        </Button>
      ),
      width:"180px",
      wrap: true,
      hide: "md",
    },
    {
      name: "Family Inclusion Plan",
      button: true,
      cell: (row) => (
        row.case_worker_id && <Button variant="link" onClick = {() => dispatchClientFip(row.id)}
          style={{ color: "white" }}
        >
          View FIP
        </Button>
      ),
      width:"180px",
      wrap: true,
      hide: "md",
    },
    {
      name: "DSP Indicator Color",
      selector: (row) => row.dsp_color_id,
      sortable: true,
      omit: true,
      hide: "md",
    },
  ];

  return columns;
};

const conditionalRowStyles = [
  {
    when: (row) => row.dsp_color_id.toLowerCase() === "red",

    style: {
      backgroundColor: "rgba(242, 38, 19, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "not-allowed",
      },
    },
  },
  {
    when: (row) => row.dsp_color_id.toLowerCase() === "orange",
    style: {
      backgroundColor: "rgba(248, 148, 6, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.dsp_color_id.toLowerCase() === "green",
    style: {
      backgroundColor: "rgba(63, 195, 128, 0.9)",
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, auth: {user} } = useSelector((state) => state);
  const {
    dashboardTable: data,
    dashboardSummary, listLoading,
    dashboardTableTotalCount,
  } = dashboard;

  const history = useHistory();




  const dispatchClientDsp = (clientId) => {

    if(user.roleCode === "SRM"){
      //dispatch srm APIs
      dispatch(clientSagaActions.fetchSrmClient(clientId,user.caseWorkerId));
      dispatch(dspSagaActions.fetchSrmClientDsp(clientId,user.caseWorkerId));  
    }
    else{
      //dispatch admin APIs
      dispatch(clientSagaActions.fetchClient(clientId));
      dispatch(dspSagaActions.fetchClientDsp(clientId));  
    }



    history.push({
      pathname:
        "/client-management/client-dsp-view-form",
      state: { clientId: clientId }
    });
  }

  const dispatchClientFip = (clientId) => {

    if(user.roleCode === "SRM"){
      //dispatch srm APIs
      dispatch(fipSagaActions.fetchSrmClientFip(clientId, user.caseWorkerId));
      dispatch(clientSagaActions.fetchSrmClient(clientId, user.caseWorkerId));
    }
    else{
      //dispatch admin APIs
      dispatch(fipSagaActions.fetchClientFip(clientId));
      dispatch(clientSagaActions.fetchClient(clientId));
    }
    
    history.push({
      pathname:
        "/client-management/client-fip-view-form",
      state: { clientId: clientId }
    });
  }

  const dispatchClientRoes = (clientId) =>{

    if(user.roleCode === "SRM"){
      //dispatch srm APIs
      dispatch(clientSagaActions.fetchSrmClient(clientId, user.caseWorkerId));
      dispatch(clientEngagementSagaActions.fetchSrmClientEngagements(clientId, user.caseWorkerId)); 
    }
    else{
      //dispatch admin APIs
      dispatch(clientSagaActions.fetchClient(clientId));
      dispatch(clientEngagementSagaActions.fetchClientEngagements(clientId)); 
    }



    history.push({
      pathname:
        "/client-management/client-roe-management/client-roes-view-listing",
      state: { clientId: clientId }
    });
  }


  useEffect(() => {

    dispatch(dashboardSagaActions.fetchDashboardSummary());
    dispatch(referenceSagaActions.fetchReferences());

    if(user.roleCode === "SRM"){
      //dispatch srm APIs
      dispatch(dashboardSagaActions.fetchSrmDashboardTable(user.caseWorkerId));

    }
    else{
      //dispatch admin APIs
      dispatch(dashboardSagaActions.fetchDashboardTable());
  
    }


 
  }, [dispatch, user.caseWorkerId, user.roleCode]);

  const handleSearch = (queryParams) => {
    if(user.roleCode === "SRM"){
      //dispatch srm APIs
      dispatch(dashboardSagaActions.findSrmDashboardTableData(user.caseWorkerId, queryParams));

    }
    else
    {
      //dispatch admin APIs
      dispatch(dashboardSagaActions.findDashboardTableData(queryParams));

    }

  };

  const headerActionsMemo = useMemo(
    () => (
      <HeaderActions
        totalCount={dashboardTableTotalCount}
        onPDFExport={() => generatePDF(data)}
        onCSVExport={() => downloadCSV(data)}
      />
    ),
    [data, dashboardTableTotalCount]
  );

  return (
    <>
      <Card as={Row} className="mb-6 no-gutters">
        <Card.Header>
          <h4>Monthly Summary Report</h4>
        </Card.Header>
        <Card.Body>
          
          <Container className="p-10" fluid style={{
              backgroundColor: "rgb(241 241 241)",
              fontSize: "1.5rem"
            }}>
            <Row>
              <Col lg={6} md={6} sm={6}>Total in Cohort</Col>
              <Col lg={6} md={6} sm={6}><span style={{ color: "blue" }}>{dashboardSummary.total_in_cohort}</span></Col>
              <Col lg={6} md={6} sm={6}>Green</Col>
              <Col lg={6} md={6} sm={6}><span style={{ color: "green" }}>{dashboardSummary.green}</span></Col>
              <Col lg={6} md={6} sm={6}>Orange</Col>
              <Col lg={6} md={6} sm={6}><span style={{ color: "orange" }}>{dashboardSummary.orange}</span></Col>
            </Row>

            <Row>
            <Col lg={6} md={6} sm={6}>Red</Col>
            <Col lg={6} md={6} sm={6}><span style={{ color: "red" }}>{dashboardSummary.red}</span></Col>
            <Col lg={6} md={6} sm={6}>Status Change Up</Col>
            <Col lg={6} md={6} sm={6}><span style={{ color: "blue" }}>{dashboardSummary.status_change_up}</span></Col>
            <Col lg={6} md={6} sm={6}>Status Change Down</Col>
            <Col lg={6} md={6} sm={6}><span style={{ color: "blue" }}>{dashboardSummary.status_change_down}</span></Col>
            </Row>
          </Container>
          
        </Card.Body>
      </Card>

      <Card as={Row} className="no-gutters">
        {/* begin::Header */}

        {/* end::Header */}

        {/* begin::Body */}
        <Card.Body>
          <div className="row justify-content-start">
            <div className="col-12">
              <DashboardTableSearchForm onHandleSearch={handleSearch} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* begin::Table */}
              <DataTable
                title="Summary Listing"
                columns={getColumns(dispatchClientRoes, dispatchClientFip, dispatchClientDsp)}
                data={data}
                actions={headerActionsMemo}
                progressPending={listLoading}
                progressComponent={<Spinner animation="border" />}
                conditionalRowStyles={conditionalRowStyles}
                pagination
              />
              {/* end::Table */}
            </div>
          </div>
        </Card.Body>
        {/* end::Body */}
      </Card>
    </>
  );
};
