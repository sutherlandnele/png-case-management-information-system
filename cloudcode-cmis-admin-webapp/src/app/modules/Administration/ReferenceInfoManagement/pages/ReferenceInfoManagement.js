import React from "react";
import {Redirect, Switch} from "react-router-dom";

import {ContentRoute} from "../../../../../_metronic/layout/components/content/ContentRoute";
import { ManageReferenceInfo } from "./ManageReferenceInfo";


export default function ReferenceInfoManagement() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/administration/ref-info-management"
        to="/administration/ref-info-management/manage-ref-info"
      />
      <ContentRoute
        path="/administration/ref-info-management/manage-ref-info"
        component={ManageReferenceInfo} 
      />


    </Switch>
  );
}
