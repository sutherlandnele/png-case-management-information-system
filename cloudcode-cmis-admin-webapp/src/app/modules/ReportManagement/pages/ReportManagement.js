import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSubheader } from "../../../../_metronic/layout";
import { ReportParametersForm } from "../components/ReportParametersForm";
import { ReportsTable } from "../components/ReportsTable";


export const ReportManagement = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Reporting");

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Switch>
            <Redirect
              from="/reporting"
              exact={true}
              to="/reporting/reporting-table"
            />
            <Route
              path="/reporting/reports-table"
              component={ReportsTable}
            />
            <Route
              path="/reporting/report-parameter-form"
              component={ReportParametersForm}
            />
          </Switch>
      </div>
      </div>
    </>
  );
};
