import React from "react";
import {Route, Redirect} from "react-router-dom";
import {Content} from "./Content";
import {useSelector} from "react-redux";


export function ProtectedContentRoute({ children, roles, component, render, ...props }) {

  const {auth: {user}} = useSelector(state => state);

  // check if route is restricted by role
  if (roles && roles.indexOf(user.roleCode) === -1) {
    // role not authorised so redirect to home page
    return <Redirect to={{ pathname: '/'}} />
  }

  return (


    <Route {...props}>
      {routeProps => {
        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (component) {
          return (
            <Content>{React.createElement(component, routeProps)}</Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}
