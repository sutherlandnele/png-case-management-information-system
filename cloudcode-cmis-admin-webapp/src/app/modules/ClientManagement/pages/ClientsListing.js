import { useSubheader } from "../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React, {useEffect, useMemo, useState, useRef} from "react";
import { ClientsListingSearchForm } from "../components/ClientsListingSearchForm";
import { Button, Spinner } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import { clientSagaActions, fipSagaActions, dspSagaActions } from "..";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getDateString} from "../../../Helpers";
import { referenceSagaActions } from "../../Administration/ReferenceInfoManagement";
import { getRefText } from "../../Administration/ReferenceInfoManagement";
import { useHistory } from "react-router";
import { ClientModalUpdateForm } from "..";
import { caseWorkerSagaActions, getCaseWorkerName } from "../../Administration/CaseWorkerManagement";
import { userSagaActions } from "../../Administration/UserManagement";



// Blatant "inspiration" from https://www.freecodecamp.org/news/how-to-create-pdf-reports-in-react/
// define a generatePDF function that accepts a tickets argument
const generatePDF = (clients, refData, caseWorkers) => {
  // initialize jsPDF
  const doc = new jsPDF('landscape','pt');

  // define the columns we want and their titles
  const tableColumn = ["Id Code", "UR #", "First Name", "Last Name","Date of Birth","Country","RSD Status","Assigned Case Worker"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  clients.forEach(client => {

    const clientData = [
      client.client_code,
      client.ur_number,
      client.first_name,
      client.last_name,
      getDateString(client.date_of_birth,"DD/MM/yyyy"),  
      getRefText(refData,client.country_id),
      getRefText(refData,client.rsd_status_id),
      getCaseWorkerName(caseWorkers,client.assigned_case_worker_id)
    ];

    tableRows.push(clientData);
  });

    // startY is basically margin-top
    doc.autoTable({head:[tableColumn], body:tableRows});
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // title. and margin-top + margin-left
    //doc.text("Receipt Tracking.", 14, 15);
    // we define the name of our PDF file.
    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()
    
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, {
          align: 'center'
        })
      }
    }

    addFooters(doc)

    doc.save(`report_${dateStr}.pdf`);

}
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array, refData, caseWorkers) {
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

      //format some columns before outputting to csv
      switch (key) {
        case "date_of_birth":     
            result += getDateString(item[key],"DD/MM/yyyy");
          break;
        case "country_id":                  
            result += getRefText(refData,item[key]);
            break; 
        case "rsd_status_id":      
          result += getRefText(refData,item[key]);
          break;    
        case "assigned_case_worker_id":      
          result += getCaseWorkerName(caseWorkers,item[key]);
          break;          
        default:
          result += item[key];
          break;
      }


      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array, refData, caseWorkers) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array, refData,caseWorkers);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const HeaderActions = ({ totalCount, isAdmin, onCSVExport, onPDFExport, onCreate,onEditMode }) => (
  <>
      {isAdmin.current && <Button className="mr-1" variant="primary" onClick={(e) => {onEditMode(false); return onCreate(0)}}><Plus />Create New Client</Button>}
      {totalCount>0 && 
      <span>
      <Button className="mr-1" variant="primary" onClick={(e) => onCSVExport(e.target.value)}>CSV</Button>
      <Button variant="primary" onClick={(e) => onPDFExport(e.target.value)}>PDF</Button>
      </span>}


  </>
);

const RowActions = ({ row, history,onEdit, onEditMode, onHandleFipEditModeDecide,onHandleDspEditModeDecide }) => (
  <>
      <Button className="mr-1" title="Edit client information" variant="primary" onClick={(e) => {onEditMode(true);return onEdit(row.id)}}><PencilSquare size={18} /></Button>{" "}
      {row.assigned_case_worker_id && <Button className="mr-1" title="Client Record of Engagements" variant="success" onClick={(e) => history.push({pathname:"/client-management/client-roe-management/client-roes-listing",state:row})}>ROEs</Button>}{" "}
      {row.assigned_case_worker_id && <Button className="mr-1" title="Client Family Inclusion Plan" variant="success" 
          onClick={(e) => { 
                            const isFipEditMode = onHandleFipEditModeDecide(row.id);                             
                            history.push({
                                pathname:"/client-management/client-fip-update-form",
                                state:{
                                  currentClient: row, 
                                  isFipEditMode:isFipEditMode
                                  }
                            })
                          }}>FIP</Button>}
      {row.assigned_case_worker_id && <Button variant="success" title="Click Durable Solution Pathway" 
          onClick={(e) => {
              const isDspEditMode = onHandleDspEditModeDecide(row.id);                             
              history.push({
                  pathname:"/client-management/client-dsp-update-form",
                  state:{
                    currentClient: row, 
                    isDspEditMode:isDspEditMode
                    }
              })
          
          }}>DSP</Button>}

  </>
);

const getColumns = (
        refData,
        caseWorkers,
        history,
        handleShowModal,
        setEditMode,
        handleFipEditModeDecide,
        handleDspEditModeDecide) =>{

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      omit:true
    },
    {
      name: "Id Code",
      selector: (row) => row.client_code,
      sortable: true
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
      hide: "sm"

    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
      hide: "sm"

    },
    {
      name: "Date of Birth",
      selector: (row) =>
      getDateString(row.date_of_birth,"DD/MM/yyyy"),
      sortable: true,
      hide: "md"
    },
    // {
    //   name: "Mobile #",
    //   selector: (row) => row.mobile_number,
    //   sortable: false,
    // },
    {
      name: "Country",
      selector: (row) => getRefText(refData, row.country_id),
      sortable: true,
      hide: "md"

    },
    {
      name: "RSD Status",
      selector: (row) => getRefText(refData, row.rsd_status_id),
      sortable: true,
      hide: "md"

    },
    {
      name: "SRM",
      selector: (row) => getCaseWorkerName(caseWorkers,row.assigned_case_worker_id),
      sortable: true,
      hide: "md"

    },
    {
      name: "Actions",
      cell: (row) => <RowActions 
                        row={row} 
                        history={history} 
                        onEdit={handleShowModal} 
                        onEditMode={setEditMode} 
                        onHandleFipEditModeDecide={handleFipEditModeDecide} 
                        onHandleDspEditModeDecide={handleDspEditModeDecide} 

                    />,
      allowOverflow: true,
      button: true,
      width:"250px"
    }
  ];

  return columns;
  

}

export const ClientsListing = () => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Manage Clients");
  const dispatch = useDispatch();
  const {client,reference,caseWorker, fip,dsp, auth: {user}} = useSelector(state => state);
  const data = client.entities;
  const {listLoading, totalCount} = client;
  const refData = reference.entities;
  const caseWorkers = caseWorker.entities;
  const fips = fip.entities;
  const dsps = dsp.entities;

  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editClientId, setEditClientId] = useState(0);
  // const [fipEditMode, setFipEditMode] = useState(false);

  const handleFipEditModeDecide = (clientId) =>{
    return fips.some(f=>f.client_id === clientId);
  }

  const handleDspEditModeDecide = (clientId) =>{
    return dsps.some(d=>d.client_id === clientId);
  }

  const isAdmin =  useRef(false);


  useEffect(()=>{
    dispatch(referenceSagaActions.fetchReferences());
    dispatch(userSagaActions.fetchClientKvUsers());
    dispatch(caseWorkerSagaActions.fetchCaseWorkers());



    if(user.roleCode === "SRM"){
      isAdmin.current = false;
      dispatch(clientSagaActions.fetchSrmClients(user.caseWorkerId));
      dispatch(fipSagaActions.fetchAllSrmFips(user.caseWorkerId));
      dispatch(dspSagaActions.fetchSrmAllDsps(user.caseWorkerId));
    }
    else{
      isAdmin.current = true;

      dispatch(clientSagaActions.fetchClients());
      dispatch(fipSagaActions.fetchAllFips());
      dispatch(dspSagaActions.fetchAllDsps());
    }


  },[dispatch,user.roleCode, user.caseWorkerId]);

  const handleShowModal = (clientId) => {
    setEditClientId(clientId);
    setModalShow(true);
  }

  const handleSearch = (queryParams) => {

    if(user.roleCode === "SRM"){
      dispatch(clientSagaActions.findSrmClients(user.caseWorkerId,queryParams));

    }
    else{
      dispatch(clientSagaActions.findClients(queryParams));

    }


  }

  const headerActionsMemo = useMemo(() => <HeaderActions isAdmin={isAdmin} onEditMode={setEditMode} onCreate={handleShowModal} totalCount={totalCount} onPDFExport={() => generatePDF(data,refData,caseWorkers)} onCSVExport={() => downloadCSV(data,refData,caseWorkers)} />,[data,refData,totalCount, caseWorkers]);

  const handleSaveClient = (client) => {

    setModalShow(false);

    if(editMode){
      if(user.roleCode === "SRM"){
        dispatch(clientSagaActions.updateSrmClient(client.id,user.caseWorkerId,client));

      }
      else{
        dispatch(clientSagaActions.updateClient(client.id,client));

      }

    }
    else{
      dispatch(clientSagaActions.createClient(client));
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
            <ClientsListingSearchForm
              onHandleSearch={handleSearch}
              refData={refData}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ClientModalUpdateForm
              isAdmin={isAdmin.current}
              show={modalShow}
              onSave={handleSaveClient}
              OnCancel={handleCloseModal}
              editClientId={editClientId}
              isEditMode={editMode}
              setEditMode={setEditMode}
            />
            {/* begin::Table */}
            <DataTable
              title="Clients Listing"
              columns={getColumns(
                refData,
                caseWorkers,
                history,
                handleShowModal,
                setEditMode,
                handleFipEditModeDecide,
                handleDspEditModeDecide
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
