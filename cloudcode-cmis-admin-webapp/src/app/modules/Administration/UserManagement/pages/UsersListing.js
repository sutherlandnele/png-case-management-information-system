import { useSubheader } from "../../../../../_metronic/layout";
import DataTable from "react-data-table-component";
import React, {useEffect, useMemo, useState} from "react";
import { UsersListingSearchForm } from "../components/UsersListingSearchForm";
import { Button, Spinner } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import { userSagaActions } from "..";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { UserModalUpdateForm, getRoleName } from "..";



// Blatant "inspiration" from https://www.freecodecamp.org/news/how-to-create-pdf-reports-in-react/
// define a generatePDF function that accepts a tickets argument
const generatePDF = (users) => {
  // initialize jsPDF
  const doc = new jsPDF('landscape','pt');

  // define the columns we want and their titles
  const tableColumn = ["Id", "Username", "First Name", "Last Name","Email","RoleId"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  users.forEach(user => {

    const userData = [
      user.id,
      user.username,
      user.first_name,
      user.last_name,
      user.email,
      user.roleId
    ];

    tableRows.push(userData);
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
      <Button className="mr-1" variant="primary" onClick={(e) => {onEditMode(false); return onCreate("")}}><Plus />Create New User</Button>
      {totalCount>0 && 
      <span>
      {/* <Button className="mr-1" variant="primary" onClick={(e) => onCSVExport(e.target.value)}>CSV</Button>
      <Button variant="primary" onClick={(e) => onPDFExport(e.target.value)}>PDF</Button> */}
      </span>}


  </>
);

const RowActions = ({ row, onEdit,onEditMode }) => (
  <>
      <Button className="mr-1" title="Edit user information" variant="primary" onClick={(e) => {onEditMode(true);return onEdit(row.id)}}><PencilSquare size={18} /></Button>{" "}
  </>
);

const getColumns = (
        handleShowModal,
        setEditMode,
        userRoles) =>{

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      omit:true
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Enabled",
      selector: (row) => row.enabled?"Yes":"No",
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
      name: "Role",
      selector: (row) => getRoleName(userRoles,row.roleId),
      sortable: true,
      hide: "md"

    },
    {
      name: "Actions",
      cell: (row) => <RowActions 
                        row={row} 
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

export const UsersListing = () => {

  const suhbeader = useSubheader();
  suhbeader.setTitle("Manage Users");
  const dispatch = useDispatch();
  const {user} = useSelector(state => state);

  const {userEntities: data,userRoleEntities: userRoles,listLoading, userEntitiesTotalCount: totalCount} = user;


  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(0);

  useEffect(()=>{
    dispatch(userSagaActions.fetchUsers());
    dispatch(userSagaActions.fetchUserRoles());


  },[dispatch]);

  //const getStringAfterLastCharPos = (str) => str.substr(str.lastIndexOf(".") + 1).toUpperCase();

  const handleShowModal = (userId) => {
    setEditUserId(userId);
    setModalShow(true);
  }

  const handleSearch = (queryParams) => {

    dispatch(userSagaActions.findUsers(queryParams));

  }

  const headerActionsMemo = useMemo(() => <HeaderActions onEditMode={setEditMode} onCreate={handleShowModal} totalCount={totalCount} onPDFExport={() => generatePDF(data)} onCSVExport={() => downloadCSV(data)} />,[data,totalCount]);

  const handleSaveUser = (user) => {

    setModalShow(false);

    if(editMode){
      dispatch(userSagaActions.updateUser(user.id,user));
    }
    else{
      dispatch(userSagaActions.createUser(user));
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
            <UsersListingSearchForm
              onHandleSearch={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <UserModalUpdateForm
              show={modalShow}
              onSave={handleSaveUser}
              OnCancel={handleCloseModal}
              editUserId={editUserId}
              isEditMode={editMode}
              setEditMode={setEditMode}

            />
            {/* begin::Table */}
            <DataTable
              title="User Listing"
              columns={getColumns(
                handleShowModal,
                setEditMode,
                userRoles
              )}
              data={data}
              actions={headerActionsMemo}
              progressPending={!!listLoading}
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
