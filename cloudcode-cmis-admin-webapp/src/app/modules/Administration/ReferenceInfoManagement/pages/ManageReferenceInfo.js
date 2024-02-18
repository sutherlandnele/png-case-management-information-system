import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../../../_metronic/layout";
import { ReferenceInfoManagementForm } from "../components/ReferenceInfoManagementForm";
import { ReferenceInfoTable } from "../components/ReferenceInfoTable";

export const ManageReferenceInfo = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Manage Reference Info");

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Switch>
            <Redirect
              from="/administration/ref-info-management/manage-ref-info"
              exact={true}
              to="/administration/ref-info-management/manage-ref-info/ref-info-table"
            />
            <Route
              path="/administration/ref-info-management/manage-ref-info/ref-info-table"
              component={ReferenceInfoTable}
            />
            <Route
              path="/administration/ref-info-management/manage-ref-info/ref-info-management-form"
              component={ReferenceInfoManagementForm}
            />
          </Switch>
      </div>
      </div>
    </>
  );
};
