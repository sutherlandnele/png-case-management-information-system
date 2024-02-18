import React, { Suspense , lazy } from "react";
import { Redirect, Switch  } from "react-router-dom";
import { LayoutSplashScreen, ProtectedContentRoute } from "../_metronic/layout";
import { Dashboard } from "./modules/Dashboard";
import { Help } from "./modules/Help";
import {CaseWorkerManagement} from "./modules/Administration/CaseWorkerManagement";
import {ClientManagement} from "./modules/ClientManagement";
import { useState, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { useBeforeunload } from 'react-beforeunload';
import { useHistory } from "react-router";
import SessionTimeoutModal from "./components/SessionTimeoutModal";
import {ClientFeedbackManagement} from "./modules/Feedback"
const UserManagement = lazy(() =>
  import("./modules/Administration/UserManagement/pages/UserManagement"));

  let countdownInterval;
  let timeout;

export default function BasePage() {

  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };

  const history = useHistory();

  const handleLogout = async () => {
    try {
      setTimeoutModalOpen(false);
      clearSessionInterval();
      clearSessionTimeout();
      history.push("/logout");
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
  };

  const onActive = () => {
    if (!timeoutModalOpen) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };

  const onIdle = () => {

    const delay = 1000 * 1;

    if (!timeoutModalOpen) {

      timeout = setTimeout(() => {
        let countDown = 15;
        setTimeoutModalOpen(true);
        setTimeoutCountdown(countDown);
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
          } else {
            handleLogout(true);
          }
        }, 1000);
      }, delay);
    }
  };

  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const idleTimer = useRef(null);

 //delete session record when the browser closes
 useBeforeunload(() => history.push("/logout"));

  return (
    <Suspense fallback={<LayoutSplashScreen />}>

      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={300000}

      />

      <SessionTimeoutModal
        countdown={timeoutCountdown}
        onContinue={handleContinue}
        onLogout={handleLogout}
        open={timeoutModalOpen}
      />

      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]} path="/dashboard" component={Dashboard} />
        <ProtectedContentRoute roles={["SRM","ADMIN"]} path="/feedback" component={ClientFeedbackManagement} />
        {/* <Route path="/user-profile" component={UserProfilePage} /> */}
        <ProtectedContentRoute roles={["ADMIN"]} path="/administration/user-management" component={UserManagement} />        
        <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]} path="/help" component={Help} />
        <ProtectedContentRoute roles={["ADMIN"]} path="/administration/case-worker-management" component={CaseWorkerManagement} />
        <ProtectedContentRoute roles={["SRM","ADMIN","ICA"]} path="/client-management" component={ClientManagement} />
        <Redirect to="error/error-v1" />
      </Switch>
      
    </Suspense>
  );
}
