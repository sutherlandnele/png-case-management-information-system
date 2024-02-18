/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Routes() {

  const { isUserAuthenticated } = useSelector(state => state.auth)
  
  return (

    <Switch>
      {!isUserAuthenticated ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/logout" component={Logout} />

      <Route path="/error" component={ErrorsPage} />

      {!isUserAuthenticated ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <ToastContainer />
          <BasePage />
        </Layout>
      )}
      
    </Switch>
  );
  
}
