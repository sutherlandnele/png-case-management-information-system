import React from "react";
import {Redirect, Switch} from "react-router-dom";
import { UsersListing } from "..";
import { ProtectedContentRoute } from "../../../../../_metronic/layout";


export default function UserManagement() {
  return (
   <Switch>
      <Redirect
        exact={true}
        from="/administration/user-management"
        to="/administration/user-management/users-listing"
      />
      <ProtectedContentRoute roles={["ADMIN"]}
        path="/administration/user-management/users-listing"
        component={UsersListing} 
      />
    </Switch>
  );
}
