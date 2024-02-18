import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {ProtectedContentRoute} from "../../../../_metronic/layout/components/content/ProtectedContentRoute";
import {ClientDSPUpdateForm,ClientFIPUpdateForm,ClientROEManagement,ClientsListing, ClientFIPViewForm, ClientDSPViewForm} from ".."

export default function ClientManagement() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/client-management"
        to="/client-management/clients-listing"
      />
      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/client-management/clients-listing"
        component={ClientsListing} 
      />
      <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]}
        path="/client-management/client-roe-management"
        component={ClientROEManagement} 
      />
   
      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/client-management/client-fip-update-form"
        component={ClientFIPUpdateForm} 
      />
      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/client-management/client-dsp-update-form"
        component={ClientDSPUpdateForm} 
      />      

      <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]}
        path="/client-management/client-fip-view-form"
        component={ClientFIPViewForm} 
      />
      <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]}
        path="/client-management/client-dsp-view-form"
        component={ClientDSPViewForm} 
      />  

    </Switch>
  );
}
