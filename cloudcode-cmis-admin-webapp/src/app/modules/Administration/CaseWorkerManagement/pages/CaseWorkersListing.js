import { useSubheader } from "../../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React, {useEffect, useMemo, useState} from "react";
import { Button, Spinner } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useHistory } from "react-router";
import { CaseWorkerModalUpdateForm, caseWorkerSagaActions, CaseWorkersListingSearchForm  } from "..";

// Blatant "inspiration" from https://www.freecodecamp.org/news/how-to-create-pdf-reports-in-react/
// define a generatePDF function that accepts a tickets argument
const generatePDF = (data) => {
  // initialize jsPDF
  const doc = new jsPDF('landscape','pt');

  // define the columns we want and their titles
  const tableColumn = ["Id", "First Name", "Last Name","Mobile Number","Phone Number","Address"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  data.forEach(dataItem => {

    const item  = [

      dataItem.id,
      dataItem.first_name,
      dataItem.second_name,
      dataItem.mobile_number,
      dataItem.phone_number,
      dataItem.address

    ];

    tableRows.push(item);
  });

  // startY is basically margin-top
  doc.autoTable({head:[tableColumn], body:tableRows});
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // title. and margin-top + margin-left
  //doc.text("Receipt Tracking.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);

}
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

const HeaderActions = ({ totalCount,onCSVExport, onPDFExport, onCreate,onEditMode }) => (
  <>
      <Button className="mr-1" variant="primary" onClick={(e) => {onEditMode(false); return onCreate(0)}}><Plus />Create New SRM</Button>
      {totalCount>0 && 
      <span>
      <Button className="mr-1" variant="primary" onClick={(e) => onCSVExport(e.target.value)}>CSV</Button>
      <Button variant="primary" onClick={(e) => onPDFExport(e.target.value)}>PDF</Button>
      </span>}


  </>
);

const RowActions = ({ row, history,onEdit, onEditMode }) => (
  <>
      <Button className="mr-1" title="Edit case worker information" variant="primary" onClick={(e) => {onEditMode(true);return onEdit(row.id)}}><PencilSquare size={18} /></Button>{" "}
  </>
);

const getColumns = (
        history,
        handleShowModal,
        setEditMode) =>{

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
    },
  
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
      hide: "sm"

    },
    {
      name: "Last Name",
      selector: (row) => row.second_name,
      sortable: true,
      hide: "sm"

    },  
    {
      name: "Mobile #",
      selector: (row) => row.mobile_number,
      sortable: true,
      hide: "sm"

    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: true,
      hide: "md"
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      wrap:true,
      hide: "md"

    },
    {
      name: "Actions",
      cell: (row) => <RowActions 
                        row={row} 
                        history={history} 
                        onEdit={handleShowModal} 
                        onEditMode={setEditMode} 
                    />,
      allowOverflow: true,
      button: true,
      width:"250px"
    }
  ];

  return columns;
  

}

export const CaseWorkersListing = () => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Manage Status Resolution Managers");
  const dispatch = useDispatch();
  const {caseWorker} = useSelector(state => state);
  const {entities:data, listLoading, totalCount} = caseWorker;

  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCaseWorkerId, setEditCaseWorkerId] = useState(0);


  useEffect(()=>{
    dispatch(caseWorkerSagaActions.fetchCaseWorkers());
  },[dispatch]);

  const handleShowModal = (caseWorkerId) => {
    setEditCaseWorkerId(caseWorkerId);
    setModalShow(true);
  }

  const handleSearch = (queryParams) => {

    dispatch(caseWorkerSagaActions.findCaseWorkers(queryParams));
  }

  const headerActionsMemo = useMemo(() => <HeaderActions onEditMode={setEditMode} onCreate={handleShowModal} totalCount={totalCount} onPDFExport={() => generatePDF(data)} onCSVExport={() => downloadCSV(data)} />,[data,totalCount]);

  const handleSaveCaseWorker = (caseWorker) => {

    setModalShow(false);

    if(editMode){
      dispatch(caseWorkerSagaActions.updateCaseWorker(caseWorker.id,caseWorker));
    }
    else{
      dispatch(caseWorkerSagaActions.createCaseWorker(caseWorker));
    }


  }

  const handleCloseModal = () => {
      setModalShow(false);
  };

  return (
    <div className="card card-custom card-stretch gutter-b">
      {/* begin::Header */}

      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-6">
        <div className="row justify-content-start">
          <div className="col-12">
            <CaseWorkersListingSearchForm
              onHandleSearch={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CaseWorkerModalUpdateForm
              show={modalShow}
              onSave={handleSaveCaseWorker}
              OnCancel={handleCloseModal}
              editCaseWorkerId={editCaseWorkerId}
              isEditMode={editMode}
              setEditMode={setEditMode}
            />
            {/* begin::Table */}
            <DataTable
              title="Status Resolution Managers Listing"
              columns={getColumns(
                history,
                handleShowModal,
                setEditMode
                )}
              data={data}
              actions={headerActionsMemo}
              progressPending={listLoading}
              progressComponent={<Spinner animation="border" />}
              pagination
            />
            {/* end::Table */}
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
}
