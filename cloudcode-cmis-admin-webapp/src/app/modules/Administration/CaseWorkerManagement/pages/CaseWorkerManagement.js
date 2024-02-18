import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {ProtectedContentRoute} from "../../../../../_metronic/layout/components/content/ProtectedContentRoute";
import { CaseWorkersListing } from "./CaseWorkersListing";

export default function CaseWorkerManagement() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/administration/case-worker-management"
        to="/administration/case-worker-management/case-workers-listing"
      />
      <ProtectedContentRoute roles={["ADMIN"]}
        path="/administration/case-worker-management/case-workers-listing"
        component={CaseWorkersListing} 
      />



    </Switch>
  );
}
