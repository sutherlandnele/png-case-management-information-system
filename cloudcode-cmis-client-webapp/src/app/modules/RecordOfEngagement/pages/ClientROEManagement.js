import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {ContentRoute} from "../../../../_metronic/layout/components/content/ContentRoute";
import {ClientROEsListing,ClientROEUpdateForm} from ".."

export default function ClientROEManagement() {
  
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/client-management/client-roe-management"
        to="/client-management/client-roe-management/client-roes-listing"
      />

      <ContentRoute
        path="/client-management/client-roe-management/client-roes-listing"
        component={ClientROEsListing} 
      />
      <ContentRoute
        path="/client-management/client-roe-management/client-roe-update-form"
        component={ClientROEUpdateForm} 
      />      
      
    </Switch>
  );
}
