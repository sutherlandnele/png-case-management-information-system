import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {ProtectedContentRoute} from "../../../../_metronic/layout/components/content/ProtectedContentRoute";
import {ClientROEsListing,ClientROEUpdateForm, ClientROEViewForm, ClientROEsViewListing} from ".."

export default function ClientROEManagement() {
  
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/client-management/client-roe-management"
        to="/client-management/client-roe-management/client-roes-listing"
      />

      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/client-management/client-roe-management/client-roes-listing"
        component={ClientROEsListing} 
      />
      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/client-management/client-roe-management/client-roe-update-form"
        component={ClientROEUpdateForm} 
      />      
      <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]}
        path="/client-management/client-roe-management/client-roes-view-listing"
        component={ClientROEsViewListing} 
      />   

      <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]}
        path="/client-management/client-roe-management/client-roe-view-form"
        component={ClientROEViewForm} 
      />         
    </Switch>
  );
}
