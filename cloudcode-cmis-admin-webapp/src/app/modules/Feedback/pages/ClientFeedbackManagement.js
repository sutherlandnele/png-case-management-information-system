import React from "react";
import {Redirect, Switch} from "react-router-dom";
import {ProtectedContentRoute} from "../../../../_metronic/layout/components/content/ProtectedContentRoute";
import {ClientFeedbacksListing,ClientFeedbackViewForm} from ".."

export default function ClientFeedbackManagement() {
  
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/feedback"
        to="/feedback/feedback-listing"
      />

      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/feedback/feedback-listing"
        component={ClientFeedbacksListing} 
      />
      <ProtectedContentRoute roles={["SRM","ADMIN"]}
        path="/feedback/feedback-view"
        component={ClientFeedbackViewForm} 
      />      
      
    </Switch>
  );
}
