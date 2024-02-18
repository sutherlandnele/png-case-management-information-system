import React, { Suspense, useEffect  } from "react";
import { Redirect, Switch, useHistory } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import {Biography} from "./modules/Dashboard";
import { ClientDSPViewForm } from "./modules/DurableSolutionPathway";
import { ClientFIPViewForm } from "./modules/FamilyInclusionPlan";
import { ClientROEsListing } from "./modules/RecordOfEngagement";
import { ClientROEViewForm } from "./modules/RecordOfEngagement";
import {  useDispatch, useSelector } from "react-redux";
import { Help } from "./modules/Help";
import { clientSagaActions } from "./modules/ClientManagement";
import { referenceSagaActions } from "./modules/ReferenceInfoManagement";
import { caseWorkerSagaActions } from "./modules/CaseWorkerManagement";
import { dspSagaActions } from "./modules/DurableSolutionPathway";
import { fipSagaActions } from "./modules/FamilyInclusionPlan";
import { clientEngagementSagaActions } from "./modules/RecordOfEngagement";
import { FeedbackForm } from "./modules/Feedback/pages/FeedbackForm";
import { FeedbackResult } from "./modules/Feedback/pages/FeedbackResult";
import SessionTimeoutModal from "./components/SessionTimeoutModal";
import IdleTimer from "react-idle-timer";
import { useBeforeunload } from 'react-beforeunload';
import { useState, useRef } from "react";


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


  const dispatch = useDispatch();



  const {auth: {user}} = useSelector(state => state);


  useEffect(()=>{
    
    dispatch(clientSagaActions.fetchClientByUsername(user.username));
    
    if(user.clientId){
      dispatch(clientSagaActions.fetchClient(user.clientId));
      dispatch(clientEngagementSagaActions.fetchClientEngagements(user.clientId));
      dispatch(referenceSagaActions.fetchReferences());
      dispatch(caseWorkerSagaActions.fetchCaseWorker(user.clientId));
      dispatch(dspSagaActions.fetchClientDsp(user.clientId));
      dispatch(fipSagaActions.fetchClientFip(user.clientId));
    }


  },[dispatch, user.username, user.clientId]);
  



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
          <Redirect exact from="/" to="/biography" />
        }
        <ContentRoute path="/roe/client-roe-view-form" component={ClientROEViewForm} />
        <ContentRoute path="/feedback/feedback-result" component={FeedbackResult} />
        <ContentRoute path="/biography" component={Biography} />
        <ContentRoute path="/feedback" component={FeedbackForm} />
        {/* <Route path="/user-profile" component={UserProfilePage} /> */}
        <ContentRoute path="/dsp" component={ClientDSPViewForm} />
        <ContentRoute path="/fip" component={ClientFIPViewForm} />
        <ContentRoute path="/roe" component={ClientROEsListing} />
        <ContentRoute path="/help" component={Help} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
